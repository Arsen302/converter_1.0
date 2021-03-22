import { LOADING } from "./types";

export const loading = (newLoad) => {
  return async (dispatch) => {
    const users = fetch("https://api.github.com/users")
  }

  return {
    type: LOADING,
    payload: newLoad,
  };
}
