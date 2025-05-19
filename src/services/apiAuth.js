import { api } from "./apiUrl";
import toast from "react-hot-toast";

export async function signup({ fullName, email, password }) {
  try {
    const { data } = await api.post("/login", {
      fullName,
      email,
      password,
    });
    toast.success("Cadastro realizado com sucesso!");
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erro ao cadastrar.");
    throw error;
  }
}

export async function login({ email, password }) {
  try {
    const { data } = await api.post("/login", {
      email,
      password,
    });
    if (data.token) localStorage.setItem("token", data.token);
    toast.success("Login realizado com sucesso!");
    // Navegar ao dashboard (deve ser feito no componente, não aqui)
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erro ao fazer login.");
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await api.get("/workers/{id}");
    return data.user;
  } catch (error) {
    toast.error("Erro ao obter usuário.");
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem("token");
  toast.success("Logout realizado com sucesso!");
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  try {
    const formData = new FormData();
    if (password) formData.append("password", password);
    if (fullName) formData.append("fullName", fullName);
    if (avatar) formData.append("avatar", avatar);

    const { data } = await api.put("/login/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Usuário atualizado com sucesso!");
    return data.user;
  } catch (error) {
    toast.error("Erro ao atualizar usuário.");
    throw error;
  }
}
