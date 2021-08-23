import React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dashboard: {
      display: "flex",
      alignItems: "center",
      height: "75vh",
      justifyContent: "center",
      textAlign: "center",
    },
    button:{
      minWidth:"250px",
      marginBottom:"20px"

    },
    link:{
      textDecoration: "none",
    }
  })
);

export const Dashboard = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.dashboard}>
      <Grid container >
        <Grid item xs={12} lg={6} >
          <Link className={classes.link} to="/orders">
            <Button variant="contained" color="primary" className={classes.button}>
              <Typography>ΑΝΑΖΗΤΗΣΗ ΠΑΡΑΓΓΕΛΙΑΣ</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item  xs={12} lg={6}>
          <Link className={classes.link} to="/new">
            <Button variant="contained" color="primary" className={classes.button}>
              <Typography>ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ</Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
