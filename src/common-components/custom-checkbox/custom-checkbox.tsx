import { StatusColorMap } from "@/constants/status";
import { theme } from "@/utils/theme";
import { toCamelCase } from "@/utils/toCamelCase";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Grid, SxProps } from "@mui/system";
import React, { useState } from "react";
import CheckboxCheckedLogo from "../../assets/image_svg/icons/_Checkbox base.svg";
import CheckboxLogo from "../../assets/image_svg/icons/check_box_outline_blank_24dp_9B9D9F_FILL1_wght400_GRAD0_opsz24.svg";

export type CheckedArray = {
  checked: boolean;
  color?: string;
  key: string;
  borderColor?: string;
};

type CustomCheckBoxType = {
  oriantation: "horizontal" | "vertical";
  options: CheckedArray[];

  onChange: (updatedArray: CheckedArray[]) => void;
  sx?: SxProps;
  enableSelectAll?: boolean;
  width?: string; //e.g. 50%
};

const CustomCheckBox = (props: CustomCheckBoxType) => {
  const { options, onChange, sx, oriantation = "vertical", width } = props;
  const [updatedArray, setUpdatedArray] = useState(options);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value?: CheckedArray,
  ) => {
    if (!value) {
      return;
    }
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
    <Grid
      width={"100%"}
      container
      flexDirection={oriantation === "vertical" ? "column" : "row"}
    >
      {updatedArray.map((val) => (
        <Grid
          container
          justifyContent={"flex-start"}
          flexDirection={oriantation === "vertical" ? "column" : "row"}
          columnGap={"4px"}
          width={
            width ? width : oriantation === "vertical" ? "100%" : "fit-content"
          }
          key={val.key}
        >
          <FormControlLabel
            control={
              <CheckBox
                checked={val.checked}
                val={val}
                handleChange={function (e, val): void {
                  handleChange(e, val);
                }}
              />
            }
            label={
              <Grid container alignItems={"center"} columnGap={1}>
                {StatusColorMap[val.key] && (
                  <Grid
                    width={"10px"}
                    height={"10px"}
                    borderRadius={"50%"}
                    bgcolor={
                      StatusColorMap[val.key] || theme.palette.common.white
                    }
                    border={`1px solid ${val.borderColor || "transparent"}`}
                  ></Grid>
                )}
                <Typography sx={sx}>
                  {toCamelCase(val.key || "Undefined")}
                </Typography>
              </Grid>
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomCheckBox;

type CheckBoxType = {
  checked: boolean;
  val: CheckedArray;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    val?: CheckedArray,
  ) => void;
};

const CheckBox = (props: CheckBoxType) => {
  const { checked, handleChange, val } = props;
  return (
    <Checkbox
      checkedIcon={<img src={CheckboxCheckedLogo} />}
      checked={checked}
      icon={<img src={CheckboxLogo} />}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(e, val)
      }
    />
  );
};
