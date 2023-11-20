import ShareOnWhatsApp from '../../components/ShareOnWhatsApp'
import AIPng from '../../assets/images/ai.png'

function Player({ gameId, player, turn, state, pl, winner, isPlayWithAi}) {

  if(player === null && pl === 1 && !isPlayWithAi) {
    return(
      <div className="p-2">
        <div className='d-flex justify-content-center'>
          <ShareOnWhatsApp
            link={`join/game/${gameId}`}
          />
        </div>
      </div>
    )
  }

  const isWinner = (pl === winner);

  const playerName = (pl === 1 && isPlayWithAi && player === null) ? "AI" : player.displayName;

  const playerPhoto = (pl === 1 && isPlayWithAi && player === null) ? AIPng : player.photoUrl;


  if((state === 'INPROGRESS' && turn === pl)){
    return <div className="p-2 bg-danger rounded">
      <div className="d-flex flex-column">
        <div>
          <h6 className='text-light'> {playerName}'s Turn</h6>
        </div>
        <div className='d-flex justify-content-center'>
          <img loading="lazy" src={playerPhoto} height="90vh" className="rounded-circle" alt={playerName}/>
        </div>
      </div>
    </div>
  }


  return (
    <div className={`p-2 ${ isWinner && "bg-danger rounded"}`}>
      <div className='d-flex justify-content-center'>
        <img loading="lazy" src={playerPhoto} height="90vh" className="rounded-circle" alt={playerName}/>
      </div>
    </div>
  )
}

export default Player
