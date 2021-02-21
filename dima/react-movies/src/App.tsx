import React from "react";
import MainPage from "./pages/mainpage";
import MoviePage from "./pages/moviepage";

import PageNotFound from "./pages/pageNotFound";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/search"]} component={MainPage} />
        <Route path={`/film/:id`} component={MoviePage} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
};
export default App;
