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
  })
);

export const Dashboard = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.dashboard}>
      <Grid container lg={6}>
        <Grid item xs={6}>
          <Link to="/orders">
            <Button variant="contained" color="primary">
              <Typography >
              ΑΝΑΖΗΤΗΣΗ ΠΑΡΑΓΓΕΛΙΑΣ
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/new">
            <Button variant="contained" color="primary">
              <Typography >
                ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
