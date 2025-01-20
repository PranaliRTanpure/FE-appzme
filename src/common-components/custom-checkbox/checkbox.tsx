import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import CheckboxCheckedLogo from "../../assets/image_svg/icons/_Checkbox base.svg";
import CheckboxLogo from "../../assets/image_svg/icons/check_box_outline_blank_24dp_9B9D9F_FILL1_wght400_GRAD0_opsz24.svg";

type CheckBoxType = {
  checked: boolean;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CustomSingleCheckBox = (props: CheckBoxType) => {
  const { checked, handleChange, label } = props;
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checkedIcon={<img src={CheckboxCheckedLogo} />}
            checked={checked}
            icon={<img src={CheckboxLogo} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        }
        label={label || "Label"}
      />
    </FormGroup>
  );
};

export default CustomSingleCheckBox;
