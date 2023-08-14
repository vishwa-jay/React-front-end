import { all } from "redux-saga/effects";
import cafeSaga from "./cafe.saga";
import employeeSaga from "./employee.saga";

export default function* rootSaga() {
  yield all([cafeSaga(), employeeSaga()]);
}
