import React, { useState } from "react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Grid } from "@mui/system";

export interface CheckboxData {
  name: string;
  label: string;
}

interface CheckboxWithTextFieldsProps {
  data: CheckboxData[];
}

export const CheckboxWithTextFields: React.FC<CheckboxWithTextFieldsProps> = ({
  data,
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
    <FormGroup>
      <Grid
        container
        width={"100%"}
        justifyContent={"space-between"}
        rowGap={1}
      >
        {data.map((item) => (
          <Grid size={3.9} display={"flex"} alignItems="center" key={item.name}>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state[item.name]}
                    onChange={handleChange}
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
            <Grid flex={1}>
              <TextField
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    height: "30px",
                  },
                }}
                id="outlined-basic"
                variant="outlined"
                defaultValue={item.label}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
};
