import Player from './Player';
import homeSvg from '../../assets/images/svgs/home.svg';
import { useNavigate } from 'react-router-dom';

function PlayersInfo({ gameInfo: { playerOne, playerTwo, turn, state, winner, isPlayWithAi}, gameId }) {

  const navigate = useNavigate();

  const goToHome = () => {
    if(state !== 'ENDED' && !window.confirm("You are between a game, do you want to leave ?")) return;
    navigate('/home');
  }

  return (
    <>
      <div className="d-flex justify-content-between custom-container container mt-1">
        <img src={homeSvg} alt="home" height="55vh" onClick={goToHome} type='button'/>
        <h2 className="fw-bold text-light p-2">Tic Tac Toe</h2>
      </div>
      <div className="container mt-3">
        <div className="d-flex justify-content-evenly">
          <Player
            gameId={gameId}
            player={playerOne}
            turn={turn}
            state={state}
            pl={0}
            winner={winner}
            isPlayWithAi={isPlayWithAi}
          />
          <div className="p-2 align-self-center">
            <h1>VS</h1>
          </div>
          <Player
            gameId={gameId}
            player={playerTwo}
            turn={turn}
            state={state}
            pl={1}
            winner={winner}
            isPlayWithAi={isPlayWithAi}
          />
        </div>
      </div>
    </>
  );
}

export default PlayersInfo;
