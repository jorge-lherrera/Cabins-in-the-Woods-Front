import toast from "react-hot-toast";
import { api } from "./ApiUrl";

export async function login({ email, password }) {
  try {
    await api.post("/login", { email, password });

    const { data } = await api.get("/session");
    console.log(data, `esto seria la dataaaaaaaaaaaaaaaaa`);

    if (data.loggedIn) {
      toast.success("Login realizado com sucesso!");
      return data;
    } else {
      toast.error("Erro ao obter sessão após login.");
      throw new Error("Erro ao obter sessão após login.");
    }
  } catch (error) {
    toast.error(error.response?.data?.erro || "Erro ao fazer login.");
    throw error;
  }
}

export async function getSession() {
  try {
    const { data } = await api.get("/session");
    return data;
  } catch (error) {
    return { loggedIn: false, user: null };
  }
}

export async function logout() {
  try {
    await api.post("/logout");
    toast.success("Logout realizado com sucesso!");
  } catch (error) {
    toast.error(error.response?.data?.erro || "Erro ao fazer logout.");
    throw error;
  }
}
