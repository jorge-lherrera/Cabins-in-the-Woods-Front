import { api } from "./apiUrl";
import { PAGE_SIZE } from "../utils/constants";

export async function getBooking(id) {
  const { data } = await api.get(`/bookings/${id}`);
  return data;
}

export async function getBookings({
  page = 1,
  limit = PAGE_SIZE,
  orderBy = "startDate",
  order = "ASC",
  status,
  ...extraFilters
} = {}) {
  const params = {
    page,
    limit,
    orderBy,
    order,
    ...extraFilters,
  };
  if (status) params.status = status;

  const { data } = await api.get("/bookings", { params });
  return data;
}

export async function createBooking(newBooking) {
  const { data } = await api.post("/bookings", newBooking);
  return data;
}

export async function updateBooking(id, updatedBooking) {
  const { data } = await api.put(`/bookings/${id}`, updatedBooking);
  return data;
}

export async function deleteBooking(id) {
  const { data } = await api.delete(`/bookings/${id}`);
  return data;
}
