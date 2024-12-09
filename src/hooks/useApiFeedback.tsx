import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AlertSeverity } from "../common-components/snackbar-alert/snackbar-alert";
import { ErrorResponseEntity } from "../models/response/error-response";
import { setSnackbarOn } from "../redux/actions/snackbar-action";

const useApiFeedback = (
  isError: boolean,
  error: unknown,
  isSuccess: boolean,
  successMessage: string,
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as ErrorResponseEntity)?.body?.message || "An error occurred.";

      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: errorMessage,
        }),
      );
    }
  }, [isError, error, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.SUCCESS,
          message: successMessage,
        }),
      );
    }
  }, [isSuccess, successMessage, dispatch]);
};

export default useApiFeedback;
