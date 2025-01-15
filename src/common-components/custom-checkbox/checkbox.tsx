import { Checkbox } from "@mui/material";
import React from "react";
import CheckboxCheckedLogo from "../../assets/image_svg/icons/_Checkbox base.svg";
import CheckboxLogo from "../../assets/image_svg/icons/check_box_outline_blank_24dp_9B9D9F_FILL1_wght400_GRAD0_opsz24.svg";
import { CheckedArray } from "./custom-checkbox";

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

export default CheckBox;
