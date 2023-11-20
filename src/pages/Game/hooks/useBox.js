import { doc, onSnapshot, updateDoc, arrayUnion} from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../../config/firebase";
import { concat, difference, random, intersection} from "lodash";

const WINNER_POSSIBILITIE_SET = [
  [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]
]

export const BOX_PARTS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function useBox(gameId, boxId, state, player, turn, isPlayWithAi, gameDispatch) {

  const [isLoadingBox, setIsLoadingBox] = useState(true);
  const [playerOneArr, setPlayerOneArr] = useState([]);
  const [playerTwoArr, setPlayerTwoArr] = useState([]);
  const [submitting, setSubmitting]  = useState(false)

  const gameEnded = async (winner) => {
    await updateDoc(doc(db, 'games', gameId), {
      winner,
      state: 'ENDED'
    })
  }

  const checkResult = async (playerA, playerB)=>{
    if(playerA.length >= 3){
      for(let possibility of WINNER_POSSIBILITIE_SET){
        if(possibility.every((possi) => (playerA.includes(possi)))) {
          await gameEnded(0)
          return;
        }
      }
    }
    if(playerB.length >= 3){
      for(let possibility of WINNER_POSSIBILITIE_SET){
        if(possibility.every((possi) => (playerB.includes(possi)))) {
          await gameEnded(1)
          return;
        }
      }
    }
    if(playerA.length + playerB.length === 9) {
      await gameEnded(-1)
    }
  }
  
  useEffect(()=>{
    onSnapshot(doc(db, 'boxes', boxId), (box)=>{
      const boxData = box.data();
      gameDispatch({type: 'UPDATE_TURN', payload: boxData.turn});
      setPlayerOneArr(boxData.playerOne)
      setPlayerTwoArr(boxData.playerTwo)
      setIsLoadingBox(false)
    })
  }, [])

  useEffect(()=>{
    if(turn === 1 && isPlayWithAi && state === 'INPROGRESS' && !submitting){
      playByAI();
    }
  }, [submitting])


  const getPlayerOneWinningNum = (remaining, playerArr) => {
    for(let possibility of WINNER_POSSIBILITIE_SET) {
      const rem = difference(possibility, playerArr);
      if(rem.length === 1 && remaining.includes(rem[0])) return rem[0];
    }
    return null;
  };

  const calculateNumForAI = (remaining) => {
    let num = null;
    if(playerTwoArr.length === 0) {
      const ranNum = random(7);
      const startingArr = WINNER_POSSIBILITIE_SET[ranNum];
      if(startingArr.every((sta)=>(remaining.includes(sta)))){
        num = startingArr[0];
      }else{
        num = calculateNumForAI(remaining)
      }
    }else {
      for(let possibility of WINNER_POSSIBILITIE_SET) {
        const rem = difference(possibility, playerTwoArr);
        if(rem.length === 2 && rem.every((r)=>(remaining.includes(r)))){
          const commonNum = intersection(possibility, playerTwoArr)
          const commonNumIndex = possibility.indexOf(commonNum)
          if(commonNumIndex===0) num = rem[1];
          if(commonNumIndex===1) num = rem[0];
          if(commonNumIndex===2) num = rem[1];
          break;
        }
      }
    }
    return num;
  }

  const playByAI = () => {
    // debugger
    const choosen = concat(playerOneArr, playerTwoArr);
    const remaining = difference(BOX_PARTS, choosen);
    const playerOneWinningNum = getPlayerOneWinningNum(remaining, playerOneArr);
    const AIWinningNum = getPlayerOneWinningNum(remaining, playerTwoArr);
    // debugger
    if(AIWinningNum){
      handleClick(AIWinningNum, true);
      return;
    }
    if(playerOneWinningNum){
      handleClick(playerOneWinningNum, true);
      return;
    }
    const calulatedAIWinningNum = calculateNumForAI(remaining)
    // debugger
    if(calulatedAIWinningNum){
      handleClick(calulatedAIWinningNum, true);
      return;
    }
    const num = remaining[random(remaining.length-1)]
    if(num) handleClick(num, true);
  }

  const handleClick = async (num, clickedByAI = false)=>{
    if(state !== 'INPROGRESS') return;
    if(isPlayWithAi){
      if(turn === 1 && (turn !== player) && !clickedByAI) return;
    }else{
      if(turn !== player) return;
    }
    if(playerOneArr.includes(num) || playerTwoArr.includes(num)) return;
    if(submitting) return;
    setSubmitting(true)
    let updateParams = {};
    let playerOne = [...playerOneArr];
    let playerTwo = [...playerTwoArr];
    if(player === 0 && !clickedByAI){
      updateParams = {turn: 1, playerOne: arrayUnion(num)}
      playerOne.push(num);
    }else{
      updateParams = {turn: 0, playerTwo: arrayUnion(num)}
      playerTwo.push(num);
    }
    await updateDoc(doc(db, 'boxes', boxId), updateParams)
    await checkResult(playerOne, playerTwo)
    setSubmitting(false)
  }

  return [playerOneArr, playerTwoArr, isLoadingBox, handleClick]
}

export default useBox
