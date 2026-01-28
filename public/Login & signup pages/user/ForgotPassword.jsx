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
      navigate("/user/verify");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex font-sans">
      <div
        className="hidden lg:block w-1/3 bg-cover bg-center relative"
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

      <div className="w-full lg:w-2/3 flex p-4 flex-col justify-between">
        <div className="w-[60%] h-[60%] bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 flex flex-col justify-around">
          <h2 className="text-3xl font-bold mb-4">Forget Password</h2>

          <p className="text-gray-500 mb-8">
            Don’t worry! It happens. Please enter the email associated with your
            account.
          </p>

          <p className="font-bold  mb-8">Email Address</p>

          <form onSubmit={handleSubmit} className="space-y-15">
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

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-red-600/80 hover:bg-red-700/90 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              text="Submit"
              onClick={() => (!error ? navigate("/user/verify") : "")}
            />
          </form>
        </div>
        <p className="pb-12 text-center w-[60%]">
          Remember Password?
          <span className="font-bold cursor-pointer" onClick={() => navigate("/user/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
