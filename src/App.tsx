// @ts-nocheck
import { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders/Orders";
import { NewOrder } from "./pages/NewOrder/NewOrder";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { getbranches } from "./api/fetch";
import { BranchesContextProvider } from "./context/BranchesContext";
import ErrorBoundary from "./components/ErrorBoundary";

const theme = createTheme({
  palette: {
    primary: {
      // Green lig alfa site.
      main: "#83bd00",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
    error: {
      // This is green.A700 as hex.
      main: "#e53935",
    },
  },
});

function App() {

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <BranchesContextProvider 
        >
          {/* <CompanyOptions /> */}
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
        </BranchesContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
