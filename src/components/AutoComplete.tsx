// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import { domain } from "../config";
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

export default function Asynchronous() {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const v = e.target.value;
    if (v.length > 2) {
      setLoading(true);
      setValue(v);
    }
  };
  const { selectedInfo, handleSetSelectedValue, actions, orderColor } =
    useContext(NewOrderContext);
  const { fincode, search } = selectedInfo.data;

  const { getSelection } = actions;

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CountryType[]>([]);
  const [value, setValue] = useState("");
  // const [selectedValue, setSelectedValue] = useState(searchValue);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (value) {
        const data = {
          Company: 1,
          SearchValue: value,
          BOption: orderColor,
          DFrom: null,
          DTo: null,
          TakeRecs: null,
          Id: null,
          LastId: null,
          AFM: fincode,
        };

        const response: any = await getData(
          `${domain}/erpapi/getitems/obj?pars=`,
          data
        );
        //await sleep(1e3); // For demo purposes.

        const list: any = response.map((item: any) => {
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
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // useEffect(() => {
  //   if(!search){
  //   setSelectedValue(search)
  //   }
  // },[search]);

  const filterOptions = createFilterOptions({
    stringify: (option: any) => option.value,
  });
  return (
    <>
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
          if (v) {
            const selectedData = options.filter(
              (d: any) => d.value === v.value
            );
            selectedData && getSelection(v.data);
          } else {
            handleSetSelectedValue("");
          }
        }}
        getOptionSelected={(option, value) => option.code === value.code}
        renderOption={(option) =>
          `${option?.data?.sku || option.data.code} -- ${option.name}`
        }
        options={options}
        loading={loading}
        value={search}
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
    </>
  );
}
