import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase'

function useJoin(userId, gameId) {

  const [loadingInfo, setLoadingInfo] = useState('Please Wait, We Are Fetching Game Info...');
  const [gamePresent, setGamePresent] = useState(true);

  const joiningProcess = async ()=>{
    const game = await getDoc(doc(db, 'games', gameId))
    if(game.exists()) {
      setLoadingInfo("Game Found, We Are Processing Your Request...")
      const gm = game.data();
      if(gm.playerTwoId === null && gm.playerOneId !== userId && !gm.playWithAi){
        try {
          await updateDoc(doc(db, 'games', game.id), {
            playerTwoId: userId,
            state: 'INPROGRESS'
          })
          setLoadingInfo(null)
        } catch (error) {
          setLoadingInfo("Something Went Wrong, While Processing Your Request")
          setGamePresent(false)
        }
      }else{
        if(gm.playerOneId === userId || gm.playerTwoId === userId){
          setLoadingInfo(null)
        }else{
          setLoadingInfo("Game Is Full!")
          setGamePresent(false)
        }
      }
    }else{
      setLoadingInfo("No game found!")
      setGamePresent(false)
    }
  }

  useEffect(()=>{
    joiningProcess();
  },[])

  return [gamePresent, loadingInfo]
}

export default useJoin
