import { getbranches } from "../api/fetch";
import { IGetBranchesResponse } from "../api/types";
import { searchBranches } from "../api/fetch";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { useContext } from "react";
import { BranchesContext } from "../context/BranchesContext";

export const CustomerDrodown = () => {
  const {
    selectedBranch,
    setCustomer,
    customer,
    isEmployee,
    setBranches,
    branches,
  } = useContext(BranchesContext);

  const handleSelectBranch = async (event, value) => {
    const selectedBranch: IGetBranchesResponse = branches.find(
      (branch: IGetBranchesResponse) => branch?.afm === value?.afm
    );
    console.log("event", event);
    let data: IGetBranchesResponse[] = [];
    try {
      const data = await getbranches(selectedBranch?.afm);
      setCustomer(data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleGetBranches = async (event, value) => {
    console.log("event", event);
    const data: IGetBranchesResponse[] = await searchBranches(value);
    setBranches(data);
  };

  if (!isEmployee) {
    return null;
  }
  

  return (
    <Autocomplete
      style={{ width: 350, maxWidth: "100%" }}
      options={branches}
      getOptionLabel={(option: IGetBranchesResponse) => option.trdrname}
      renderInput={(params) => <TextField {...params} label="Επιλογή Πελάτη" />}
      onChange={handleSelectBranch}
      onInputChange={handleGetBranches}
      value={selectedBranch?.trdrname}
    />
  );
};
