import { SET_ACTIVE_FILTER } from "store/types";

export const setActiveFilter = payload => dispatch => {
  dispatch({
    type: SET_ACTIVE_FILTER,
    payload
  });
};
