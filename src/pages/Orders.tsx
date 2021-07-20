import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
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

  const [value, setValue] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>ΑΝΑΖΗΤΗΣΗ ΠΑΡΑΓΓΕΛΙΑΣ</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="pennding"
                control={<Radio />}
                label="Ανεκτέλεστες Παραγγελίες"
              />
              <FormControlLabel value="search" control={<Radio />} label="Σύνθετη Αναζήτηση" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item lg={12} sm={3}>
          table master
        </Grid>
        <Grid item lg={12} sm={3}>
          table detail
        </Grid>
      </Grid>
    </div>
  );
};
