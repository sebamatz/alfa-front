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
    },
    button:{
      minWidth:"250px",
      marginBottom:"20px"

    }
  })
);

export const Dashboard = (props: Props) => {
  const classes = useStyles();

  React.useEffect(() => {
    fetch("https://80.245.167.105:19580/erpapi/getcv/169252")
      .then((response) => response.json())
      .then(
        (json) =>
          (console.log("json",json))
      );
  }, []);

  return (
    <div className={classes.dashboard}>
      <Grid container >
        <Grid item lg={6} xs={12}>
          <Link to="/orders">
            <Button variant="contained" color="primary" className={classes.button}>
              <Typography>ΑΝΑΖΗΤΗΣΗ ΠΑΡΑΓΓΕΛΙΑΣ</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Link to="/new">
            <Button variant="contained" color="primary" className={classes.button}>
              <Typography>ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ</Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
