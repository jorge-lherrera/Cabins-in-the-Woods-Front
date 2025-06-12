import { PAGE_SIZE } from "../utils/constants";
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
} = {}) {
  const params = {};
  params.page = page ?? 1;
  params.limit = limit ?? PAGE_SIZE;
  params.orderBy = orderBy ?? "name";
  params.order = order ?? "ASC";

  if (discountFilter && discountFilter !== "all") {
    params.discountFilter = discountFilter;
  }

  const { data } = await api.get("/cabins", { params });
  return data;
}

export async function createCabin(newCabin) {
  const formData = new FormData();
  Object.entries(newCabin).forEach(([key, value]) => {
    formData.append(key, value);
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
