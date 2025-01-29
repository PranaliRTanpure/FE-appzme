import React, { useState } from "react";

import { Typography, styled } from "@mui/material";
import { Grid } from "@mui/system";

import { theme } from "../../utils/theme";

type SwitcherProps = {
  options: string[];
  buttonWidth: string;
  compactHeight?: boolean;
  variant: "dark" | "light";

  onChange: (option: string) => void;
};

const Switcher = (props: SwitcherProps) => {
  const { options, buttonWidth, compactHeight, variant, onChange } = props;
  const validOptions = options || [];
  const [selectedOption, setSelectedOption] = useState(validOptions[0] || "");
  const customBorderRadius = "18px";

  const handleOptionChange = (newOption: string) => {
    if (selectedOption !== newOption) {
      setSelectedOption(newOption);
      onChange(newOption);
    }
  };

  const StyledGridContainer = styled(Grid)(() => ({
    width: "fit-content",
    borderRadius: customBorderRadius,
    border: "1px solid #DBDBDB",
    color: variant === "dark" ? theme.palette.common.white : theme.palette.common.black,
  }));

  const StyledGridButton = styled(Grid)(() => ({
    cursor: "pointer",
    padding: compactHeight ? "2px 5px" : "5px 5px",
    width: buttonWidth || "120px",
    height: compactHeight ? "32px" : "40px",
    justifyContent: "center",
  }));
  return (
    <StyledGridContainer container gap={0} border={1}>
      {validOptions.length > 0 ? (
        validOptions.map((option, index) => {
          const optionActive: React.CSSProperties = {
            border: "1px solid #106DCC",
            backgroundColor: "#E0EFFF",
            borderRadius: 0,
          };

          const optionInactive: React.CSSProperties = {
            borderRight:
              index === 0
                ? "1px solid #DBDBDB"
                : index === validOptions.length - 1
                  ? "1px solid #DBDBDB"
                  : "1px solid #DBDBDB",
            borderTopRightRadius: index === 0 ? "none" : index === validOptions.length - 1 ? "16px" : "none",

            borderEndEndRadius: index === 0 ? "none" : index === validOptions.length - 1 ? "16px" : "none",
          };

          if (index === 0) {
            optionActive.borderTopLeftRadius = customBorderRadius;
            optionActive.borderBottomLeftRadius = customBorderRadius;
          }

          if (index === validOptions.length - 1) {
            optionActive.borderTopRightRadius = customBorderRadius;
            optionActive.borderBottomRightRadius = customBorderRadius;
          }

          return (
            <StyledGridButton
              key={option}
              container
              onClick={() => handleOptionChange(option)}
              sx={selectedOption === option ? optionActive : optionInactive}
              alignContent={"center"}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  color: selectedOption === option ? "#106DCC" : "#000",
                  fontWeight: selectedOption === option ? 550 : 300,
                }}
                variant="bodySmall"
              >
                {option}
              </Typography>
            </StyledGridButton>
          );
        })
      ) : (
        <Typography variant="subtitle2" sx={{ padding: "5px" }}>
          No options available
        </Typography>
      )}
    </StyledGridContainer>
  );
};
export default Switcher;
