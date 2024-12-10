import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Grid } from "@mui/system";
import * as React from "react";

type CustomRadioButtonProps = {
  optionsArray: string[];
  selectedvalue: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (opt: string) => void;
};

const CustomRadioButton = (props: CustomRadioButtonProps) => {
  const { optionsArray, selectedvalue, onChange } = props;
  const [value, setValue] = React.useState<string>(selectedvalue);
  const [latestOtionsArray, setLatestOptionsArray] =
    React.useState<string[]>(optionsArray);

  React.useEffect(() => {
    if (optionsArray && optionsArray.length > 0) {
      setLatestOptionsArray(optionsArray);
    }
  }, [optionsArray]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    onChange((event.target as HTMLInputElement).value);
  };
  return (
    <Grid>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {latestOtionsArray?.map((option) => (
            <FormControlLabel
              value={option}
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 16,
                    },
                  }}
                />
              }
              label={option}
              sx={{ ".MuiFormControlLabel-label": { fontSize: "14px" } }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default CustomRadioButton;
