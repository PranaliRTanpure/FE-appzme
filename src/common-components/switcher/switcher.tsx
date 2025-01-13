import { Typography, styled } from "@mui/material";
import { useState } from "react";
import { theme } from "../../utils/theme";
import { Grid } from "@mui/system";
import React from "react";

type SwitcherProps = {
  options: string[];
  buttonWidth: string;
  compactHeight?: boolean;
  variant: "dark" | "light";
  // eslint-disable-next-line no-unused-vars
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
    color:
      variant === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
    // backgroundColor:
    //   variant === "dark" ? theme.palette.primary.main : theme.palette.grey[200],
    // padding: "5px",
  }));

  const StyledGridButton = styled(Grid)(() => ({
    cursor: "pointer",
    padding: compactHeight ? "2px 5px" : "5px 5px",
    // borderRadius: "12px",
    width: buttonWidth || "120px",
    height: compactHeight ? "32px" : "40px",
    justifyContent: "center",
    // "&:hover": {
    //   backgroundColor:
    //     variant === "dark"
    //       ? theme.palette.primary.light
    //       : theme.palette.common.white,
    // },
    borderRight: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
      // borderRight: "none",
      // borderRight: "1px solid transparent", // Invisible border
    },
  }));

  // const optionActive = {
  //   border: '1px solid #106DCC',
  //   backgroundColor: '#E0EFFF',
  //   borderRadius: customBorderRadius,
  //   // backgroundColor:
  //   //   variant === "dark"
  //   //     ? theme.palette.primary.light
  //   //     : theme.palette.common.white,
  // };
  return (
    <StyledGridContainer container gap={0} border={0}>
      {validOptions.length > 0 ? (
        validOptions.map((option, index) => {
          const optionActive: React.CSSProperties = {
            border: "1px solid #106DCC",
            backgroundColor: "#E0EFFF",
            borderRadius: 0,
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
              sx={selectedOption === option ? optionActive : {}}
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
        // validOptions.map((option) => (
        //   <StyledGridButton
        //     key={option}
        //     container
        //     onClick={() => handleOptionChange(option)}
        //     sx={selectedOption === option ? optionActive : {}}
        //   >
        //     <Typography
        //       sx={{
        //         color:
        //           selectedOption === option
        //             ? theme.palette.secondary.main
        //             : theme.palette.common.black,
        //         fontWeight: selectedOption === option ? 550 : 300,
        //       }}
        //       variant="bodySmall"
        //     >
        //       {option}
        //     </Typography>
        //   </StyledGridButton>
        // ))
        <Typography variant="subtitle2" sx={{ padding: "5px" }}>
          No options available
        </Typography>
      )}
    </StyledGridContainer>
  );
};
export default Switcher;
