import { StatusColorMap } from "@/constants/status";
import { theme } from "@/utils/theme";
import { toCamelCase } from "@/utils/toCamelCase";
import { Checkbox, Typography } from "@mui/material";
import { Grid, SxProps } from "@mui/system";
import { useState } from "react";
import React from "react";

export type CheckedArray = {
  checked: boolean;
  color?: string;
  key: string;
  borderColor?: string;
};

type CustomCheckBoxType = {
  options: CheckedArray[];
  // eslint-disable-next-line no-unused-vars
  onChange: (updatedArray: CheckedArray[]) => void;
  sx?: SxProps;
  enableSelectAll?: boolean;
};

const CustomCheckBox = (props: CustomCheckBoxType) => {
  const { options, onChange, sx } = props;
  const [updatedArray, setUpdatedArray] = useState(options);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: CheckedArray,
  ) => {
    const updatedArr = updatedArray.map((val) => {
      if (value.key === val.key) {
        return { ...val, checked: event.target.checked };
      } else {
        return { ...val };
      }
    });

    setUpdatedArray(updatedArr);
    onChange(updatedArr);
  };

  return (
    <div>
      <Grid>
        {updatedArray.map((val) => (
          <Grid
            container
            justifyContent={"flex-start"}
            alignItems={"center"}
            columnGap={"4px"}
            key={val.key}
          >
            <Checkbox
              checked={val.checked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, val)
              }
              inputProps={{ "aria-label": "controlled" }}
              sx={sx}
            />
            {StatusColorMap[val.key] && (
              <Grid
                width={"10px"}
                height={"10px"}
                borderRadius={"50%"}
                bgcolor={StatusColorMap[val.key] || theme.palette.common.white}
                border={`1px solid ${val.borderColor || "transparent"}`}
              ></Grid>
            )}
            <Typography sx={sx}>
              {toCamelCase(val.key || "Undefined")}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CustomCheckBox;
