export const CURRENT_USER_KEY = "currentUser";
export const AUTH_TOKEN_KEY = "authToken";
export const SESSION_EXPIRES_AT_KEY = "sessionExpiresAt";
const SESSION_DURATION_MS = 5 * 60 * 60 * 1000;

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value ?? "");
  } catch {
    return fallback;
  }
};

const getSessionStorage = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

const getLocalStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const getSessionValue = (key) => {
  const sessionStorageRef = getSessionStorage();
  const localStorageRef = getLocalStorage();

  const currentValue = sessionStorageRef?.getItem(key) ?? null;
  if (currentValue !== null) return currentValue;

  // Cleanup legacy auth data that was previously persisted.
  if (localStorageRef?.getItem(key) !== null) {
    localStorageRef.removeItem(key);
  }

  return null;
};

const setSessionValue = (key, value) => {
  const sessionStorageRef = getSessionStorage();
  const localStorageRef = getLocalStorage();
  sessionStorageRef?.setItem(key, value);
  localStorageRef?.removeItem(key);
};

const removeSessionValue = (key) => {
  getSessionStorage()?.removeItem(key);
  getLocalStorage()?.removeItem(key);
};

const decodeTokenExpiration = (token = "") => {
  try {
    const [, payloadPart] = String(token).split(".");
    if (!payloadPart) return null;

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4 || 4)) % 4);
    const payload = safeJsonParse(atob(`${base64}${padding}`), null);
    const expiresAtMs = Number(payload?.exp || 0) * 1000;
    return Number.isFinite(expiresAtMs) && expiresAtMs > 0 ? expiresAtMs : null;
  } catch {
    return null;
  }
};

const hasSessionExpired = () => {
  const expiresAtRaw = getSessionValue(SESSION_EXPIRES_AT_KEY);
  const expiresAt = Number(expiresAtRaw || 0);
  return !Number.isFinite(expiresAt) || expiresAt <= Date.now();
};

const ensureActiveSession = () => {
  const token = getSessionValue(AUTH_TOKEN_KEY);
  const user = getSessionValue(CURRENT_USER_KEY);

  if (!token || !user || hasSessionExpired()) {
    removeSessionValue(AUTH_TOKEN_KEY);
    removeSessionValue(CURRENT_USER_KEY);
    removeSessionValue(SESSION_EXPIRES_AT_KEY);
    getSessionStorage()?.removeItem("desktopMode");
    getLocalStorage()?.removeItem("desktopMode");
    return false;
  }

  return true;
};

export const getCurrentUser = () => {
  if (!ensureActiveSession()) return null;

  const user = safeJsonParse(getSessionValue(CURRENT_USER_KEY), null);
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
  if (!ensureActiveSession()) return "";
  return getSessionValue(AUTH_TOKEN_KEY) || "";
};

export const setSession = ({ token, user }) => {
  if (token) {
    setSessionValue(AUTH_TOKEN_KEY, token);
    const tokenExpiry = decodeTokenExpiration(token);
    const expiresAt = tokenExpiry && tokenExpiry > Date.now()
      ? tokenExpiry
      : Date.now() + SESSION_DURATION_MS;
    setSessionValue(SESSION_EXPIRES_AT_KEY, String(expiresAt));
  }

  if (user) {
    const normalized = {
      ...user,
      id: String(user.id || user._id || ""),
      fullName: user.fullName || user.name || "",
      role: String(user.role || user.Role || "user").toLowerCase(),
      Role: String(user.role || user.Role || "user").toLowerCase(),
    };
    setSessionValue(CURRENT_USER_KEY, JSON.stringify(normalized));
  }
};

export const updateCurrentUser = (patch) => {
  const current = getCurrentUser();
  if (!current) return null;

  const next = {
    ...current,
    ...patch,
  };

  setSessionValue(CURRENT_USER_KEY, JSON.stringify(next));
  return next;
};

export const clearSession = () => {
  removeSessionValue(AUTH_TOKEN_KEY);
  removeSessionValue(CURRENT_USER_KEY);
  removeSessionValue(SESSION_EXPIRES_AT_KEY);
  getSessionStorage()?.removeItem("desktopMode");
  getLocalStorage()?.removeItem("desktopMode");
};

export const isAuthenticated = () => {
  return Boolean(getCurrentUser() && getAuthToken());
};
