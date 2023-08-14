import { API } from "./builder";
import { Employee } from "../store/states/employeeState";

export async function GetEmployeeByCafeAPI(
  page: number,
  cafeId: string
): Promise<any> {
  const url = `/data/employee/?cafe=${cafeId}&page=${page}`;
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

export async function DeleteEmployeeAPI(empId: string): Promise<any> {
  const url = `/data/employee/${empId}`;
  return API.delete<any>(url);
}
