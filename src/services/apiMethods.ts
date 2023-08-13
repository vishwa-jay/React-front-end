import { Cafe } from "../store/states/cafeState";
import { Employee } from "../store/states/employeeState";
import { API } from "./builder";

export async function GetCafeListAPI(location: string, page: number): Promise<any>  {
  const url = `/data/cafe/?location=${location}&page=${page}`;
  return await API.get<any>(url);
};

export async function GetEmployeeByCafeAPI(page: number, cafeId: string): Promise<any>{
    const url = `/data/employee/?cafe=${cafeId}&page=${page}`;
    return await API.get<any>(url);
}

export async function GetAllCafeListAPI(): Promise<any> {
  const url = "/data/cafe/all";
  return await API.get<any>(url);
}

export async function CreateEmployeeAPI(request: Employee): Promise<any> {
  const url = "/data/employee";
  return API.post<any>(url, request);
}

export async function GetEmployeeAPI(empId: string): Promise<any> {
  const url = `/data/employee/${empId}`;
  return await API.get<any>(url);
}

export async function UpdateEmployeeAPI(request: Employee): Promise<any> {
  const url = "/data/employee";
  return API.put<any>(url, request);
}

export async function CreateCafeAPI(request: Cafe): Promise<any> {
  const url = "/data/cafe";
  return API.post<any>(url, request);
}

export async function UpdateCafeAPI(request: Cafe): Promise<any> {
  const url = "/data/cafe";
  return API.put<any>(url, request);
}

export async function GetCafeAPI(cafeId: string): Promise<any> {
  const url = `/data/cafe/${cafeId}`;
  return await API.get<any>(url);
}