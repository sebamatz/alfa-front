import { useEffect, useState, useContext } from "react";
import DataTable from "../../components/table/Table";
import { HeadCell } from "../../types";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { PENDING } from "../../constants";
import OrderOptions from "./components/OrderOptions";
import DatePickers from "./components/DatePickers";
import Branches from "../NewOrder/components/Branches";

import { BranchesContext } from "../../context/BranchesContext";

import { CircularProgress, Typography } from "@material-ui/core";
import BackToMenu from "../../components/BackToMenu";
import { fechOrders, downloadPdf } from "../../api/fetch";
import { CustomerDrodown } from "../../components/CustomerDrodown";

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
    table_wrapper: {
      padding: theme.spacing(2),
      border: "1px solid #e0e0e0",
      borderRadius: "5px",
    },
    title: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    link: {
      textDecoration: "none",
    },
  })
);

export const Orders = () => {
  const defaultData = {
    Company: 10, 
    SearchValue: null,
    BOption: 3,
    DFrom: null,
    DTo: null,
    TakeRecs: null,
    Id: null,
    LastId: null,
  };

  const { selectedBranch,  customer} = useContext(BranchesContext); 
  const classes = useStyles();
  const [value, setValue] = useState(PENDING);
  const [orderDetails, setDetails] = useState([]);
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState(defaultData);

  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateto, setDateTo] = useState<Date | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const master = Object.keys(orders).map((key) => {
    return orders[key][0];
  });

  const optionValue = (value: string) => {
    value === PENDING && setQuery(defaultData);
    setValue(value);
    setDetails([]);
  };

  const getDetails = (data: any) => {
    const { generatedKey } = data[0];
    setDetails(orders[generatedKey]);
  };

  const getSearchData = (data) => {
    const { text, from, to } = data;
    // post with data
    setQuery({ ...query, SearchValue: text, DFrom: dateFrom, DTo: dateto });
  };

  const headCells: HeadCell[] = [
    { id: "fincode", numeric: false, label: "ΠΑΡΑΓΓΕΛΙΑ" },
    { id: "trndate", numeric: false, label: "ΗΜ/ΝΙΑ" },
    // { id: "status", numeric: false, label: "STATUS" },
    { id: "download", numeric: false, label: "ΕΚΤΥΠΩΣΗ" },
  ];

  const headCellsDetails: any = [
    { id: "fincode", numeric: false, label: "ΠΑΡΑΓΓΕΛΙΑ" },
    { id: "trndate", numeric: false, label: "ΗΜ/ΝΙΑ" },
    { id: "status", numeric: false, label: "ΣΤΑΔΙΟ ΕΠΕΞΕΡΓΑΣΙΑΣ" },
    { id: "sku", numeric: false, label: "ΚΩΔΙΚΟΣ" },
    { id: "mtrlname", numeric: false, label: "ΠΕΡΙΓΡΑΦΗ" },
    { id: "qtY2", numeric: true, label: "ΒΕΡΓΕΣ" },
    { id: "qtY1", numeric: true, label: "ΚΙΛΑ" },
    { id: "qtY2COV", numeric: true, label: "ΒΕΡΓΕΣ ΕΚΤΕΛΕΣΜΕΝΕΣ" },
    { id: "qtY2REM", numeric: true, label: "ΒΕΡΓΕΣ ΑΝΕΚΤΕΛΕΣΤΕΣ" },
    // { id: "mtcomments", numeric: false, label: "ΚΩΔΙΚΟΣ" },
    { id: "xdocname", numeric: false, label: "ΤΟΜΗ" },
    { id: "mtcommentS1", numeric: false, label: "ΠΑΡΑΤΗΡΗΣΕΙΣ" },
  ];

  const getOrders = async (data) => {
    setIsLoading(true);
    const orders: any = await fechOrders(data);
    setOrders(orders);
    setIsLoading(false);
  };

  useEffect(() => {
    if (customer?.afm ) {
      if (selectedBranch?.trdbranch) {
        getOrders({
          ...query,
          AFM: customer?.afm,
          TrdrBranch: selectedBranch?.trdbranch,
        });
      }else{
        getOrders({ ...query, AFM: customer?.afm });
      }
    }
  
  }, [customer?.afm, query, selectedBranch, customer?.branches.length]);

  return (
    <Grid container spacing={3} justifyContent="center">
      <BackToMenu />

      <Grid item xs={12}>
        <Typography className={classes.title}>ΑΝΑΖΗΤΗΣΗ ΠΑΡΑΓΓΕΛΙΑΣ</Typography>
        <CustomerDrodown />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>{customer?.branches.length > 1 && <Branches />}</Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <OrderOptions optionValue={optionValue} />
          </Grid>
          <Grid item xs={12} sm={6}>
            {value !== PENDING && (
              <DatePickers
                getSearchData={getSearchData}
                getDateFrom={setDateFrom}
                getDateTo={setDateTo}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} sm={12} className={classes.table}>
        <div className={classes.table_wrapper}>
          {isLoading && <CircularProgress />}
          {!isLoading && (
          <DataTable
            name="master"
            onRowclick={getDetails}
            rows={orders && master}
            headCells={headCells}
            // maxCols={5}
            selectedRow={orderDetails[0]}
            getPdf={downloadPdf}
            // pagination={false}
          />)} 
          
        </div>
      </Grid>
      <Grid item xs={6} />
      <Grid item lg={12} sm={12} className={classes.table}>
        <Grid item xs={12}>
          <Typography className={classes.title}>ΑΝΑΛΥΣΗ ΠΑΡΑΓΓΕΛΙΑΣ</Typography>
        </Grid>
        {orderDetails[0]?.ficomments && (
          <span>
            Αιτιολογία: {orderDetails[0].ficomments}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        )}

        {orderDetails[0]?.remarks && (
          <span>Παρατηρήσεις: {orderDetails[0].remarks}</span>
        )}

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
