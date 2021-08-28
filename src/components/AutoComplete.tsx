// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    console.log("e", e.target.value);
    const v = e.target.value;
    if (v.length >= 4) {
      setLoading(true);
      setValue(v);
    }
  };

  React.useEffect(() => {
    console.log("value", value);
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (value) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${value}`
        );
        //await sleep(1e3); // For demo purposes.

        const countries = await response.json();

        console.log("countries", countries);
        const { results = [], error = null } = countries;

        const data = results.map((item: any) => {
          return { name: item.name, value: item.id };
        });
        console.log("data", data);

        if (active) {
          setOptions(data ? data : []);
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [value]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
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
            )
          }}
        />
      )}
    />
  );
}
