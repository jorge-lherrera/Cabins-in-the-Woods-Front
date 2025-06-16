import { api } from "./apiUrl";
import { PAGE_SIZE } from "../utils/constants";

export async function getBooking(id) {
  const { data } = await api.get(`/bookings/${id}`);
  return data;
}

export async function getBookings({
  page,
  limit,
  orderBy,
  order,
  status,
  days,
} = {}) {
  const params = {};

  params.page = page ?? 1;
  params.limit = limit ?? PAGE_SIZE;
  params.orderBy = orderBy ?? "startDate";
  params.order = order ?? "ASC";

  if (status && status !== "all") params.status = status;
  if (days) params.days = days;
  const { data } = await api.get("/bookings", { params });
  console.log("api", data);
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
