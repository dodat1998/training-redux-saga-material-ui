import { combineReducers } from "redux";
import tasks from "./tasks";
import uiReducer from "./ui";
import modalReducer from "./modal";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  tasks,
  ui: uiReducer,
  modals: modalReducer,
  form: formReducer,
});
export default rootReducer;
