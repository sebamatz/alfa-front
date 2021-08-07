import React, { useState } from "react";

import DataTable from "../../components/table/Table";
import {HeadCell,Data} from '../../types'

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { PENDING } from "./constants";
import OrderOptions from "./components/OrderOptions";
import DatePickers from "./components/DatePickers";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export const Orders = () => {
  const classes = useStyles();

  const [value, setValue] = useState(PENDING);
  const [data1, setDetails] = useState([]);

  const optionValue = (value: string) => {
    setValue(value);
  };

  const getDetails = (data:any) => {
    console.log("data",data);
    setDetails(data)
  };


  const headCells: HeadCell[] = [
    {
      id: "name",
      numeric: false,
      label: "Dessert (100g serving)",
    },
    { id: "calories", numeric: true, label: "Calories" },
    { id: "fat", numeric: true, label: "Fat (g)" },
    { id: "carbs", numeric: true, label: "Carbs (g)" },
    { id: "protein", numeric: true, label: "Protein (g)" },
  ];
  const data:Data[] = [
    {name: "Frozen yoghurt", calories: 5, fat: 6, carbs: 24, protein: 4},
    {name: "Ice Eclair sandwich", calories: 237, fat: 9, carbs: 37, protein: 4.3},
    {name: "Ice crweam sandwich", calories: 237, fat: 9, carbs: 37, protein: 4.3},
    {name: "Ice Ecwewelair sandwich", calories: 237, fat: 9, carbs: 37, protein: 4.3},
    {name: "Ice crsdfsfsfeam sandwich", calories: 237, fat: 9, carbs: 37, protein: 4.3},
    {name: "Ice crsfdeam sandwich", calories: 237, fat: 9, carbs: 37, protein: 4.3},
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>ΑΝΑΖΗΤΗΣΗ ΠΑΡΑΓΓΕΛΙΑΣ</Typography>
        </Grid>
        <Grid item sm={12}>
          <OrderOptions optionValue={optionValue} />
          {value !== PENDING && <DatePickers />}
        </Grid>
        <Grid item lg={12} sm={12}>
          <DataTable name='master' onRowclick={getDetails} rows={data} headCells={headCells} />
        </Grid>
        <DataTable name='details' onRowclick={getDetails} rows={data1} headCells={headCells} />

      </Grid>
    </div>
  );
};
