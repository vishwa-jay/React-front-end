// import { EmployeeActionTypes } from "../states/employeeState";

import { Employee } from "../states/employeeState";

export enum EmployeeActionTypes {
  EMPLOYEE_FETCH_REQUEST = "employee/EMPLOYEE_FETCH_REQUEST",
  EMPLOYEE_FETCH_SUCCESS = "employee/EMPLOYEE_FETCH_SUCCESS",
  EMPLOYEE_FETCH_ERROR = "employee/EMPLOYEE_FETCH_ERROR",

  EMPLOYEE_CREATE_REQUEST = "employee/EMPLOYEE_CREATE_REQUEST",
  EMPLOYEE_CREATE_SUCCESS = "employee/EMPLOYEE_CREATE_SUCCESS",
  EMPLOYEE_CREATE_ERROR = "employee/EMPLOYEE_CREATE_ERROR",

  EMPLOYEE_UPDATE_REQUEST = "employee/EMPLOYEE_UPDATE_REQUEST",
  EMPLOYEE_UPDATE_SUCCESS = "employee/EMPLOYEE_UPDATE_SUCCESS",
  EMPLOYEE_UPDATE_ERROR = "employee/EMPLOYEE_UPDATE_ERROR",

  EMPLOYEE_FIND_REQUEST = "employee/EMPLOYEE_FIND_REQUEST",
  EMPLOYEE_FIND_SUCCESS = "employee/EMPLOYEE_FIND_SUCCESS",
  EMPLOYEE_FIND_ERROR = "employee/EMPLOYEE_FIND_ERROR",
}

export const getEmployeeList = (page: number, cafeId?: string) => ({
  payload: { cafeId, page },
  type: EmployeeActionTypes.EMPLOYEE_FETCH_REQUEST,
});

export const getEmployeeListFailed = () => ({
  payload: null,
  type: EmployeeActionTypes.EMPLOYEE_FETCH_ERROR,
});

export const getEmployeeListSucceeded = (action: any) => ({
  payload: action.payload,
  type: EmployeeActionTypes.EMPLOYEE_FETCH_SUCCESS,
});

export const createEmployee = (employee: Employee) => ({
  payload: { employee },
  type: EmployeeActionTypes.EMPLOYEE_CREATE_REQUEST,
});

export const createEmployeeFailed = () => ({
  payload: null,
  type: EmployeeActionTypes.EMPLOYEE_CREATE_ERROR,
});

export const createEmployeeSucceeded = (action: any) => ({
  payload: action.payload,
  type: EmployeeActionTypes.EMPLOYEE_CREATE_SUCCESS,
});

export const findEmployee = (id: string) => ({
  payload: { id },
  type: EmployeeActionTypes.EMPLOYEE_FIND_REQUEST,
});

export const findEmployeeFailed = () => ({
  payload: null,
  type: EmployeeActionTypes.EMPLOYEE_FIND_ERROR,
});

export const findEmployeeSucceeded = (action: any) => ({
  payload: action.payload,
  type: EmployeeActionTypes.EMPLOYEE_FIND_SUCCESS,
});

export const updateEmployee = (employee: Employee) => ({
  payload: { employee },
  type: EmployeeActionTypes.EMPLOYEE_UPDATE_REQUEST,
});

export const updateEmployeeFailed = (payload: any) => ({
  payload: payload,
  type: EmployeeActionTypes.EMPLOYEE_UPDATE_ERROR,
});

export const updateEmployeeSucceeded = (action: any) => ({
  payload: action.payload,
  type: EmployeeActionTypes.EMPLOYEE_UPDATE_SUCCESS,
});
