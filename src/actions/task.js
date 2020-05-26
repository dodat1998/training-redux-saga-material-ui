// import * as taskApi from "./../apis/task";
import * as taskConstants from "./../constants/task";

import { STATUS } from "./../constants";

export const fetchListTask = (params = {}) => {
  return {
    type: taskConstants.FETCH_TASK,
    payload: {
      params,
    },
  };
};

export const fetchListTaskSuccess = (data) => {
  return {
    type: taskConstants.FETCH_TASKS_SUCCESS,
    payload: { data },
  };
};

export const fetchListTaskFail = (error) => {
  return {
    type: taskConstants.FETCH_TASK_ERROR,
    payload: { error },
  };
};

export const filterTask = (keyword) => ({
  type: taskConstants.FILTER_TASK,
  payload: { keyword },
});

export const filterTaskSuccess = (data) => ({
  type: taskConstants.FILTER_TASK_SUCCESS,
  payload: { data },
});

export const addTask = (data) => {
  return {
    type: taskConstants.ADD_TASK,
    payload: { data },
  };
};

export const addTaskSuccess = (data) => {
  return {
    type: taskConstants.ADD_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addTaskError = (error) => {
  return {
    type: taskConstants.ADD_TASK_ERROR,
    payload: { error },
  };
};

export const setTaskEditing = (task) => {
  return {
    type: taskConstants.SET_TASK_EDITING,
    payload: { task },
  };
};

export const editTask = (title, description, status = STATUS[0].value) => {
  return {
    type: taskConstants.EDIT_TASK,
    payload: { title, description, status },
  };
};

export const editTaskSuccess = (data) => {
  return {
    type: taskConstants.EDIT_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const editTaskError = (error) => {
  return {
    type: taskConstants.EDIT_TASK_ERROR,
    payload: { error },
  };
};

export const deleteTask = (id) => {
  return {
    type: taskConstants.DELETE_TASK,
    payload: { id },
  };
};

export const deleteTaskSuccess = (id) => {
  return {
    type: taskConstants.DELETE_TASK_SUCCESS,
    payload: {
      id,
    },
  };
};

export const deleteTaskError = (error) => {
  return {
    type: taskConstants.DELETE_TASK_ERROR,
    payload: { error },
  };
};
