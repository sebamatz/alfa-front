import { useState, useCallback,useEffect } from "react";
import { NewOrderContext } from "./NewOrderContext";

import DataTable from "../../components/table/Table";
import BackToMenu from "../../components/BackToMenu";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OrderOptions from "./components/OrderOptions";
import { Typography } from "@material-ui/core";

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

const defaultValues: any = {
  data: {
    search: null,
    fincode: "Πρόφιλ",
    sku: "",
    mtrlname: "",
    qtY2: "",
    qtY1: "",
    xdocname: "",
    commentS1: "",
    color: "0",
    qtY1Def:"",

  },
};
export const NewOrder = () => {


  const [rows, setRows] = useState([]);

  const [selectedInfo, setSelectedInfo] = useState(defaultValues);
  const getRows = useCallback((rows) => {
    setRows(rows);
  }, []);

  const getSelection = useCallback((selectionData) => {
    setSelectedInfo({
      ...selectedInfo,
      "data": {
        ...selectedInfo.data,
        search: selectionData.code,
        fincode: selectionData.u5NAME,
        sku: selectionData.sku,
        mtrlname: selectionData.name,
        qtY1: selectionData.mU21,
        qtY2: 1,
        xdocname: selectionData.xdocname,
        qtY1Def: selectionData.mU21,

      },
    });
  }, [selectedInfo]);


  const setComments = useCallback((comments) => {
    setSelectedInfo({
      ...selectedInfo,
      "data": {
        ...selectedInfo.data,
        commentS1: comments

      },
    });
  }, [selectedInfo]);



  const setWeight = useCallback((selectionData) => {

    const kg = (parseFloat(selectionData) * parseFloat(selectedInfo.data.qtY1Def)).toFixed(2);
    // eslint-disable-next-line no-new-wrappers
    const num = new Number(kg).toLocaleString("el-GR");
    setSelectedInfo({
      ...selectedInfo,
      "data": {
        ...selectedInfo.data,
        qtY1: num,
        qtY2: selectionData
      },
    }
    );
  }, [selectedInfo]);

  const resetSelection = useCallback(() => {
    setSelectedInfo(defaultValues);
  }, []);

  const actions ={
    getSelection,
    resetSelection,
  }

 


  const classes = useStyles();

  // Sets value of the radio buttons

  //Orders created

  const handleSetSelectedValue = (val) => {
    setSelectedInfo({
      ...selectedInfo,
      data: { ...selectedInfo.data, search: val },
    });
  };


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
    <NewOrderContext.Provider
      value={{ selectedInfo,actions, handleSetSelectedValue,setWeight,setComments }}
    >
      <Grid container spacing={3} justifyContent="center">
        <BackToMenu />
        <Grid item xs={12}>
          <Typography className={classes.title}>ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <OrderOptions
                optionValue={defaultValues.data.fincode}
                isDisabled={rows.length > 0}
              />
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
