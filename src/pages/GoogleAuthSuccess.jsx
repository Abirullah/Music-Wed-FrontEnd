import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearSession, setSession } from "../utils/session";

const LOGIN_REDIRECT_DELAY_MS = 1200;

const parseUserFromQuery = (rawUser) => {
  try {
    if (!rawUser) return null;
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export default function GoogleAuthSuccess() {
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("Completing Google sign-in...");
  const navigate = useNavigate();

  useEffect(() => {
    const token = String(searchParams.get("token") || "").trim();
    const user = parseUserFromQuery(searchParams.get("user"));

    if (!token || !user) {
      clearSession();
      setStatusMessage("Google sign-in failed. Redirecting to login...");
      const timer = setTimeout(() => {
        navigate("/user/login", { replace: true });
      }, LOGIN_REDIRECT_DELAY_MS);
      return () => clearTimeout(timer);
    }

    setSession({ token, user });

    const normalizedRole = String(user.role || user.Role || "").toLowerCase();
    if (["owner", "admin"].includes(normalizedRole)) {
      sessionStorage.setItem("desktopMode", "true");
      navigate("/owner/dashboard", { replace: true });
      return undefined;
    }

    sessionStorage.removeItem("desktopMode");
    navigate("/", { replace: true });
    return undefined;
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <p className="text-base font-medium text-gray-700">{statusMessage}</p>
    </div>
  );
}
