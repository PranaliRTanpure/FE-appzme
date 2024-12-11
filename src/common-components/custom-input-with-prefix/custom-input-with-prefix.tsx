import { InputAdornment, InputBase, Typography } from "@mui/material";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
// import { errorStyle, customInputStyles } from "./widgets/customInputStyles";
import { alpha, Grid } from "@mui/system";
import { useDebounce } from "use-debounce";
import {
  customInputStyles,
  errorStyle,
} from "../custom-input/widgets/custom-input-styles";

interface CustomInputWihPrefixProps {
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
  prefix: string;
}

export default function CustomInputWithPrefix(
  props: CustomInputWihPrefixProps,
) {
  const {
    bgWhite,
    onDebounceCall,
    onInputEmpty,
    maxLength,
    required = false,
    prefix,
  } = props;
  const [inputValue, setInputValue] = useState(props.value ? props.value : "");

  const [selectedOptionState, setSelectedOptionState] = useState("");
  const [selectedOptionDebounce] = useDebounce(selectedOptionState, 1000);

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
        type={"text"}
        placeholder={props.placeholder}
        value={inputValue}
        sx={{
          background: bgWhite ? "#F5F6F8" : "inherit",
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
        inputMode={
          props.isNumeric ? "numeric" : props.isDecimal ? "decimal" : "text"
        }
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
          error: `${customInputStyles.textFieldError}`,
        }}
        multiline={props.multiline}
        rows={props.rows}
        startAdornment={
          <InputAdornment position="end">
            {
              <Grid
                position={"relative"}
                left={"-24%"}
                minWidth={"42px"}
                borderRadius={"14px 0px 0px 14px"}
                bgcolor={alpha("#C9CBCC", 0.3)}
                p={1.2}
                container
                justifyContent={"center"}
              >
                {prefix}
              </Grid>
            }
          </InputAdornment>
        }
      />
      <Typography textAlign={"start"} sx={errorStyle} variant="caption">
        {props.hasError ? props.errorMessage : ""}
      </Typography>
    </Grid>
  );
}
