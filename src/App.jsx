import './App.css';
import './assets/stylesheets/style.css'
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import AppRoute from './routes/AppRoute';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { connect } from 'react-redux';
import { setUser, unSetUser } from './store/actions/currentUser';
import { ToastContainer } from 'react-toastify';

function App({ dispath }) {
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        const { uid, email, displayName, photoURL } = user
        dispath(setUser({ uid, email, displayName, photoURL }))
      }else{
        dispath(unSetUser())
      }
      setIsLoading(false)
    })
  }, [])

  if(isLoading){
    return(
      <div className='d-flex' style={{minHeight: '100vh'}}>
        <Loader height={'100vh'} className='mx-auto my-auto'/>
      </div>
    )
  }

  return (
    <>
      <AppRoute/>
      <ToastContainer />
    </>
  )
}

function mapDispatchToProps(dispath){
  return { dispath }
}

export default connect(null, mapDispatchToProps)(App)
