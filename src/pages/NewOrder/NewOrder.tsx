import { useState,useCallback,createContext } from "react";

import DataTable from "../../components/table/Table";
import BackToMenu from "../../components/BackToMenu";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OrderOptions from "./components/OrderOptions";
import { Typography } from "@material-ui/core";
import  {NewOrderContext} from "./NewOrderContext";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    table: {
      overflow: "auto",
      marginTop: theme.spacing(4),
    },
    title: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
  })
);


export const NewOrder = ({ orders }: any) => {
  const optionValue = (value: string) => {
    setColor(value);
  };

  const getType = (value: string) => {
    setGroup(value);
  };


  const getRows = useCallback(
    (rows) => {
      setRows(rows)
    },
    [],
  );
  
  const getSelection = useCallback(
    (selectionData) => {
      setSelectedInfo(selectionData)
    },
    [],
  );
  const resetSelection = useCallback(
    () => {
      setSelectedInfo(defaultValues.data)
    },
    [],
  );
  const defaultValues: any = {
    data:{ search:null,
     fincode: "Πρόφιλ",
     sku: "",
     mtrlname: "",
     qtY2: 1,
     qtY1: null,
     xdocname: "",
     commentS1: "",
     actions: "",
     color:"0"
    },
    actions:{
      getType,
      getSelection, 
      resetSelection
    }
   };
  const classes = useStyles();

  // Sets value of the radio buttons
  const [value, setColor] = useState("0");
  const [type, setGroup] = useState("Πρόφιλ");
  const [selectedInfo, setSelectedInfo] = useState(defaultValues.data)



  //Defines disabled fields
  const [rows, setRows] = useState([]);


 

  const headCellsDetails: any = [
    { id: "fincode", numeric: false, label: "ΟΜΑΔΑ" },
    { id: "sku", numeric: false, label: "ΚΩΔΙΚΟΣ" },
    { id: "mtrlname", numeric: false, label: "ΠΕΡΙΓΡΑΦΗ" },
    { id: "qtY2", numeric: true, label: "ΒΕΡΓΕΣ" },
    { id: "qtY1", numeric: true, label: "ΚΙΛΑ" },
    { id: "xdocname", numeric: false, label: "ΤΟΜΗ" },
    { id: "commentS1", numeric: false, label: "ΠΑΡΑΤΗΡΗΣΕΙΣ" },
  ];

 



 
  return (
    <NewOrderContext.Provider value={{...defaultValues,selectedInfo}}>
    <Grid container spacing={3} justifyContent="center">
      <BackToMenu />
      <Grid item xs={12}>
        <Typography className={classes.title}>ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <OrderOptions optionValue={optionValue} isDisabled={rows.length>0} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} sm={12} className={classes.table}>
        <DataTable
          name="details"
          onRowclick={() => false}
          headCells={headCellsDetails}
          clearCell
          rows={[]}
          add
          getRows={getRows}
          />
      </Grid>
    </Grid>
    </NewOrderContext.Provider>
  );
};
