import { clearSession, getAuthToken, getCurrentUser } from "../utils/session";

const DEFAULT_BASE_URL = "http://localhost:3000";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL;

const redirectToLogin = () => {
  if (typeof window === "undefined") return;

  const pathname = window.location.pathname || "/";
  if (pathname.includes("/login")) return;

  const currentUser = getCurrentUser();
  const isOwnerContext =
    pathname.startsWith("/owner") ||
    ["owner", "admin"].includes(String(currentUser?.role || "").toLowerCase());

  const target = isOwnerContext ? "/owner/login" : "/user/login";
  window.location.assign(target);
};

const buildUrl = (path, query) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (query && typeof query === "object") {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

export const apiRequest = async (
  path,
  { method = "GET", body, token, headers = {}, query } = {},
) => {
  const authToken = token ?? getAuthToken();
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(buildUrl(path, query), {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearSession();
      redirectToLogin();
    }

    const message = payload?.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};
