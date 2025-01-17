import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { theme } from "../../utils/theme";
import { customLabelStyles } from "./widgets/custom-label-styles";
import React from "react";

interface CustomFormLabelProps {
  label: string | React.ReactNode;
  isRequired?: boolean;
}

function CustomTitle(props: CustomFormLabelProps) {
  const { label, isRequired } = props;

  return (
    <Box mb={1}>
      <Typography
        sx={{ fontWeight: 600, letterSpacing: "inherit" }}
        variant="bodySmall"
        color={theme.palette.grey[700]}
      >
        {label}
        {isRequired && <span style={customLabelStyles.required}>*</span>}
      </Typography>
    </Box>
  );
}

CustomTitle.propTypes = {
  label: PropTypes.string,
};

export default CustomTitle;
