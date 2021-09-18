// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import { Fragment, useContext, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getData } from "../api/fetch";
import { NewOrderContext } from "../pages/NewOrder/NewOrderContext";

interface CountryType {
  name: string;
  data: any;
}

export default function Asynchronous({ setSelectedData,searchValue}) {
 

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const v = e.target.value;
    if (v.length > 3) {
      setLoading(true);
      setValue(v);
    }
  };

  const {data} = useContext(NewOrderContext);
  const {fincode,color,search}=data


  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CountryType[]>([]);
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(search);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (value) {
        const data = {
          SearchValue: value,
          BOption: color.v,
          DFrom: null,
          DTo: null,
          TakeRecs: null,
          Id: null,
          LastId: null,
          AFM: fincode,
        };

        const response = await getData(
          "https://80.245.167.105:19580/erpapi/getitems/obj?pars=",
          data
        );
        //await sleep(1e3); // For demo purposes.

        const list = response.map((item: any) => {
          return { name: item.name, value: item.code, data: item };
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

  useEffect(() => {
    console.log("selectedValue", selectedValue);
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const taleValues = useContext(NewOrderContext);

  console.log("taleValues", taleValues);

  const filterOptions = createFilterOptions({
    stringify: (option: any) => option.value,
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
      onChange={(e, v) => {
        console.log("sSSSSS", v);
        v ? setSelectedValue(v.value) : setSelectedValue("");
        if (v) {
          const selectedData = options.filter((d: any) => d.value === v.value);
          selectedData && setSelectedData(selectedData[0]?.data);
        }
      }}
      getOptionSelected={(option, value) => option.code === value.code}
      renderOption={(option) => option.name}
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
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}
