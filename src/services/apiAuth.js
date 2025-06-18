import { api } from "./apiUrl";

export async function signup({ name, email, password, avatar }) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  if (avatar && avatar instanceof File) {
    formData.append("file", avatar);
  }

  const { data } = await api.post("/workers", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log("API /workers response:", data);

  if (data.resource) {
    return data.resource;
  } else {
    throw new Error(data.error || "Erro ao criar usuário.");
  }
}
export async function login({ email, password }) {
  const { data } = await api.post("/login", { email, password });
  if (data.resource && data.resource.worker) {
    console.log("Login successful: en apiAuth.js", data.resource.worker);
    return { loggedIn: true, user: data.resource.worker };
  } else {
    throw new Error("Erro ao fazer login.");
  }
}

export async function getSession() {
  try {
    const { data } = await api.get("/session");
    if (data.resource) {
      console.log("Session data: en apiAuth.js", data.resource);
      return { loggedIn: true, user: data.resource };
    }
    return { loggedIn: false, user: null };
  } catch (error) {
    return { loggedIn: false, user: null };
  }
}

export async function logout() {
  await api.post("/logout");
}
