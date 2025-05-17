import toast from "react-hot-toast";
import { api } from "./ApiUrl";

export async function getSettings() {
  try {
    const { data } = await api.get("/settings");
    return data;
  } catch (error) {
    toast.error("Erro carregando as configurações");
  }
}

export async function createSettings(newSetting) {
  try {
    const { data } = await api.post("/settings", newSetting);
    return data;
  } catch (error) {
    toast.error("Erro ao criar configurações");
  }
}

export async function updateSetting(newSetting) {
  try {
    const { data } = await api.put("/settings", newSetting);
    return data;
  } catch (error) {
    toast.error("Erro ao atualizar configurações");
  }
}
