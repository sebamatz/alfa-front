import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { NewOrder } from "./pages/NewOrder";
import TopMenu from "./components/AppBar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <TopMenu />
      <Router>
        <Switch>
          <Route exact path="/">
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
