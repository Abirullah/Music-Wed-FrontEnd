import { apiRequest } from "./client";

export const fetchLibrarySummary = async (userId) => {
  return apiRequest(`/users/${userId}/summary`);
};

export const fetchFavorites = async (userId) => {
  return apiRequest(`/users/${userId}/favorites`);
};

export const addFavorite = async (userId, { itemType, itemId }) => {
  return apiRequest(`/users/${userId}/favorites`, {
    method: "POST",
    body: { itemType, itemId },
  });
};

export const removeFavorite = async (userId, { itemType, itemId }) => {
  return apiRequest(`/users/${userId}/favorites/${itemType}/${itemId}`, {
    method: "DELETE",
  });
};

export const fetchPurchases = async (userId) => {
  return apiRequest(`/users/${userId}/purchases`);
};

export const fetchDownloadLink = async (userId, { itemType, itemId }) => {
  return apiRequest(`/users/${userId}/download/${itemType}/${itemId}`);
};
