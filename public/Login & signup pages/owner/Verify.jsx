import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import bgImg from "../../../assets/Images/image 34.png";

export default function UserVerify() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    const finalCode = code.join("");

    if (finalCode.length !== 4) {
      setError("Please enter the 4-digit verification code");
      return;
    }

    console.log("Verify Code:", finalCode);
    navigate("/owner/new-password");
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* LEFT IMAGE SECTION */}
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

          <div className="flex-1 flex flex-col pt-15">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              Verify Your Account
            </h2>
            <p className="text-lg md:text-xl max-w-md leading-relaxed pr-12">
              Enter the verification code sent to your email
            </p>
          </div>
        </div>
      </div>


      {/* RIGHT FORM SECTION */}
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

    {/* Heading */}
    <div className="space-y-3 sm:space-y-4">
      <h2 className="text-3xl font-bold hidden md:block">Verify</h2>
      <p className="text-xl font-bold mb-10 md:mb-1">Please Check Your Email</p>
      <p className="text-gray-700">
        We have sent a code to{" "}
        <span className="font-semibold text-black">hell0@gmail.com</span>
      </p>
    </div>

    {/* OTP + Resend */}
    <form onSubmit={handleVerify} className="mt-10 sm:mt-8 space-y-4">
   <div className="flex gap-4 justify-center md:justify-start">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:outline-none"
          />
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}

       <p className="text-gray-700 hidden md:block">
        Send code again{" "}
        <span className="font-semibold text-gray-800">00:20</span>
      </p>

      <Button
        type="submit"
        className="w-full h-12 mt-6 bg-red-600/80 hover:bg-red-700/90 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        text="Submit"
      />
    </form>

    <p className="text-gray-700 block md:hidden mx-auto">
        Send code again{" "}
        <span className="font-semibold text-gray-800">00:20</span>
      </p>

    {/* Bottom Text */}
    <p className="mt-12 sm:mt-8 text-center text-gray-500">
      Remember Password?{" "}
      <span
        className="font-bold cursor-pointer text-gray-700 hover:text-black"
        onClick={() => navigate("/owner/login")}
      >
        Login
      </span>
    </p>
  </div>
</div>

    </div>
  );
}

