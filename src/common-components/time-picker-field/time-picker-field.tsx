import { Stack, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import {
  LocalizationProvider,
  PickerChangeHandlerContext,
  TimePicker,
  TimeValidationError,
} from "@mui/x-date-pickers";
import { parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";
import { errorStyle } from "../custom-input/widgets/custom-input-styles";
export const prefixItWithZero = (val: string) => {
  return val.length == 1 ? `0${val}` : val;
};

type TimePickerFieldProps = {
  // eslint-disable-next-line no-unused-vars
  onChange: (hours: number, minutes: number, date: Date) => void;
  width?: string;
  value: string;
  hasError?: boolean;
  errorMessage?: string;
};

const TimePickerField = (props: TimePickerFieldProps) => {
  const { onChange, hasError, errorMessage, width, value } = props;

  const [timeValue, setTimeValue] = useState(value);

  const handleTimeChange = (
    value: unknown,
    context: PickerChangeHandlerContext<TimeValidationError>,
  ) => {
    context;
    const selectedDate = new Date(value as string);
    setTimeValue(
      `${prefixItWithZero(selectedDate.getHours().toString())}:${prefixItWithZero(
        selectedDate.getMinutes().toString(),
      )}`,
    );
    onChange(selectedDate.getHours(), selectedDate.getMinutes(), selectedDate);
  };

  return (
    <Stack width={width || "100%"}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
        <TimePicker
          onChange={handleTimeChange}
          value={timeValue ? parseISO(`2023-01-01T${timeValue}`) : null}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "0.85rem",
              padding: "10px 10px",
              borderRadius: "5px",
              border: hasError ? "1px solid red" : `inherit`,
            },
            "& .css-1pthm69-MuiInputBase-root-MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      </LocalizationProvider>
      <Typography sx={errorStyle} variant="caption">
        {hasError ? errorMessage : ""}
      </Typography>
    </Stack>
  );
};

export default TimePickerField;
