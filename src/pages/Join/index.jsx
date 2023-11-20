import { connect } from "react-redux";
import useJoin from "./hooks/useJoin";
import NoGame from '../Game/NoGame';
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom"

function Join({ userId }) {
  const { gameId } = useParams();
  const [gamePresent, loadingInfo] = useJoin(userId, gameId);

  if(!gamePresent){
    return(<>
      <NoGame
        text={loadingInfo}
      />
    </>)
  }

  if(loadingInfo){
    return(
      <div className='d-flex' style={{minHeight: '100vh'}}>
        <div height={'100vh'} className='mx-auto my-auto'>
          <h3 className="fw-bold text-light text-center">{loadingInfo}</h3>
        </div>
      </div>
    )
  }

  return (
    <Navigate to={`/game/${gameId}/wi/fri`} />
  )
}

const mapStateToProps = (state)=>{
  return {
    userId: state.currentUser.id
  }
}

export default connect(mapStateToProps)(Join);
