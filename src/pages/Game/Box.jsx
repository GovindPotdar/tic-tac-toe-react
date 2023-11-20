import useBox from './hooks/useBox'
import style from './style.module.css'
import Loader from '../../components/Loader'
import circleSvg from '../../assets/images/svgs/circle.svg'
import crossSvg from '../../assets/images/svgs/cross.svg'
import Winner from './Winner'
import { BOX_PARTS } from './hooks/useBox'

function Box({gameId, gameInfo: { boxId, state, player, turn, winner, playerOne, playerTwo, isPlayWithAi}, gameDispatch}) {

  const [playerOneArr, playerTwoArr, isLoadingBox, handleClick] = useBox(gameId, boxId, state, player, turn, isPlayWithAi, gameDispatch)
  
  const setSvg = (num) => {
    if(playerOneArr.includes(num)) return crossSvg;
    if(playerTwoArr.includes(num)) return circleSvg;
  }

  if(isLoadingBox){
    return <div className='d-flex' style={{minHeight: '60vh'}}>
            <Loader height={'100vh'} className='mx-auto my-auto'/>
          </div>
  }

  return (
    <div className='mt-5'>
      <Winner
        state={state}
        winner={winner}
        playerOne={playerOne}
        playerTwo={playerTwo}
        isPlayWithAi={isPlayWithAi}
      />
      <div className={`${style['grid']} mx-auto`}>
        {
          BOX_PARTS.map((part) => {
            return <div className={style['space']} key={part} onClick={()=>(handleClick(part))}>
              {
                setSvg(part) && <img src={setSvg(part)} height='100%' width='100%'/>
              }
            </div>
          })
        }
      </div> 
    </div>
  )
}

export default Box
