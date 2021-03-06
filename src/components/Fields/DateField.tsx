import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

interface Props {
  date: Date | null;
  handleChange: (date: Date | null) => void;
  disabled: boolean;
}

const DateField: React.FC<Props> = ({ date, handleChange, disabled }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        className="field"
        clearable
        variant="inline"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        placeholder="Дата рождения"
        invalidDateMessage="Укажите правильный формат даты"
        label="Дата рождения"
        value={date}
        disableFuture
        onChange={date => handleChange(date)}
        disabled={disabled}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateField;
