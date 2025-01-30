import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CopyrightIcon from "@mui/icons-material/Copyright";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, Checkbox, FormControlLabel, Link, Typography } from "@mui/material";
import { Box, Grid, useMediaQuery } from "@mui/system";

import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosResponse } from "axios";
import * as yup from "yup";

import LoginImage from "../../assets/image_svg/auth/Login-Image.svg";
import Logo from "../../assets/image_svg/logo/logo.svg";
import CustomInput from "../../common-components/custom-input/custom-input";
import CustomLabel from "../../common-components/custom-label/custom-label";
import { AlertSeverity } from "../../common-components/snackbar-alert/snackbar-alert";
import {
  emailRegexErrorMsg,
  emailRequiredErrorMsg,
  passwordIsRequired,
  passwordRegexErrorMsg,
} from "../../constants/error-messages";
import useStoreLoginData from "../../hooks/use-store-login-data";
import { ErrorResponseEntity } from "../../models/response/error-response";
import { setSnackbarOn } from "../../redux/actions/snackbar-action";
import { useUserControllerServiceGetAccessToken } from "../../sdk/queries";
import { GetTenantId } from "../../services/common/get-tenant-id";
import { emailRegExp, passwordRegx } from "../../utils/regex";
import { theme } from "../../utils/theme";

export const widthOfInput = "400px";
export const loginSchema = yup.object().shape({
  password: yup.string().required(passwordIsRequired).matches(passwordRegx, passwordRegexErrorMsg),
  email: yup.string().required(emailRequiredErrorMsg).matches(emailRegExp, emailRegexErrorMsg),
});

const LoginPage = () => {
  const below1024 = useMediaQuery("(max-width:1024px)");
  const navigate = useNavigate();
  const storeLoginDataInStore = useStoreLoginData();
  const dispatch = useDispatch();
  const location = useLocation();

  const initialValues = {
    email: location.state ? location.state?.email : "",
    password: "",
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
    resolver: yupResolver(loginSchema),
  });

  const { data, mutateAsync, isSuccess, isError, error } = useUserControllerServiceGetAccessToken();

  const onSubmit = async (values: typeof initialValues) => {
    const xTenantId = GetTenantId();

    await mutateAsync({
      requestBody: { username: values.email, password: values.password },
      xTenantId: xTenantId,
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      const loginResponse = (data as unknown as AxiosResponse).data;
      storeLoginDataInStore(loginResponse);
      //   const role = storageService.getRoles() || "";

      // const redirectURL = localStorage.getItem("redirectURL");
      // if (redirectURL && !role) {
      // 	navigate(redirectURL);
      // 	localStorage.removeItem("redirectURL");
      // } else {
      // 	navigate(`/provider/patients`);
      // }
      navigate(`/super-user/patient-registration`);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    const message = (error && (error as ErrorResponseEntity)?.body?.message) || "Error occurred while logging in";
    if (isError) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: message as string,
        })
      );
    }
  }, [dispatch, isError, error]);

  const handleOnClickLink = () => {
    const email = getValues("email");
    navigate("/auth/verify-email", {
      state: {
        emailVal: email || "",
        forgetPassword: true,
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", height: "100%" }}>
      <Grid width={"100%"} height={"100%"} container flexWrap={"nowrap"} p={2}>
        {/* Login Form */}
        <Grid
          container
          justifyContent={"flex-start"}
          alignContent={"flex-start"}
          width={below1024 ? "53%" : "45%"}
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
            height={"500px"}
            container
            justifyContent={"center"}
            pl={6}
            pr={6}
            flexDirection={"column"}
            rowGap={3.5}
          >
            <Grid container flexDirection={"column"} rowGap={0.5} alignItems={"flex-start"} pb={2}>
              <Typography fontWeight={600} fontSize={"30px"}>
                Log in to your account
              </Typography>
              <Typography variant="bodyMedium" color={theme.palette.grey[600]}>
                Welcome! Please enter your details.
              </Typography>
            </Grid>
            <Grid container width={widthOfInput}>
              <CustomLabel label="Email" />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <CustomInput
                    placeholder={"Enter Your Email"}
                    hasError={!!errors.email}
                    errorMessage={(errors.email?.message as string) || ""}
                    onChange={(event) => {
                      setValue("email", event.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    name={field.name}
                    value={field.value}
                  />
                )}
              ></Controller>
            </Grid>
            <Grid container width={widthOfInput}>
              <CustomLabel label="Password" />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <CustomInput
                    placeholder={"Enter your Password"}
                    isNumeric={false}
                    isPassword={true}
                    hasError={!!errors.password}
                    errorMessage={errors.password?.message}
                    onChange={(event) => {
                      setValue("password", event.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    name={field.name}
                    value={field.value}
                  />
                )}
              ></Controller>
            </Grid>
            <Grid container justifyContent={"space-between"} alignItems={"center"} width={widthOfInput}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />

              <Link sx={{ textDecoration: "none", cursor: "pointer" }} onClick={() => handleOnClickLink()}>
                <Typography fontWeight={550} variant="bodySmall" color="#106DCC">
                  {"Forgot password"}
                </Typography>
              </Link>
            </Grid>
            <Grid width={widthOfInput}>
              <Button
                // disabled
                variant="contained"
                fullWidth
                type="submit"
                style={{ background: "#106DCC" }}
              >
                Login
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

        {/* Login image */}
        <Grid
          p={2}
          width={below1024 ? "47%" : "55%"}
          bgcolor="#EFF0F2"
          container
          flexDirection={"column"}
          borderRadius={5}
        >
          <Grid container alignItems={"center"} justifyContent={"center"} height={"100%"}>
            <Box width={"100%"} height={"100%"} component={"img"} src={LoginImage}></Box>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginPage;
