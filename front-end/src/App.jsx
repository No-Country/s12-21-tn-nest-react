import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Profile from "./components/Profile";


function App() {
  return (
    <>
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
              <Route path="/mentor/:id" element={<Profile />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
