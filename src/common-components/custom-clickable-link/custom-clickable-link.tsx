import { ButtonBase, Typography } from "@mui/material";
import { ReactNode } from "react";

type CustomClickableLinkProps = {
  onClick: () => void;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  text: string;
};

const CustomClickableLink = (props: CustomClickableLinkProps) => {
  const { onClick, text } = props;
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        textAlign: "left",
        display: "flex",
        justifyContent: "flex-start",
        width: "fit-content",
      }}
    >
      <Typography fontWeight={500} color="secondary" variant="bodySmall">
        {text || "-"}
      </Typography>
    </ButtonBase>
  );
};

export default CustomClickableLink;
