import * as uiTypes from './../constants/ui';

export const showLoading = () =>({
  type : uiTypes.GLOBAL_SHOW_LOADING
})

export const hideLoading = () =>({
  type : uiTypes.GLOBAL_HIDE_LOADING
})

export const showSidebar= () =>({
  type : uiTypes.SHOW_SIDEBAR
})

export const hideSidebar= () =>({
  type : uiTypes.HIDE_SIDEBAR
})
