import CloseIcon from "@mui/icons-material/Close";
import { Divider, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { theme } from "../../utils/theme";
import { customDialogStyles } from "./widgets/custom-dialog-styles";

interface CustomDialogProps {
  title: React.ReactNode;
  buttonName: string[];
  open: boolean;
  onClose: () => void;
  width?: string | number;
  height?: string | number;
  sx?: object;
  overFlow?: string;
  padding?: string;
  titleAlign?: "left" | "center";
  showDivider?: boolean;
  titleFontWeight?: number | string;
  titleFontSize?: string | number;
}

const CustomDialog = (props: React.PropsWithChildren<CustomDialogProps>) => {
  const {
    onClose,
    open,
    title,
    width,
    height,
    sx = {},
    overFlow,
    padding,
    titleAlign = "left",
    showDivider = false,
    titleFontWeight = "bold",
    titleFontSize = "1.3rem",
  } = props;

  const titleAlignment = {
    textAlign: titleAlign,
    fontWeight: titleFontWeight,
    fontSize: titleFontSize,
  };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      sx={{ paper: customDialogStyles.dialog, ...sx }}
      PaperProps={{
        sx: {
          width: width || "auto",
          height: height || "auto",
          maxWidth: width || "auto",
        },
      }}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{
          ...customDialogStyles.dialogTitle,
          padding: "5px 22px",
          borderColor: theme.palette.grey[300],
          // cursor: draggable ? "move" : "default",
        }}
      >
        <Grid
          container
          p={0}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            marginBottom: showDivider ? "0" : "10px",
          }}
        >
          <Grid item xs sx={titleAlignment}>
            {title}
          </Grid>
          <Grid item>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={customDialogStyles.closeIcon}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {showDivider && <Divider sx={{ my: "10px" }} />}{" "}
      </DialogTitle>
      <DialogContent sx={{ overflow: overFlow, padding: padding }}>
        <Grid item flex={1}>
          {props.children}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
