import * as Types from "./../constants/ui";

const initialState = {
  showLoading: false,
  showSidebar: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GLOBAL_SHOW_LOADING:
      return { ...state, showLoading: true };
    case Types.GLOBAL_HIDE_LOADING:
      return { ...state, showLoading: false };
    case Types.SHOW_SIDEBAR:
      return { ...state, showSidebar: true };
    case Types.HIDE_SIDEBAR:
      return { ...state, showSidebar: false };
    default:
      return state;
  }
};
export default reducer;
