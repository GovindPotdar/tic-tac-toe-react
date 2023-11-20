import googleIcon from '../../assets/images/svgs/google.svg'
import { auth, db } from '../../config/firebase'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import Button from '../../components/Button';
import { useState } from 'react';
import Loader from '../../components/Loader';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import successNotifier from '../../notifier/success';

function Registration() {
  
  const [isLoading, setIsLoading] = useState(false);

  const login = async ()=>{
    setIsLoading(true)
    const provider = new GoogleAuthProvider();
    try{
      const result = await signInWithPopup(auth, provider)
      const { uid, email, displayName, photoURL } = result.user
      const user = await getDoc(doc(db, 'users', uid));
      if(!user.exists()){
        await setDoc(doc(db, 'users', uid),{
          displayName: displayName,
          email: email,
          photoUrl: photoURL
        })
      }
      successNotifier({message: "Successfully Log In!"})
    }catch(e){
      console.log(e)
    }
    setIsLoading(false)
  }

  if(isLoading){
    return <div className='d-flex' style={{minHeight: '100vh'}}>
            <Loader height={'100vh'} className='mx-auto my-auto'/>
          </div>
  }

  return (
      <div className="d-flex" style={{minHeight: '100vh'}}>
        <Button
          className="mx-auto my-auto"
          handleClick={login}
          icon={googleIcon}
          iconHeight="40"
          text="Continue With Google"
        />
      </div>
  )
}


export default Registration;
