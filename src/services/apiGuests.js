import { api } from "./apiUrl";

export async function getGuest(id) {
  const { data } = await api.get(`/guests/${id}`);
  return data;
}

export async function getGuests({
  page,
  limit,
  orderBy,
  order,
  search,
  searchNation,
} = {}) {
  const params = {};
  params.page = page ?? 1;
  params.limit = limit;
  params.orderBy = orderBy ?? "name";
  params.order = order ?? "ASC";

  if (search) params.search = search;
  if (searchNation) params.searchNation = searchNation;

  const { data } = await api.get("/guests", { params });

  return data;
}

export async function createGuest(newGuest) {
  const { data } = await api.post("/guests", newGuest);
  return data;
}

export async function updateGuest(id, updatedGuest) {
  const { data } = await api.put(`/guests/${id}`, updatedGuest);
  return data;
}

export async function deleteGuest(id) {
  const { data } = await api.delete(`/guests/${id}`);
  return data;
}
