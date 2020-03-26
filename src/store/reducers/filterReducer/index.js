import { SET_ACTIVE_FILTER } from "store/types";

const defaultState = {};

export const activeFilter = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_FILTER:
      return payload;
    default:
      return state;
  }
};
