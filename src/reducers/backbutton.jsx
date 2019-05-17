import { SHOW_BACK_BUTTON, HIDE_BACK_BUTTON } from "../actions/types";

const initialState = false;

export const backButtonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_BACK_BUTTON:
      return action.payload;

    case HIDE_BACK_BUTTON:
      return action.payload;

    default:
      return state;
  }
};
