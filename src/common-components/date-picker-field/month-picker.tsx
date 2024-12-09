import { Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangeIcon } from "@mui/x-date-pickers/icons";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers/models";
import { format, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import {
  customInputStyles,
  errorStyle,
} from "../custom-input/widgets/custom-input-styles";

export interface MonthPickerProps {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onDateChange: (selectedDate: string) => void;
  bgWhite: boolean;
  hasError?: boolean;
  errorMessage?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
}

const MonthPicker: React.FC<MonthPickerProps> = ({
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
  );

  useEffect(() => {
    if (value) {
      const parsedDate = parse(value, "MM-yyyy", new Date());
      setInputValue(parsedDate);
    }
  }, [value]);

  const handleChange = (
    value: Date | null,
    context: PickerChangeHandlerContext<DateValidationError>,
  ) => {
    if (value) {
      context;
      const formattedDate = format(value, "MM-yyyy");
      setInputValue(value);
      onDateChange(formattedDate);
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
          views={["month", "year"]}
          onChange={handleChange}
          format="MM-yyyy"
          slotProps={{
            openPickerIcon: DateRangeIcon,
            inputAdornment: {
              position: "start",
            },
          }}
          sx={{
            width: "200px",
            ...(hasError && customInputStyles.textFieldError),
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              width: "100%",
              background: bgWhite ? "white" : "inherit",
              boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.16)",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "14px",
              padding: "11px 0px",
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

export default MonthPicker;
