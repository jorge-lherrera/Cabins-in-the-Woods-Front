import { api } from "./apiUrl";

export async function getSettings() {
  const { data } = await api.get("/settings");
  return data;
}

export async function createSettings(newSetting) {
  const { data } = await api.post("/settings", newSetting);
  return data;
}

export async function updateSetting(newSetting) {
  const { data } = await api.put("/settings", newSetting);
  return data;
}
