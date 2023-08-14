import { all, call, put, takeLatest } from "redux-saga/effects";
import { 
  CreateCafeAPI, 
  DeleteCafeAPI, 
  GetAllCafeListAPI, 
  GetCafeAPI, 
  GetPaginatedCafeListAPI, 
  UpdateCafeAPI 
} from "../../services/cafe.service";
import { 
  CafeActionTypes, 
  createCafe, 
  createCafeFailed, 
  createCafeSucceeded, 
  deleteCafe, 
  deleteCafeFailed, 
  deleteCafeSucceeded, 
  findCafe, 
  findCafeFailed, 
  findCafeSucceeded, 
  getCafeAllListFailed, 
  getCafeAllListSucceeded, 
  getCafeList, 
  getCafeListFailed, 
  getCafeListSucceeded, 
  updateCafe, 
  updateCafeFailed, 
  updateCafeSucceeded 
} from "../actions/cafeAction";

/**
 * Get paginated cafe list.
 */
function* GetCafeListAPISaga(payload: ReturnType<typeof getCafeList>) {
  try {
    const { data } = yield call(GetPaginatedCafeListAPI, payload.payload.location,payload.payload.page );
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

/**
 * Create cafe.
 */
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

/**
 * Get cafe by id for editing purpose.
 */
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

/**
 * Update cafe.
 */
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

/**
 * Delete cafe.
 */
function* DeleteCafeAPISaga( payload: ReturnType<typeof deleteCafe>): any{
  try {
    const { data } = yield call(DeleteCafeAPI, payload.payload.cafeId);
    yield put(
      deleteCafeSucceeded({
        payload: data,
      })
    );
  } catch (e) {
    yield put(deleteCafeFailed(e));
  }
}

function* cafeSaga() {
  yield all([
    takeLatest(CafeActionTypes.CAFE_FETCH_REQUEST, GetCafeListAPISaga),
    takeLatest(CafeActionTypes.CAFE_ALL_FETCH_REQUEST, getCafeAllListAPISaga),
    takeLatest(CafeActionTypes.CAFE_CREATE_REQUEST, CreateCafeAPISaga),
    takeLatest(CafeActionTypes.CAFE_FIND_REQUEST, GetCafeAPISaga),
    takeLatest(CafeActionTypes.CAFE_UPDATE_REQUEST, UpdateCafeAPISaga),
    takeLatest(CafeActionTypes.CAFE_DELETE_REQUEST, DeleteCafeAPISaga)
  ]);
}

export default cafeSaga;
