import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  takeEvery,
  select,
} from "redux-saga/effects";

import * as taskType from "./../constants/task";

import { getList, addTask, updateTask, deleteTaskRequest } from "./../apis/task";

import { showLoading, hideLoading } from "../actions/ui";

import { hideModal } from "../actions/modal";

import {
  fetchListTaskSuccess,
  fetchListTaskFail,
  addTaskSuccess,
  addTaskError,
  fetchListTask,
  editTaskSuccess,
  editTaskError,
  deleteTaskSuccess,
  deleteTaskError,
} from "./../actions/task";

import { STATUS_CODE, STATUS } from "./../constants";

/*
  b1 : call api qua getList.
  b2 : kiem tra status tu api tra ve
  b3 : neu status === 200(success) thi dispatch action fetchSuccess
  b4 : neu status !== 200 thi dispatch action fetchError
  b5 : thuc hien cac cong viec khac
*/

function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskType.FETCH_TASK);
    yield put(showLoading());
    const { params } = action.payload;
    const response = yield call(getList, params);
    const { status, data } = response;
    if (status === STATUS_CODE.SUCCESS) {
      // dispatch action fetchListTaskSuccess
      yield put(fetchListTaskSuccess(data));
    } else {
      // dispatch action fetchListTaskSuccess
      yield put(fetchListTaskFail(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(1000);
  const { keyword } = payload;
  yield put(fetchListTask({ q: keyword }));
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload.data;
  yield delay(1000);
  yield put(showLoading);
  const response = yield call(addTask, {
    title,
    description,
    status: STATUS[0].value,
  });
  const { status, data } = response;
  if (status === STATUS_CODE.CREATED) {
    // dispatch action fetchListTaskSuccess
    yield put(addTaskSuccess(data));
    yield put(hideModal());
  } else {
    // dispatch action fetchListTaskSuccess
    yield put(addTaskError(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* editTaskSaga({ payload }) {
  const { title, description, status } = payload;
  const taskEditing = yield select((state) => state.tasks.taskEditing);
  yield put(showLoading);
  const resp = yield call(
    updateTask,
    { title, description, status },
    taskEditing.id
  );
  const { status: statusCode, data } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    // dispatch action fetchListTaskSuccess
    yield put(editTaskSuccess(data));
    yield put(hideModal());
  } else {
    // dispatch action fetchListTaskSuccess
    yield put(editTaskError(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading);
  const response = yield call(deleteTaskRequest, id);
  const { status: statusCode, data } = response;
  if (statusCode === STATUS_CODE.SUCCESS) {
    // dispatch action fetchListTaskSuccess
    yield put(deleteTaskSuccess(id));
    yield put(hideModal());
  } else {
    // dispatch action fetchListTaskSuccess
    yield put(deleteTaskError(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskType.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskType.ADD_TASK, addTaskSaga);
  yield takeLatest(taskType.EDIT_TASK, editTaskSaga);
  yield takeLatest(taskType.DELETE_TASK, deleteTaskSaga);
}
export default rootSaga;
