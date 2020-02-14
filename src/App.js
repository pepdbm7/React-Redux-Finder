import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
//redux:
import { Provider } from "react-redux";
import store from "./store";

import LandingPage from "./components/landing_page";
import HomePage from "./components/home_page";
import ShowGnome from "./components/show_gnome";

const App = ({ history }) => {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} history={history} />
          <Route exact path="/finder" component={HomePage} history={history} />
          <Route exact path="/gnome/:id" component={ShowGnome} />
        </Switch>
      </div>
    </Provider>
  );
};

export default withRouter(App);
