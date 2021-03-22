import React, { useState } from "react";

function WithoutReduxPage() {
  const [name, setNames] = useState([]);

  // https://gurufy.dev/document/5f7a0dff8fb7091e0cf61ff0/5f79390297e9f566a79b399f
  // https://redux.js.org/introduction/getting-started
  // https://rajdee.gitbooks.io/redux-in-russian/content/
  // https://www.youtube.com/playlist?list=PL6DxKON1uLOHsBCJ_vVuvRsW84VnqmPp6
  // https://www.youtube.com/user/ecroFeGushKa/videos

  const getResult = () => {
    return fetch("https://api.github.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        name.push(data);
        setNames(
          name.map((e) => {
            return e.map((elem, id) => {
              return (
                <div key={id} className="card">
                  <h3>
                    Number of card <span>{elem.id}</span>
                  </h3>
                  <img
                    src={`https://avatars0.githubusercontent.com/u/${elem.id}?v=4`}
                    alt="avatar"
                  />
                  <p>Login: {elem.login}</p>
                  <p>
                    <a href={elem.html_url}>Personal GitHub page</a>
                  </p>
                </div>
              );
            });
          })
        );

        return name;
      });
  };

  return (
    <div className="main">
      <h1>GitHub users (Without Redux technologie)</h1>
      <button onClick={getResult} type="button">Click on me!</button>
      <div className="result">{name}</div>
    </div>
  );
}

export default WithoutReduxPage;
