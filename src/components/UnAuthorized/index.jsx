import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

function UnAuthorized({ isLoggedIn, children }) {

  if(isLoggedIn){
    let pathToRedirect = '/home';
    const path = window.sessionStorage.getItem('redirect_back');
    if(path !== null && path.match(/^\/join\/game\/[A-Za-z0-9]/)){
      pathToRedirect = path;
      window.sessionStorage.removeItem('redirect_back');
    }
    return <Navigate to={pathToRedirect}/>
  }

  return children
}

const mapStateToProps = (state)=>{
  return {
    isLoggedIn: state.currentUser.isLoggedIn
  }
}

export default connect(mapStateToProps)(UnAuthorized)
