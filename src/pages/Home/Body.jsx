import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { connect } from 'react-redux';
import { useState } from 'react';

function Body({ userId }) {

  const navigate = useNavigate();
  const [isPlayWithFriend, setIsPlayWithFriend] = useState(false);
  const [isPlayWithAi, setIsPlayWithAi] = useState(false);


  async function playWithFriend(){
    setIsPlayWithFriend(true)
    try {
      const gameRef = await addDoc(collection(db, 'games'), {
        playerOneId: userId,
        playerTwoId: null,
        winner: null,
        playWithAi: false,
        state: 'CREATED'
      });
      addDoc(collection(db, "boxes"),{
        gameId: gameRef.id,
        turn: 0,
        playerOne: [],
        playerTwo: []
      })
      navigate(`/game/${gameRef.id}/wi/fri`)
    } catch (error) {
      console.log(error.message)
    }
    setIsPlayWithFriend(false)
  }

  async function playWithAi(){
    setIsPlayWithAi(true)
    try {
      const gameRef = await addDoc(collection(db, 'games'), {
        playerOneId: userId,
        playerTwoId: null,
        winner: null,
        playWithAi: true,
        state: 'INPROGRESS'
      });
      addDoc(collection(db, "boxes"),{
        gameId: gameRef.id,
        turn: 0,
        playerOne: [],
        playerTwo: []
      })
      navigate(`/game/${gameRef.id}/wi/fri`)
    } catch (error) {
      console.log(error.message)
    }
    setIsPlayWithAi(false)
  }

  return (
    <div className='custom-container container mt-5 p-3 border-0 rounded'>
      <Button
        text={isPlayWithFriend ? "Creating Game..." : "Play With Friend"}
        className="mt-3 mb-3 mx-auto"
        handleClick={playWithFriend}
        isDisabled={isPlayWithFriend || isPlayWithAi}
      />
      <Button
        text={isPlayWithAi ? "Creating Game..." : "Play With AI"}
        className="mt-3 mb-3 mx-auto"
        handleClick={playWithAi}
        isDisabled={isPlayWithFriend || isPlayWithAi}
      />
    </div>
  )
}

function mapStateToProps(state){
  return {
    userId: state.currentUser.id
  }
}

export default connect(mapStateToProps)(Body)
