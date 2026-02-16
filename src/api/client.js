import { clearSession, getAuthToken, getCurrentUser } from "../utils/session";

const DEFAULT_BASE_URL = "http://127.0.0.1:5000";
const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;
const DEFAULT_UPLOAD_TIMEOUT_MS = 180_000;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL;

const parsePositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const REQUEST_TIMEOUT_MS = parsePositiveInteger(
  import.meta.env.VITE_API_REQUEST_TIMEOUT_MS,
  DEFAULT_REQUEST_TIMEOUT_MS,
);
const UPLOAD_TIMEOUT_MS = parsePositiveInteger(
  import.meta.env.VITE_API_UPLOAD_TIMEOUT_MS,
  DEFAULT_UPLOAD_TIMEOUT_MS,
);

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

const shouldHandleUnauthorizedGlobally = (path = "") => {
  const normalizedPath = String(path || "").split("?")[0];
  const publicAuthPaths = new Set([
    "/accounts/login",
    "/accounts/register",
    "/accounts/verify-otp",
  ]);

  return !publicAuthPaths.has(normalizedPath);
};

export const apiRequest = async (
  path,
  { method = "GET", body, token, headers = {}, query, timeoutMs } = {},
) => {
  const authToken = token ?? getAuthToken();
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const requestTimeoutMs = parsePositiveInteger(
    timeoutMs,
    isFormData ? UPLOAD_TIMEOUT_MS : REQUEST_TIMEOUT_MS,
  );

  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const timeoutHandle = controller
    ? setTimeout(() => {
        controller.abort();
      }, requestTimeoutMs)
    : null;

  let response;
  try {
    response = await fetch(buildUrl(path, query), {
      method,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      },
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
      ...(controller ? { signal: controller.signal } : {}),
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(
        `Request timed out after ${Math.ceil(requestTimeoutMs / 1000)} seconds`,
      );
    }

    throw error;
  } finally {
    if (timeoutHandle) clearTimeout(timeoutHandle);
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    if (response.status === 401 && shouldHandleUnauthorizedGlobally(path)) {
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
