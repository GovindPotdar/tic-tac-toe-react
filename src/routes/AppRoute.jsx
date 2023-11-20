import { Routes, Route } from "react-router-dom"
import Authorized from '../components/Authorized'
import UnAuthorized from '../components/UnAuthorized'
import Registration from "../pages/Registration"
import Home from "../pages/Home"
import Game from "../pages/Game"
import Join from "../pages/Join"


function AppRoute() {
  return (
    <Routes>
      <Route 
        index 
        element={
          <UnAuthorized>
            <Registration/>
          </UnAuthorized>
        }
      />
      <Route 
        path="/home"
        element={
          <Authorized>
            <Home/>
          </Authorized>
        }
      />
      <Route 
        path="/game/:gameId/wi/fri"
        element={
          <Authorized>
            <Game/>
          </Authorized>
        }
      />
      <Route 
        path="/join/game/:gameId"
        element={
          <Authorized>
            <Join/>
          </Authorized>
        }
      />
    </Routes>
  )
}

export default AppRoute
