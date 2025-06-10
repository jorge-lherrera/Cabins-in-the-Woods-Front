import toast from "react-hot-toast";
import { api } from "./apiUrl";

export async function getCabins() {
  try {
    const { data } = await api.get("/cabins");
    return data.data;
  } catch (error) {
    toast.error("Erro ao carregar cabanas");
    throw error;
  }
}

export async function createCabin(newCabin) {
  try {
    const formData = new FormData();
    Object.entries(newCabin).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await api.post("/cabins", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Erro ao criar cabana");
    throw error;
  }
}

export async function updateCabin(id, updatedCabin) {
  try {
    const formData = new FormData();
    Object.entries(updatedCabin).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await api.put(`/cabins/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Erro ao editar cabana");
    throw error;
  }
}

export async function deleteCabin(id) {
  try {
    const { data } = await api.delete(`/cabins/${id}`);
    return data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Erro ao deletar cabana");
    throw error;
  }
}

export async function duplicateCabin(id) {
  try {
    const { data } = await api.post(`/cabins/${id}/duplicate`);
    return data.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Erro ao duplicar cabana");
    throw error;
  }
}