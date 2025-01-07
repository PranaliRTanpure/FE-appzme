import {
  Autocomplete,
  CircularProgress,
  Paper,
  // TextField,
  Typography,
  alpha,
} from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { errorStyle } from "../custom-input/widgets/custom-input-styles";

import SearchIcon from "@mui/icons-material/Search";
import { Options } from "../../constants/options";
import { theme } from "../../utils/theme";
import "./custom-auto-complete.css";
import { Grid } from "@mui/system";
import TextField from "@mui/material/TextField";

type CustomAutoCompleteProps = {
  options: {
    key: string;
    value: string;
    // eslint-disable-next-line no-undef
    child?: JSX.Element;
    info?: string;
    hide?: boolean;
  }[];
  value?: string;
  loading?: boolean;
  loadingText?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (selectedValue: string | "") => void;
  onClick?: () => void;
  // eslint-disable-next-line no-unused-vars
  onDebounceCall?: (selectedValue: string | "") => void;
  onInputEmpty?: () => void;
  width?: string;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  isDisabled?: boolean;
  bgWhite?: boolean;
  hasStartSearchIcon?: boolean;
  hideTextPreview?: boolean;
  menuStyle?: {
    maxHeight: number;
    width: number;
  };
  maxHeightForOptionsList?: number;
  hideArrow?: boolean;
  onLoadMore?: () => void;
  hasMoreItems?: boolean;
  clearIcon?: null;
};

type OptionType = {
  key: string;
  value: string;
};

const CustomAutoComplete = (props: CustomAutoCompleteProps) => {
  const {
    options,
    maxHeightForOptionsList,
    value,
    loading,
    loadingText,
    placeholder,
    bgWhite,
    isDisabled,
    onDebounceCall,
    onClick,
    onInputEmpty,
    hasStartSearchIcon,
    hideTextPreview,
    hideArrow,
    clearIcon,
  } = props;

  const [selectedOptionState, setSelectedOptionState] = useState("");
  const [selectedOptionDebounce] = useDebounce(selectedOptionState, 3000);

  const _options: Options = [...options];
  const optionsList = _options
    .filter((opt) => !opt.hide)
    .map((opt) => {
      return opt;
    });

  const [defaultOption, setDefaultOption] = useState(
    value ? _options.find((opt) => opt.key === value) || null : null,
  );

  useEffect(() => {
    setDefaultOption(
      value ? _options.find((opt) => opt.key === value) || null : null,
    );
  }, [value, _options]);

  // const [selectedData, setSelectedData] = useState(defaultOption || null);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: OptionType | null,
  ): void => {
    event;
    setDefaultOption(value);
    const selectedText = value?.key;
    const selectedOption = options.find((opt) => opt.key === selectedText);
    const selectedOptionKey = selectedOption?.key || "";
    props.onChange(selectedOptionKey);
  };

  // const handleTextChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   if (event.target.value === "") {
  //     onInputEmpty && onInputEmpty();
  //   }
  //   setSelectedOptionState((event && event.target.value) || "");
  // };

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputValue = event.target.value;

    // Remove leading spaces
    const trimmedValue = inputValue.replace(/^\s+/, ""); // Trim leading spaces only

    setSelectedOptionState(trimmedValue); // Set the trimmed value in the state

    if (trimmedValue === "") {
      onInputEmpty && onInputEmpty(); // Trigger when input is cleared
    }
  };

  useEffect(() => {
    if (
      selectedOptionDebounce &&
      (selectedOptionDebounce.length >= 2 || selectedOptionDebounce === "")
    ) {
      onDebounceCall && onDebounceCall(selectedOptionDebounce);
    }
  }, [selectedOptionDebounce]);

  const inputStyles = {
    border: "none",
    outline: "none",
    borderRadius: "16px",
    boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.16)",
    "& .MuiOutlinedInput-root": {
      background: bgWhite ? "white" : "inherit",
      borderRadius: "16px",

      fontSize: "14px",
      // border: "1px solid #F1F1F1 !important",
      border: props.hasError
        ? "1px solid red"
        : `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
      // boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.16)",
      borderWidth: "0.5px",
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
    "& .MuiAutocomplete-inputRoot": {
      border: "1px solid #F1F1F1 !important",
      borderRadius: "4px !important",
      "&:hover": {
        borderWidth: "0.5px",
        border: "1px solid #F1F1F1 !important",
      },
    },
  };

  const sxStyles = props.hasError
    ? {
        ...inputStyles,
        ...errorBorder,
      }
    : {
        ...inputStyles,
        border: "1px solid #F1F1F1",
      };

  return (
    <>
      <Autocomplete
        clearIcon={clearIcon}
        value={defaultOption}
        getOptionLabel={(option: OptionType) => option.value}
        sx={{
          ...sxStyles["& .MuiOutlinedInput-root"],
          "& .MuiOutlinedInput-root": {
            padding: hideArrow ? "6px 10px !important" : "inherit",
            fontSize: "14px",
          },
        }}
        className={hideArrow ? "custom-autocomplete" : ""}
        onChange={(event, value: OptionType | null) =>
          handleChange(event, value)
        }
        size="small"
        disablePortal
        disabled={isDisabled}
        options={loading ? [] : optionsList}
        ListboxProps={{
          style: { maxHeight: maxHeightForOptionsList },
        }}
        renderOption={(props, option) => {
          const selectedOption = _options.find(
            (opt) => opt.value === option.value,
          );
          return <li {...props}>{selectedOption?.child || option.value}</li>;
        }}
        loading={loading}
        loadingText={loadingText || "Loading..."}
        PaperComponent={(props) => <Paper {...props} />}
        renderInput={(params) => (
          <TextField
            style={{ borderRadius: "10px" }}
            {...params}
            inputProps={{
              ...params.inputProps,
              value: hideTextPreview ? "" : params.inputProps.value,
            }}
            InputProps={{
              ...params.InputProps,
              // startAdornment: hasStartSearchIcon && (
              // 	<SearchIcon sx={{ opacity: 0.5 }} />
              // ),
              endAdornment: (
                <Grid maxWidth={"100%"} container width={"fit-content"}>
                  {loading && (
                    <CircularProgress size={"20px"} color="inherit" />
                  )}
                  {params.InputProps.endAdornment}
                  {hasStartSearchIcon && <SearchIcon sx={{ opacity: 0.5 }} />}
                </Grid>
              ),
            }}
            onClick={onClick && !isDisabled ? onClick : () => {}}
            onChange={handleTextChange}
            placeholder={placeholder}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                fontSize: "14px",
              },
            }}
          />
        )}
      />
      <Typography sx={errorStyle} variant="caption">
        {props.hasError ? props.errorMessage : ""}
      </Typography>
    </>
  );
};

export default CustomAutoComplete;

const errorBorder = {
  "&.MuiAutocomplete-root": {
    border: "1px solid red",
    borderRadius: "4px",
  },
};
