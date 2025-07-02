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
  nationality,
  search,
} = {}) {
  const params = {};
  params.page = page ?? 1;

  params.orderBy = orderBy ?? "name";
  params.order = order ?? "ASC";

  if (nationality && nationality !== "all") {
    params.nationality = nationality;
  }

  if (search) params.search = search;

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
