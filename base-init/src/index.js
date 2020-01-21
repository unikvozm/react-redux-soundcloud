import SC from "soundcloud";
import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { configure } from "mobx";
import App from "./components/App";
import Callback from "./components/Callback";
import Stream from "./components/Stream";
import userStore from "./stores/userStore";
import trackStore from "./stores/trackStore";
import { CLIENT_ID, REDIRECT_URI } from "./constants/auth";

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

// to enable mutating the state from outside the stores
configure({ enforceActions: true });

const stores = { userStore, trackStore };

ReactDOM.render(
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Stream} />
        <Route path="/" component={Stream} />
        <Route path="/callback" component={Callback} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app")
);
