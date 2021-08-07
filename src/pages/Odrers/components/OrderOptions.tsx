import React, { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { PENDING, DATE_SEARCH } from "../constants";


type Props = {
    optionValue:(value: string) => void;
}

const OrderOptions = ({optionValue}:Props) => {
  const [value, setValue] = useState(PENDING);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = (event.target as HTMLInputElement).value
    setValue(v);
    optionValue(v)
  };
  console.log("value", value);
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="orders"
        name="orders"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={PENDING}
          control={<Radio />}
          label="Ανεκτέλεστες Παραγγελίες"
        />
        <FormControlLabel
          value={DATE_SEARCH}
          control={<Radio />}
          label="Σύνθετη Αναζήτηση"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default OrderOptions;
