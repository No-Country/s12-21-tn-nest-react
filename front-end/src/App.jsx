import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Header from "./components/Header";
import "./App.css";
import { MentoresPage } from "./MentoresPage/MentoresPage";
import MentorForm from "./components/MentorForm";
import StudentForm from "./components/StudentForm";
import Mentorship from "./components/Mentorship";
import MentorProfile from "./components/MentorProfile";
import StudentProfile from "./components/StudentProfile";
import UpdateMentorProfile from "./components/UpdateMentorProfile";
import UpdateStudentProfile from "./components/UpdateStudentProfile";
import Menu from "./components/Menu";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import SchedulerComponent from "./components/SchedulerComponent";

import MentorProfileTest from "./components/MentorProfileTest";

const navLinksArray = [
  { title: 'Home', path: '/', icon: <HomeIcon /> },
  { title: 'Mentores', path: '/mentores', icon: <GroupAddIcon /> },
  { title: 'Mentorias', path: '#mentorias', icon: <SchoolIcon /> },
  { title: 'Login', path: '/login', icon: <LoginIcon /> },
  { title: 'Register', path: '/signup', icon: <HowToRegIcon /> },
  { title: 'MentorProfile', path: '/mentorProfile/:id', icon: <HowToRegIcon /> },
  { title: 'StudentProfile', path: '/studentProfile/:id', icon: <HowToRegIcon /> },
  { title: 'Calendar', path: '/calendar', icon: <HowToRegIcon /> },
  { title: 'MentorProfileTest', path: '/mentorProfileTest/:id', icon: <HowToRegIcon /> },

]

function App() {
  return (
    <>
      <AuthProvider>
        <div id="App" className="AppContainer">
          <BrowserRouter>
            <div className="main_app">
              {/* <Header /> */}
              <Menu navLinksArray={navLinksArray} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mentores" element={<MentoresPage />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mentorForm" element={<MentorForm />} />
                <Route path="/mentorshipForm" element={<Mentorship />} />
                <Route path="/studentForm" element={<StudentForm />} />
                <Route path="/mentorProfile/:id" element={<MentorProfile />} />
                <Route path="/studentProfile/:id" element={<StudentProfile />} />
                <Route path="/updateMentorProfile/:id" element={<UpdateMentorProfile />} />
                <Route path="/updateStudentProfile/:id" element={<UpdateStudentProfile />} />
                <Route path="/calendar" element={<SchedulerComponent />} />
                <Route path="/mentorProfileTest/:id" element={<MentorProfileTest />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
