import React from "react";

import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { theme } from "../../utils/theme";
import { customLabelStyles } from "./widgets/custom-label-styles";

interface CustomFormLabelProps {
  label: string | React.ReactNode;
  isRequired?: boolean;
  variant?: "bodySmall" | "bodyMedium";
}

function CustomLabel(props: CustomFormLabelProps) {
  const { label, isRequired, variant } = props;

  return (
    <Box mb={1}>
      <Typography
        sx={{ fontWeight: 600, letterSpacing: "inherit" }}
        variant={variant || "bodyExtraSmall"}
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
