import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";
import NotFoundPage from "./components/NotFoundPage";
import Home from "./components/Home";
import Upload from './components/Upload';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/upload" component={Upload} />

          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
