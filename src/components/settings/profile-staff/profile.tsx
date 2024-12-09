import { yupResolver } from "@hookform/resolvers/yup";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import useApiFeedback from "../../../hooks/useApiFeedback";
import { setIsLoading } from "../../../redux/actions/loader-action";
import { useUserControllerServiceChangePassword } from "../../../sdk/queries";
import {
  ChangePasswordRequest,
  User,
  UserControllerService,
} from "../../../sdk/requests";
import { theme } from "../../../utils/theme";
import EditProfile from "./edit-profile";
import { changePasswordSchema } from "./profile-schema";
import { useNavigate } from "react-router-dom";
import cookieService from "../../../services/core/cookie-service";
import UploadLogo from "../../../common-components/image-upload/custom-image-upload";

const customStyle = {
  height: "8rem",
  width: "8rem",
};

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
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

  useApiFeedback(
    isErrorChangePassword,
    addError,
    isSuccessChangePassword,
    (addData?.message || "Password Change SuccessFully") as string,
  );

  const {
    data,
    isLoading,
    isPending: isPendingGetProfile,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => UserControllerService.getProfile1(),
  });

  const profileData = (data as unknown as AxiosResponse)?.data as User;

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
            <Grid container justifyContent={"center"} p={2}>
              <UploadLogo
                customStyle={customStyle}
                handleSetImage={(image: string | ArrayBuffer | null) => image}
                imageUrl={profileData?.avatar}
              />
            </Grid>
            <Grid container justifyContent={"space-between"}>
              <Grid container flexDirection={"column"} p={2} rowGap={1}>
                <Typography color="#525252" variant="bodySmall">
                  {"Full Name"}{" "}
                </Typography>{" "}
                <Typography variant="bodySmall" color="#333332">
                  {`${profileData?.firstName ? profileData?.firstName : "-"} ${profileData?.middleName ? profileData?.middleName : ""} ${profileData?.lastName ? profileData?.lastName : "-"}`}
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
                  {"Address"}{" "}
                </Typography>{" "}
                <Typography variant="bodySmall" color="#333332">
                  {`${profileData?.address?.line1 || "-"},  ${profileData?.address?.line2 || "-"},
								 ${profileData?.address?.city || "-"},` || "-"}
                </Typography>
                <Typography variant="bodySmall" color="#333332">
                  {` ${profileData?.address?.state || "-"},
								  ${profileData?.address?.country || "-"}, ${profileData?.address?.zipcode || "-"}` ||
                    "-"}
                </Typography>
              </Grid>
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
          refetch={() => refetch()}
        />
      )}
    </>
  );
};

export default Profile;
