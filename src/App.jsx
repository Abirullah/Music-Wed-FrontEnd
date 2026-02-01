import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../public/Other All Pages/HomePage";
import Purchases from "../public/Other All Pages/UserProfilePages/UserProfileDetails";
import MusicMainPage from "../public/Other All Pages/MusicDetails/MusicMainPage";

import UserLogin from "../public/Login & signup pages/user/Login";
import UserSignup from "../public/Login & signup pages/user/Signup";
import UserForgotPassword from "../public/Login & signup pages/user/ForgotPassword";
import UserVerify from "../public/Login & signup pages/user/Verify";
import UserNewPassword from "../public/Login & signup pages/user/NewPassword";
import UserSuccess from "../public/Login & signup pages/user/Success";

import Owner from "../public/Other All Pages/OwnerPages/Owner";
import OwnerLogin from "../public/Login & signup pages/owner/Login";
import OwnerSignup from "../public/Login & signup pages/owner/Signup";
import OwnerForgotPassword from "../public/Login & signup pages/owner/ForgotPassword";
import OwnerVerify from "../public/Login & signup pages/owner/Verify";
import OwnerNewPassword from "../public/Login & signup pages/owner/NewPassword";
import OwnerSuccess from "../public/Login & signup pages/owner/Success";


function App() {
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    if (!localStorage.getItem("owners")) {
      localStorage.setItem("owners", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Profile" element={<Purchases />} />
        <Route path="/Music" element={<MusicMainPage />} />

        {/* User Auth Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/forgot-password" element={<UserForgotPassword />} />
        <Route path="/user/verify" element={<UserVerify />} />
        <Route path="/user/new-password" element={<UserNewPassword />} />
        <Route path="/user/success" element={<UserSuccess />} />

        {/* Owner Routes */}
        <Route path="/owner/dashboard" element={<Owner />} />
        <Route path="/owner/statement" element={<Owner />} />
        <Route path="/owner/upload" element={<Owner />} />
        <Route path="/owner/piracy" element={<Owner />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/signup" element={<OwnerSignup />} />
        <Route
          path="/owner/forgot-password"
          element={<OwnerForgotPassword />}
        />
        <Route path="/owner/verify" element={<OwnerVerify />} />
        <Route path="/owner/new-password" element={<OwnerNewPassword />} />
        <Route path="/owner/success" element={<OwnerSuccess />} />



          {/* owner subroutes */}
          <Route path = "/owner/dashboard/uploadSongs" element = {<Owner/>}/>
          <Route path = "/owner/dashboard/uploadContant" element = {<Owner/>}/>
      </Routes>

    

    </>
  );
}

export default App;
