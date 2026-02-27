import api from "./axios";

export const getAllEquipment = async () => {
  const response = await api.get("/equipment");
  return response.data;
};

export const getEquipmentById = async (id) => {
  const response = await api.get(`/equipment/${id}`);
  return response.data;
};

export const createEquipment = async (data) => {
  const response = await api.post("/equipment", data);
  return response.data;
};

export const updateEquipment = async (id, data) => {
  const response = await api.put(`/equipment/${id}`, data);
  return response.data;
};

export const deleteEquipment = async (id) => {
  const response = await api.delete(`/equipment/${id}`);
  return response.data;
};
