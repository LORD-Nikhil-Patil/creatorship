import { Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./pages/authProvider";
import './App.css';
import LandingPage from "./pages/landingPage";
import PostPartnership from "./pages/businessForm";
import Register from "./pages/register";
import Profile from "./pages/userProfile";
import Login from "./pages/login";

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/partnership" element={<PostPartnership />} />
        <Route path="/register" element={<Register proposal={""} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
