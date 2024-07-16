import {Routes, Route} from "react-router-dom";
import './App.css';
import LandingPage from "./pages/landingPage";
import PostPartnership from "./pages/businessForm";
function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/partnership" element={<PostPartnership />} />
    </Routes>
  )
}

export default App
