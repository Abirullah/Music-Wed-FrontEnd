import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Pages
import UserLogin from "./public/Login & signup pages/user/Login";
import UserSignup from "./public/Login & signup pages/user/Signup";
import UserForgotPassword from "./public/Login & signup pages/user/ForgotPassword";
import UserVerify from "./public/Login & signup pages/user/Verify";
import UserNewPassword from "./public/Login & signup pages/user/NewPassword";
import UserSuccess from "./public/Login & signup pages/user/Success";

// Owner Pages
import OwnerLogin from "./public/Login & signup pages/owner/Login";
import OwnerSignup from "./public/Login & signup pages/owner/Signup";
import OwnerForgotPassword from "./public/Login & signup pages/owner/ForgotPassword";
import OwnerVerify from "./public/Login & signup pages/owner/Verify";
import OwnerNewPassword from "./public/Login & signup pages/owner/NewPassword";
import OwnerSuccess from "./public/Login & signup pages/owner/Success";

export default function AuthRoutes() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/user/forgot-password" element={<UserForgotPassword />} />
      <Route path="/user/verify" element={<UserVerify />} />
      <Route path="/user/new-password" element={<UserNewPassword />} />
      <Route path="/user/success" element={<UserSuccess />} />

      {/* Owner Routes */}
      <Route path="/owner/login" element={<OwnerLogin />} />
      <Route path="/owner/signup" element={<OwnerSignup />} />
      <Route path="/owner/forgot-password" element={<OwnerForgotPassword />} />
      <Route path="/owner/verify" element={<OwnerVerify />} />
      <Route path="/owner/new-password" element={<OwnerNewPassword />} />
      <Route path="/owner/success" element={<OwnerSuccess />} />
    </Routes>
  );
}
