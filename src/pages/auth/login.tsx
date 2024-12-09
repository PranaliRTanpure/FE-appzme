import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Link, Typography } from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import LoginImage from "../../assets/image_svg/auth/Login-Image.svg";
import AuthImage from "../../common-components/auth/auth-image";
import CustomInput from "../../common-components/custom-input/custom-input";
import CustomLabel from "../../common-components/custom-label/custom-label";
import { AlertSeverity } from "../../common-components/snackbar-alert/snackbar-alert";
import useStoreLoginData from "../../hooks/use-store-login-data";
import { ErrorResponseEntity } from "../../models/response/error-response";
import { setSnackbarOn } from "../../redux/actions/snackbar-action";
import { useUserControllerServiceGetAccessToken } from "../../sdk/queries";
import { GetTenantId } from "../../services/common/get-tenant-id";
import { emailRegExp, passwordRegx } from "../../utils/regex";
import { theme } from "../../utils/theme";
import {
  emailRegexErrorMsg,
  emailRequiredErrorMsg,
  passwordIsRequired,
  passwordRegexErrorMsg,
} from "../../constants/error-messages";

export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .required(passwordIsRequired)
    .matches(passwordRegx, passwordRegexErrorMsg),
  email: yup
    .string()
    .required(emailRequiredErrorMsg)
    .matches(emailRegExp, emailRegexErrorMsg),
});

const LoginPage = () => {
  const below400 = useMediaQuery("(max-width:400px)");
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

  const { data, mutateAsync, isSuccess, isError, error } =
    useUserControllerServiceGetAccessToken();

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
    const message =
      (error && (error as ErrorResponseEntity)?.body?.message) ||
      "Error occurred while logging in";
    if (isError) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: message as string,
        }),
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "100%" }}
    >
      <Grid width={"100%"} height={"100%"} container flexWrap={"nowrap"}>
        {!below400 && <AuthImage logo={LoginImage} />}

        {/* Login Form */}
        <Grid
          container
          justifyContent={"center"}
          alignContent={"center"}
          width={below400 ? "100%" : "50%"}
          sx={{ textAlign: "center" }}
          pb={8}
        >
          <Grid
            boxShadow={`0px 0px 16px 0px #021D2614`}
            width={"456px"}
            height={"500px"}
            container
            borderRadius={"8px"}
            justifyContent={"center"}
            p={5}
            flexDirection={"column"}
            rowGap={2}
          >
            <Grid container flexDirection={"column"} rowGap={0.5}>
              <Typography fontWeight={600} fontSize={"30px"}>
                Log in to your account
              </Typography>
              <Typography variant="bodyMedium" color={theme.palette.grey[600]}>
                Welcome! Please enter your details.
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
                    errorMessage={(errors.email?.message as string) || ""}
                    onChange={(event) => {
                      setValue("email", event.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              ></Controller>
            </Grid>
            <Grid container>
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
                    {...field}
                    onChange={(event) => {
                      setValue("password", event.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              ></Controller>
            </Grid>
            <Grid container justifyContent={"flex-end"} alignItems={"center"}>
              {/* <FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
								sx={{
									"& .MuiFormControlLabel-label": {
										fontSize: "14px", // Change font size here
									},
								}}
							/> */}

              <Link
                sx={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => handleOnClickLink()}
              >
                <Typography fontWeight={550} variant="bodySmall">
                  {"Forgot password"}
                </Typography>
              </Link>
            </Grid>
            <Grid width={"100%"}>
              <Button variant="contained" fullWidth type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginPage;
