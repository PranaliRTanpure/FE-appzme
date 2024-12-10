import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  alpha,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
// import { errorStyle, customInputStyles } from "./widgets/customInputStyles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "use-debounce";
import { customInputStyles, errorStyle } from "./widgets/custom-input-styles";

interface CustomInputProps {
  placeholder: string;
  name: string;
  value: string | number;
  isNumeric?: boolean;
  isDecimal?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  isPassword?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onDebounceCall?: (selectedValue: string | "") => void;
  onInputEmpty?: () => void;
  disableField?: boolean;
  bgWhite?: boolean;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  hasStartSearchIcon?: boolean;
  startSearchIconOnRight?: boolean;
  hasCrossIcon?: boolean;
  onClickNotify?: () => void;
  hasOpenListArrow?: boolean;
  required?: boolean;
  maxValue?: number;
  maxDecimalPlaces?: number;
  paddingRight?: string;
  bgGrey?: boolean;
}

export default function CustomInput(props: CustomInputProps) {
  // const classes = customInputStyles;
  const {
    paddingRight,
    bgWhite,
    onClickNotify,
    onDebounceCall,
    onInputEmpty,
    maxLength,
    hasStartSearchIcon,
    hasCrossIcon,
    startSearchIconOnRight,
    hasOpenListArrow,
    required = false,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(props.value ? props.value : "");

  const [selectedOptionState, setSelectedOptionState] = useState("");
  const [selectedOptionDebounce] = useDebounce(selectedOptionState, 1000);

  // useEffect(() => {
  //   if (
  //     selectedOptionDebounce &&
  //     (selectedOptionDebounce.length > 3 || selectedOptionDebounce === "")
  //   ) {
  //     onDebounceCall && onDebounceCall(selectedOptionDebounce);
  //   }
  // }, [selectedOptionDebounce]);

  useEffect(() => {
    if (selectedOptionDebounce) {
      if (selectedOptionDebounce.length > 3) {
        // Search immediately if more than 3 characters
        onDebounceCall && onDebounceCall(selectedOptionDebounce);
      } else if (selectedOptionDebounce.length > 0) {
        const timer = setTimeout(() => {
          onDebounceCall && onDebounceCall(selectedOptionDebounce);
        }, 2000);

        // Cleanup the timeout on unmount or when dependencies change
        return () => clearTimeout(timer);
      }
    }
  }, [selectedOptionDebounce]);

  useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickArrow = () => {
    onClickNotify && onClickNotify();
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maxValue = props.maxValue || 31;

    if (props.isNumeric && maxValue) {
      const numericValue = parseInt(value, 10);
      if (numericValue <= maxValue || value === "") {
        setInputValue(value);
        props.onChange && props.onChange(e);
      }
    } else {
      if (props.isDecimal) {
        const decimalRegex = new RegExp(
          `^\\d*(\\.\\d{0,${props.maxDecimalPlaces || 2}})?$`,
        );

        const numericValue = parseFloat(value);

        if (
          (decimalRegex.test(value) && numericValue <= maxValue) ||
          value === ""
        ) {
          setInputValue(value);
          setSelectedOptionState(value);
          props.onChange && props.onChange(e);
        }
      } else {
        if (value === "") {
          onInputEmpty && onInputEmpty();
        }
        setInputValue(value);
        setSelectedOptionState(value);
        props.onChange && props.onChange(e);
      }
    }
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    setInputValue(trimmedValue); // Set trimmed value in input
    props.onChange &&
      props.onChange({ ...e, target: { ...e.target, value: trimmedValue } }); // Notify parent component with trimmed value
  };

  return (
    <Grid container flexDirection={"column"}>
      <InputBase
        fullWidth
        className="popper-area"
        name={props.name}
        type={showPassword ? "text" : props.isPassword ? "password" : "text"}
        placeholder={props.placeholder}
        value={inputValue}
        sx={{
          paddingRight: paddingRight ? paddingRight : "0px",
          background: props.disableField
            ? alpha("#C9CBCC", 0.3)
            : bgWhite
              ? "#F5F6F8"
              : "inherit",
          height: props.multiline ? "fit-content" : "40px",
          ...customInputStyles.textFieldRoot,
          ...(props.hasError && customInputStyles.textFieldError),
          ...customInputStyles.textFieldInput,
        }}
        inputProps={{ maxLength: maxLength ? maxLength : "" }}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={props.hasError}
        required={required}
        disabled={props.disableField}
        autoComplete="false"
        // inputMode={props.isNumeric ? "number" : "text"}
        inputMode={
          props.isNumeric ? "numeric" : props.isDecimal ? "decimal" : "text"
        }
        // onInput={
        //   props.isNumeric
        //     ? (e: ChangeEvent<HTMLInputElement>) => {
        //         e.target.value = e.target.value.replace(/[^0-9]/g, "");
        //       }
        //     : undefined
        // }
        onInput={
          props.isNumeric
            ? (e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }
            : props.isDecimal
              ? (e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                }
              : undefined
        }
        classes={{
          root: `${customInputStyles.textFieldRoot}`,
          input: `${customInputStyles.textFieldInput}`,
          // focused: `${customInputStyles.textFieldActive}`,
          error: `${customInputStyles.textFieldError}`,
        }}
        multiline={props.multiline}
        rows={props.rows}
        startAdornment={
          <InputAdornment position="end">
            {hasStartSearchIcon && !startSearchIconOnRight && <SearchIcon />}
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {props.isPassword && (
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            )}

            {hasOpenListArrow && (
              <IconButton onClick={handleClickArrow}>
                {showPassword ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            )}

            {hasCrossIcon && (
              <IconButton onClick={handleClickArrow}>
                {showPassword ? <ClearIcon /> : <ClearIcon />}
              </IconButton>
            )}
            <InputAdornment position="end">
              {hasStartSearchIcon && startSearchIconOnRight && (
                <SearchIcon sx={{ marginRight: "10px" }} />
              )}
            </InputAdornment>
          </InputAdornment>
        }
      />
      <Typography textAlign={"start"} sx={errorStyle} variant="caption">
        {props.hasError ? props.errorMessage : ""}
      </Typography>
    </Grid>
  );
}
