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


function App() {


  const [orders,setOrders]=useState([])
  const [afm,setAfm]=useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = {SearchValue: null, BOption: 2, DFrom: null, DTo: null, TakeRecs:null, Id:null, LastId:null, AFM:afm}

  useEffect(() => {

    const afmValue:any = document.getElementById('userAfm')
    if(afmValue.value){
      setAfm(afmValue.value)
    }
}, [afm]);

useEffect(() => {

  if(afm){
    getData("https://80.245.167.105:19580/erpapi/getorders/obj?pars=",data,true).then(data => setOrders(data))
  }

}, [afm]);

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
