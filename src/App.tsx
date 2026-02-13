import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage/Landing";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Dashboard from "./pages/DashboardPage/Dashboard";
import PortfolioList from "./pages/PortfolioListPage/PortfolioList";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<PortfolioList />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
