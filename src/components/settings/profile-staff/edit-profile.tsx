import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import UploadLogo from "../../../common-components/image-upload/custom-image-upload";
import useApiFeedback from "../../../hooks/useApiFeedback";
import {
  useUserControllerServiceChangeAvatar3,
  useUserControllerServiceUpdateUser,
} from "../../../sdk/queries";
import { User } from "../../../sdk/requests";
import { GetTenantId } from "../../../services/common/get-tenant-id";
import { splitPhoneNumber } from "../../../services/common/phone-formatter";
import { theme } from "../../../utils/theme";
import { customStyle } from "../profile-provider/edit-profile";
import { editProfileSchema } from "./profile-schema";

type EditProfileProps = {
  // eslint-disable-next-line no-unused-vars
  setIsEdit: (isEdit: boolean) => void;
  profileData: User;
  refetch: () => void;
};

const EditProfile = (props: EditProfileProps) => {
  const { setIsEdit, profileData, refetch } = props;
  const [avatar, setAvatar] = useState("");
  //EDIT
  const initialValuesEditProfile = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",

    email: profileData?.email || "",
    phone: profileData?.phone
      ? splitPhoneNumber(profileData?.phone)?.number
      : "" || "",
    prefix: profileData?.phone
      ? splitPhoneNumber(profileData?.phone)?.countryCode
      : "+1",
    address: {
      line1: profileData?.address?.line1 || "",
      line2: profileData?.address?.line2 || "",
      city: profileData?.address?.city || "",
      state: profileData?.address?.state || "",
      zipcode: profileData?.address?.zipcode || "",
      country: profileData?.address?.country || "",
    },
  };

  const method = useForm({
    defaultValues: initialValuesEditProfile,
    resolver: yupResolver(editProfileSchema),
  });

  const {
    control,
    handleSubmit,
    // watch,
    // clearErrors,
    formState: { errors },
  } = method;

  const { mutateAsync, isError, isSuccess, data, error } =
    useUserControllerServiceUpdateUser();

  const {
    mutateAsync: mutateAsyncChangeAvatar,
    // isSuccess: isSuccessAvatar,
    // data: dataAvatar,
  } = useUserControllerServiceChangeAvatar3();

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || "Profile updated successFully") as string,
  );

  const onSubmit = async (data: FieldValues) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: `${data.prefix}${data.phone}`,
      uuid: profileData.uuid,
      address: data.address,
    } as User;
    await mutateAsync({ requestBody: { ...profileData, ...payload } });
    if (avatar && profileData?.uuid) {
      if (avatar.includes("http")) {
        setIsEdit(false);
        refetch();
        return;
      }
      await mutateAsyncChangeAvatar({
        requestBody: {
          newAvatar: avatar.startsWith("data:image")
            ? avatar.replace(/data:image\/(jpeg|png);base64,/, "")
            : avatar,
        },
        userUuid: profileData?.uuid || "",
        xTenantId: GetTenantId(),
      });
    }
    setIsEdit(false);
    refetch();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
              Edit Profile
            </Typography>
            <Grid container columnGap={1}>
              <Button
                variant="outlined"
                onClick={() => setIsEdit(false)}
                sx={{
                  padding: "0px 10px",
                  height: "30px",
                  background: theme.palette.secondary.main,
                }}
              >
                <Grid columnGap={0.5} container alignItems={"center"}>
                  <CloseIcon
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "18px",
                    }}
                  />
                  <Typography
                    variant="bodySmall"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Cancel
                  </Typography>
                </Grid>
              </Button>
              <Button
                variant="contained"
                type={"submit"}
                onClick={() => {}}
                sx={{
                  padding: "0px 10px",
                  height: "30px",
                }}
              >
                <Grid columnGap={0.5} container alignItems={"center"}>
                  <DoneOutlinedIcon
                    sx={{
                      fontSize: "18px",
                    }}
                  />
                  <Typography variant="bodySmall">Save</Typography>
                </Grid>
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"space-between"}
            flexDirection={"column"}
          >
            <Grid container justifyContent={"center"} p={2}>
              <UploadLogo
                customStyle={customStyle}
                handleSetImage={(image: string | ArrayBuffer | null) =>
                  setAvatar(image ? (image as string) : "")
                }
                imageUrl={profileData?.avatar}
              />
            </Grid>
            <Grid container justifyContent={"space-between"}>
              <Grid
                container
                flexDirection={"column"}
                p={2}
                rowGap={1}
                width={"50%"}
              >
                <CustomLabel isRequired label="First Name" />
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value || ""}
                      placeholder={"Enter First Name"}
                      hasError={!!errors.firstName}
                      errorMessage={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid
                container
                flexDirection={"column"}
                p={2}
                rowGap={1}
                width={"50%"}
              >
                <CustomLabel label="Last Name" />
                <Grid container columnGap={1}>
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Last Name"}
                        hasError={!!errors.firstName}
                        errorMessage={errors.firstName?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container justifyContent={"space-between"}>
              <Grid
                container
                flexDirection={"column"}
                p={2}
                rowGap={1}
                width={"50%"}
              >
                <CustomLabel isRequired label="Email" />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value || ""}
                      placeholder={"Enter Email"}
                      hasError={!!errors.email}
                      errorMessage={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid
                container
                flexDirection={"column"}
                p={2}
                rowGap={1}
                width={"50%"}
              >
                <CustomLabel label="Phone Number" />
                <Grid container columnGap={1}>
                  <Grid width={"73px"}>
                    <Controller
                      control={control}
                      name="prefix"
                      render={({ field }) => (
                        <CustomSelect
                          items={[
                            { value: "+91", label: "+91" },
                            { value: "+1", label: "+1" },
                          ]}
                          {...field}
                          value={field.value || ""}
                          placeholder={""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid flex={1}>
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          maxLength={10}
                          value={field.value || ""}
                          placeholder={"Enter Phone Number"}
                          hasError={!!errors.phone}
                          errorMessage={errors.phone?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              borderRadius={"6px"}
              border={`1px solid ${theme.palette.grey[300]}`}
              paddingBottom={1}
              // border={1}
              width={"100%"}
              // container
            >
              <Grid
                p={1.5}
                borderBottom={`1px solid ${theme.palette.grey[300]}`}
              >
                <Typography variant="bodySmall" fontWeight={550}>
                  Address
                </Typography>
              </Grid>

              <Grid p={1} container justifyContent={"space-between"}>
                <Grid width={"48%"}>
                  <CustomLabel label="Line 1" />
                  <Controller
                    control={control}
                    name="address.line1"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value.trim() || ""}
                        placeholder={"Enter Address Line 1"}
                        hasError={!!errors.address?.line1}
                        errorMessage={errors.address?.line1?.message as string}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"48%"}>
                  <CustomLabel label="Line 2" />
                  <Controller
                    control={control}
                    name="address.line2"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Address Line 2"}
                        hasError={!!errors.address?.line2}
                        errorMessage={errors.address?.line2?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid p={1} container justifyContent={"space-between"}>
                <Grid width={"48%"}>
                  <CustomLabel label="State" />
                  <Controller
                    control={control}
                    name="address.state"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Location State"}
                        hasError={!!errors.address?.state}
                        errorMessage={errors.address?.state?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"48%"}>
                  <CustomLabel label="City" />
                  <Controller
                    control={control}
                    name="address.city"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Location City"}
                        hasError={!!errors.address?.city}
                        errorMessage={errors.address?.city?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid p={1} container justifyContent={"space-between"}>
                <Grid width={"48%"}>
                  <CustomLabel label="Country" />
                  <Controller
                    control={control}
                    name="address.country"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Location Country"}
                        hasError={!!errors.address?.country}
                        errorMessage={errors.address?.country?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"48%"}>
                  <CustomLabel label="Zip Code" />
                  <Controller
                    control={control}
                    name="address.zipcode"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Zip Code"}
                        hasError={!!errors.address?.zipcode}
                        errorMessage={errors.address?.zipcode?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditProfile;
