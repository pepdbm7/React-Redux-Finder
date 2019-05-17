import { GET_ALL_GNOMES, GET_GNOME } from "./types";
import axios from "axios";

const URL =
  "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

export const getAllGnomes = () => async dispatch => {
  const result = await axios.get(URL);

  dispatch({
    type: GET_ALL_GNOMES,
    payload: result.data.Brastlewark
  });
};

export const fetchGnomeById = id => async dispatch => {
  const allGnomes = await axios.get(URL);

  const singleGnome = await allGnomes.data.Brastlewark.find(
    gnome => gnome.id === id
  );

  dispatch({
    type: GET_GNOME,
    payload: singleGnome
  });
};
