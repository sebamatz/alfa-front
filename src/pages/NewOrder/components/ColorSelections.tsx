import { useCallback, useContext } from "react";
import { useEffect, useState } from "react";
import { NewOrderContext } from "../NewOrderContext";
import { getItems } from "../../../api/fetch";
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
import { company } from "../../../config";

interface IColorData {
  ccCPOUDRAID: number;
  sku: string;
}

export default function ColorSelections() {
  const { setColorValue, colorValue } = useContext(NewOrderContext);

  const [colorTypes, setColorTypes] = useState([]);
  const [colorType, setColorType] = useState(null);
  const [manifacturer, setManifacturer] = useState([]);
  const [selectedManifacturer, setSelectedManifacturer] = useState("");
  const [colorData, setColorData] = useState<IColorData[]>([]);

  const handleGetCollorData = async (boption: number) => {
    switch (boption) {
      case 30:
        const data30 = await getItems({ BOption: 30, Company: company });
        setColorTypes(
          data30.map((item: { id: number; name: string }) => ({
            id: item.id,
            name: item.name,
          }))
        );
        break;
      case 40:
        const data40 = await getItems({ BOption: 40, Company: company });
        setManifacturer(
          data40.map((item: { id: number; code: string }) => ({
            trdr: item.id,
            name: item.code,
          }))
        );
        break;
      default:
        break;
    }
  };

  const handleChangeColorType = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      //reset all values
      setColorValue(null);
      setSelectedManifacturer("");
      setManifacturer([]);
      setColorType(event.target.value as string);
    },
    [setColorType, setColorValue, setSelectedManifacturer, setManifacturer]
  );

  const handleChangeManifacturer = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setColorValue(null);
      setSelectedManifacturer(event.target.value as string);
    },
    [setColorValue]
  );

  const handleInputChange = useCallback(
    (event: React.SyntheticEvent, newInputValue: string) => {
      setColorValue(newInputValue);
    },
    [setColorValue]
  );

  const handleChangeColor = useCallback(
    (event: any, newValue: any | string | null) => {
      setColorValue(newValue ?? "");
    },
    [setColorValue]
  );

  const handleGetColor = useCallback(async () => {
    const data: IColorData[] = await getItems({
      BOption: 50,
      Company: company,
      //if colorType is 3, then id is 20, else id is selectedManifacturer
      id: Number(colorType) === 3 ? 20 : Number(selectedManifacturer),
      LastId: Number(colorType),
      SearchValue: colorValue,
    });
    //[{"ccCPOUDRAID":15606,"sku":"SE802G-MATT-1002"}]
    setColorData(data);
  }, [colorType, colorValue, selectedManifacturer]);

  useEffect(() => {
    handleGetCollorData(30);
  }, []);

  useEffect(() => {
    if (colorType === "3") {
      handleGetCollorData(50);
      return;
    } else {
      handleGetCollorData(40);
    }
  }, [colorType]);

  useEffect(() => {
    if (selectedManifacturer && colorType !== "3") {
      handleGetColor();
    }
  }, [selectedManifacturer, handleGetColor, colorType]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth style={{ maxWidth: 300 }}>
          <InputLabel id="demo-simple-select-label">Τύπος Χρώματος</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={colorType}
            label="Age"
            onChange={handleChangeColorType}
          >
            {colorTypes.map((colorType) => (
              <MenuItem key={colorType.id} value={colorType.id}>
                {colorType.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {colorType === 3 ? (
        <Grid item>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                onChange={(e) => handleChangeColor(e, e.target.value)}
                label="Κωδικός..."
                disabled={false}
                value={colorValue}
              />
            </Grid>
            <Grid item>
              <SearchIcon />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} md={3}>
          <FormControl fullWidth style={{ maxWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">
              Επιλογή Κατασκευαστή
            </InputLabel>
            <Select
              labelId="demo-simple-select-manifacturer-label"
              id="demo-simple-select-manifacturer"
              value={selectedManifacturer}
              label="Επιλογή Κατασκευαστή 40"
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
        <Grid item xs={12} md={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={12} alignItems="center">
              <Autocomplete
                style={{ maxWidth: 300 }}
                freeSolo
                value={colorValue?.value ?? ""}
                onChange={handleChangeColor}
                onInputChange={handleInputChange}
                options={colorData}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.sku
                }
                renderInput={(params) => (
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                  >
                    <Grid item xs={12} md={10}>
                      <Grid container alignItems="flex-end">
                        <Grid item xs={10}>
                          <TextField fullWidth {...params} label="Κωδικός..." />
                        </Grid>
                        <Grid item>
                          <SearchIcon />
                        </Grid>
                      </Grid>
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
