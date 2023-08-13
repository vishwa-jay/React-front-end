import { Cafe } from "../states/cafeState";

export enum CafeActionTypes {
  CAFE_FETCH_REQUEST = "cafe/FETCH_REQUEST",
  CAFE_FETCH_SUCCESS = "cafe/FETCH_SUCCESS",
  CAFE_FETCH_ERROR = "cafe/FETCH_ERROR",

  CAFE_ALL_FETCH_REQUEST = "cafe/ALL_FETCH_REQUEST",
  CAFE_ALL_FETCH_SUCCESS = "cafe/ALL_FETCH_SUCCESS",
  CAFE_ALL_FETCH_ERROR = "cafe/ALL_FETCH_ERROR",

  CAFE_CREATE_REQUEST = "cafe/CAFE_CREATE_REQUEST",
  CAFE_CREATE_SUCCESS = "cafe/CAFE_CREATE_SUCCESS",
  CAFE_CREATE_ERROR = "cafe/CAFE_CREATE_ERROR",

  CAFE_UPDATE_REQUEST = "cafe/CAFE_UPDATE_REQUEST",
  CAFE_UPDATE_SUCCESS = "cafe/CAFE_UPDATE_SUCCESS",
  CAFE_UPDATE_ERROR = "cafe/CAFE_UPDATE_ERROR",

  CAFE_DELETE_REQUEST = "cafe/CAFE_DELETE_REQUEST",
  CAFE_DELETE_SUCCESS = "cafe/CAFE_DELETE_SUCCESS",
  CAFE_DELETE_ERROR = "cafe/CAFE_DELETE_ERROR",

  CAFE_FIND_REQUEST = "cafe/CAFE_FIND_REQUEST",
  CAFE_FIND_SUCCESS = "cafe/CAFE_FIND_SUCCESS",
  CAFE_FIND_ERROR = "cafe/CAFE_FIND_ERROR",
}

export const getCafeList = (action: any) => ({
  payload: action,
  type: CafeActionTypes.CAFE_FETCH_REQUEST,
});

export const getCafeListFailed = () => ({
  payload: null,
  type: CafeActionTypes.CAFE_FETCH_ERROR,
});

export const getCafeListSucceeded = (action: any) => ({
  payload: action.payload,
  type: CafeActionTypes.CAFE_FETCH_SUCCESS,
});

export const getCafeAllList = () => ({
  payload: null,
  type: CafeActionTypes.CAFE_ALL_FETCH_REQUEST,
});

export const getCafeAllListFailed = () => ({
  payload: null,
  type: CafeActionTypes.CAFE_ALL_FETCH_ERROR,
});

export const getCafeAllListSucceeded = (action: any) => ({
  payload: action.payload,
  type: CafeActionTypes.CAFE_ALL_FETCH_SUCCESS,
});

export const createCafe = (cafe: Cafe) => ({
  payload: { cafe },
  type: CafeActionTypes.CAFE_CREATE_REQUEST,
});

export const createCafeFailed = () => ({
  payload: null,
  type: CafeActionTypes.CAFE_CREATE_ERROR,
});

export const createCafeSucceeded = (action: any) => ({
  payload: action.payload,
  type: CafeActionTypes.CAFE_CREATE_SUCCESS,
});

export const findCafe = (id: string) => ({
  payload: { id },
  type: CafeActionTypes.CAFE_FIND_REQUEST,
});

export const findCafeFailed = () => ({
  payload: null,
  type: CafeActionTypes.CAFE_FIND_ERROR,
});

export const findCafeSucceeded = (action: any) => ({
  payload: action.payload,
  type: CafeActionTypes.CAFE_FIND_SUCCESS,
});

export const updateCafe = (cafe: Cafe) => ({
  payload: { cafe },
  type: CafeActionTypes.CAFE_UPDATE_REQUEST,
});

export const updateCafeFailed = (payload: any) => ({
  payload: payload,
  type: CafeActionTypes.CAFE_UPDATE_ERROR,
});

export const updateCafeSucceeded = (action: any) => ({
  payload: action.payload,
  type: CafeActionTypes.CAFE_UPDATE_SUCCESS,
});

export const deleteCafe = (cafeId: string) => ({
  payload: { cafeId },
  type: CafeActionTypes.CAFE_DELETE_REQUEST,
});

export const deleteCafeFailed = (payload: any) => ({
  payload: payload,
  type: CafeActionTypes.CAFE_DELETE_ERROR,
});

export const deleteCafeSucceeded = (action: any) => ({
  payload: action.payload,
  type: CafeActionTypes.CAFE_DELETE_SUCCESS,
});

