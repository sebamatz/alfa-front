import React, { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  withStyles,
  Grid,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Radio, { RadioProps } from "@material-ui/core/Radio";

import { PENDING, DATE_SEARCH } from "../../../constants";

type Props = {
  optionValue: (value: string) => void;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    radios: {
      textAlign: "left",
    },
  })
);

const GreenRadio = withStyles(({ palette }) => ({
  root: {
    color: palette.primary.main,
    "&$checked": {
      color: palette.primary.main,
    },
  },

  checked: {},
}))((props: RadioProps) => <Radio color="default" {...props} />);

const OrderOptions = ({ optionValue }: Props) => {
  const classes = useStyles();

  const [value, setValue] = useState(PENDING);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = (event.target as HTMLInputElement).value;
    setValue(v);
    optionValue(v);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="orders"
        name="orders"
        value={value}
        onChange={handleChange}
      >
        <Grid container className={classes.radios}>
          <Grid item xs={12}>
            <FormControlLabel
              value={PENDING}
              control={<GreenRadio />}
              label="Ανεκτέλεστες Παραγγελίες"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              value={DATE_SEARCH}
              control={<GreenRadio />}
              label="Σύνθετη Αναζήτηση"
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default OrderOptions;
