import React, { useState } from "react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Grid } from "@mui/system";
import CheckboxCheckedLogo from "../../assets/image_svg/icons/_Checkbox base.svg";
import CheckboxLogo from "../../assets/image_svg/icons/check_box_outline_blank_24dp_9B9D9F_FILL1_wght400_GRAD0_opsz24.svg";

export interface CheckboxData {
  name: string;
  label: string;
}

interface CheckboxWithTextFieldsProps {
  data: CheckboxData[];
  size?: number;
}

export const CheckboxWithTextFields: React.FC<CheckboxWithTextFieldsProps> = ({
  data,
  size,
}) => {
  const [state, setState] = useState(
    data.reduce(
      (acc, item) => {
        acc[item.name] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    // console.log(`${name} is ${checked ? "checked" : "unchecked"}`);
    setState({ ...state, [name]: checked });
  };

  return (
    <FormGroup sx={{ width: "100%" }}>
      <Grid container width={"100%"} spacing={1}>
        {data.map((item) => (
          <Grid
            size={size}
            display={"flex"}
            alignItems="center"
            key={item.name}
          >
            <Grid container>
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<img src={CheckboxCheckedLogo} />}
                    checked={state[item.name]}
                    icon={<img src={CheckboxLogo} />}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e)
                    }
                    name={item.name}
                    sx={{
                      transform: "scale(1)",
                    }}
                  />
                }
                label={null}
                sx={{ marginRight: 0 }}
              />
            </Grid>
            <Grid container width={"100%"} flex={1}>
              <TextField
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    height: "30px",
                    width: "100%",
                  },
                }}
                id="outlined-basic"
                variant="outlined"
                defaultValue={item.label}
                placeholder="Enter"
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
};
