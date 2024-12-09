import { yupResolver } from "@hookform/resolvers/yup";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Image from "../../assets/image_svg/auth/Login-Image.svg";
import Logo from "../../assets/image_svg/logo/logo.svg";
import CustomInput from "../../common-components/custom-input/custom-input";
import CustomLabel from "../../common-components/custom-label/custom-label";
import { AlertSeverity } from "../../common-components/snackbar-alert/snackbar-alert";
import { ErrorResponseEntity } from "../../models/response/error-response";
import { setSnackbarOn } from "../../redux/actions/snackbar-action";
import { useUserControllerServiceSetPassword } from "../../sdk/queries";
import { GetTenantId } from "../../services/common/get-tenant-id";
import { passwordRegx } from "../../utils/regex";
import { theme } from "../../utils/theme";
import { ResetLinkType } from "../../models/auth/reset-linktype";
import useApiFeedback from "../../hooks/useApiFeedback";
import {
  confirmNewPaswordErrorMsg,
  newPasswordRequiredErrorMsg,
  passwordMustMatchErrorMsg,
  passwordRegexErrorMsg,
} from "../../constants/error-messages";

export const setPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required(newPasswordRequiredErrorMsg)
    .matches(passwordRegx, passwordRegexErrorMsg),
  confirmNewPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword") as unknown as string],
      passwordMustMatchErrorMsg,
    )
    .required(confirmNewPaswordErrorMsg),
});

const SetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    mutateAsync,
    isSuccess,
    isError,
    error,
    // isPending,
    data,
  } = useUserControllerServiceSetPassword();

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || "Password set successsfully") as string,
  );

  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  useEffect(() => {
    const message =
      (error && (error as ErrorResponseEntity)?.body?.message) ||
      "Error occurred while setting password";
    if (isError) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: message as string,
        }),
      );
    }
  }, [dispatch, isError, error]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/login", {
        state: { email: location.state ? location.state?.emailVal : "" },
      });
    }
  }, [isSuccess]);

  const {
    control,
    handleSubmit,
    // reset,
    // watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(setPasswordSchema),
  });

  const onSubmit = async (values: typeof initialValues) => {
    const xTenantId = GetTenantId();

    await mutateAsync({
      linkType: location?.state?.forgetPassword
        ? ResetLinkType.RESET
        : ResetLinkType.SET,
      requestBody: {
        newPassword: values.newPassword,
        email: location.state ? location.state?.emailVal : "",
        otp: location.state ? location.state?.otpVal : "",
      },
      xTenantId: xTenantId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "100%" }}
    >
      <Grid width={"100%"} height={"100%"} container flexWrap={"nowrap"}>
        <Grid
          p={2}
          width={"50%"}
          bgcolor={theme.palette.secondary.main}
          container
          flexDirection={"column"}
        >
          <Grid container justifyContent={"center"} mt={2}>
            <Box component={"img"} src={Logo}></Box>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            height={"90%"}
          >
            <Box component={"img"} src={Image}></Box>
          </Grid>
          <Grid container justifyContent={"space-between"} padding={"0px 50px"}>
            <Grid container columnGap={0.5} alignItems={"center"}>
              <CopyrightIcon fontSize="small" color={"primary"} />
              <Typography color={"primary"} variant="bodySmall">
                eAmata 2024
              </Typography>
            </Grid>
            <Grid container columnGap={1} alignItems={"center"}>
              <MailOutlineIcon fontSize="small" color={"primary"} />
              <Typography variant="bodySmall" color="primary">
                support@eAmata.com
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Login Form */}
        <Grid
          container
          justifyContent={"center"}
          alignContent={"center"}
          width={"50%"}
          sx={{ textAlign: "center" }}
          pb={8}
        >
          <Grid
            boxShadow={`0px 0px 16px 0px #021D2614`}
            width={"456px"}
            height={"420px"}
            container
            borderRadius={"8px"}
            p={5}
            flexDirection={"column"}
            rowGap={3}
          >
            <Grid container flexDirection={"column"} rowGap={0.5}>
              <Typography
                fontWeight={600}
                textAlign={"start"}
                fontSize={"30px"}
              >
                {location?.state?.forgetPassword
                  ? "Reset New Password"
                  : "Set New Password"}
              </Typography>
            </Grid>
            <Grid container>
              <CustomLabel label="New Password" />

              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <CustomInput
                    placeholder={"Enter Your Password"}
                    {...field}
                    hasError={!!errors.newPassword}
                    errorMessage={errors.newPassword?.message}
                    onChange={(event) => {
                      setValue("newPassword", event.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    isPassword
                  />
                )}
              ></Controller>
            </Grid>
            <Grid container>
              <CustomLabel label="Confirm Password" />

              <Controller
                control={control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <CustomInput
                    placeholder={"Confirm Your Password"}
                    {...field}
                    hasError={!!errors.confirmNewPassword}
                    errorMessage={errors.confirmNewPassword?.message}
                    onChange={(event) => {
                      setValue("confirmNewPassword", event.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    isPassword
                  />
                )}
              ></Controller>
            </Grid>

            <Grid width={"100%"}>
              <Button variant="contained" fullWidth type="submit">
                Set Password
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SetPasswordPage;
