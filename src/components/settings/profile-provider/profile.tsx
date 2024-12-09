import { yupResolver } from "@hookform/resolvers/yup";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Logo from "../../../assets/image_svg/icons/upload-logo.svg";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import useApiFeedback from "../../../hooks/useApiFeedback";
import { setIsLoading } from "../../../redux/actions/loader-action";
import { useUserControllerServiceChangePassword } from "../../../sdk/queries";
import { ChangePasswordRequest, Provider } from "../../../sdk/requests";
import { GetTenantId } from "../../../services/common/get-tenant-id";
import { theme } from "../../../utils/theme";
import EditProfile from "./edit-profile";
import { changePasswordSchema } from "./profile-schema";
import cookieService from "../../../services/core/cookie-service";
import { useNavigate } from "react-router-dom";
// import { fetchProfileData } from "../../../redux/reducer/get-profile";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchProfileData } from "../../../redux/actions/profile-async-actions";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const buildChangePasswordPayload = (data: typeof initialValues) => {
    const payload = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    return payload;
  };

  const {
    mutateAsync,
    isError: isErrorChangePassword,
    isSuccess: isSuccessChangePassword,
    error: addError,
    data: addData,
    isPending,
  } = useUserControllerServiceChangePassword();

  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(changePasswordSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = method;

  const onSubmit = async (data: FieldValues) => {
    const chanegPasswordPayload: ChangePasswordRequest =
      buildChangePasswordPayload(data as typeof initialValues);

    await mutateAsync({
      requestBody: chanegPasswordPayload,
    });

    cookieService.clearCookies();
    localStorage.clear();
    localStorage.removeItem("redirectURL");
    navigate("/auth/login");
  };

  const xTenantIdVal = GetTenantId();

  useApiFeedback(
    isErrorChangePassword,
    addError,
    isSuccessChangePassword,
    (addData?.message || "Password Change SuccessFully") as string,
  );
  // const {
  //   data,
  //   isLoading,
  //   isPending: isPendingGetProfile,
  //   isRefetching,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["profile"],

  //   queryFn: () =>
  //     ProviderControllerService.getProfile({ xTenantId: xTenantIdVal }),
  // });

  const { data, isLoading, isPendingGetProfile, isRefetching, refetch } =
    useSelector((state: RootState) => state.profileReducer);

  useEffect(() => {
    dispatch(fetchProfileData(xTenantIdVal));
  }, [dispatch, xTenantIdVal]);

  const profileData = data as Provider;

  useEffect(() => {
    dispatch(
      setIsLoading(
        isLoading || isPending || isPendingGetProfile || isRefetching,
      ),
    );
  }, [dispatch, isLoading, isPending, isPendingGetProfile, isRefetching]);

  return (
    <>
      {!isEdit && (
        <Grid
          container
          flexDirection={"column"}
          justifyContent={"center"}
          rowGap={2}
        >
          <Grid
            border={"1px solid #E8EBEC"}
            borderRadius={"4px"}
            width={"930px"}
            boxShadow="0px 2px 4px -2px #1018281A"
          >
            <Grid
              height={"66px"}
              borderBottom={"1px solid #E8EBEC"}
              container
              p={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="bodyMedium" fontWeight={550}>
                View Profile
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setIsEdit(true)}
                sx={{
                  padding: "0px 10px",
                  height: "30px",
                  background: theme.palette.secondary.main,
                }}
              >
                <Grid columnGap={0.5} container alignItems={"center"}>
                  <EditOutlinedIcon
                    sx={{ color: theme.palette.primary.main, fontSize: "18px" }}
                  />
                  <Typography
                    variant="bodySmall"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Edit
                  </Typography>
                </Grid>
              </Button>
            </Grid>
            <Grid>
              {!profileData?.avatar && (
                <Box
                  sx={{
                    background: "#F3F3F3",
                    margin: "20px",
                    display: "flex",
                    borderRadius: "8px",
                    justifyContent: "center",
                  }}
                >
                  <Box width={"fit-content"} component={"img"} src={Logo}></Box>
                </Box>
              )}
            </Grid>
            <Grid container justifyContent={"space-between"} p={1}>
              <Grid container flexDirection={"column"} p={2} rowGap={1}>
                <Typography color="#525252" variant="bodySmall">
                  {"Full Name"}{" "}
                </Typography>{" "}
                <Typography variant="bodySmall" color="#333332">
                  {`${profileData?.firstName ? profileData?.firstName : "-"}  ${profileData?.lastName ? profileData?.lastName : "-"}`}
                </Typography>
              </Grid>
              <Grid container flexDirection={"column"} p={2} rowGap={1}>
                <Typography color="#525252" variant="bodySmall">
                  {"Email"}{" "}
                </Typography>{" "}
                <Typography variant="bodySmall" color="#333332">
                  {`${profileData?.email ? profileData?.email : "-"}    `}
                </Typography>
              </Grid>
              <Grid container flexDirection={"column"} p={2} rowGap={1}>
                <Typography color="#525252" variant="bodySmall">
                  {"Phone Number"}{" "}
                </Typography>{" "}
                <Typography variant="bodySmall" color="#333332">
                  {` ${profileData?.phone ? profileData?.phone : "-"}`}
                </Typography>
              </Grid>
              <Grid container flexDirection={"column"} p={2} rowGap={1}>
                <Typography color="#525252" variant="bodySmall">
                  {"NPI"}{" "}
                </Typography>{" "}
                <Typography variant="bodySmall" color="#333332">
                  {` ${profileData?.npi ? profileData?.npi : "-"}`}
                </Typography>
              </Grid>
            </Grid>

            <Grid container flexDirection={"column"} p={2} rowGap={1}>
              <Typography color="#525252" variant="bodySmall">
                {"Address"}{" "}
              </Typography>{" "}
              {profileData?.address?.line1 && (
                <>
                  <Typography variant="bodySmall" color="#333332">
                    {`${profileData?.address?.line1 || "-"},  ${profileData?.address?.line2 || "-"},
								 ${profileData?.address?.city || "-"},` || "-"}
                  </Typography>
                  <Typography variant="bodySmall" color="#333332">
                    {` ${profileData?.address?.state || "-"},
								  ${profileData?.address?.country || "-"}, ${profileData?.address?.zipcode || "-"}` ||
                      "-"}
                  </Typography>
                </>
              )}
              {!profileData?.address?.line1 && (
                <>
                  <Typography variant="bodySmall" color="#333332">
                    -
                  </Typography>
                </>
              )}
            </Grid>
            <Grid m={2} p={1}>
              <Typography variant="bodyMedium" fontWeight={550}>
                License Details
              </Typography>
            </Grid>
            <Grid
              p={1}
              bgcolor={theme.palette.secondary.light}
              container
              flexDirection={"column"}
              m={2}
              borderRadius={"8px"}
              justifyContent={"space-between"}
              rowGap={0.5}
            >
              {profileData?.providerLicenseDetails?.map((license, index) => (
                <Grid
                  // m={2}
                  // p={2}
                  borderBottom={"1px solid #E8EBEC"}
                  container
                  key={index}
                  justifyContent={"space-between"}
                >
                  <Grid container flexDirection={"column"} p={2} rowGap={1}>
                    <Typography color="#525252" variant="bodySmall">
                      {"License Number"}{" "}
                    </Typography>{" "}
                    <Typography variant="bodySmall" color="#333332">
                      {license.licenseNumber}
                    </Typography>
                  </Grid>{" "}
                  <Grid container flexDirection={"column"} p={2} rowGap={1}>
                    <Typography color="#525252" variant="bodySmall">
                      {"Licensed State"}{" "}
                    </Typography>{" "}
                    <Typography variant="bodySmall" color="#333332">
                      {license.licensedStates &&
                        license.licensedStates[0].state}
                    </Typography>
                  </Grid>{" "}
                  <Grid container flexDirection={"column"} p={2} rowGap={1}>
                    <Typography color="#525252" variant="bodySmall">
                      {"License Expiry Date"}{" "}
                    </Typography>{" "}
                    <Typography variant="bodySmall" color="#333332">
                      {license.expiryDate
                        ? format(license.expiryDate || "", "MM-dd-yyyy")
                        : ""}
                    </Typography>
                  </Grid>{" "}
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid
            border={"1px solid #E8EBEC"}
            borderRadius={"4px"}
            width={"930px"}
            boxShadow="0px 2px 4px -2px #1018281A"
          >
            <Grid
              height={"66px"}
              borderBottom={"1px solid #E8EBEC"}
              container
              p={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="bodyMedium" fontWeight={550}>
                Change Password
              </Typography>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Grid container justifyContent={"space-between"}>
                <Grid
                  container
                  flexDirection={"column"}
                  p={2}
                  rowGap={1}
                  width={"33%"}
                >
                  <CustomLabel isRequired label="Current Password" />
                  <Controller
                    control={control}
                    name="currentPassword"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Current Password"}
                        hasError={!!errors.currentPassword}
                        errorMessage={errors.currentPassword?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  container
                  flexDirection={"column"}
                  p={2}
                  rowGap={1}
                  width={"33%"}
                >
                  <CustomLabel isRequired label="New Password" />
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter New Password"}
                        hasError={!!errors.newPassword}
                        errorMessage={errors.newPassword?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  container
                  flexDirection={"column"}
                  p={2}
                  rowGap={1}
                  width={"33%"}
                >
                  <CustomLabel isRequired label="Confirm Password" />
                  <Controller
                    control={control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Confirm Password"}
                        hasError={!!errors.confirmNewPassword}
                        errorMessage={errors.confirmNewPassword?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid
                height={"66px"}
                borderTop={"1px solid #E8EBEC"}
                container
                p={2}
                justifyContent={"flex-end"}
                // justifyContent={"space-between"}
                // alignItems={"center"}
              >
                <Grid>
                  <Button
                    startIcon={<DoneOutlinedIcon />}
                    variant="contained"
                    type="submit"
                    sx={{ height: "30px" }}
                  >
                    <Typography variant="bodySmall">
                      {" "}
                      {"Change Password"}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      )}
      {isEdit && (
        <EditProfile
          setIsEdit={setIsEdit}
          profileData={profileData}
          refetch={() => refetch}
        />
      )}
    </>
  );
};

export default Profile;
