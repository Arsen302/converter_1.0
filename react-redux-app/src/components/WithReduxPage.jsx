import React from "react";
import store from "../store/store";
import { LOADING } from "../store/types";

function WithReduxPage() {

  // const dispatch = useDispatch()

  function newLoad() {
    let names = [];
    return fetch("https://api.github.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        names.push(data);
        store.dispatch({
          type: LOADING,
          payload: names.map((e) => {
            return e.map((item, id) => {
              return (
                <div key={id} className="card">
                  <h3>
                    Number of card <span>{item.id}</span>
                  </h3>
                  <img
                    src={`https://avatars0.githubusercontent.com/u/${item.id}?v=4`}
                    alt="avatar"
                  />
                  <p>Login: {item.login}</p>
                  <p>
                    <a href={item.html_url}>Personal GitHub page</a>
                  </p>
                </div>
              );
            });
          }),
        });
      });
  }

  return (
    <div className="main">
      <button type="button" onClick={newLoad}>
        Loading
      </button>
      <div className="result">{store.getState().value}</div>
    </div>
  );
}

export default WithReduxPage;
