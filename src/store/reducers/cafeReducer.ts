import { Reducer } from "redux";
import { CafeState } from '../states/cafeState';
import { CafeActionTypes } from "../actions/cafeAction";
  
  const initialState: CafeState = {
    response: undefined,
    errors: undefined,
    loading: false
  };
  
  const cafeReducer: Reducer<CafeState> = (state = initialState, action) => {
    switch (action.type) {
      case CafeActionTypes.CAFE_FETCH_REQUEST: {
        return { ...state, loading: true };
      }
      case CafeActionTypes.CAFE_FETCH_SUCCESS: {
        console.log("action payload", action.payload);
        return { ...state, loading: false, response: action.payload };
      }
      case CafeActionTypes.CAFE_FETCH_ERROR: {
        return { ...state, loading: false, errors: action.payload };
      }
      case CafeActionTypes.CAFE_ALL_FETCH_REQUEST: {
        return { ...state, loading: true };
      }
      case CafeActionTypes.CAFE_ALL_FETCH_SUCCESS: {
        console.log("action payload", action.payload);
        return { ...state, loading: false, response: action.payload };
      }
      case CafeActionTypes.CAFE_ALL_FETCH_ERROR: {
        return { ...state, loading: false, errors: action.payload };
      }
      case CafeActionTypes.CAFE_CREATE_REQUEST: {
        return { ...state, loading: true };
      }
      case CafeActionTypes.CAFE_CREATE_SUCCESS: {
        console.log("action payload", action.payload);
        return { ...state, loading: false, response: action.payload };
      }
      case CafeActionTypes.CAFE_CREATE_ERROR: {
        return { ...state, loading: false, errors: action.payload };
      }
      case CafeActionTypes.CAFE_FIND_REQUEST: {
        return { ...state, loading: true };
      }
      case CafeActionTypes.CAFE_FIND_SUCCESS: {
        console.log("action payload", action.payload);
        return { ...state, loading: false, response: action.payload };
      }
      case CafeActionTypes.CAFE_FIND_ERROR: {
        return { ...state, loading: false, errors: action.payload };
      }
      case CafeActionTypes.CAFE_UPDATE_REQUEST: {
        return { ...state, loading: true };
      }
      case CafeActionTypes.CAFE_UPDATE_SUCCESS: {
        console.log("action payload", action.payload);
        return { ...state, loading: false, response: action.payload, errors: undefined };
      }
      case CafeActionTypes.CAFE_UPDATE_ERROR: {
        return { ...state, loading: false, errors: action.payload.response.data.message };
      }
      default: {
        return state;
      }
    }
  };
  export default cafeReducer;