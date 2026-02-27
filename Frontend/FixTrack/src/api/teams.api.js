import api from "./axios";

export const getAllTeams = async () => {
  const response = await api.get("/maintenance-teams");
  return response.data;
};

export const getAllDepartments = async () => {
  const response = await api.get("/department");
  return response.data;
};

export const createTeam = async (data) => {
  const response = await api.post("/maintenance-teams", data);
  return response.data;
};
