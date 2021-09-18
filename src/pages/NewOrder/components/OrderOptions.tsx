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
  TextField,
} from "@material-ui/core";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import SearchIcon from "@material-ui/icons/Search";

import { profilColors, DATE_SEARCH } from "../../constants";

type Props = {
  optionValue: (value: string | {}) => void;
  isDisabled:boolean
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



const OrderOptions = ({ optionValue,isDisabled }: Props) => {
  const classes = useStyles();

  const [value, setValue] = useState(profilColors.BLANK);
  const [color, setColor] = useState("");

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = (event.target as HTMLInputElement).value;
    setValue(v);
    optionValue({ v, color: v === "2" ? color : "" });
  };
  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const c = (event.target as HTMLInputElement).value;
    setColor(c);
    optionValue(c);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="orders"
        row
        name="orders"
        value={value}
        onChange={handleChangeType}
      >
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item>
            <FormControlLabel
              value={profilColors.BLANK}
              control={<GreenRadio />}
              label="Άβαφο"
              disabled={isDisabled}
            />
          </Grid>

          <Grid item>
            <FormControlLabel
              value={profilColors.WHITE}
              disabled={isDisabled}
              control={<GreenRadio />}
              label="Λευκό"
            />
          </Grid>

          <Grid item>
            <FormControlLabel
              value={profilColors.COLOR}
              disabled={isDisabled}
              control={<GreenRadio />}
              label="Χρώμα"
            />
          </Grid>

          {value === profilColors.COLOR && (
            <Grid item>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    onChange={handleChangeColor}
                    label="Κωδικός..."
              disabled={isDisabled}

                  />
                </Grid>
                <Grid item>
                  <SearchIcon />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default OrderOptions;
