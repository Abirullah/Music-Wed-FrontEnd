import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import bgImg from "../../../assets/Images/image 34.png";

export default function UserForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setTimeout(() => {
      navigate("/owner/verify");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex font-sans">
      <div
        className="hidden md:block md:w-1/2 lg:w-1/3 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 text-white px-8 md:px-10 lg:px-16 py-10 md:py-12 lg:py-14 h-full flex flex-col">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">ECHOTUNE</h1>
            <p className="text-sm mt-1 pl-2">Your Sound Your World</p>
          </div>

          <div className="flex-1 flex flex-col pt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              Welcome to EchoTune
            </h2>
            <p className="text-lg md:text-xl max-w-md leading-relaxed pr-12">
              Your one-stop destination to feel the Beat of live music
            </p>
          </div>
        </div>
      </div>
<div className="w-full md:w-1/2 lg:w-2/3 flex items-center p-4">
 <div className="md:hidden fixed top-4 left-3 z-50 mb-7">
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-1 text-gray-800 hover:text-black 
               font-medium text-sm transition-colors"
  >
    <span className="text-xl font-bold">‹</span> 
    <span>Back</span>
  </button>
</div>
  <div className="w-full lg:w-[70%] bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mx-auto flex flex-col space-y-10 sm:space-y-0 mt-16 sm:mt-20">

    {/* Heading + Text */}
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-3xl font-bold">Forgot Password</h2>
      <p className="text-gray-500">
        Don’t worry! It happens. Please enter the email associated with your
        account.
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="mt-10 sm:mt-8 space-y-6">
      <div>
        <label className="block font-bold mb-2">Email Address</label>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="w-full px-4 py-3 border-2 rounded-lg border-gray-300 focus:border-gray-600 placeholder-gray-500 h-12"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}

      <Button
        type="submit"
        className="w-full h-12 bg-red-600/80 hover:bg-red-700/90 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        text="Submit"
      />

      {/* Bottom Text */}
      <p className="mt-10 sm:mt-8 text-center text-gray-500">
        Remember Password?{" "}
        <span
          className="font-bold text-gray-700 hover:text-black cursor-pointer"
          onClick={() => navigate("/owner/login")}
        >
          Login
        </span>
      </p>
    </form>
  </div>
</div>

    </div>
  );
}
