import { apiRequest } from "./client";

export const fetchCatalog = async (query = {}) => {
  return apiRequest("/catalog", { query });
};

export const fetchCatalogItem = async (itemType, itemId) => {
  return apiRequest(`/catalog/${itemType}/${itemId}`);
};

export const fetchArtistsCollection = async () => {
  return apiRequest("/catalog/artists");
};

export const reportPiracy = async (itemType, itemId, payload) => {
  return apiRequest(`/catalog/${itemType}/${itemId}/report-piracy`, {
    method: "POST",
    body: payload,
  });
};
