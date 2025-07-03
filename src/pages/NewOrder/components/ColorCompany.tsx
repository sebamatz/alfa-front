import { useEffect, useCallback } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useContext } from "react";
import { NewOrderContext } from "../NewOrderContext";
import { getItems } from "../../../api/fetch";

export default function ColorCompany() {
  const {
    colorCompany,
    setColorCompany,
    selectedColorCompany,
    setSelectedColorCompany,
    setSelectedTrdpgroup,
  } = useContext(NewOrderContext);

  const getColorCompanies = useCallback(async () => {
    const data60 = await getItems({ BOption: 60, Company: 10, AFM: "" });
    setColorCompany(
      data60.map((item: { trdr: number; name: string; trdpgroup: number }) => ({
        trdr: item.trdr,
        name: item.name,
        trdpgroup: item.trdpgroup,
      }))
    );
  }, [setColorCompany]);

  const handleChangeCompany = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const company = colorCompany.find(
      (company: { trdr: number }) => company.trdr === event.target.value
    );
    setSelectedColorCompany(company?.trdr);
    setSelectedTrdpgroup(company?.trdpgroup);
  };

  useEffect(() => {
    if (!colorCompany.length) getColorCompanies();
  }, [colorCompany, getColorCompanies]);

  return (
    <Grid item xs={12} md={3}>
      <FormControl fullWidth style={{ maxWidth: 300 }}>
        <InputLabel id="demo-simple-select-label">Επιλογή Βαφείου</InputLabel>
        <Select
          labelId="demo-simple-select-company-label"
          id="demo-simple-select-company"
          value={selectedColorCompany}
          label="Επιλογή Βαφείου 60"
          onChange={handleChangeCompany}
        >
          {colorCompany.map((colorCompany: { trdr: number; name: string }) => (
            <MenuItem key={colorCompany.trdr} value={colorCompany.trdr}>
              {colorCompany.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
