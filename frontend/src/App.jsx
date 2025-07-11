import { Route, Routes } from "react-router-dom"

import UserLogin from "./pages/UserLogin"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignUp from "./pages/CaptainSignUp"
import UserSignUp from "./pages/UserSignUp"
import Start from "./pages/Start"
import Home from "./pages/Home"
import UserProtectedWrapper from "./pages/UserProtectedWrapper"
import UserLogout from "./pages/UserLogout"
import CaptainHome from "./pages/CaptainHome"
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper"
import CaptainLogout from "./pages/CaptainLogout"
import Riding from "./pages/Riding"

const App = () => {
  return (
    <div>
      <Routes>
       <Route path="/" element={<Start/>}/>
       <Route path="/login" element={<UserLogin/>}/>
       <Route path="/signup" element={<UserSignUp/>}/>
        <Route path="/riding" element={<Riding/>}/>
       <Route path="/captain-login" element={<CaptainLogin/>}/>
       <Route path="/captain-signup" element={<CaptainSignUp/>}/>
       <Route path="/home" element={<UserProtectedWrapper><Home/></UserProtectedWrapper>}/>

       <Route path="/users/logout" element={<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>}/>
      
        <Route path="/captain-home" element={<CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>}/>
        <Route path="/captain/logout" element={<CaptainProtectedWrapper><CaptainLogout/></CaptainProtectedWrapper>}/>
      </Routes>
    </div>
  )
}

export default App