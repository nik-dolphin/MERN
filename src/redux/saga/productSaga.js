import { put, takeEvery } from "redux-saga/effects";
import {
  PRODUCT_LIST,
  SET_PRODUCT_LIST,
  SHOW_ITEMS_PER_PAGE,
} from "../../constants";
import axiosInstance from "../../services/axios-client";
import { enqueueSnackbar } from "notistack";

function* getproducts(action) {
  console.log("__saga", action);
  const data = yield axiosInstance.get(
    `/getAllProducts?limit=${SHOW_ITEMS_PER_PAGE}&offset=${action.offset}`
  );
  console.log("__data saga", data);
  yield put({ type: SET_PRODUCT_LIST, data: data?.data?.data });
}

function* productSaga() {
  yield takeEvery(PRODUCT_LIST, getproducts);
}

export default productSaga;
