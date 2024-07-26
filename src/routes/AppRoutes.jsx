import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import GamePage from "../pages/GamePage";
import Result from "../pages/ResultPage";
const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/result" element={<Result />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
