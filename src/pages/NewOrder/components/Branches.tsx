import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import React, { ReactElement, useContext, useEffect } from "react";
import { BranchesContext } from "../../../context/BranchesContext";
import { IBranch } from "../../../api/types";

interface Props {}

export default function Branches({}: Props): ReactElement {
  const { branch, selectedBranch, setSelectBranch } =
    useContext(BranchesContext);

  const handleSelectBranch = (e: any) => {
    let val = e.target.value;
    const selected = branch.find((data: IBranch) => data.branchcode === val);
    setSelectBranch(selected);
  };

  return (
    <FormControl fullWidth>
      <InputLabel className="branch" id="demo-simple-select-label">
        ΚΑΤΑΣΤΗΜΑ
      </InputLabel>
      {branch.length > 0 && (
        <Select
          onChange={handleSelectBranch}
          name="fincode"
          value={selectedBranch?.branchcode}
        >
          {branch.map((v: IBranch, i) => ( 
            <MenuItem value={v.branchcode}>{v.address}</MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
}
