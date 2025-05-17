import { api } from "./ApiUrl";

export async function signup({ fullName, email, password }) {
  const { data } = await api.post("/login/signup", {
    fullName,
    email,
    password,
  });
  return data;
}

export async function login({ email, password }) {
  const { data } = await api.post("/login/signin", {
    email,
    password,
  });
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get("/login/me");
  return data.user;
}

export async function logout() {
  localStorage.removeItem("token");
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const formData = new FormData();
  if (password) formData.append("password", password);
  if (fullName) formData.append("fullName", fullName);
  if (avatar) formData.append("avatar", avatar);

  const { data } = await api.put("/login/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.user;
}
