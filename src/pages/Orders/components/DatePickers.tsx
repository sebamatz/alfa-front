import React,{ useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { alpha, createStyles, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


type Props = {
  getDateFrom: (date: Date| null) =>void;
  getDateTo: (date: Date| null) =>void;

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      border:'solid 1px',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    date:{
      textAlign: "left"
    }
  }),
);

const DatePickers = ({getDateFrom,getDateTo}:Props) => {
  const classes = useStyles();

  // The first commit of Material-UI
  const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(
    new Date()
  );
  const [selectedDateTo, setSelectedDateTo] = useState<Date | null>(new Date());
  const handleDateChangeFrom = (date: Date | null) => {
    setSelectedDateFrom(date);
    getDateFrom(date)
  };
  const handleDateChangeTo = (date: Date | null) => {
    setSelectedDateTo(date);
    getDateTo(date)
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container xs={12} spacing={3} justifyContent="flex-start">
        <Grid item xs={6} className={classes.date}>
          <DatePicker
            autoOk
            disableToolbar
            format="dd/MM/yyyy"
            margin="normal"
            id="Form"
            label="ΑΠΟ"
            value={selectedDateFrom}
            onChange={handleDateChangeFrom}
          />
        </Grid>
        <Grid item xs={6} className={classes.date}>
          <DatePicker
            autoOk
            disableToolbar
            margin="normal"
            id="date-picker-dialog"
            label="ΕΩΣ"
            format="dd/MM/yyyy"
            value={selectedDateTo}
            onChange={handleDateChangeTo}
          />
        </Grid>
        <Grid item>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Κωδικός..." />
          </Grid>
        </Grid>
          </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePickers;
