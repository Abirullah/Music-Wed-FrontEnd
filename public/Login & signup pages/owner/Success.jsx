import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import bgImg from "../../../assets/Images/image 34.png";
import {SuccessIcon} from  "../../../assets/Icons/IconExporter"

export default function UserSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Image Panel */}
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
              Welcome to EchoTune
            </h2>
            <p className="text-lg md:text-xl max-w-md leading-relaxed pr-12">
              Your one-stop destination to feel the Beat of live music
            </p>
          </div>
        </div>
      </div>

      {/* Right Card Panel */}
      <div className="w-full md:w-1/2 lg:w-2/3 flex items-center p-4">
        <div className="w-full lg:w-[70%] bg-white/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center ">
          {/* Success Icon */}
          <div className=" flex justify-center">
            <img src={SuccessIcon} alt="" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Password Changed
          </h1>
          <p className="text-gray-600 text-md mb-8 text-center">
            Your password has been changed successfully
          </p>

          {/* Action Buttons */}
          <div className="space-y-3 w-full">
            <Button
              text="Go to Login"
              onClick={() => navigate("/owner/login")}
              className="w-full h-12 bg-red-600/80 hover:bg-red-700/90 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
