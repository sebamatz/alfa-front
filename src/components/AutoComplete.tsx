// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getData } from "../api/fetch";

interface CountryType {
  name: string;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<CountryType[]>([]);
  const [value, setValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(null);


  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const v = e.target.value;
    if (v.length >= 4) {
      setLoading(true);
      setValue(v);
    }
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (value) {
        const data = {
          SearchValue: value,
          BOption: 0,
          DFrom: null,
          DTo: null,
          TakeRecs: null,
          Id: null,
          LastId: null,
          AFM: "Προφίλ",
        };

        const response = await getData(
          "https://80.245.167.105:19580/erpapi/getitems/obj?pars=",
          data
        );
        //await sleep(1e3); // For demo purposes.

        const list = response.map((item: any) => {
          return { name: item.name, value: item.code };
        });

        if (active) {
          setOptions(list ? list : []);
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [value]);

  React.useEffect(() => {
    console.log("selectedValue",selectedValue)
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const filterOptions = createFilterOptions({
    stringify: (option:any) => option.value,
  });
  return (
    <Autocomplete
      filterOptions={filterOptions}
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e,v) => {
        // console.log(v.value)

        v&&setSelectedValue(v.value)
      }}

      
      getOptionSelected={(option, value) => option.code === value.code}
      renderOption={(option) =><div>{option.name}</div>}
      options={options}
      loading={loading}
      value={selectedValue}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          
        />
      )}
    />
  );
}
