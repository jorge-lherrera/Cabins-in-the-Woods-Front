import { api } from "./apiUrl";

export async function getCabin(id) {
  const { data } = await api.get(`/cabins/${id}`);
  return data;
}

export async function getCabins({
  page,
  limit,
  orderBy,
  order,
  discountFilter,
  search,
} = {}) {
  const params = {};
  params.page = page ?? 1;

  params.orderBy = orderBy ?? "name";
  params.order = order ?? "ASC";

  if (discountFilter && discountFilter !== "all") {
    params.discountFilter = discountFilter;
  }

  if (search) params.search = search;

  const { data } = await api.get("/cabins", { params });
  return data;
}

export async function createCabin(payload) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === "file" && value) {
      formData.append("file", value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const { data } = await api.post("/cabins", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateCabin(id, updatedCabin) {
  const formData = new FormData();
  Object.entries(updatedCabin).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const { data } = await api.put(`/cabins/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function duplicateCabin(id) {
  const { data } = await api.post(`/cabins/${id}/duplicate`);
  return data;
}

export async function deleteCabin(id) {
  const { data } = await api.delete(`/cabins/${id}`);
  return data;
}
