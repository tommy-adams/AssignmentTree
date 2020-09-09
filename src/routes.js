import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Classes from "./components/Classes";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/classes" component={Classes} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes;
