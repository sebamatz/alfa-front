import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Odrers/Orders";
import { NewOrder } from "./pages/NewOrder/NewOrder";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/erp-test">
            <Dashboard />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/new">
            <NewOrder />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
