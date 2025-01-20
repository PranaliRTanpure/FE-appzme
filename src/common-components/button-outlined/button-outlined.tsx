import { Button, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { ReactJSXElement } from "node_modules/@emotion/react/dist/declarations/types/jsx-namespace";

type CustomButtonProps = {
  startIcon?: ReactJSXElement;
  variant: "contained" | "outlined" | "text";
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
  sx?: SxProps<Theme>;
};

const CustomButton = (props: CustomButtonProps) => {
  const { startIcon, variant, text, onClick, isDisabled, sx } = props;
  return (
    <Button
      startIcon={startIcon ? startIcon : undefined}
      variant={variant}
      disabled={isDisabled}
      onClick={() => {
        onClick();
      }}
      sx={sx}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
