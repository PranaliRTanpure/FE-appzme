import { theme } from "@/utils/theme";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { Options2 } from "../../constants/options";

type ColoredCustomSelectProps = {
  value: string;
  bgColor?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string) => void;
  options: Options2;
};

export default function ColoredCustomSelect(props: ColoredCustomSelectProps) {
  const { value, bgColor, onChange, options } = props;
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        displayEmpty
        value={selectedValue}
        onChange={handleChange}
        sx={{
          background: bgColor ?? theme.palette.grey[300],
          boxShadow: "none",
          borderRadius: "20px",
          height: "20px",
          fontSize: "12px",
          fontWeight: "500 !important",
          ".MuiOutlinedInput-notchedOutline": {
            border: 0,
            color: "black",
          },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
            color: "black",
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              color: "black",
              border: 0,
            },
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((opt) => (
          <MenuItem value={opt.value}>{opt.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
