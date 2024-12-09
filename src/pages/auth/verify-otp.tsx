import { yupResolver } from "@hookform/resolvers/yup";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, Link, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Image from "../../assets/image_svg/auth/otp-verify.svg";
import Logo from "../../assets/image_svg/logo/logo.svg";
import CustomLabel from "../../common-components/custom-label/custom-label";
import CustomOtp from "../../common-components/custom-otp/custom-otp";
import { AlertSeverity } from "../../common-components/snackbar-alert/snackbar-alert";
import { ResetLinkType } from "../../models/auth/reset-linktype";
import { ErrorResponseEntity } from "../../models/response/error-response";
import { setSnackbarOn } from "../../redux/actions/snackbar-action";
import {
  useUserControllerServiceResendOtp,
  useUserControllerServiceVerifyOtp,
} from "../../sdk/queries";
import { GetTenantId } from "../../services/common/get-tenant-id";
import { theme } from "../../utils/theme";
import useApiFeedback from "../../hooks/useApiFeedback";
import {
  otpMax6DigitErrorMsg,
  otpRegexErrorMsg,
  otpRequiredErrorMsg,
} from "../../constants/error-messages";

export const setPasswordSchema = yup.object().shape({
  otp: yup
    .string()
    .required(otpRequiredErrorMsg)
    .min(6, otpMax6DigitErrorMsg)
    .matches(/^[0-9]+$/, otpRegexErrorMsg),
});

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    mutateAsync,
    isSuccess: isSuccessVerifyOtp,
    isError: isErrorVerifyOtp,
    error: errorVerifyOtp,
    data,
  } = useUserControllerServiceVerifyOtp();

  const initialValues = {
    otp: "",
  };

  useEffect(() => {
    if (location?.state?.forgetPassword) {
      handleOnClickLink();
    }
  }, []);

  useEffect(() => {
    const message =
      (errorVerifyOtp &&
        (errorVerifyOtp as ErrorResponseEntity)?.body?.message) ||
      "Error occurred while verifying OTP";
    if (isErrorVerifyOtp) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: message as string,
        }),
      );
    }
  }, [dispatch, isErrorVerifyOtp, errorVerifyOtp]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(setPasswordSchema),
  });

  const onSubmit = async (values: unknown) => {
    const xTenantId = GetTenantId();

    await mutateAsync({
      linkType: location?.state?.forgetPassword
        ? ResetLinkType.RESET
        : ResetLinkType.SET,
      email: location.state?.email,
      otp: (values as { otp: string }).otp,
      xTenantId: xTenantId,
    });
  };

  useEffect(() => {
    if (isSuccessVerifyOtp) {
      if (data.data) {
        navigate("/auth/set-password", {
          state: {
            emailVal: location.state ? location.state?.email : "",
            otpVal: otp,
            forgetPassword: location?.state?.forgetPassword ? true : false,
          },
        });
      } else {
        dispatch(
          setSnackbarOn({
            severity: AlertSeverity.ERROR,
            message: "Invalid OTP. Please try again.",
          }),
        );
      }
    }
  }, [isSuccessVerifyOtp]);

  const {
    mutateAsync: resendOtpMutateAsync,
    isError,
    error,
    isSuccess,
    data: dataOtpResend,
  } = useUserControllerServiceResendOtp();

  useApiFeedback(
    isError,
    error,
    isSuccess,
    ((dataOtpResend?.message || "") as string) || "OTP sent successfully",
  );

  const handleOnClickLink = async () => {
    const xTenantId = GetTenantId();

    await resendOtpMutateAsync({
      email: location.state ? location.state?.email : "",
      xTenantId: xTenantId,
      linkType: location?.state?.forgetPassword
        ? ResetLinkType.RESET
        : ResetLinkType.SET,
    });
  };

  useEffect(() => {
    const message =
      (error && (error as ErrorResponseEntity)?.body?.message) ||
      "Error occurred while resending OTP";
    if (isError) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: message as string,
        }),
      );
    }
  }, [dispatch, isError, error]);

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
            height={"390px"}
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
                lineHeight={"38px"}
              >
                OTP Verification
              </Typography>
              <Typography
                textAlign={"start"}
                variant="bodyMedium"
                color={"#717C7E"}
              >
                Check the code in the invitation email sent{" "}
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 550,
                    color: "#364144",
                    marginTop: "20px",
                  }}
                >
                  {location.state ? location.state["email"] : ""}
                </span>
              </Typography>
            </Grid>
            <Grid
              container
              flexDirection={"column"}
              justifyContent={"flex-start"}
            >
              <Grid container>
                <CustomLabel label="Input Code" />
              </Grid>

              <Controller
                control={control}
                name="otp"
                render={({ field }) => (
                  <CustomOtp
                    {...field}
                    onChange={function (otp: string): void {
                      setOtp(otp);
                      setValue("otp", otp, { shouldValidate: true });
                    }}
                    value={otp}
                    hasError={!!errors.otp}
                    errorMessage={errors.otp?.message || ""}
                  />
                )}
              ></Controller>
            </Grid>

            <Grid width={"100%"}>
              <Button variant="contained" fullWidth type="submit">
                Verify OTP
              </Button>
            </Grid>
            <Grid container columnGap={1}>
              {/* background: #717C7E; */}

              <Typography variant="bodyMedium" color="#717C7E">
                {"If you didn’t receive the code?"}
              </Typography>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => handleOnClickLink()}
              >
                <Typography fontWeight={550} variant="bodyMedium">
                  {"Resend"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default VerifyOtpPage;
