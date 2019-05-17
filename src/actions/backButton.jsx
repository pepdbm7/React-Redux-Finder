import { SHOW_BACK_BUTTON, HIDE_BACK_BUTTON } from "./types";

export const showBackButton = () => dispatch => {
  dispatch({
    type: SHOW_BACK_BUTTON,
    payload: true
  });
};

export const hideBackButton = () => dispatch => {
  dispatch({
    type: HIDE_BACK_BUTTON,
    payload: false
  });
};
