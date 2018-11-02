import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";
import NotFoundPage from "./components/NotFoundPage";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Buy from "./components/Buy";
import View from "./components/View";

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/buy" component={Buy} />
          <Route exact path="/view" component={View} />

          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
