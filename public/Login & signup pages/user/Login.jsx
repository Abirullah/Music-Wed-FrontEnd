import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button"
import bgImg from "../../../assets/Images/image 34.png";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../../../src/api/auth";
import { setSession } from "../../../src/utils/session";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser({ email, password });
      setSession({ token: response.token, user: response.user });

      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen  flex font-sans">
      <div
        className="hidden md:block md:w-1/2 lg:w-1/3 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 bg-black/10 "></div>

        <div className="relative z-10 text-white px-8 md:px-10 lg:px-16 py-10 md:py-12 lg:py-14 h-full flex flex-col">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">ECHOTUNE</h1>
            <p className="text-sm  mt-1 pl-2">Your Sound Your World</p>
          </div>

          <div className="flex-1 flex flex-col pt-15">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              Welcome to EchoTune
            </h2>
            <p className="text-lg md:text-xl  max-w-md leading-relaxed pr-12">
              Your one-stop destination to feel the Beat of live music
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-2/3 flex items-center p-4">
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
        <div className="w-full lg:w-[70%] bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 mx-auto mt-12">
          <h2 className="text-3xl font-bold  mb-8 ">Login</h2>

          <div className="flex w-full lg:w-[70%] rounded-lg p-1 mb-12 border-2 border-gray-500">
            <button
              type="button"
              onClick={() => navigate("/user/login")}
              className={`flex-1 py-3 rounded-md text-center  font-medium transition-all duration-200 bg-black text-white`}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => navigate("/owner/login")}
              className={`flex-1 py-3 rounded-md text-center font-medium transition-all duration-200 
                bg-white text-gray-700 `}
            >
              Owner
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 border-2 rounded-lg border-gray-300 focus:border-gray-600 focus:text-black placeholder-gray-500 h-12"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 border-2 rounded-lg border-gray-300 focus:border-gray-600 focus:text-black placeholder-gray-500 h-12"
              />
            </div>

            <div className="flex ">
              <div
                className="text-sm text-gray-500 hover:text-black font-medium cursor-pointer"
                onClick={() => navigate("/user/forgot-password")}
              >
                Forgot Password?
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12  bg-red-600/80  hover:bg-red-700/90 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              text={loading ? "Signing in..." : "Submit"}
            />
          </form>

          <button
            className="w-full h-12 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-gray-300 mt-6 flex items-center justify-center gap-3"
            onClick={() => console.log("Google login clicked")}
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">Or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          <div className="">
            <p className="text-gray-400 mb-4">
              Not a member?{" "}
              <span
                onClick={() => navigate("/user/signup")}
                className="text-gray-600 hover:text-gray-800  cursor-pointer"
              >
                Sign up
              </span>
            </p>

            <button
              onClick={() => navigate("/user/signup")}
              className="w-full h-12 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-gray-300 mt-6 flex items-center justify-center gap-3"
            >
              Create Your Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
