import toast from "react-hot-toast";
import { api } from "./ApiUrl";
import { PAGE_SIZE } from "../utils/constants";

export async function getBookings({ page = 1 }) {
  try {
    const { data } = await api.get("/bookings", {
      params: {
        page,
        pageSize: PAGE_SIZE,
      },
    });
    return data;
  } catch (error) {
    toast.error("Erro ao carregar reservas");
  }
}

export async function getBooking(id) {
  try {
    const { data } = await api.get(`/bookings/${id}`);
    return data;
  } catch (error) {
    toast.error("Reserva não encontrada");
  }
}

export async function getStaysAfterDate(date) {
  try {
    const { data } = await api.get("/bookings/stays-after-date", {
      params: { date },
    });
    return data;
  } catch (error) {
    toast.error("Erro ao carregar estadas recentes");
    throw error;
  }
}

export async function getBookingsAfterDate(date) {
  try {
    const { data } = await api.get("/bookings/bookings-after-date", {
      params: { date },
    });
    return data;
  } catch (error) {
    toast.error("Erro ao carregar reservas recentes");
    throw error;
  }
}

export async function getStaysTodayActivity() {
  try {
    const { data } = await api.get("/bookings/stays-today-activity");
    return data;
  } catch (error) {
    toast.error("Erro ao carregar atividades de hoje");
    throw error;
  }
}

export async function createBooking(newBooking) {
  try {
    const { data } = await api.post("/bookings", newBooking);
    return data;
  } catch (error) {
    toast.error("Erro ao criar reserva");
  }
}

export async function updateBooking(id, updatedBooking) {
  try {
    const { data } = await api.put(`/bookings/${id}`, updatedBooking);
    return data;
  } catch (error) {
    toast.error("Erro ao atualizar reserva");
  }
}

export async function deleteBooking(id) {
  try {
    const { data } = await api.delete(`/bookings/${id}`);
    return data;
  } catch (error) {
    toast.error("Erro ao deletar reserva");
  }
}
