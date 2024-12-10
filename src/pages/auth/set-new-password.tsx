import { yupResolver } from "@hookform/resolvers/yup";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, Typography } from "@mui/material";
import { Box, Grid, useMediaQuery } from "@mui/system";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Image from "../../assets/image_svg/auth/set_password.svg";
import CustomInput from "../../common-components/custom-input/custom-input";
import CustomLabel from "../../common-components/custom-label/custom-label";
import { AlertSeverity } from "../../common-components/snackbar-alert/snackbar-alert";
import { ErrorResponseEntity } from "../../models/response/error-response";
import { setSnackbarOn } from "../../redux/actions/snackbar-action";
import { useUserControllerServiceSetPassword } from "../../sdk/queries";
import { GetTenantId } from "../../services/common/get-tenant-id";
import { passwordRegx } from "../../utils/regex";
// import { theme } from "../../utils/theme";
import { ResetLinkType } from "../../models/auth/reset-linktype";
import useApiFeedback from "../../hooks/useApiFeedback";
import {
  confirmNewPaswordErrorMsg,
  newPasswordRequiredErrorMsg,
  passwordMustMatchErrorMsg,
  passwordRegexErrorMsg,
} from "../../constants/error-messages";
import Logo from "../../assets/image_svg/logo/logo.svg";

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
  const below1024 = useMediaQuery("(max-width:1024px)");

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
      <Grid width={"100%"} height={"100%"} container flexWrap={"nowrap"} p={2}>
        {/* Set new password Form */}
        <Grid
          container
          justifyContent={"flex-start"}
          alignContent={"flex-start"}
          width={below1024 ? "50%" : "45%"}
          sx={{ textAlign: "center" }}
          pb={4}
          flexDirection={"column"}
        >
          <Grid
            container
            justifyContent={"flex-start"}
            maxWidth={"100%"}
            pt={4}
            pl={6}
          >
            <Box width={"fit-content"} component={"img"} src={Logo}></Box>
          </Grid>
          <Grid
            width={"100%"}
            // height={"420px"}
            container
            borderRadius={"8px"}
            pr={6}
            pl={6}
            mt={1.5}
            flexDirection={"column"}
            rowGap={4}
          >
            <Grid container flexDirection={"column"} rowGap={0.5} mt={6}>
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
              <Button
                style={{ background: "#106DCC" }}
                variant="contained"
                fullWidth
                type="submit"
              >
                Confirm and Login
              </Button>
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
            <Grid
              container
              columnGap={0.5}
              alignItems={"flex-end"}
              flexWrap={"nowrap"}
            >
              <CopyrightIcon fontSize="small" />
              <Typography variant="bodySmall">ZCloud 2025</Typography>
            </Grid>
            <Grid
              container
              flexWrap={"nowrap"}
              columnGap={1}
              alignItems={"flex-end"}
            >
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
          width={below1024 ? "50%" : "55%"}
          bgcolor="#EFF0F2"
          container
          flexDirection={"column"}
          borderRadius={5}
        >
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
          >
            <Box
              width={"100%"}
              height={"100%"}
              component={"img"}
              src={Image}
            ></Box>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SetPasswordPage;
