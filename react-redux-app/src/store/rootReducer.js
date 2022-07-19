import { LOADING } from "./types";

const initialState = {
  value: null,
  disabled: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
