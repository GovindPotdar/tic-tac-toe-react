import trophyPng from '../../assets/images/trophy.png'

function Winner({ state, winner, playerOne, playerTwo, isPlayWithAi}) {

  if(state !== 'ENDED'){
    return <></>;
  }

  const checkWinner = () => {
    if(winner === 0){
      return `${playerOne.displayName} Won!`
    }else if(winner === 1){
      return `${isPlayWithAi ? "AI" : playerTwo.displayName} Won!`
    }else{
      return "Tie!"
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='d-flex justify-content-between bg-danger rounded p-2' style={{width: 'fit-content', minWidth: '40vh'}}>
        <img src={trophyPng} alt="" height={50}/>
        <h4 className="text-light text-center pt-2">{checkWinner()}</h4>
        <img src={trophyPng} alt="" height={50}/>
      </div>
    </div>
  )
}

export default Winner
