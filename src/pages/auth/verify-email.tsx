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
import EmailVerification from "../../assets/image_svg/auth/email_verification.svg";
import Logo from "../../assets/image_svg/logo/logo.svg";
import CustomInput from "../../common-components/custom-input/custom-input";
import CustomLabel from "../../common-components/custom-label/custom-label";
import { AlertSeverity } from "../../common-components/snackbar-alert/snackbar-alert";
import { ErrorResponseEntity } from "../../models/response/error-response";
import { setSnackbarOn } from "../../redux/actions/snackbar-action";
import { useUserControllerServiceVerifyUser } from "../../sdk/queries";
import { GetTenantId } from "../../services/common/get-tenant-id";
import { emailRegExp } from "../../utils/regex";
import { theme } from "../../utils/theme";
import {
  emailRegexErrorMsg,
  emailRequiredErrorMsg,
} from "../../constants/error-messages";

export const verifySchema = yup.object().shape({
  email: yup
    .string()
    .required(emailRequiredErrorMsg)
    .matches(emailRegExp, emailRegexErrorMsg),
});

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { mutateAsync, isSuccess, isError, data, error } =
    useUserControllerServiceVerifyUser();

  const initialValues = {
    email: "",
  };

  const {
    control,
    handleSubmit,
    // reset,
    // watch,
    getValues,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(verifySchema),
  });

  const onSubmit = async (values: typeof initialValues) => {
    const xTenantId = GetTenantId();

    await mutateAsync({ email: values.email, xTenantId: xTenantId });
  };

  useEffect(() => {
    const message =
      (error && (error as ErrorResponseEntity)?.body?.message) ||
      "Error occurred while verifying email";
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
      const emailVal = getValues("email");
      if (!data.data) {
        navigate("/auth/verify-otp", {
          state: {
            email: emailVal,
            forgetPassword: location?.state?.forgetPassword ? true : false,
          },
        });
      } else {
        if (location?.state?.forgetPassword) {
          navigate("/auth/verify-otp", {
            state: {
              email: emailVal,
              forgetPassword: location?.state?.forgetPassword ? true : false,
            },
          });
        } else {
          navigate("/auth/login", { state: { email: emailVal } });
        }
      }
    }
  }, [isSuccess]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "100%" }}
    >
      <Grid width={"100%"} height={"100%"} container flexWrap={"nowrap"} p={2}>
        {/* Login Form */}
        <Grid
          border={1}
          container
          justifyContent={"flex-start"}
          alignContent={"flex-start"}
          width={"50%"}
          sx={{ textAlign: "center" }}
          pb={8}
          flexDirection={"column"}
        >
          <Grid
            container
            justifyContent={"flex-start"}
            mt={2}
            maxWidth={"100%"}
            pt={4}
            pl={6}
          >
            <Box width={"fit-content"} component={"img"} src={Logo}></Box>
          </Grid>
          <Grid
            // boxShadow={`0px 0px 16px 0px #021D2614`}
            width={"100%"}
            height={"330px"}
            container
            borderRadius={"8px"}
            pr={6}
            pl={6}
            flexDirection={"column"}
            rowGap={3}
          >
            <Grid container flexDirection={"column"} rowGap={0.5} mt={6}>
              <Typography
                fontWeight={600}
                textAlign={"start"}
                fontSize={"30px"}
              >
                Email Verification
              </Typography>
              <Typography
                textAlign={"start"}
                variant="bodyMedium"
                color={theme.palette.grey[600]}
              >
                Please enter your email to receive verification link
              </Typography>
            </Grid>
            <Grid container>
              <CustomLabel label="Email" />

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <CustomInput
                    placeholder={"Enter Your Email"}
                    {...field}
                    hasError={!!errors.email}
                    errorMessage={errors.email?.message}
                    onChange={(event) => {
                      setValue("email", event.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              ></Controller>
            </Grid>

            <Grid width={"100%"}>
              <Button variant="contained" fullWidth type="submit">
                Send Verification Link
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
          width={"50%"}
          // bgcolor={theme.palette.secondary.main}
          bgcolor="#EFF0F2"
          container
          flexDirection={"column"}
          borderRadius={5}
        >
          {/* <Grid container justifyContent={"center"} mt={2}>
            <Box component={"img"} src={Logo}></Box>
          </Grid> */}
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            height={"100%"}
          >
            <Box
              width={"fit-content"}
              height={"fit-content"}
              component={"img"}
              src={EmailVerification}
            ></Box>
          </Grid>
          {/* <Grid container justifyContent={"space-between"} padding={"0px 50px"}>
            <Grid container columnGap={0.5} alignItems={"center"}>
              <CopyrightIcon fontSize="small" color={"primary"} />
              <Typography color={"primary"} variant="bodySmall">
                apzmeapzme 2024
              </Typography>
            </Grid>
            <Grid container columnGap={1} alignItems={"center"}>
              <MailOutlineIcon fontSize="small" color={"primary"} />
              <Typography variant="bodySmall" color="primary">
                support@apzme.com
              </Typography>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </form>
  );
};
export default VerifyEmailPage;
