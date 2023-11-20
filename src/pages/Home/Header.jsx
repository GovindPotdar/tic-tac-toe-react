import LogOutButton from "./LogOutButton";
import { connect } from "react-redux";

function Header({ name, photoUrl}) {
  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap align-content-between justify-content-around">
        <div className=" border-bottom border-danger p-2 border-3">
          <div className="d-flex justify-content-start">
            <div><img src={photoUrl} className="rounded-circle" alt="profile image"/></div>
            <div className="align-self-center mx-2">
              <h2 className="fw-bold text-danger">Hello, <span className="text-primary">{name}</span></h2>
            </div>
          </div>
        </div>
        <div className="my-auto">
          <LogOutButton className="mt-1"/>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state){
  return {
    name: state.currentUser.name,
    photoUrl: state.currentUser.photoUrl
  }
}

export default connect(mapStateToProps)(Header)
