export const CURRENT_USER_KEY = "currentUser";
export const AUTH_TOKEN_KEY = "authToken";

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value ?? "");
  } catch {
    return fallback;
  }
};

export const getCurrentUser = () => {
  const user = safeJsonParse(localStorage.getItem(CURRENT_USER_KEY), null);
  if (!user) return null;

  const normalizedRole = String(user.role || user.Role || "user").toLowerCase();

  return {
    ...user,
    id: String(user.id || user._id || ""),
    fullName: user.fullName || user.name || "",
    role: normalizedRole,
    Role: normalizedRole,
  };
};

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY) || "";
};

export const setSession = ({ token, user }) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  if (user) {
    const normalized = {
      ...user,
      id: String(user.id || user._id || ""),
      fullName: user.fullName || user.name || "",
      role: String(user.role || user.Role || "user").toLowerCase(),
      Role: String(user.role || user.Role || "user").toLowerCase(),
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(normalized));
  }
};

export const updateCurrentUser = (patch) => {
  const current = getCurrentUser();
  if (!current) return null;

  const next = {
    ...current,
    ...patch,
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(next));
  return next;
};

export const clearSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem("desktopMode");
};

export const isAuthenticated = () => {
  return Boolean(getCurrentUser() && getAuthToken());
};
