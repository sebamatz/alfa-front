import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  TableRow,
  Input,
  TableCell,
  IconButton,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import Select from "@material-ui/core/Select";
import { SaveRounded } from "@material-ui/icons";

import Autocomplete from "../AutoComplete";

import { fechGroups } from "../../api/fetch";
import { NewOrderContext } from "../../pages/NewOrder/NewOrderContext";

interface Props {
  saveOrder: (values: any) => void;
}

const defaultvalues = {
  search: null,
  fincode: "Πρόφιλ",
  sku: "",
  mtrlname: "",
  qtY2: 1,
  qtY1: null,
  xdocname: "",
  commentS1: "",
  actions: "",
  color: "0",
};

export const NewRow = ({ saveOrder }: Props) => {
  const { data, actions } = useContext(NewOrderContext);
  const { getType, getSelection } = actions;

  const [values, setValue] = useState(defaultvalues);
  const [groups, setGroups] = useState([]);
  const [weight, setWeigth] = useState(defaultvalues.qtY1);
  const [group, setGroup] = useState(defaultvalues.fincode);

  const handleChange = (e: any) => {
    const name = e.target.name;
    let val = e.target.value;

    console.log("name", name);
    console.log("val", val);

    let newValue = { ...values, [name]: val };
    setValue(newValue);
    if (name === "qtY2" && weight && val) {
      const kg = (parseFloat(val) * parseFloat(weight)).toFixed(2);

      // eslint-disable-next-line no-new-wrappers
      var num = new Number(kg).toLocaleString("el-GR");
      if (val > 0) {
        newValue = {
          ...values,
          [name]: val,
          qtY1: num,
        };
        setValue(newValue);
      }
    }
    if (name === "fincode") {
      setValue(defaultvalues);
      setWeigth(null);

      setGroup(val);
      // getType(val);
    }
  };
  const getSelectedData = (selectedData) => {
    console.log(selectedData);
    getSelection(selectedData);
    //code: "4FA10010000A"
    // company: 1defaultValues
    // mU12MODE: 1value,
    // mU21: 3.45
    // mtrl: 4856
    // mtruniT2: 17    console.log("getSelectedData", data);

    // u5NAME: "Προφίλ"
    // utbL05: 1{

    const newValues = {
      ...values,
      mtrlname: selectedData.name,
      qtY1: selectedData.mU21,
      sku: selectedData.code,
      xdocname: selectedData.xdocname,
    };
    setWeigth(selectedData.mU21);
    setValue(newValues);
  };

  const getGroups = useCallback(async () => {
    const groups = await fechGroups();
    setGroups(groups);
  }, []);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const handleSave = () => saveOrder(values);
  return (
    <TableRow>
      <TableCell>
        <FormControl>
          {groups.length > 0 && (
            <Select onChange={handleChange} name="fincode" value={group}>
              {groups.map((v: any, i) => (
                <MenuItem value={v.name}>{v.name}</MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </TableCell>
      <TableCell>
        <Autocomplete
          setSelectedData={getSelectedData}
          searchValue={values.search}
        />
      </TableCell>
      <TableCell>
        <Input
          value={values.mtrlname}
          disabled
          onChange={handleChange}
          title={values.mtrlname}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          name="qtY2"
          value={values.qtY2}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <Input
          name="qtY1"
          value={values.qtY1}
          disabled
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        {values.xdocname ? (
          <img
            alt="xdocname"
            src={`https://alfa-press.gr/wp-content/themes/porto-child/erp/icons/${values.xdocname}`}
            height="90"
          />
        ) : (
          <ImageIcon />
        )}
      </TableCell>
      <TableCell>
        <Input
          name="commentS1"
          value={values.commentS1}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={handleSave} color="primary" component="span">
          <SaveRounded />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
