import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import "./App.css";
import { MentoresPage } from "./MentoresPage/MentoresPage";
import { SuccesfullQualify } from "./Pages/SuccesfullQualify";
import MentorForm from "./components/MentorForm";
import StudentForm from "./components/StudentForm";
import Mentorship from "./components/Mentorship";
import StudentProfile from "./components/StudentProfile";
import UpdateMentorProfile from "./components/UpdateMentorProfile";
import UpdateStudentProfile from "./components/UpdateStudentProfile";
import Menu from "./components/Menu";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import MentorProfile from "./components/MentorProfile";
import ContactMentor from "./components/ContactMentor";
import MyMentorships from "./components/MyMentorships";
import StudentToMentor from "./components/StudentToMentor";
import MentorToStudent from "./components/MentorToStudent";
import Score from "./score/Score";
import { PayPalSuccessPage } from "./Pages/PayPalSuccessPage";

function App() {
  return (
    <>
      <AuthProvider>
        <div id="App" className="AppContainer">
          <BrowserRouter>
            <div className="main_app">
              {/* <Header /> */}
              <Menu/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mentores" element={<MentoresPage />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mentorForm" element={<MentorForm />} />
                <Route path="/mentorshipForm" element={<Mentorship />} />
                <Route path="/studentForm" element={<StudentForm />} />
                <Route path="/mentorProfile" element={<MentorProfile />} />
                <Route path="/contactMentor" element={<ContactMentor />} />
                <Route path="/success" element={<SuccesfullQualify />} />
                <Route
                  path="/payments/accepted"
                  element={<PayPalSuccessPage />}
                />
                <Route path="/myMentorships" element={<MyMentorships />} />
                <Route path="/studentToMentor" element={<StudentToMentor />} />
                <Route path="/mentorToStudent" element={<MentorToStudent />} />
                <Route
                  path="/studentProfile"
                  element={<StudentProfile />}
                />
                <Route
                  path="/updateMentorProfile"
                  element={<UpdateMentorProfile />}
                />
                <Route
                  path="/updateStudentProfile"
                  element={<UpdateStudentProfile />}
                />
                {<Route path="/score/:idScoreParams" element={<Score />} />}
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
