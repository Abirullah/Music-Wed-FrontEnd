import { apiRequest } from "./client";

export const uploadSong = async (ownerId, payload) => {
  return apiRequest(`/owners/${ownerId}/songs`, {
    method: "POST",
    body: payload,
  });
};

export const uploadContent = async (ownerId, payload) => {
  return apiRequest(`/owners/${ownerId}/contents`, {
    method: "POST",
    body: payload,
  });
};

export const fetchOwnerDashboard = async (ownerId) => {
  return apiRequest(`/owners/${ownerId}/dashboard`);
};

export const fetchOwnerUploads = async (ownerId, query = {}) => {
  return apiRequest(`/owners/${ownerId}/uploads`, { query });
};

export const fetchOwnerStatements = async (ownerId, query = {}) => {
  return apiRequest(`/owners/${ownerId}/statements`, { query });
};

export const fetchOwnerComplaints = async (ownerId, query = {}) => {
  return apiRequest(`/owners/${ownerId}/piracy-complaints`, { query });
};

export const createPiracyComplaintForOwner = async (ownerId, payload) => {
  return apiRequest(`/owners/${ownerId}/piracy-complaints`, {
    method: "POST",
    body: payload,
  });
};
