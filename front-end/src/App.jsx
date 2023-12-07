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
import Profile from "./components/Profile";
import UpdateMentorProfile from "./components/UpdateMentorProfile";

import Menu from "./components/Menu";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
const navLinksArray = [
  { title: 'Home', path: '/', icon: <HomeIcon /> },
  { title: 'Mentores', path: '/mentores', icon: <GroupAddIcon /> },
  { title: 'Mentorias', path: '#mentorias', icon: <SchoolIcon /> },
  { title: 'Login', path: '/login', icon: <LoginIcon /> },
  { title: 'Register', path: '/signup', icon: <HowToRegIcon /> }
]

function App() {
  return (
    <>
      <AuthProvider>
        <div id="App" className="AppContainer">
          <BrowserRouter>
            <div className="main_app">
              {/* <Header /> */}
              <Menu navLinksArray={navLinksArray}/>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Mentores" element={<MentoresPage />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mentorForm" element={<MentorForm />} />
              <Route path="/mentorshipForm" element={<Mentorship />} />
              <Route path="/studentForm" element={<StudentForm />} />
              <Route path="/mentorProfile/:id" element={<Profile />} />
              <Route path="/updateProfile/:id" element={<UpdateMentorProfile />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
