import React, { useState } from "react";
import { TableRow, Input, TableCell, IconButton } from "@material-ui/core";
import { SaveRounded } from "@material-ui/icons";

import Autocomplete from "../AutoComplete"

interface Props {
    saveOrder:(values:any)=>void;
}

export const NewRow = ({saveOrder}:Props) => {
  const defaultValues = {
    fincode: "",
    sku: "",
    mtrlname: "",
    qtY2: "",
    qtY1: "",
    xdocname: "",
    commentS1: "",
  };

  const [values, setValue] = useState(defaultValues);
  const { fincode, sku, mtrlname, qtY2, qtY1, xdocname, commentS1 } = values;

  const handleChange = (e: any) => {
    console.log("EEE", e);
    const name = e.target.name;
    const val = e.target.value;

    const newValue = { ...values, [name]: val };
    console.log("newValuenewValue", newValue);
    setValue(newValue);
  };

  const handleSave=()=>saveOrder(values)
  return (
    <TableRow>
      <TableCell>
        <Input name="fincode" value={fincode} onChange={handleChange} />
      </TableCell>
      <TableCell>
        <Autocomplete />
      </TableCell>
      <TableCell>
        <Input name="mtrlname" value={mtrlname} onChange={handleChange} />
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
          aria-label="upload picture"
          component="span"
        >
          <SaveRounded />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
