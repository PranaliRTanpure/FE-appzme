import { Typography, CircularProgress, alpha } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../utils/theme";
import "./custom-autocomplete-multiselect.css";
import { Grid } from "@mui/system";

export type Options = {
  key: string;
  value: string;
  hide?: boolean;
  // description?: string;
  // type?: string;
  // child?: JSX.Element;
  // color?: string;
}[];

type CustomAutocompleteMultiselectProps = {
  options: Options;
  value: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (selectedValue: string[] | []) => void;
  placeholder: string;
  hasError?: boolean;
  limitTags: number;
  bgWhite?: boolean;
  errorMessage?: string;
  // eslint-disable-next-line no-unused-vars
  onDebounceCall?: (selectedValue: string | "") => void;
  onInputEmpty?: () => void;
  onClick?: () => void;
  hasStartSearchIcon?: boolean;
  hideTextPreview?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  hideArrow?: boolean;
};

const CustomAutocompleteMultiselect = (
  props: CustomAutocompleteMultiselectProps,
) => {
  const {
    options,
    value,
    limitTags,
    placeholder,
    onChange,
    onDebounceCall,
    onInputEmpty,
    bgWhite,
    hideArrow,
    hasStartSearchIcon,
    loading,
  } = props;

  const [selectedOptionState, setSelectedOptionState] = useState("");
  const [selectedOptionDebounce] = useDebounce(selectedOptionState, 1000);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: string[],
  ) => {
    const selectedOptions = options.filter((opt) =>
      newValue.some((option) => opt.value === option),
    );
    const selectedKeys = selectedOptions.map((option) => option.key) || [];
    onChange(selectedKeys);
  };

  const [preSelectedValues, setPreSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    setPreSelectedValues(
      options.filter((opt) => value.includes(opt.key)).map((opt) => opt.value),
    );
  }, [value, options]);

  useEffect(() => {}, [value, placeholder, limitTags, options]);

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.value === "") {
      onInputEmpty && onInputEmpty();
    }
    setSelectedOptionState((event && event.target.value) || "");
  };

  useEffect(() => {
    if (
      selectedOptionDebounce &&
      (selectedOptionDebounce.length > 3 || selectedOptionDebounce === "")
    ) {
      onDebounceCall && onDebounceCall(selectedOptionDebounce);
    }
  }, [selectedOptionDebounce]);

  const inputStyles = {
    background: "inherit",
    border: "none",
    borderRadius: "16px",
    // boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.16)",
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
      // border: "none !important",
      border: "1px solid #F1F1F1 !important",

      borderRadius: "16px !important",
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
      };

  return (
    <>
      <Autocomplete
        multiple
        limitTags={3}
        className={hideArrow ? "custom-autocomplete" : ""}
        loading={loading}
        onChange={handleChange}
        value={preSelectedValues}
        id="multiple-limit-tags"
        options={options
          .filter((option) => !option.hide)
          .map((option) => option.value)}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            style={{ borderRadius: "10px" }}
            {...params}
            InputProps={{
              ...params.InputProps, // startAdornment: hasStartSearchIcon && (
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
            placeholder={placeholder}
            onChange={handleTextChange}
          />
        )}
        size="small"
        sx={{
          ...sxStyles,
          maxWidth: "900px",
          "& .MuiOutlinedInput-root": {
            padding: hideArrow ? "6px 10px !important" : "inherit",
          },
          "& .MuiAutocomplete-tag": {
            backgroundColor: "#E0EFFF",
            margin: "2px",
            maxWidth: "calc(100% - 4px)",
            color: "#0D58A4",
          },
        }}
      />
      <Typography
        sx={{
          color: theme.palette.warning.dark,
          marginLeft: props.hasError ? "5px" : "0px",
        }}
        variant="caption"
      >
        {props.hasError ? props.errorMessage : ""}
      </Typography>
    </>
  );
};

export default CustomAutocompleteMultiselect;
const errorBorder = {
  "&.MuiAutocomplete-root": {
    border: "1px solid red",
    borderRadius: "4px",
  },
};
