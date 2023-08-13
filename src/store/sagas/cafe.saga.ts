import { all, call, put, takeLatest } from "redux-saga/effects";
import { CreateCafeAPI, GetAllCafeListAPI, GetCafeAPI, GetCafeListAPI, UpdateCafeAPI } from "../../services/apiMethods";
import { CafeActionTypes, createCafe, createCafeFailed, createCafeSucceeded, findCafe, findCafeFailed, findCafeSucceeded, getCafeAllListFailed, getCafeAllListSucceeded, getCafeList, getCafeListFailed, getCafeListSucceeded, updateCafe, updateCafeFailed, updateCafeSucceeded } from "../actions/cafeAction";

/**
 * Get paginated cafe list.
 */
function* GetCafeListAPISaga(payload: ReturnType<typeof getCafeList>) {
  try {
    const { data } = yield call(GetCafeListAPI, payload.payload.location,payload.payload.page );
    yield put(
      getCafeListSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(getCafeListFailed());
  }
}

/**
 * Get all cafe list for dropdowns.
 */
function* getCafeAllListAPISaga() {
  try {
    const { data } = yield call(GetAllCafeListAPI);
    yield put(
      getCafeAllListSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(getCafeAllListFailed());
  }
}

function* CreateCafeAPISaga( payload: ReturnType<typeof createCafe>): any{
  try {
    const { data } = yield call(CreateCafeAPI, payload.payload.cafe);
    yield put(
      createCafeSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(createCafeFailed());
  }
}

function* GetCafeAPISaga(payload: ReturnType<typeof findCafe>){
  try {
    const { data } = yield call(GetCafeAPI, payload.payload.id);
    yield put(
      findCafeSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(findCafeFailed());
  }
}

function* UpdateCafeAPISaga( payload: ReturnType<typeof updateCafe>): any{
  try {
    const { data } = yield call(UpdateCafeAPI, payload.payload.cafe);
    yield put(
      updateCafeSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(updateCafeFailed(e));
  }
}

function* cafeSaga() {
  yield all([
    takeLatest(CafeActionTypes.CAFE_FETCH_REQUEST, GetCafeListAPISaga),
    takeLatest(CafeActionTypes.CAFE_ALL_FETCH_REQUEST, getCafeAllListAPISaga),
    takeLatest(CafeActionTypes.CAFE_CREATE_REQUEST, CreateCafeAPISaga),
    takeLatest(CafeActionTypes.CAFE_FIND_REQUEST, GetCafeAPISaga),
    takeLatest(CafeActionTypes.CAFE_UPDATE_REQUEST, UpdateCafeAPISaga)
  ]);
}

export default cafeSaga;