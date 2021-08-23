import React,{useEffect,useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders/Orders";
import { NewOrder } from "./pages/NewOrder/NewOrder"
import {getData} from "./api/fetch"
import "./App.css";
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
  palette: {
    primary: {
      // Green lig alfa site.
      main: "#83bd00",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
    error: {
      // This is green.A700 as hex.
      main: '#e53935',
    },
  },
});
const data = {SearchValue: "ΓΑΛΑΚΤΙΔ",BOption: 0,DFrom: "12/31/2013",DTo: "12/31/2013",TakeRecs:0,Id:169252,LastId:0,AFM:"082830016"}


function App() {


  const [orders,setOrders]=useState([])

  useEffect(() => {
    getData("https://80.245.167.105:19580/ErpAPI/getcv/obj?pars=",data).then(data => setOrders(data))

}, []);


  return (
    <ThemeProvider theme={theme}>
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
                <Orders orders={orders} />
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
