import api from "./axios";

export const getAllRequests = async () => {
  const response = await api.get("/maintenance-requests");
  return response.data;
};

export const createRequest = async (data) => {
  const response = await api.post("/maintenance-requests", data);
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await api.patch(`/maintenance-requests/${id}/status`, { status });
  return response.data;
};

export const getMaintenanceLogs = async (id) => {
  const response = await api.get(`/maintenance-requests/${id}/logs`);
  return response.data;
};
