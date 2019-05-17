import { GET_ALL_GNOMES, GET_GNOME } from "../actions/types";

const initialState = {
  gnomes: [],
  gnome: {}
};

export const gnomesReducer = (state = initialState.gnomes, action) => {
  switch (action.type) {
    case GET_ALL_GNOMES:
      return action.payload;

    default:
      return state;
  }
};

export const gnomeReducer = (state = initialState.gnome, action) => {
  switch (action.type) {
    case GET_GNOME:
      return action.payload;

    default:
      return state;
  }
};
