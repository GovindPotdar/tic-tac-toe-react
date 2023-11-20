import { useEffect, useReducer } from "react"
import Box from "./Box"
import PlayersInfo from "./PlayersInfo"
import { initialState, gameReducer } from "./reducers/gameReducer"
import { onSnapshot, doc, getDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { db } from "../../config/firebase"
import Loader from '../../components/Loader'
import NoGame from "./NoGame"
import { collection, query, where, getDocs } from "firebase/firestore";
import { connect } from "react-redux";

function Game({ userId }) {

  const [game, gameDispatch] = useReducer(gameReducer, initialState);
  const { gameId } = useParams();

  const getUserInfo = async (userID)=>{
    try {
      const user = await getDoc(doc(db, 'users', userID));
      return user.data();
    } catch (error) {
      console.log(error.message)
      return null
    }
  };
  const getGameBox = async ()=>{
    try {
      const q = query(collection(db, "boxes"), where("gameId", "==", gameId));
      const boxes = await getDocs(q);
      return boxes.docs[0];
    } catch (error) {
      console.log(error.message)
      return null;
    }
  };

  const setData = async (g)=>{
    if(!g.exists()){
      gameDispatch({type: 'SET_LOADING', payload: false})
      return
    }
    const gameData = g.data();
    gameDispatch({type: 'SET_LOADING', payload: true})
    if(game.boxId === null){
      const box = await getGameBox()
      if(box.exists()){
        gameDispatch({type: 'SET_BOX_ID', payload: box.id})
      }else{
        gameDispatch({type: 'SET_ERROR', payload: ['box not present']})
        return
      }
    }
    // Setting the state of game
    gameDispatch({type: 'SET_STATE', payload: gameData.state})
    // Setting the game presence
    gameDispatch({type: 'SET_GAME_PRESENT', payload: true})
    if(game.playerOne === null){
      if(gameData.playerOneId === null){
        gameDispatch({type: 'SET_ERROR', payload: ['player one not present']})
        return
      }
      const userOne  = await getUserInfo(gameData.playerOneId);
      if(userOne) gameDispatch({type: 'SET_PLAYER_ONE', payload: userOne})
      else{
        gameDispatch({type: 'SET_ERROR', payload: ['player one not found!']})
        return;
      }
    }
    if(game.playerTwo === null && gameData.playerTwoId !==  null){
      const userTwo  = await getUserInfo(gameData.playerTwoId);
      if(userTwo){
        gameDispatch({type: 'SET_PLAYER_TWO', payload: userTwo});
      }
      else{
        gameDispatch({type: 'SET_ERROR', payload: ['player two not found!']})
        return;
      }
    }
    if(game.player === -1){
      if(gameData.playerOneId === userId){
        gameDispatch({type: 'SET_PLAYER', payload: 0})
      }else{
        if(gameData.playerTwoId !==  null && gameData.playerTwoId === userId) gameDispatch({type: 'SET_PLAYER', payload: 1})
      }
    }
    if(game.winner === null){
      gameDispatch({type: 'SET_WINNER', payload: gameData.winner})
    }
    if(gameData.playWithAi){
      gameDispatch({type: 'SET_PLAY_WITH_AI', payload: true})
    }
    gameDispatch({type: 'SET_LOADING', payload: false})
  };

  useEffect(()=>{
    onSnapshot(doc(db, 'games', gameId), (g)=>{
      setData(g)
    });
  },[]);

  if(game.isLoading){
    return <div className='d-flex' style={{minHeight: '100vh'}}>
            <Loader height={'100vh'} className='mx-auto my-auto'/>
          </div>
  }

  if(!game.gamePresent){
    return(
      <NoGame text="No Game Found"/>
    )
  }

  if(game.errors.length !== 0){
    return(
      <NoGame text="Something Went Wrong"/>
    )
  }

  if(game.player === -1){
    return(
      <NoGame text="Try To Join Game Using Joining Link"/>
    )
  }

  return (
    <>
      <PlayersInfo
        gameId={gameId}
        gameInfo={game}
      />
      <Box
        gameId={gameId}
        gameInfo={game}
        gameDispatch={gameDispatch}
      />
    </>
  )
}

const mapStateToProps = (state)=>{
  return {
    userId: state.currentUser.id
  }
}
export default connect(mapStateToProps)(Game)
