import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders/Orders";
import { NewOrder } from "./pages/NewOrder/NewOrder";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { getbranches } from "./api/fetch";
import CompanyOptions from "./components/CompanyOptions";

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
  const [afm, setAfm] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const afmValue: any = document.getElementById("userAfm");
    if (afmValue) {
      setAfm(afmValue.value);
      getbranches(afmValue.value);
    }
  }, [afm]);

  return (
    <ThemeProvider theme={theme}>
      <CompanyOptions />
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
              <Orders afm={afm} />
            </Route>
            <Route path="/new">
              <NewOrder />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
