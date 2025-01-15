import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorIcon from "@mui/icons-material/Error";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { ButtonBase, Typography } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Grid } from "@mui/system";
import * as React from "react";
import { useDispatch } from "react-redux";
import {
  ButtonDetails,
  setSnackbarOff,
} from "../../redux/actions/snackbar-action";
import { useReduxSelector } from "../../redux/store";
import { theme } from "../../utils/theme";

const SNACKBAR_HIDE_DURATION = 4000;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return (
      <MuiAlert
        icon={
          props.severity === AlertSeverity.SUCCESS ? (
            <CheckCircleRoundedIcon />
          ) : props.severity === AlertSeverity.ERROR ? (
            <ErrorIcon />
          ) : (
            <ReportProblemIcon sx={{ color: theme.palette.warning.main }} />
          )
        }
        elevation={6}
        ref={ref}
        variant="standard"
        {...props}
      />
    );
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleButtonClick = (buttonTitle: string, dispatch: any) => {
  if (buttonTitle === "Dismiss") {
    // Logic for Dismiss button
    dispatch(setSnackbarOff());
  }
};

export const AlertSeverity = {
  SUCCESS: "success" as AlertColor,
  ERROR: "error" as AlertColor,
  WARNING: "warning" as AlertColor,
  INFO: "info" as AlertColor,
};

const SnackbarAlert = () => {
  const dispatch = useDispatch();
  const isSnackbarOpen = useReduxSelector(
    (state) => state.snackbarReducer?.isSnackbarOpen,
  ) as boolean;

  const severity = useReduxSelector(
    (state) => state.snackbarReducer?.severity,
  ) as AlertColor;
  const message = useReduxSelector(
    (state) => state.snackbarReducer?.message,
  ) as string;
  const subMessage = useReduxSelector(
    (state) => state.snackbarReducer?.subMessage,
  ) as string;
  const arrayOfBtns = useReduxSelector(
    (state) => state.snackbarReducer?.arrayOfBtns,
    // eslint-disable-next-line @typescript-eslint/array-type
  ) as Array<ButtonDetails>;
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    event;
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackbarOff());
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={SNACKBAR_HIDE_DURATION}
      onClose={handleClose}
    >
      <Alert
        style={{
          backgroundColor: "white",
          color: theme.palette.common.black,
        }}
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        <Grid container rowGap={1}>
          <Grid container flexDirection={"column"}>
            <Grid container>
              <Typography variant="bodySmall" fontWeight={550}>
                {message}
              </Typography>
            </Grid>
            <Grid container>
              {subMessage && (
                <Typography variant="bodySmall" color={theme.palette.grey[700]}>
                  {subMessage || ""}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container columnGap={2}>
            {arrayOfBtns &&
              arrayOfBtns?.length > 0 &&
              arrayOfBtns?.map((buttonDetails) => (
                <ButtonBase
                  onClick={() =>
                    handleButtonClick(buttonDetails.title || "", dispatch)
                  }
                >
                  <Typography
                    variant="bodySmall"
                    fontWeight={buttonDetails.fontWeight || 500}
                  >
                    {buttonDetails.title}
                  </Typography>
                </ButtonBase>
              ))}
          </Grid>
        </Grid>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
