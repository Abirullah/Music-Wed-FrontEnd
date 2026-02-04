import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import bgImg from "../../../assets/Images/image 34.png";
import { FcGoogle } from "react-icons/fc";

export default function UserSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
      confirmPassword: "",
    Role: "owner",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
      }

      const owners = JSON.parse(localStorage.getItem("owners")) || [];

        const userExists = owners.find((u) => u.email === formData.email);
        if (userExists) {
          setError("User already exists");
          return;
        }

        owners.push({
          id: Date.now(),
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          Role: formData.Role,
        });

        localStorage.setItem("owners", JSON.stringify(owners));

    console.log("Owner Signup:", formData);
    navigate("/owner/login");
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* LEFT IMAGE SECTION */}
      <div
        className="hidden md:block md:w-1/2 lg:w-1/3 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 text-white px-16 py-14 h-full flex flex-col">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">ECHOTUNE</h1>
            <p className="text-sm mt-1 pl-2">Your Sound Your World</p>
          </div>

          <div className="flex-1 flex flex-col pt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              Join EchoTune Today
            </h2>
            <p className="text-lg md:text-xl max-w-md leading-relaxed pr-12">
              Create your account and feel the beat of live music
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full lg:w-2/3 flex items-center p-4">
       <div className="md:hidden fixed top-4 left-3 z-50 mb-7">
  <button
    onClick={() => navigate("/")}
    className="flex items-center gap-1 text-gray-800 hover:text-black 
               font-medium text-sm transition-colors"
  >
    <span className="text-xl font-bold">‹</span> 
    <span>Back</span>
  </button>
</div>
        <div className="w-full lg:w-[70%] bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 mt-12 md:p-12 mx-auto">
          <h2 className="text-3xl font-bold mb-8">Create Account</h2>

          <div className="flex w-full lg:w-[70%] rounded-lg p-1 mb-12 border-2 border-gray-500">
            <button
              type="button"
              onClick={() => navigate("/user/signup")}
              className={`flex-1 py-3 rounded-md text-center  font-medium transition-all duration-200  text-gray-700 bg-white`}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => navigate("/owner/signup")}
              className={`flex-1 py-3 rounded-md text-center font-medium transition-all duration-200 
                bg-black text-white `}
            >
              Owner
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg border-gray-300 focus:border-gray-600 placeholder-gray-500 h-12"
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg border-gray-300 focus:border-gray-600 placeholder-gray-500 h-12"
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg border-gray-300 focus:border-gray-600 placeholder-gray-500 h-12"
            />

            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg border-gray-300 focus:border-gray-600 placeholder-gray-500 h-12"
            />

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-red-600/80 hover:bg-red-700/90 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              text="Create Account"
            />
          </form>

          {/* GOOGLE SIGNUP */}
          <button className="w-full h-12 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-lg transition-all duration-200 border border-gray-300 mt-6 flex items-center justify-center gap-3">
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">Or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* LOGIN LINK */}
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/owner/login")}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Login
            </span>
          </p>
          <button
            onClick={() => navigate("/owner/login")}
            className="w-full h-12 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-gray-300 mt-6 flex items-center justify-center gap-3"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
