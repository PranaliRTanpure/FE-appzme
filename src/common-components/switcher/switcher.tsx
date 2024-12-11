import { Grid, Typography, styled } from "@mui/material";
import { useState } from "react";
import { theme } from "../../utils/theme";

type SwitcherProps = {
  option1: string;
  option2: string;
  buttonWidth: string;
  compactHeight?: boolean;
  variant: "dark" | "light";
  // eslint-disable-next-line no-unused-vars
  onChange: (option: string) => void;
};

const Switcher = (props: SwitcherProps) => {
  const { option1, option2, buttonWidth, compactHeight, variant, onChange } =
    props;
  const [option, setOption] = useState(option1);

  const handleOptionChange = (newOption: string) => {
    setOption((prevState) => {
      if (prevState === newOption) {
        return newOption;
      }
      return newOption;
    });
    onChange(newOption);
  };

  const StyledGridContainer = styled(Grid)(() => ({
    width: "fit-content",
    borderRadius: "12px",
    color:
      variant === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
    backgroundColor:
      variant === "dark" ? theme.palette.primary.main : theme.palette.grey[200],
    padding: "5px",
  }));

  const StyledGridButton = styled(Grid)(() => ({
    cursor: "pointer",
    padding: compactHeight ? "2px 10px" : "5px 10px",
    borderRadius: "12px",
    width: buttonWidth || "120px",
    height: compactHeight ? "32px" : "40px",
    justifyContent: "center",
    "&:hover": {
      backgroundColor:
        variant === "dark"
          ? theme.palette.primary.light
          : theme.palette.common.white,
    },
  }));

  const optionActive = {
    backgroundColor:
      variant === "dark"
        ? theme.palette.primary.light
        : theme.palette.common.white,
  };

  return (
    <StyledGridContainer container gap={1}>
      <StyledGridButton
        item
        container
        onClick={handleOptionChange.bind(null, option1)}
        sx={option === option1 ? optionActive : {}}
      >
        <Typography
          sx={{
            color:
              option === option1
                ? theme.palette.secondary.main
                : theme.palette.common.black,
            fontWeight: option === option1 ? 550 : 300,
          }}
          variant="subtitle1"
        >
          {option1}
        </Typography>
      </StyledGridButton>
      <StyledGridButton
        item
        container
        onClick={handleOptionChange.bind(null, option2)}
        sx={option === option2 ? optionActive : {}}
      >
        <Typography
          sx={{
            color:
              option === option2
                ? theme.palette.secondary.main
                : theme.palette.common.black,
            fontWeight: option === option2 ? 550 : 300,
          }}
          variant="subtitle1"
        >
          {option2}
        </Typography>
      </StyledGridButton>
    </StyledGridContainer>
  );
};

export default Switcher;
