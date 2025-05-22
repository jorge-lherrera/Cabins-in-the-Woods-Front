import toast from "react-hot-toast";
import { api } from "./apiUrl";

export async function getCabins() {
  try {
    const { data } = await api.get("/cabins");
    return data;
  } catch (error) {
    toast.error("Erro ao carregar cabanas");
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
    return data;
  } catch (error) {
    toast.error("Erro ao criar cabana");
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
    return data;
  } catch (error) {
    toast.error("Erro ao editar cabana");
  }
}

export async function deleteCabin(id) {
  try {
    const { data } = await api.delete(`/cabins/${id}`);
    return data;
  } catch (error) {
    toast.error("Erro ao deletar cabana");
  }
}
