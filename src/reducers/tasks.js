import * as taskConstants from "./../constants/task";
import { toastError ,toastSuccess} from "./../helpers/toastHelper";

const initialState = {
  listTask: [],
  taskEditing: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case taskConstants.FETCH_TASK:
      return {
        ...state,
        listTask: [],
      };
    case taskConstants.FETCH_TASKS_SUCCESS:
      const { data } = action.payload;
      return { ...state, listTask: data };
    case taskConstants.FETCH_TASK_ERROR:
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listTask: [],
      };
    case taskConstants.FILTER_TASK_SUCCESS:
      const task = action.payload.data;
      return { ...state, listTask: task };
    case taskConstants.ADD_TASK:
      return { ...state };
    case taskConstants.ADD_TASK_SUCCESS:
      var obj = action.payload.data;
      toastSuccess('Thêm công việc thành công');
      return {
        ...state,
        listTask: [obj].concat(state.listTask),
      };
    case taskConstants.ADD_TASK_ERROR:
      toastError(action.payload.error);
      return { ...state };
    case taskConstants.SET_TASK_EDITING:
      const { task: taskEditing } = action.payload;
      return { ...state, taskEditing: taskEditing };
    case taskConstants.EDIT_TASK:
      return { ...state };
    case taskConstants.EDIT_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTask } = state;
      const index = listTask.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listTask.slice(0, index),
          data,
          ...listTask.slice(index + 1),
        ];
        toastSuccess('Cập nhật công việc thành công');
        return {
          ...state,
          listTask: newList,
        };
      }
      return {
        ...state,
      };
    }
    case taskConstants.EDIT_TASK_ERROR:
      toastError(action.payload.error);
      return { ...state };
    case taskConstants.DELETE_TASK:
      return { ...state };
    case taskConstants.DELETE_TASK_SUCCESS:
      const { id } = action.payload;
      toastSuccess('Xoá công việc thành công');
      return {
        ...state,
        listTask: state.listTask.filter((item) => item.id !== id),
      };
    case taskConstants.DELETE_TASK_ERROR:
      toastError(action.payload.error);
      return { ...state };
    default:
      return state;
  }
};
export default reducer;
