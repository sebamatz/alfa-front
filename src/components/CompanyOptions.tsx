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
  Box,
} from "@material-ui/core";
import Radio, { RadioProps } from "@material-ui/core/Radio";

import { companies } from "../constants";

type Props = {
  optionValue: (value: string | {}) => void;
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

const CompanyOptions = () => {
  const classes = useStyles();

  const [company, setCompany] = useState(companies.ALFA);

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = (event.target as HTMLInputElement).value;
    setCompany(v);
  };

  return (
    <Box sx={{ pl: 2 }}>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="orders"
          row
          name="orders"
          value={company}
          onChange={handleChangeType}
        >
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <FormControlLabel
                value={companies.ALFA}
                control={<GreenRadio />}
                label={companies.ALFA}
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                value={companies.ALUSET}
                control={<GreenRadio />}
                label={companies.ALUSET}
                disabled
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default CompanyOptions;
