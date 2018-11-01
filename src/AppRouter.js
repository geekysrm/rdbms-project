import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";
import NotFoundPage from "./components/NotFoundPage";

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />

          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
