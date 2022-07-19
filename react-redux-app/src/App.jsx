import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import store from "./store/store";
import WithoutReduxPage from "./components/WithoutReduxPage";
import WithReduxPage from "./store/wrappedWithReduxPage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Without Redux Page</Link>
            </li>
            <li>
              <Link to="/redux">With Redux Page</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/redux">
            <Provider store={store}>
              <WithReduxPage />
            </Provider>
          </Route>
          <Route path="/">
            <WithoutReduxPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
