import { useState,useCallback } from "react";

import DataTable from "../../components/table/Table";
import BackToMenu from "../../components/BackToMenu";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { PENDING } from "../constants";
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

export const NewOrder = ({ orders }: any) => {
  const classes = useStyles();
  const [value, setValue] = useState(PENDING);
  const [rowCount, setRowCount] = useState(false);


  const optionValue = (value: string) => {
    setValue(value);
  };


  const getRows = useCallback(
    (rows) => {
      setRowCount(rows.length>0)
    },
    [],
  );

  const headCellsDetails: any = [
    { id: "fincode", numeric: false, label: "ΠΑΡΑΓΓΕΛΙΑ" },
    { id: "sku", numeric: false, label: "ΚΩΔΙΚΟΣ" },
    { id: "mtrlname", numeric: false, label: "ΠΕΡΙΓΡΑΦΗ" },
    { id: "qtY2", numeric: true, label: "ΒΕΡΓΕΣ" },
    { id: "qtY1", numeric: true, label: "ΚΙΛΑ" },
    { id: "xdocname", numeric: false, label: "ΤΟΜΗ" },
    { id: "commentS1", numeric: false, label: "ΠΑΡΑΤΗΡΗΣΕΙΣ" },
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      <BackToMenu />
      <Grid item xs={12}>
        <Typography className={classes.title}>ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <OrderOptions optionValue={optionValue} isDisabled={rowCount} />
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
  );
};
