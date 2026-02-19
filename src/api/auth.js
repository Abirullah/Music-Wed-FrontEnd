import { apiRequest } from "./client";

export const registerUser = async ({ fullName, email, password, role }) => {
  return apiRequest("/accounts/register", {
    method: "POST",
    body: {
      name: fullName,
      email,
      password,
      role,
    },
  });
};

export const verifyOtp = async ({ email, otp, purpose = "signup" }) => {
  return apiRequest("/accounts/verify-otp", {
    method: "POST",
    body: { email, otp, purpose },
  });
};

export const resendOtp = async ({ email, purpose = "signup" }) => {
  return apiRequest("/accounts/resend-otp", {
    method: "POST",
    body: { email, purpose },
  });
};

export const requestPasswordReset = async ({ email }) => {
  return apiRequest("/accounts/request-password-reset", {
    method: "POST",
    body: { email },
  });
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  return apiRequest("/accounts/reset-password", {
    method: "POST",
    body: { email, otp, newPassword },
  });
};

export const loginUser = async ({ email, password }) => {
  return apiRequest("/accounts/login/user", {
    method: "POST",
    body: { email, password },
  });
};

export const loginOwner = async ({ email, password }) => {
  return apiRequest("/accounts/login/owner", {
    method: "POST",
    body: { email, password },
  });
};

export const getCurrentAccount = async () => {
  return apiRequest("/accounts/me");
};

export const updateAccount = async (userId, payload) => {
  return apiRequest(`/accounts/${userId}`, {
    method: "PUT",
    body: payload,
  });
};
