import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import ToastContainer from "./components/ToastContainer";
import LandingPage from "./pages/LandingPage/Landing";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Dashboard from "./pages/DashboardPage/Dashboard";
import PortfolioList from "./pages/PortfolioListPage/PortfolioList";
import UserPortfolio from "./pages/UserPortfolioPage/UserPortfolio";
import EditPortfolio from "./pages/EditPortfolioPage/EditPortfolio";

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <ToastProvider>
          <AuthProvider>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/edit" element={<EditPortfolio />} />
              <Route path="/explore" element={<PortfolioList />} />
              <Route path="/portfolio/:username" element={<UserPortfolio />} />
            </Routes>
          </AuthProvider>
        </ToastProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;
