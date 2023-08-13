import { all, call, put, takeLatest } from "redux-saga/effects";
import { CreateEmployeeAPI, GetEmployeeAPI, GetEmployeeByCafeAPI, UpdateEmployeeAPI } from "../../services/apiMethods";
import {
  EmployeeActionTypes,
  createEmployee,
  createEmployeeFailed,
  createEmployeeSucceeded,
  findEmployee,
  findEmployeeFailed,
  findEmployeeSucceeded,
  getEmployeeList,
  getEmployeeListFailed,
  getEmployeeListSucceeded,
  updateEmployee,
  updateEmployeeFailed,
  updateEmployeeSucceeded,
} from "../actions/employeeAction";

/**
 * Get paginated list of employee deftails by cafe id
 */
function* GetEmployeesByCafeAPISaga(
  payload: ReturnType<typeof getEmployeeList>
): any {
  try {
    const { data } = yield call(GetEmployeeByCafeAPI, payload.payload.page, payload.payload.cafeId || "");
    yield put(
      getEmployeeListSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(getEmployeeListFailed());
  }
}

/**
 * Create employee.
 */
function* CreateEmployeeAPISaga( payload: ReturnType<typeof createEmployee>): any{
  try {
    const { data } = yield call(CreateEmployeeAPI, payload.payload.employee);
    yield put(
      createEmployeeSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(createEmployeeFailed());
  }
}

/**
 * Create employee details by id.
 */
function* GetEmployeeAPISaga(payload: ReturnType<typeof findEmployee>){
  try {
    const { data } = yield call(GetEmployeeAPI, payload.payload.id);
    yield put(
      findEmployeeSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(findEmployeeFailed());
  }
}

/**
 * Update employee.
 */
function* UpdateEmployeeAPISaga( payload: ReturnType<typeof updateEmployee>): any{
  try {
    const { data } = yield call(UpdateEmployeeAPI, payload.payload.employee);
    yield put(
      updateEmployeeSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(updateEmployeeFailed(e));
  }
}

export default function* employeeSaga() {
  yield all([
    takeLatest(
      EmployeeActionTypes.EMPLOYEE_FETCH_REQUEST,
      GetEmployeesByCafeAPISaga
    ),
    takeLatest(
      EmployeeActionTypes.EMPLOYEE_CREATE_REQUEST,
      CreateEmployeeAPISaga
    ),
    takeLatest(
      EmployeeActionTypes.EMPLOYEE_FIND_REQUEST,
      GetEmployeeAPISaga
    ),
    takeLatest(
      EmployeeActionTypes.EMPLOYEE_UPDATE_REQUEST,
      UpdateEmployeeAPISaga
    ),
  ]);
}
