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
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import SchedulerComponent from "./components/SchedulerComponent";
import MentorProfileTest from "./components/MentorProfileTest";
<<<<<<< HEAD
import Score from "./score/Score";
=======
import ContactMentor from "./components/ContactMentor";

>>>>>>> a386ea09149a060800c1528d0782ad7511136535

const navLinksArray = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Mentores", path: "/mentores", icon: <GroupAddIcon /> },
  { title: "Mentorias", path: "#mentorias", icon: <SchoolIcon /> },
  { title: "Login", path: "/login", icon: <LoginIcon /> },
  { title: "Register", path: "/signup", icon: <HowToRegIcon /> },
  {
    title: "MentorProfile",
    path: "/mentorProfile/:id",
    icon: <HowToRegIcon />,
  },
  {
    title: "StudentProfile",
    path: "/studentProfile/:id",
    icon: <HowToRegIcon />,
  },
  { title: "Calendar", path: "/calendar", icon: <HowToRegIcon /> },
  {
    title: "MentorProfileTest",
    path: "/mentorProfileTest/:id",
    icon: <HowToRegIcon />,
  }, //test perfil mentor
];

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
                <Route
                  path="/studentProfile/:id"
                  element={<StudentProfile />}
                />
                <Route
                  path="/updateMentorProfile/:id"
                  element={<UpdateMentorProfile />}
                />
                <Route
                  path="/updateStudentProfile/:id"
                  element={<UpdateStudentProfile />}
                />
                <Route path="/calendar" element={<SchedulerComponent />} />
<<<<<<< HEAD
                <Route
                  path="/mentorProfileTest/:id"
                  element={<MentorProfileTest />}
                />{" "}
                //test perfil mentor
                {
                  //<Route path="/mentor/:id/score/:id" element={<Score />} />
                }
                <Route path="/score" element={<Score />} />
=======
                <Route path="/mentorProfileTest/:id" element={<MentorProfileTest />} />         //test perfil mentor
                <Route path="/contactMentor" element={<ContactMentor />} />
>>>>>>> a386ea09149a060800c1528d0782ad7511136535
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
