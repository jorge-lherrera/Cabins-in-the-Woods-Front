import { api } from "./apiUrl";

export async function login({ email, password }) {
  await api.post("/login", { email, password });
  const { data } = await api.get("/session");
  if (data.resource) {
    return { loggedIn: true, user: data.resource };
  } else {
    throw new Error("Erro ao obter sessão após login.");
  }
}

export async function getSession() {
  try {
    const { data } = await api.get("/session");
    if (data.resource) {
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
