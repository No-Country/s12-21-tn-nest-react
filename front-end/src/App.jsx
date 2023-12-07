import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Header from "./components/Header";
import MentorForm from "./components/MentorForm";
import StudentForm from "./components/StudentForm";
import StepperForm from "./components/StepperForm";
import Category from "./components/Category";
import "./App.css";
import { MentoresPage } from "./MentoresPage/MentoresPage";

function App() {
  return (
    <>
      <AuthProvider>
        <div id="App" className="AppContainer">
          <BrowserRouter>
            <div className="main_app">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Mentores" element={<MentoresPage />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/stepperForm" element={<StepperForm />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
