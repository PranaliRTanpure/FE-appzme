import { ButtonBase, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useState } from "react";
import { theme } from "../../utils/theme";

type CustomSelectorSqType = {
  widthOfBtn: string;
  options: string[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (selectedoption: string) => void;
  selectedValue: string;
};

const CustomSelectorSq = (props: CustomSelectorSqType) => {
  const { onSelect, options, widthOfBtn, selectedValue } = props;
  const [selectedOption, setSelectedOption] = useState(selectedValue || "");
  const handleOnClick = (item: string) => {
    item && setSelectedOption(item);
    item && onSelect(item);
  };

  return (
    <Grid border={"1px solid #E8EBEC"} borderRadius={"6px"} container p={0.5}>
      {options.map((item) => (
        <ButtonBase onClick={() => handleOnClick(item)}>
          <Grid
            container
            color={
              selectedOption === item
                ? theme.palette.primary.main
                : theme.palette.grey[500]
            }
            fontWeight={550}
            justifyContent={"center"}
            width={widthOfBtn || "100px"}
            border={
              selectedOption === item
                ? `1px solid ${theme.palette.grey[200]}`
                : "none"
            }
            borderRadius={"6px"}
            p={"10px 20px"}
            boxShadow={
              selectedOption === item ? "0px 1px 3px 0px #1018281A" : "none"
            }
          >
            <Typography variant="bodySmall">{item}</Typography>
          </Grid>
        </ButtonBase>
      ))}
    </Grid>
  );
};

export default CustomSelectorSq;
