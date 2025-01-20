import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/system";
import CustomButton from "../button-outlined/custom-button";

export interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SuccessDialog(props: SuccessDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} style={{ padding: "16px" }}>
      <Grid width={"450px"} p={2}>
        <Grid container width={"100%"} justifyContent={"center"}>
          <CheckCircleIcon
            color="success"
            sx={{ height: "65px", width: "65px" }}
          />
        </Grid>
        <DialogTitle>
          <Grid container width={"100%"} justifyContent={"center"}>
            <Typography variant="bodyMedium">
              Changes have been saved successfully
            </Typography>
          </Grid>
        </DialogTitle>
        <CustomButton
          variant={"contained"}
          text={"Continue"}
          onClick={handleListItemClick}
          sx={{ width: "100%" }}
        />
      </Grid>
    </Dialog>
  );
}
