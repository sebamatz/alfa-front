import { useState } from "react";
import {
  DatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const DatePickers=()=> {
  // The first commit of Material-UI
  const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(
    new Date(),
  );
  const [selectedDateTo, setSelectedDateTo] = useState<Date | null>(
    new Date(),
  );
  const handleDateChangeFrom = (date: Date | null) => {
    setSelectedDateFrom(date);
  };
  const handleDateChangeTo = (date: Date | null) => {
    setSelectedDateTo(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <DatePicker
        autoOk
        disableToolbar
        format="dd/MM/yyyy"
        margin="normal"
        id="Form"
        label="ΑΠΟ"
        value={selectedDateFrom}
        onChange={handleDateChangeFrom}
      />
      <DatePicker
        autoOk
        disableToolbar
        margin="normal"
        id="date-picker-dialog"
        label="ΕΩΣ"
        format="dd/MM/yyyy"
        value={selectedDateTo}
        onChange={handleDateChangeTo}
      />
</MuiPickersUtilsProvider>

  );
}

export default DatePickers