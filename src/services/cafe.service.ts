import { Cafe } from "../store/states/cafeState";
import { API } from "./builder";

export async function GetPaginatedCafeListAPI(
  location: string,
  page: number
): Promise<any> {
  const url = `/data/cafe/?location=${location}&page=${page}`;
  return await API.get<any>(url);
}

export async function GetAllCafeListAPI(): Promise<any> {
  const url = "/data/cafe/all";
  return await API.get<any>(url);
}

export async function CreateCafeAPI(request: Cafe): Promise<any> {
  const url = "/data/cafe";
  return API.post<any>(url, request);
}

export async function UpdateCafeAPI(request: Cafe): Promise<any> {
  const url = "/data/cafe";
  return API.put<any>(url, request);
}

export async function DeleteCafeAPI(cafeId: string): Promise<any> {
  const url = `/data/cafe/${cafeId}`;
  return API.delete<any>(url);
}

export async function GetCafeAPI(cafeId: string): Promise<any> {
  const url = `/data/cafe/${cafeId}`;
  return await API.get<any>(url);
}
