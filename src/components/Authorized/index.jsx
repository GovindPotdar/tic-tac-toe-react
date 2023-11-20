import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import warningNotifier from '../../notifier/warning';

function Authorized({ isLoggedIn, children }) {

  if(!isLoggedIn){
    const path = window.location.pathname;
    if(path.match(/^\/join\/game\/[A-Za-z0-9]/)) window.sessionStorage.setItem('redirect_back', path);
    warningNotifier({message: "Log In To Access!"})
    return <Navigate to='/'/>
  }

  return children
}

const mapStateToProps = (state)=>{
  return {
    isLoggedIn: state.currentUser.isLoggedIn
  }
}

export default connect(mapStateToProps)(Authorized)
