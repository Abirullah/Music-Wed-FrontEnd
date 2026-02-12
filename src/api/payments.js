import { apiRequest } from "./client";

export const createCheckoutSession = async (payload) => {
  return apiRequest("/payments/checkout-session", {
    method: "POST",
    body: payload,
  });
};

export const confirmCheckout = async (payload) => {
  return apiRequest("/payments/confirm", {
    method: "POST",
    body: payload,
  });
};

export const fetchPurchaseStatus = async (purchaseId) => {
  return apiRequest(`/payments/purchases/${purchaseId}`);
};
