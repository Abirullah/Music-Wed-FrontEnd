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
    navigate("/user/new-password");
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* LEFT IMAGE SECTION */}
      <div
        className="hidden lg:block w-1/3 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 text-white px-16 py-14 h-full flex flex-col">
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
      <div className="w-full lg:w-2/3 flex p-4 flex-col justify-between">
        <div className="w-[60%] h-[60%] bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 flex flex-col justify-around">
          <h2 className="text-3xl font-bold mb-4">Verify</h2>
          <p className=" text-xl mb-8">Please Check Your Email</p>
          <p className=" mb-8 text-gray-700">
            We have send a code to{" "}
            <span className="font-semibold text-black ">hell0@gmail.com</span>
          </p>
          <div className="flex gap-4 justify-start">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:outline-none"
              />
            ))}
          </div>

          <p className=" mb-8 text-gray-700 mt-3">
            Send code again{" "}
            <span className="font-semibold text-gray-800 ">00:20</span>
          </p>

          <Button
            type="submit"
            className="w-full h-12 bg-red-600/80 hover:bg-red-700/90 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            text="Submit"
            onClick={() => navigate("/owner/new-password")}
          />
        </div>
        <p className="pb-12 text-center w-[60%]">
          Remember Password?
          <span
            className="font-bold cursor-pointer"
            onClick={() => navigate("/owner/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

