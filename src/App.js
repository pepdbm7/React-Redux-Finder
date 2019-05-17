import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
//redux:
import { Provider } from "react-redux";
import store from "./store";

import LandingPage from "./components/landing_page";
import HomePage from "./components/home_page";
import ShowGnome from "./components/show_gnome";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/finder" component={HomePage} />
          <Route exact path="/gnome/:id" component={ShowGnome} />
        </Switch>
      </div>
    </Provider>
  );
};

export default withRouter(App);
