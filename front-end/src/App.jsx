import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Home/Home"
import SignUp from "./SignUp/SignUp"
import Login from "./Login/Login"
import './App.css'

function App() {

  return (
    <>
      <div id="App" className="AppContainer">
        <BrowserRouter>
        <div className="main_app">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
          </div>
        </BrowserRouter>
     </div>
    </>
  )
}

export default App
