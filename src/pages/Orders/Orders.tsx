import React, { useState } from "react";

import DataTable from "../../components/table/Table";
import { HeadCell, Data } from "../../types";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { PENDING } from "../constants";
import OrderOptions from "./components/OrderOptions";
import DatePickers from "./components/DatePickers";
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
      marginTop:theme.spacing(4)
    },
    title:{
      padding: theme.spacing(2),
    }
  })
);

export const Orders = ({orders}:any) => {
  const classes = useStyles();
  const [value, setValue] = useState(PENDING);
  const [orderDetails, setDetails] = useState([]);

  const [dateFrom, setDateFrom] = useState<Date | null>(
    null
  );
  const [dateto, setDateTo] = useState<Date | null>(
    null
  );

  const master = Object.keys(orders).map((key)=>{
   return orders[key][0]}
    )

  const optionValue = (value: string) => {
    setValue(value);
  };

  const getDetails = (data: any) => {
    const {generatedKey} =data[0]
    setDetails(orders[generatedKey]);
  };

  const headCells: HeadCell[] = [
    { id: "fincode", numeric: false, label: "ΠΑΡΑΓΓΕΛΙΑ" },
    { id: "trndate", numeric: false, label: "ΗΜ/ΝΙΑ" },
    { id: "status", numeric: true, label: "STATUS" },
  ];

  const headCellsDetails:any = [
    { id: "fincode", numeric: false, label: "ΠΑΡΑΓΓΕΛΙΑ" },
    { id: "trndate", numeric: false, label: "ΗΜ/ΝΙΑ" },
    { id: "status", numeric: false, label: "STATUS" },
    { id: "sku", numeric: false, label: "ΚΩΔΙΚΟΣ" },
    { id: "mtrlname", numeric: false, label: "ΠΕΡΙΓΡΑΦΗ" },
    { id: "qtY2", numeric: true, label: "ΒΕΡΓΕΣ" },
    { id: "qtY1", numeric: true, label: "ΚΙΛΑ" },
    { id: "xdocname", numeric: false, label: "ΤΟΜΗ" },
    { id: "commentS1", numeric: false, label: "ΠΑΡΑΤΗΡΗΣΕΙΣ" }
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} >
        <Typography className={classes.title}>ΑΝΑΖΗΤΗΣΗ ΠΑΡΑΓΓΕΛΙΑΣ</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <OrderOptions optionValue={optionValue} />
          </Grid>
          <Grid item xs={12} sm={6}>
            {value !== PENDING && <DatePickers getDateFrom={setDateFrom} getDateTo={setDateTo} />}
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} sm={12} className={classes.table}>
        <DataTable
          name="master"
          onRowclick={getDetails}
          rows={master}
          headCells={headCells}
          maxCols={3}
        />
      </Grid>
      <Grid item lg={12} sm={12} className={classes.table}>
        <Grid item xs={12} >
        <Typography className={classes.title}>ΑΝΑΛΥΣΗ ΠΑΡΑΓΓΕΛΙΑΣ</Typography>
      </Grid>
        <DataTable
          name="details"
          onRowclick={getDetails}
          rows={orderDetails}
          headCells={headCellsDetails}
        />
      </Grid>
    </Grid>
  );
};
