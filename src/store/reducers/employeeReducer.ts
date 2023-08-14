import { Reducer } from "redux";
import { EmployeeState } from "../states/employeeState";
import { EmployeeActionTypes } from "../actions/employeeAction";

const initialState: EmployeeState = {
  response: undefined,
  errors: undefined,
  loading: false,
};

const employeeReducer: Reducer<EmployeeState> = (state = initialState, action) => {
  switch (action.type) {
    case EmployeeActionTypes.EMPLOYEE_FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case EmployeeActionTypes.EMPLOYEE_FETCH_SUCCESS: {
      console.log("action payload", action.payload);
      return { ...state, loading: false, response: action.payload, errors: undefined };
    }
    case EmployeeActionTypes.EMPLOYEE_FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case EmployeeActionTypes.EMPLOYEE_CREATE_REQUEST: {
      return { ...state, loading: true };
    }
    case EmployeeActionTypes.EMPLOYEE_CREATE_SUCCESS: {
      console.log("action payload", action.payload);
      return { ...state, loading: false, response: action.payload, errors: undefined };
    }
    case EmployeeActionTypes.EMPLOYEE_CREATE_ERROR: {
      return { ...state, loading: false, errors: action.payload.response.data.message };
    }
    case EmployeeActionTypes.EMPLOYEE_FIND_REQUEST: {
      return { ...state, loading: true };
    }
    case EmployeeActionTypes.EMPLOYEE_FIND_SUCCESS: {
      console.log("action payload", action.payload);
      return { ...state, loading: false, response: action.payload, errors: undefined };
    }
    case EmployeeActionTypes.EMPLOYEE_FIND_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case EmployeeActionTypes.EMPLOYEE_UPDATE_REQUEST: {
      return { ...state, loading: true };
    }
    case EmployeeActionTypes.EMPLOYEE_UPDATE_SUCCESS: {
      console.log("action payload", action.payload);
      return { ...state, loading: false, response: action.payload, errors: undefined };
    }
    case EmployeeActionTypes.EMPLOYEE_UPDATE_ERROR: {
      return { ...state, loading: false, errors: action.payload.response.data.message };
    }
    case EmployeeActionTypes.EMPLOYEE_DELETE_REQUEST: {
      return { ...state, loading: true };
    }
    case EmployeeActionTypes.EMPLOYEE_DELETE_SUCCESS: {
      console.log("action payload", action.payload);
      return { ...state, loading: false, response: action.payload, errors: undefined };
    }
    case EmployeeActionTypes.EMPLOYEE_DELETE_ERROR: {
      return { ...state, loading: false, errors: action.payload.response.data.message };
    }
    default: {
      return state;
    }
  }
};

export default employeeReducer;
