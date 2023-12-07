import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Header from "./components/Header";
import StepperForm  from "./components/StepperForm";
import "./App.css";
import { MentoresPage } from "./MentoresPage/MentoresPage";
import MentorForm from "./components/MentorForm";
import StudentForm from "./components/StudentForm";
import Mentorship from "./components/Mentorship";


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
              <Route path="/mentorForm" element={<MentorForm />} />
              <Route path="/mentorshipForm" element={<Mentorship />} />
              <Route path="/studentForm" element={<StudentForm />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
