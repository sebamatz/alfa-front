import { useCallback, useContext } from "react";
import { useEffect, useState } from "react";
import { NewOrderContext } from "../NewOrderContext";
import { getItems, IGetItems } from "../../../api/fetch";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ColorSelections() {
  const { setColorValue, colorValue } = useContext(NewOrderContext);

  const [colorTypes, setColorTypes] = useState([]);
  const [colorType, setColorType] = useState("");
  const [colorCompany, setColorCompany] = useState([]);
  const [selectedColorCompany, setSelectedColorCompany] = useState("");
  const [manifacturer, setManifacturer] = useState([]);
  const [selectedManifacturer, setSelectedManifacturer] = useState("");
  const [colorData, setColorData] = useState([]);

  const handleGetCollorData = async (boption: number) => {
    switch (boption) {
      case 40:
        const data40 = await getItems({ BOption: 40, Company: 1, AFM: "" });
        setColorTypes(
          data40.map((item: { id: number; name: string }) => ({
            id: item.id,
            name: item.name,
          }))
        );
        break;
      case 60:
        const data60 = await getItems({ BOption: 60, Company: 1, AFM: "" });
        setColorCompany(
          data60.map((item: { trdr: number; name: string }) => ({
            trdr: item.trdr,
            name: item.name,
          }))
        );
        break;
      case 30:
        const data30 = await getItems({ BOption: 30, Company: 1, AFM: "" });
        setManifacturer(
          data30.map((item: { id: number; code: string }) => ({
            trdr: item.id,
            name: item.code,
          }))
        );
        break;
      default:
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setColorType(event.target.value as string);
  };

  const handleChangeCompany = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedColorCompany(event.target.value as string);
  };

  const handleChangeManifacturer = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedManifacturer(event.target.value as string);
  };

  const handleInputChange = (
    event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setColorValue(newInputValue);
  };

  const handleChangeColor = (
    event: React.SyntheticEvent,
    newValue: string | null
  ) => {
    setColorValue(newValue ?? "");
  };

  const handleGetColor = useCallback(
    async (id: number) => {
      //{BOption: 50, Company: 1, SearchValue: "tes*", id: 16, LastId:1, AFM:""}
      const data: { ccCPOUDRAID: number; sku: string }[] = await getItems({
        BOption: 50,
        Company: 1,
        AFM: "",
        id: Number(selectedManifacturer),
        LastId: Number(colorType),
        SearchValue: colorValue,
      });
      //[{"ccCPOUDRAID":15606,"sku":"SE802G-MATT-1002"}]
      setColorData(data.map((item: { sku: string }) => item.sku));
    },
    [colorType, colorValue, selectedManifacturer]
  );

  useEffect(() => {
    handleGetCollorData(40);
  }, []);

  useEffect(() => {
    if (colorType) {
      handleGetCollorData(60);
    }
  }, [colorType]);

  useEffect(() => {
    if (selectedColorCompany) {
      handleGetCollorData(30);
    }
  }, [selectedColorCompany]);

  useEffect(() => {
    if (selectedManifacturer) {
      handleGetColor(50);
    }
  }, [colorType, handleGetColor, selectedManifacturer]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Τύπος Χρώματος</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={colorType}
            label="Age"
            onChange={handleChange}
          >
            {colorTypes.map((colorType) => (
              <MenuItem key={colorType.id} value={colorType.id}>
                {colorType.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {colorType && (
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Επιλογή Βαφείου
            </InputLabel>
            <Select
              labelId="demo-simple-select-company-label"
              id="demo-simple-select-company"
              value={selectedColorCompany}
              label="Επιλογή Βαφείου"
              onChange={handleChangeCompany}
            >
              {colorCompany.map(
                (colorCompany: { trdr: number; name: string }) => (
                  <MenuItem key={colorCompany.trdr} value={colorCompany.trdr}>
                    {colorCompany.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
      )}
      {selectedColorCompany && (
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Επιλογή Κατασκευαστή
            </InputLabel>
            <Select
              labelId="demo-simple-select-manifacturer-label"
              id="demo-simple-select-manifacturer"
              value={selectedManifacturer}
              label="Επιλογή Κατασκευαστή"
              onChange={handleChangeManifacturer}
            >
              {manifacturer.map(
                (manifacturer: { trdr: number; name: string }) => (
                  <MenuItem key={manifacturer.trdr} value={manifacturer.trdr}>
                    {manifacturer.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
      )}
      {selectedManifacturer && (
        <Grid item xs={12} md={12}>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} md={12}>
              <Autocomplete
                freeSolo
                value={colorValue}
                options={colorData}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                  >
                    <Grid item xs={12} md={10}>
                      <TextField
                        fullWidth
                        {...params}
                        label="Κωδικός..."
                        onChange={(event) =>
                          handleInputChange(event, event.target.value as string)
                        }
                      />
                    </Grid>
                    <Grid item>
                      <SearchIcon />
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
