import React, { useContext, useEffect, useState } from "react";
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
import Autocomplete from "../../../components/AutoComplete";
import { getItems } from "../../../api/fetch";
import ColorSelections from "./ColorSelections";

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
    colorValue,
  } = useContext(NewOrderContext);
  const { comments } = selectedInfo.data;

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

  const afmValue = (document.getElementById("userAfm") as HTMLInputElement)
    ?.value;

  // const handleGetCollorType = async () => {
  //   const data = await getItems({ BOption: 40, Company: 1, AFM: "" });
  //   console.log(data);
  // };

  // useEffect(() => {
  //   if (orderColor === profilColors.COLOR) {
  //     handleGetCollorType();
  //   }
  // }, [orderColor]);

  return (
    <FormControl component="fieldset" fullWidth>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
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
            </Grid>
          </RadioGroup>
        </Grid>
        <Grid item xs={12} md={12}>
          {afmValue === "777777777" && orderColor === profilColors.COLOR ? (
            <Grid item>
              <ColorSelections />
            </Grid>
          ) : (
            orderColor === profilColors.COLOR && (
              <Grid item>
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      onChange={handleChangeColor}
                      label="Κωδικός..."
                      disabled={isDisabled}
                      value={colorValue}
                    />
                  </Grid>
                  <Grid item>
                    <SearchIcon />
                  </Grid>
                </Grid>
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default OrderOptions;
