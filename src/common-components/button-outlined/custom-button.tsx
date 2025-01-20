import { theme } from "@/utils/theme";
import { Button, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { ReactJSXElement } from "node_modules/@emotion/react/dist/declarations/types/jsx-namespace";

type CustomButtonProps = {
  startIcon?: ReactJSXElement;
  endIcon?: ReactJSXElement;

  variant: "contained" | "outlined" | "text";
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
  sx?: SxProps<Theme>;
  textAndBorderInGrey?: boolean;
};

const CustomButton = (props: CustomButtonProps) => {
  const {
    startIcon,
    endIcon,
    variant,
    text,
    onClick,
    isDisabled,
    sx,
    textAndBorderInGrey,
  } = props;
  return (
    <Button
      startIcon={startIcon ? startIcon : undefined}
      endIcon={endIcon ? endIcon : undefined}
      variant={variant}
      disabled={isDisabled}
      onClick={() => {
        onClick();
      }}
      sx={{
        ...sx,
        border: textAndBorderInGrey
          ? `1px solid #C9CBCC !important`
          : "inherit",
        color: textAndBorderInGrey
          ? `#21262B !important`
          : theme.palette.common.white,
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
