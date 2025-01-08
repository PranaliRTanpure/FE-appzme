import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import { alpha, Grid } from "@mui/system";
import React, { useState } from "react";
import { theme } from "../../utils/theme";
import { errorStyle } from "../custom-input/widgets/custom-input-styles";

interface CustomSelectProps {
  placeholder: string;
  name: string;
  value: string;
  items: { value: string; label: string; disabled?: boolean }[];
  // eslint-disable-next-line no-unused-vars
  onChange: (e: SelectChangeEvent<string>) => void;
  hasError?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  bgWhite?: boolean;
  enableDeselect?: boolean;
  enableAdd?: boolean;
  menuProps?: {
    PaperProps?: {
      style?: {
        maxHeight?: number;
        width?: number;
      };
    };
  };
}

function CustomSelect(props: CustomSelectProps) {
  const { items, enableDeselect, enableAdd } = props;
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown open/close

  const handleValue = (e: SelectChangeEvent<string>) => {
    const selectedLabel = e.target.value;
    const selectedKey =
      props.items.find((item) => item.label === selectedLabel)?.value || "";
    e.target.value = selectedKey;

    props.onChange(e);
  };

  const getLabel = (value: string) => {
    return items.find((item) => item.value === value)?.label || "";
  };

  const closeDropdown = () => {
    setIsOpen(false); // Programmatically close dropdown
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    closeDropdown();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAddOther = Boolean(anchorEl);
  const id = openAddOther ? "simple-popover" : undefined;

  return (
    <>
      <Select
        // ref={selectRef}
        // ref={anchorEl}
        disabled={props.isDisabled && props.isDisabled}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "12px", // Add border radius here
              overflow: "hidden", // Ensure corners are properly rounded
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for a polished look
            },
          },
          ...(props.menuProps || {}), // Merge with existing menuProps if passed
        }}
        sx={{
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
          height: "40px !important",
          width: "100%",
          borderRadius: "16px",
          background: props.bgWhite ? "#F5F6F8" : "inherit",

          "&.Mui-error": {
            border: `1px solid ${theme.palette.warning.dark}`,
            padding: "0px!important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(228, 219, 233, 0.25)",
          },
        }}
        open={isOpen} // Control dropdown state with open prop
        onClose={() => setIsOpen(false)} // Handle close event
        onOpen={() => setIsOpen(true)} // Handle open event
        displayEmpty
        name={props?.name}
        value={getLabel(props.value)}
        onChange={handleValue}
        error={props.hasError}
        renderValue={(selected) => (
          <Typography
            variant="bodySmall"
            sx={{
              color: selected
                ? theme.palette.grey[800]
                : theme.palette.grey[500],
            }}
          >
            {selected || props?.placeholder}
          </Typography>
        )}
      >
        {enableDeselect && (
          <MenuItem value="">
            {/* <em>None</em> */}
            <Typography
              component="em"
              sx={{
                fontSize: "14px",
              }}
            >
              None
            </Typography>
          </MenuItem>
        )}
        {props?.items &&
          props?.items.length !== 0 &&
          props?.items?.map((option) => (
            <MenuItem
              key={option.value}
              value={option.label}
              disabled={option.disabled}
            >
              <Grid container justifyContent={"space-between"} width={"100%"}>
                <Typography variant="bodySmall">{option.label}</Typography>
                {option.value === props.value && (
                  <DoneIcon fontSize="small" color="secondary" />
                )}
              </Grid>
            </MenuItem>
          ))}
        {enableAdd && (
          <Grid width={"100%"}>
            <Button
              onClick={handleClick}
              sx={{
                margin: "10px",
                width: "90%",
              }}
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Add Other
            </Button>
          </Grid>
        )}
      </Select>
      <Typography sx={errorStyle} variant="caption">
        {props.hasError ? props.errorMessage : ""}
      </Typography>
      <Popover
        id={id}
        open={openAddOther}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </>
  );
}

export default CustomSelect;
