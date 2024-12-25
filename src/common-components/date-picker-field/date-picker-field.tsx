import { Typography } from "@mui/material";
import { alpha, Grid } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers/models";
import { format, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { theme } from "../../utils/theme";
import {
  customInputStyles,
  errorStyle,
} from "../custom-input/widgets/custom-input-styles";

export interface DatePickerProps {
  value?: string; // Optional initial value as a string (formatted)
  // eslint-disable-next-line no-unused-vars
  onDateChange: (selectedDate: string) => void; // Prop to return the selected date
  bgWhite: boolean;
  hasError?: boolean;
  errorMessage?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  value,
  onDateChange,
  bgWhite,
  hasError,
  errorMessage,
  disableFuture,
  disablePast,
}) => {
  const [inputValue, setInputValue] = useState<Date | null>(
    value ? new Date(value) : null,
  ); // Manage date as a Date object

  // Parse the incoming value when the component mounts or when the value prop changes
  useEffect(() => {
    if (value) {
      const parsedDate = parse(value, "MM-dd-yyyy", new Date()); // Parse incoming value
      setInputValue(parsedDate);
    }
  }, [value]);

  const handleChange = (
    value: Date | null,
    context: PickerChangeHandlerContext<DateValidationError>,
  ) => {
    if (value) {
      context;
      const formattedDate = format(value, "MM-dd-yyyy"); // Format date with date-fns
      setInputValue(value); // Update the state with the selected date
      onDateChange(formattedDate); // Return the formatted date to the parent component
    }
  };

  return (
    <Grid container>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
        <DesktopDatePicker
          disableFuture={disableFuture}
          disablePast={disablePast}
          value={inputValue}
          closeOnSelect={true}
          onChange={handleChange}
          format="MM-dd-yyyy"
          sx={{
            width: "100%",
            ...(hasError && customInputStyles.textFieldError),
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              width: "100%",
              border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
              background: bgWhite ? "white" : "inherit",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "14px",
              padding: "11px 10px",
              outline: "none",
            },
          }}
        />
      </LocalizationProvider>
      <Typography textAlign={"start"} sx={errorStyle} variant="caption">
        {hasError ? errorMessage : ""}
      </Typography>
    </Grid>
  );
};

export default CustomDatePicker;
