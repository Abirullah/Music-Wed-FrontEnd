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

export const loginUser = async ({ email, password }) => {
  return apiRequest("/accounts/login", {
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
