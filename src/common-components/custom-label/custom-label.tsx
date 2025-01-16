import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { theme } from "../../utils/theme";
import { customLabelStyles } from "./widgets/custom-label-styles";

interface CustomFormLabelProps {
  label: string | React.ReactNode;
  isRequired?: boolean;
}

function CustomLabel(props: CustomFormLabelProps) {
  const { label, isRequired } = props;

  return (
    <Box mb={1}>
      <Typography
        sx={{ fontWeight: 600, letterSpacing: "inherit" }}
        variant={"bodySmall"}
        color={theme.palette.grey[700]}
      >
        {label}
        {isRequired && <span style={customLabelStyles.required}>*</span>}
      </Typography>
    </Box>
  );
}

CustomLabel.propTypes = {
  label: PropTypes.string,
};

export default CustomLabel;
