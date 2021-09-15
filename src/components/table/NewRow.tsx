import React, { useState } from "react";
import { TableRow, Input, TableCell, IconButton, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import { SaveRounded } from "@material-ui/icons";

import Autocomplete from "../AutoComplete"

interface Props {
    saveOrder:(values:any)=>void;
}

export const NewRow = ({saveOrder}:Props) => {
  const defaultValues = {
    fincode: 10,
    sku: "",
    mtrlname: "",
    qtY2: "",
    qtY1: "",
    xdocname: "",
    commentS1: "",
    actions: "",

  };

  const [values, setValue] = useState(defaultValues);
  const { fincode, sku, mtrlname, qtY2, qtY1, xdocname, commentS1 } = values;

  const handleChange = (e: any) => {
    console.log("EEEE",e)
    const name = e.target.name;
    const val = e.target.value;
    const newValue = { ...values, [name]: val };
    setValue(newValue);
  };

  const handleSave=()=>saveOrder(values)
  return (
    <TableRow>
      <TableCell>
        {/* <Input name="fincode" value={fincode} onChange={handleChange} /> */}
        <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fincode}
          onChange={handleChange}
          name="fincode"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </TableCell>
      <TableCell>
        <Autocomplete />
      </TableCell>
      <TableCell>
        <Input  value={mtrlname} onChange={handleChange} />
      </TableCell>
      <TableCell>
        <Input type='number' name="qtY2" value={qtY2} onChange={handleChange} />
      </TableCell>
      <TableCell>
        <Input name="qtY1" value={qtY1} onChange={handleChange} />
      </TableCell>
      <TableCell>
        <Input name="xdocname" value={xdocname} onChange={handleChange} />
      </TableCell>
      <TableCell>
        <Input name="commentS1" value={commentS1} onChange={handleChange} />
      </TableCell>
      <TableCell>
        <IconButton
        onClick={handleSave}
          color="primary"
          component="span"
        >
          <SaveRounded />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
