import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useRef } from "react";
import CheckboxCheckedLogo from "../../assets/image_svg/icons/_Checkbox base.svg";
import CheckboxLogo from "../../assets/image_svg/icons/check_box_outline_blank_24dp_9B9D9F_FILL1_wght400_GRAD0_opsz24.svg";

type CheckBoxType = {
  checked: boolean;
  label?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showLabel?: boolean;
  indeterminate?: boolean;
};
const CheckBox = (props: CheckBoxType) => {
  const { checked, handleChange, label, showLabel, indeterminate } = props;
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);
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
        // label={label || "Label"}
        label={showLabel ? label : null}
      />
    </FormGroup>
  );
};

export default CheckBox;
