import { yupResolver } from "@hookform/resolvers/yup";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomAutoComplete from "../../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInput from "../../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import UploadLogo from "../../../../common-components/image-upload/custom-image-upload";
import { Gender, Roles } from "../../../../constants/roles";
import useApiFeedback from "../../../../hooks/useApiFeedback";
import { setIsLoading } from "../../../../redux/actions/loader-action";
import {
  useUserControllerServiceAddUser,
  useUserControllerServiceChangeAvatar3,
  useUserControllerServiceUpdateUser,
} from "../../../../sdk/queries";
import {
  Address,
  LocationControllerService,
  LocationHour,
  User,
  UserControllerService,
} from "../../../../sdk/requests";
import { splitPhoneNumber } from "../../../../services/common/phone-formatter";
import { stateList } from "../../../../utils/StateList";
import { theme } from "../../../../utils/theme";
import { staffFormSchema } from "./staff-schema";
import { setSnackbarOn } from "../../../../redux/actions/snackbar-action";
import { AlertSeverity } from "../../../../common-components/snackbar-alert/snackbar-alert";
import { ErrorResponseEntity } from "../../../../models/response/error-response";
import { AppDispatch } from "../../../../redux/store";
import { fetchProfileData } from "../../../../redux/actions/profile-async-actions";

export const customStyle = {
  height: "8rem",
  width: "8rem",
  maxHeight: "8rem",
};

type Locations = {
  uuid?: string;
  name: string;
  locationId?: string;
  phone: string;
  timezone?: string;
  email: string;
  address: Address;
  locationHours?: LocationHour[];
  active?: boolean;
  archive?: boolean;
};

export interface StaffFormProp {
  staffData: User | null;
  handleDrawerClose: () => void;
  isEdit?: boolean;
  isView?: boolean;
  refetchList?: () => void;
  xTenantId: string;
  rolesOptions: {
    value: string;
    label: string;
  }[];
  selectedFilterOpt: string;
}

const StaffForm = (props: StaffFormProp) => {
  const {
    isEdit,
    xTenantId,
    handleDrawerClose,
    refetchList,
    staffData,
    rolesOptions,
  } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [avatar, setAvatar] = useState("");
  const [isRoleSiteAdmin, setIsRoleSiteAdmin] = useState(false);
  const [locationListForStaff, setLocationListForStaff] = useState<
    { value: string; key: string }[]
  >([]);

  const providerLocation = async () => {
    try {
      const res = await LocationControllerService.getAllLocations({
        xTenantId: xTenantId,
        archive: false,
        status: true,
      });
      const locationList = res.data?.content as Locations[];
      const viewList = locationList.map((location) => ({
        value: location?.name || "",
        key: location?.uuid || "",
      }));
      setLocationListForStaff(viewList);
    } catch (error) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: (error as ErrorResponseEntity).body.message,
        }),
      );
    }
  };

  useEffect(() => {
    providerLocation();
  }, []);

  const initialValues = {
    role: staffData?.role || "",
    firstName: staffData?.firstName || "",
    location: staffData?.locationId || "",
    lastName: staffData?.lastName || "",
    status: staffData?.active ? "active" : "inactive" || "",
    email: staffData?.email || "",
    phone: staffData?.phone
      ? splitPhoneNumber(staffData?.phone)?.number
      : "" || "",
    prefix: staffData?.phone
      ? splitPhoneNumber(staffData?.phone)?.countryCode
      : "+1",
    address: {
      line1: staffData?.address?.line1 || "",
      line2: staffData?.address?.line2 || "",
      city: staffData?.address?.city || "",
      state: staffData?.address?.state || "",
      zipcode: staffData?.address?.zipcode || "",
      country: "USA",
    },
    gender: staffData?.gender || "",
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(staffFormSchema),
  });

  const { data, mutateAsync, isSuccess, isError, error, isPending } =
    useUserControllerServiceAddUser();

  const {
    data: dataEdit,
    mutateAsync: mutateAsyncEdit,
    isSuccess: isSuccessEdit,
    isError: isErrorEdit,
    error: errorEdit,
    isPending: isPendingEdit,
  } = useUserControllerServiceUpdateUser();

  useApiFeedback(
    isErrorEdit,
    errorEdit,
    isSuccessEdit,
    (dataEdit?.message || "User added successfully!") as string,
  );
  const { mutateAsync: mutateAsyncChangeAvatar } =
    useUserControllerServiceChangeAvatar3();

  const getProviderProfile = async () => {
    if (!staffData?.uuid) {
      return;
    }
    try {
      let response = UserControllerService.getUser({
        userId: staffData.uuid,
        xTenantId: xTenantId,
      });
      if (response) {
        let allData = (await response).data as User;
        setAvatar(allData.avatar || "");
      }
    } catch (error) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: (error as ErrorResponseEntity).body.message,
        }),
      );
    }
  };

  useEffect(() => {
    getProviderProfile();
  }, [isEdit]);

  // useEffect(() => {
  //   dispatch(fetchProfileData(xTenantId));
  // }, [dispatch, xTenantId, isEdit]);

  const onSubmit = async (values: FieldValues) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: `${values.prefix}${values.phone}`,
      role: values.role,
      roleType: "STAFF",
      address: {
        line1: values.address?.line1,
        line2: values.address?.line2,
        city: values.address?.city,
        state: values.address?.state,
        country: values.address?.country,
        zipcode: values.address?.zipcode,
      },
      gender: values.gender,
      avatar: avatar ? avatar : values.avatar,
      active: values.status === "active" ? true : false,
      locationId: values.location || "",
    } as User;

    if (isEdit) {
      await mutateAsyncEdit({
        requestBody: { ...payload, uuid: staffData?.uuid },
        xTenantId: xTenantId,
      });
      if (avatar && staffData?.uuid) {
        if (avatar.includes("http")) {
          handleDrawerClose();
          refetchList && refetchList();
          return;
        }
        await mutateAsyncChangeAvatar({
          requestBody: {
            newAvatar: avatar.startsWith("data:image")
              ? avatar.replace(/data:image\/(jpeg|png);base64,/, "")
              : avatar,
          },
          userUuid: staffData?.uuid || "",
          xTenantId,
        });
      }
      setAvatar("");
    } else {
      await mutateAsync({
        requestBody: payload,
        xTenantId: xTenantId,
      });
    }

    dispatch(fetchProfileData(xTenantId));

    handleDrawerClose();
    refetchList && refetchList();
  };

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || "User added successfully!") as string,
  );

  const watchRole = watch("role");
  useEffect(() => {
    const roleVal = getValues("role");
    if (roleVal === Roles.SITE_ADMIN) {
      setIsRoleSiteAdmin(true);
    } else {
      setIsRoleSiteAdmin(false);
      setValue("location", "", { shouldValidate: true });
    }
  }, [watchRole]);

  useEffect(() => {
    dispatch(setIsLoading(isPending || isPendingEdit));
  }, [dispatch, isPending, isPendingEdit]);

  return (
    <form style={{ height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        height={"100%"}
        container
        flexDirection={"column"}
        overflow={"auto"}
        flexWrap={"nowrap"}
        justifyContent={"space-between"}
      >
        <Grid mt={2} mb={2} rowGap={2} container flexDirection={"column"}>
          <Grid container>
            {isEdit && (
              <Grid p={2}>
                <UploadLogo
                  handleSetImage={(image: string | ArrayBuffer | null) =>
                    setAvatar(image ? (image as string) : "")
                  }
                  imageUrl={avatar}
                  customStyle={customStyle}
                />
              </Grid>
            )}
            <Grid flex={1} container flexDirection={"column"} rowGap={3}>
              <Grid container justifyContent={"space-between"} width={"100%"}>
                <Grid width={"48%"}>
                  <CustomLabel label="First Name" isRequired />
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

                <Grid width={"48%"}>
                  <CustomLabel label="Last Name" isRequired />
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Last Name"}
                        hasError={!!errors.lastName}
                        errorMessage={errors.lastName?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"}>
                <Grid width={"48%"}>
                  <CustomLabel label="Email" isRequired />
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
                <Grid width={"48%"}>
                  <CustomLabel label="Phone Number" isRequired />
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
              <Grid container justifyContent={"space-between"}>
                <Grid width={"48%"}>
                  <CustomLabel label="Role" isRequired />
                  <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Staff Role"}
                        items={rolesOptions}
                        {...field}
                        hasError={!!errors.role}
                        errorMessage={errors.role?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"48%"}>
                  <CustomLabel label="Gender" isRequired />
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Gender"}
                        items={Gender}
                        {...field}
                        hasError={!!errors.gender}
                        errorMessage={errors.gender?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {isRoleSiteAdmin && (
                <Grid width={"48%"}>
                  <CustomLabel label="Location" isRequired />
                  <Controller
                    control={control}
                    name="location"
                    render={({ field }) => (
                      <CustomAutoComplete
                        placeholder={"Select Location"}
                        options={locationListForStaff}
                        {...field}
                        value={field.value || ""}
                        hasError={!!errors.location}
                        errorMessage={errors.location?.message}
                      />
                    )}
                  />
                </Grid>
              )}
              {isEdit && (
                <Grid container justifyContent={"space-between"}>
                  <Grid width={"48%"}>
                    <CustomLabel label="Status" />
                    <Controller
                      control={control}
                      name="status"
                      render={({ field }) => (
                        <CustomSelect
                          placeholder={"Select Status"}
                          items={[
                            { value: "active", label: "Active" },
                            { value: "inactive", label: "Inactive" },
                          ]}
                          {...field}
                          value={field.value || ""}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>{" "}
          <Grid
            borderRadius={"6px"}
            border={`1px solid ${theme.palette.grey[300]}`}
            paddingBottom={1}
          >
            <Grid p={1.5} borderBottom={`1px solid ${theme.palette.grey[300]}`}>
              <Typography variant="bodySmall" fontWeight={550}>
                Address
              </Typography>
            </Grid>
            <Grid p={1} container justifyContent={"space-between"}>
              <Grid width={"48%"}>
                <CustomLabel label="Line 1" isRequired />
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
                <CustomLabel label="State" isRequired />
                <Controller
                  control={control}
                  name="address.state"
                  render={({ field }) => (
                    <CustomAutoComplete
                      {...field}
                      placeholder={"Search the state"}
                      options={stateList}
                      maxHeightForOptionsList={300}
                      value={field.value || ""}
                      hasError={!!errors.address?.state}
                      errorMessage={errors.address?.state?.message}
                    />
                  )}
                />
              </Grid>
              <Grid width={"48%"}>
                <CustomLabel label="City" isRequired />
                <Controller
                  control={control}
                  name="address.city"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={"Enter city"}
                      name={"city"}
                      value={field.value}
                      onChange={(event) => {
                        setValue("address.city", event.target.value, {
                          shouldValidate: true,
                        });
                      }}
                      hasError={!!errors.address?.city}
                      errorMessage={errors.address?.city?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid p={1} container justifyContent={"space-between"}>
              <Grid width={"48%"}>
                <CustomLabel label="Country" isRequired />
                <Controller
                  control={control}
                  name="address.country"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={"USA"}
                      placeholder={"Enter country name"}
                      hasError={!!errors.address?.country}
                      errorMessage={errors.address?.country?.message}
                      disableField={true}
                    />
                  )}
                />
              </Grid>
              <Grid width={"48%"}>
                <CustomLabel label="Zip Code" isRequired />
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
        <Grid height={"8%"} borderTop={`1px solid ${theme.palette.grey[300]}`}>
          <Grid container p={1} justifyContent={"flex-end"}>
            <Button
              startIcon={isEdit ? <></> : <DoneOutlinedIcon />}
              variant="contained"
              type="submit"
            >
              <Typography variant="bodySmall">
                {isEdit ? "Save" : "Add Staff"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default StaffForm;
