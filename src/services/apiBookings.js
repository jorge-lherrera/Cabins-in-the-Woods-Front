import toast from "react-hot-toast";
import { api } from "./apiUrl";
import { PAGE_SIZE } from "../utils/constants";

export async function getBooking(id) {
  try {
    const { data } = await api.get(`/bookings/${id}`);
    return data;
  } catch (error) {
    toast.error("Reserva não encontrada");
  }
}

export async function getBookings({ page = 1, filter = null, sortBy = null }) {
  // MODIFICADO: recibe filter y sortBy
  try {
    const params = {
      page,
      limit: PAGE_SIZE, // MODIFICADO: asegurado que sea 'limit'
    };
    if (filter) params.filter = JSON.stringify(filter); // MODIFICADO: envía filter como string
    if (sortBy) params.sortBy = JSON.stringify(sortBy); // MODIFICADO: envía sortBy como string

    const { data } = await api.get("/bookings", {
      params,
    });
    return data;
  } catch (error) {
    toast.error("Erro ao carregar reservas");
  }
}

export async function getStaysAfterDate(date) {
  try {
    const { data } = await api.get("/bookings/stays-after-date", {
      params: { date },
    });
    // Éxito: devuelve datos
    return { status: "success", data };
  } catch (error) {
    // Si es 404, no hay estancias para la fecha indicada
    if (error.response && error.response.status === 404) {
      return {
        status: "not_found",
        data: [],
        message: error.response.data?.message || "No hay estancias recientes.",
      };
    }
    // Otros errores
    toast.error("Erro ao carregar estadas recentes");
    return {
      status: "error",
      data: [],
      message: "Ocurrió un error inesperado.",
    };
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
