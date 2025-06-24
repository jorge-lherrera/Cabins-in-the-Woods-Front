import { api } from "./apiUrl";

export async function updateWorker(data) {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.avatar && typeof data.avatar !== "string")
    formData.append("file", data.avatar);
  if (data.password) formData.append("password", data.password);
  if (data.currentPassword)
    formData.append("currentPassword", data.currentPassword);

  const { data: response } = await api.put("/workers/me", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.worker;
}
