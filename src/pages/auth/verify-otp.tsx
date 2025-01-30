import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CopyrightIcon from "@mui/icons-material/Copyright";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, Link, Typography } from "@mui/material";
import { Box, Grid, useMediaQuery } from "@mui/system";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Image from "../../assets/image_svg/auth/otp-verify.svg";
import Logo from "../../assets/image_svg/logo/logo.svg";
import CustomLabel from "../../common-components/custom-label/custom-label";
import CustomOtp from "../../common-components/custom-otp/custom-otp";
import { AlertSeverity } from "../../common-components/snackbar-alert/snackbar-alert";
import { otpMax6DigitErrorMsg, otpRegexErrorMsg, otpRequiredErrorMsg } from "../../constants/error-messages";
import useApiFeedback from "../../hooks/useApiFeedback";
import { ResetLinkType } from "../../models/auth/reset-linktype";
import { ErrorResponseEntity } from "../../models/response/error-response";
import { setSnackbarOn } from "../../redux/actions/snackbar-action";
import { useUserControllerServiceResendOtp, useUserControllerServiceVerifyOtp } from "../../sdk/queries";
import { GetTenantId } from "../../services/common/get-tenant-id";
import { widthOfInput } from "./login";

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
  const below1024 = useMediaQuery("(max-width:1024px)");

  const {
    mutateAsync,
    isSuccess: isSuccessVerifyOtp,
    isError: isErrorVerifyOtp,
    error: errorVerifyOtp,
    data,
  } = useUserControllerServiceVerifyOtp();

  const belowHeight768 = useMediaQuery("(max-height:768px)");

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
      (errorVerifyOtp && (errorVerifyOtp as ErrorResponseEntity)?.body?.message) ||
      "Error occurred while verifying OTP";
    if (isErrorVerifyOtp) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: message as string,
        })
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
      linkType: location?.state?.forgetPassword ? ResetLinkType.RESET : ResetLinkType.SET,
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
          })
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

  useApiFeedback(isError, error, isSuccess, ((dataOtpResend?.message || "") as string) || "OTP sent successfully");

  const handleOnClickLink = async () => {
    const xTenantId = GetTenantId();

    await resendOtpMutateAsync({
      email: location.state ? location.state?.email : "",
      xTenantId: xTenantId,
      linkType: location?.state?.forgetPassword ? ResetLinkType.RESET : ResetLinkType.SET,
    });
  };

  useEffect(() => {
    const message = (error && (error as ErrorResponseEntity)?.body?.message) || "Error occurred while resending OTP";
    if (isError) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: message as string,
        })
      );
    }
  }, [dispatch, isError, error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", height: "100%" }}>
      <Grid width={"100%"} height={"100%"} container flexWrap={"nowrap"} p={2}>
        {/* OTP verification Form */}
        <Grid
          container
          justifyContent={"flex-start"}
          alignContent={"flex-start"}
          width={below1024 ? "48%" : "45%"}
          sx={{ textAlign: "center" }}
          pb={4}
          flexDirection={"column"}
        >
          <Grid container justifyContent={"flex-start"} maxWidth={"100%"} pt={4} pl={6}>
            <Box width={"fit-content"} component={"img"} src={Logo}></Box>
          </Grid>
          <Grid
            mt={1.5}
            width={"100%"}
            // height={"390px"}
            container
            borderRadius={"8px"}
            pr={6}
            pl={6}
            flexDirection={"column"}
            rowGap={5}
          >
            <Grid container flexDirection={"column"} rowGap={0.5} mt={6}>
              <Typography fontWeight={600} textAlign={"start"} fontSize={"30px"} lineHeight={"38px"}>
                OTP Verification
              </Typography>
              <Typography textAlign={"start"} variant="bodyMedium" color={"#717C7E"}>
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
            <Grid container flexDirection={"column"} justifyContent={"flex-start"}>
              <Grid container>
                <CustomLabel label="Input Code" />
              </Grid>

              <Controller
                control={control}
                name="otp"
                render={() => (
                  <CustomOtp
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

            <Grid width={widthOfInput}>
              <Button variant="contained" fullWidth type="submit" style={{ background: "#106DCC" }}>
                Confirm and Login
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
                underline="always"
                sx={{
                  textDecoration: "underline",
                  textDecorationColor: "#106DCC",
                }}
              >
                <Typography variant="bodyMedium" color="#106DCC">
                  {"Resend"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"space-between"}
            pl={6}
            pr={6}
            // alignSelf={"flex-end"}
            flex={1}
            flexWrap={"nowrap"}
            // padding={below800 ? "0px 10px" : "0px 50px"}
          >
            <Grid container columnGap={0.5} alignItems={"flex-end"} flexWrap={"nowrap"}>
              <CopyrightIcon fontSize="small" />
              <Typography variant="bodySmall">ZCloud 2025</Typography>
            </Grid>
            <Grid container flexWrap={"nowrap"} columnGap={1} alignItems={"flex-end"}>
              <MailOutlineIcon fontSize="small" sx={{ color: "#106DCC" }} />
              <Typography variant="bodySmall" color="#106DCC">
                help@zcloud.technology
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Image */}
        <Grid
          p={2}
          maxHeight={"100%"}
          width={below1024 ? "52%" : "55%"}
          bgcolor="#EFF0F2"
          container
          flexDirection={"column"}
          borderRadius={5}
        >
          <Grid container alignSelf={"center"} height={"100%"}>
            <Box
              width={"100%"}
              height={"auto"}
              maxHeight={belowHeight768 ? "700px" : "800px"}
              component={"img"}
              src={Image}
            ></Box>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default VerifyOtpPage;
