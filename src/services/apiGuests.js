import { PAGE_SIZE } from "../utils/constants";
import { api } from "./apiUrl";

export async function getCabin(id) {
  const { data } = await api.get(`/cabins/${id}`);
  return data;
}

export async function getGuests({
  page,
  limit,
  orderBy,
  order,
  discountFilter,
} = {}) {
  const params = {};
  params.page = page ?? 1;
  params.limit = limit ?? PAGE_SIZE;
  params.orderBy = orderBy ?? "name";
  params.order = order ?? "ASC";

  if (discountFilter && discountFilter !== "all") {
    params.discountFilter = discountFilter;
  }

  const { data } = await api.get("/guests", { params });
  return data;
}

export async function createGuest(newGuest) {
  const formData = new FormData();
  Object.entries(newGuest).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const { data } = await api.post("/guests", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateGuest(id, updatedGuest) {
  const formData = new FormData();
  Object.entries(updatedGuest).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const { data } = await api.put(`/guests/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function deleteGuest(id) {
  const { data } = await api.delete(`/guests/${id}`);
  return data;
}
