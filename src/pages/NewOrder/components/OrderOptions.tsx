import React, { useContext, useState } from "react";
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

import { profilColors } from "../../../constants";
import { NewOrderContext } from "../NewOrderContext";

type Props = {
  isDisabled: boolean;
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

const OrderOptions = ({ isDisabled }: Props) => {
  const {
    selectedInfo,
    setOrderColor,
    setColorValue,
    orderColor,
    actions,
    setFinCode,
  } = useContext(NewOrderContext);
  const { commentS1 } = selectedInfo.data;

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    actions.resetSelection();
    const v = (event.target as HTMLInputElement).value;
    // setValue(v);
    setOrderColor(v);
    setFinCode(selectedInfo.data.fincode);
    // v !== "2" && setColorValue("");
  };
  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const c = (event.target as HTMLInputElement).value;
    setColorValue(c);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="orders"
        row
        name="orders"
        value={orderColor}
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

          {orderColor === profilColors.COLOR && (
            <Grid item>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    onChange={handleChangeColor}
                    label="Κωδικός..."
                    disabled={isDisabled}
                    value={commentS1}
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
