import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import GamePage from "../pages/GamePage";
import Result from "../pages/ResultPage";
import PrivateRoute from "../services/PrivateRoute";
const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/game" />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/profile/:id" element={<PrivateRoute element={ProfilePage} />} />
          <Route path="/game" element={<PrivateRoute element={GamePage} />} />
          <Route path="/result" element={<PrivateRoute element={Result} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
