import {Routes, Route} from "react-router-dom";
import './App.css';
import LandingPage from "./pages/landingPage";
import PostPartnership from "./pages/businessForm";
import Register from "./pages/register";
import Profile from "./pages/userProfile";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/partnership" element={<PostPartnership />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
