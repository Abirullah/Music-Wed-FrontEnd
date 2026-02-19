import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import bgImg from "../../../assets/Images/image 34.png";
import { resendOtp, verifyOtp } from "../../../src/api/auth";
import { setSession } from "../../../src/utils/session";

const OTP_FLOW_KEY = "otpFlow";
const EMPTY_CODE = ["", "", "", ""];

const readStoredFlow = () => {
  try {
    return JSON.parse(sessionStorage.getItem(OTP_FLOW_KEY) || "null");
  } catch {
    return null;
  }
};

export default function UserVerify() {
  const [code, setCode] = useState(EMPTY_CODE);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const flow = useMemo(() => {
    const stateFlow = location.state || {};
    if (stateFlow?.email && stateFlow?.purpose) {
      return {
        email: String(stateFlow.email).toLowerCase(),
        purpose: String(stateFlow.purpose),
        role: "user",
      };
    }
    return readStoredFlow();
  }, [location.state]);

  useEffect(() => {
    const stateFlow = location.state || {};
    if (stateFlow?.email && stateFlow?.purpose) {
      sessionStorage.setItem(
        OTP_FLOW_KEY,
        JSON.stringify({
          email: String(stateFlow.email).toLowerCase(),
          purpose: String(stateFlow.purpose),
          role: "user",
        }),
      );
    }
  }, [location.state]);

  useEffect(() => {
    if (!flow?.email || !flow?.purpose || flow.role !== "user") {
      navigate("/user/login", { replace: true });
    }
  }, [flow, navigate]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const nextCode = [...code];
    nextCode[index] = value;
    setCode(nextCode);
    setError("");
    setStatus("");

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    const finalCode = code.join("");

    if (finalCode.length !== 4) {
      setError("Please enter the 4-digit verification code");
      return;
    }

    if (!flow?.email || !flow?.purpose) {
      setError("Verification session expired. Please try again.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setStatus("");

      const response = await verifyOtp({
        email: flow.email,
        otp: finalCode,
        purpose: flow.purpose,
      });

      if (flow.purpose === "signup") {
        if (response?.token && response?.user) {
          setSession({ token: response.token, user: response.user });
        }
        sessionStorage.removeItem(OTP_FLOW_KEY);
        navigate("/", { replace: true });
        return;
      }

      sessionStorage.setItem(
        OTP_FLOW_KEY,
        JSON.stringify({
          email: flow.email,
          purpose: "password_reset",
          role: "user",
          otp: finalCode,
          verified: true,
        }),
      );
      navigate("/user/new-password", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!flow?.email || !flow?.purpose) return;

    try {
      setResending(true);
      setError("");
      setStatus("");
      await resendOtp({ email: flow.email, purpose: flow.purpose });
      setCode(EMPTY_CODE);
      setStatus("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* LEFT IMAGE SECTION */}
      <div
        className="hidden md:block md:w-1/2 lg:w-1/3 bg-cover bg-center relative"
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
          {/* Heading + Info */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl font-bold hidden md:block">Verify</h2>
            <p className="text-xl font-bold mb-10 md:mb-1">Please Check Your Email</p>
            <p className="text-gray-700">
              We have sent a code to{" "}
              <span className="font-semibold text-black">{flow?.email || "your email"}</span>
            </p>
          </div>

          {/* OTP Inputs */}
          <form onSubmit={handleVerify} className="mt-10 sm:mt-8 space-y-4">
            <div className="flex gap-4 justify-center md:justify-start">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleChange(event.target.value, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:outline-none"
                />
              ))}
            </div>

            {error ? (
              <p className="text-sm font-medium text-red-600">{error}</p>
            ) : null}
            {status ? (
              <p className="text-sm font-medium text-green-600">{status}</p>
            ) : null}

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-gray-700 text-sm font-semibold hover:text-black disabled:opacity-60"
            >
              {resending ? "Sending new code..." : "Send code again"}
            </button>

            {/* Button */}
            <Button
              type="submit"
              className="w-full h-12 mt-5 sm:mt-4 bg-red-600/80 hover:bg-red-700/90 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              text={loading ? "Verifying..." : "Submit"}
            />
          </form>

          {/* Bottom Text */}
          <p className="mt-12 sm:mt-8 text-center text-gray-500">
            Remember Password?{" "}
            <span
              className="font-bold cursor-pointer text-gray-700 hover:text-black"
              onClick={() => navigate("/user/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
