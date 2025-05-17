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
