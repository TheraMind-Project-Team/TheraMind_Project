import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Hero from './pages/Hero/Hero';
import Footer from "./components/footer/Footer";
import Login from "./pages/SignLog/Login";
import Signup from "./pages/SignLog/Signup";
import DoctorAdditional from "./pages/SignLog/DoctorAdditional";
import PatientAdditional from "./pages/SignLog/PatientAdditional";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import Tests from "./pages/Tests/Tests";
import TestQuestion from "./pages/Tests/TestQuestion";
import TestResult from "./pages/Tests/TestResult";
import Book from "./pages/Book/Book";
import Confirmation from "./pages/Book/Confirmation";
import Chatbot from "./pages/Chatbot/Chatbot";
import Prescription from "./pages/Prescription/Prescription";
import Rating from "./pages/Rating/Rating";
import MeetingRobot from "./pages/MeetingRobot/MeetingRobot";
import DoctorRobotAvatar from "./pages/MeetingRobot/DoctorRobotAvatar";


function App() {
  return (
    
    <Router>
      <Navbar />   

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />                 
        <Route path="/Signup/Doctor" element={<DoctorAdditional />} /> 
        <Route path="/Signup/Patient" element={<PatientAdditional />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Tests" element={<Tests />} />
        <Route path="/tests/depression" element={<Tests testType="Depression" />} />
        <Route path="/tests/anxiety" element={<Tests testType="Anxiety" />} />
        <Route path="/tests/panic" element={<Tests testType="Panic" />} />
        <Route path="/tests/stress" element={<Tests testType="Stress" />} />
        <Route path="/tests/eating" element={<Tests testType="Eating" />} />
        <Route path="/Tests/Question" element={<TestQuestion />} />
        <Route path="/Tests/Result" element={<TestResult />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Book/Confirmation" element={<Confirmation />} />
        <Route path="/Chatbot" element={<Chatbot />} />
        <Route path="/Prescription" element={<Prescription />} />
        <Route path="/RatingSession" element={<Rating />} />
        <Route path="/MeetingRobot" element={<MeetingRobot />} />
        <Route path="/MeetingRobot/DoctorRobotAvatar" element={<DoctorRobotAvatar />} />
    </Routes>

      <Footer />
      </Router> 
      
  );
}

export default App;

