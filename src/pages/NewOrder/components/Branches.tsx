import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { BranchesContext } from "../../../context/BranchesContext";
import { IBranch } from "../../../api/types";

interface Props {}

export default function Branches({}: Props): ReactElement {
  const { customer, selectedBranch, setSelectedBranch } = 
    useContext(BranchesContext);
    const [branches, setBranches] = useState([]);

  const handleSelectBranch = (e: any) => {
    let val = e.target.value;
    const selected = customer.branches.find((data: IBranch) => data.branchcode === val);
    setSelectedBranch(selected);
  };
  useEffect(() => {
    if(customer?.branches.length > 0){
      setBranches(selectedBranch?.branchcode);
    }
  }, [selectedBranch]);

  return (
    <FormControl fullWidth>
      <InputLabel className="branch" id="demo-simple-select-label">
        ΚΑΤΑΣΤΗΜΑ
      </InputLabel>
      {customer?.branches.length > 0 && (
        <Select
          onChange={handleSelectBranch}
          name="fincode"
          value={branches}
        >
          {customer?.branches.map((v: IBranch, i) => ( 
            <MenuItem key={i} value={v.branchcode}>{v.address}</MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
}
