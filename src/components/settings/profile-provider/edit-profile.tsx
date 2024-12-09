import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {
  Button,
  IconButton,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  useFieldArray,
  useForm,
} from "react-hook-form";
import CustomAutoComplete from "../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import DatePicker from "../../../common-components/date-picker-field/date-picker-field";
import UploadLogo from "../../../common-components/image-upload/custom-image-upload";
import { providerTypes } from "../../../constants/provider";
// import useAuthority from "../../../hooks/use-authority";
import useApiFeedback from "../../../hooks/useApiFeedback";
import { ContentObject } from "../../../models/response/response-content-entity";
import { useProviderControllerServiceUpdateProvider } from "../../../sdk/queries";
import { LicenseStateControllerService, Provider } from "../../../sdk/requests";
import { splitPhoneNumber } from "../../../services/common/phone-formatter";
import { theme } from "../../../utils/theme";
import { editProfileSchema } from "./profile-schema";
export const customStyle = {
  height: "8rem",
  width: "8rem",
  maxHeight: "8rem",
};

type EditProfileProps = {
  // eslint-disable-next-line no-unused-vars
  setIsEdit: (_isEdit: boolean) => void;
  profileData: Provider;
  refetch: () => void;
};

const EditProfile = (props: EditProfileProps) => {
  const { setIsEdit, profileData, refetch } = props;
  const [avatar, setAvatar] = useState("");

  // const { isProvider } = useAuthority();

  //EDIT
  const initialValuesEditProfile = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    npi: profileData?.npi || "",
    providerType: profileData?.providerType || "",
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
    avatar: profileData?.avatar || "",
    licenses: profileData?.providerLicenseDetails?.map((item) => {
      return {
        licenseNumber: item?.licenseNumber || "",
        expiryDate: item?.expiryDate
          ? format(item?.expiryDate, "MM-dd-yyyy")
          : "",
        licensedStates:
          item?.licensedStates?.length && item.licensedStates
            ? item.licensedStates[0].state || ""
            : "",
      };
    }) || [
      {
        // uuid: "", // Empty string for UUID
        licenseNumber: "", // Empty string for license number
        expiryDate: "", // Empty string for expiry date (can be filled with date picker)
        licensedStates: "",
      },
    ],
  };

  const { data: dataLocations, isSuccess: isSuccessLocations } = useQuery({
    queryKey: ["list-of-licensed-states"],
    queryFn: () =>
      LicenseStateControllerService.getAllLicensedStates({
        page: 0,
        size: 100,
      }),
  });

  useEffect(() => {
    if (isSuccessLocations) {
      const res = (dataLocations as unknown as AxiosResponse)
        .data as ContentObject<{ id: number; country: "US"; state: string }[]>;

      const licensedStateOpt = res.content.map(
        (item: { id: number; country: "US"; state: string }) => {
          return {
            key: `${item.state.toString()}`,
            value: item.state,
            info: item.id.toString(),
          };
        },
      );

      setLicensedStateOptions(licensedStateOpt);
    }
  }, [dataLocations, isSuccessLocations]);

  const [licensedStateOptions, setLicensedStateOptions] = useState<
    {
      key: string;
      value: string;
      info: string;
    }[]
  >([]);

  const method = useForm({
    defaultValues: initialValuesEditProfile,
    resolver: yupResolver(editProfileSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    // watch,
    // clearErrors,
    formState: { errors },
  } = method;

  const { mutateAsync, isError, isSuccess, data, error } =
    useProviderControllerServiceUpdateProvider();

  const {
    fields: licensesArray,
    append: appendLicenses,
    remove: removeLicenses,
  } = useFieldArray({ name: "licenses", control });

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || "Profile updated successFully") as string,
  );

  const getIdOfState = (state: string) => {
    let idValue = "";
    licensedStateOptions.map((stateVal) => {
      if (stateVal.value == state) {
        idValue = stateVal.info;
      }
    });
    return idValue;
  };

  const onSubmit = async (data: FieldValues) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: `${data.prefix}${data.phone}`,
      uuid: profileData.uuid,
      address: data.address,
      providerType: data.providerType,
      avatar: avatar || data?.avatar,
      providerLicenseDetails: data.licenses.map(
        (item: {
          licenseNumber: string;
          expiryDate: string;
          licensedStates: string;
        }) => {
          return {
            licenseNumber: item?.licenseNumber || "",
            expiryDate: new Date(item?.expiryDate).toISOString(),
            licensedStates: [
              {
                country: item.licensedStates,
                id: +getIdOfState(item.licensedStates),
              },
            ],
          };
        },
      ),
    } as Provider;
    await mutateAsync({ requestBody: { ...profileData, ...payload } });
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
            <Grid
              container
              justifyContent={"center"}
              bgcolor={"#F3F3F3"}
              borderRadius={"8px"}
              m={2}
              p={2}
            >
              {/* background: #F3F3F3; */}

              <UploadLogo
                handleSetImage={(image: string | ArrayBuffer | null) =>
                  setAvatar(image ? (image as string) : "")
                }
                imageUrl={avatar}
                customStyle={customStyle}
              />
            </Grid>
            <Grid container justifyContent={"space-between"}>
              <Grid
                container
                flexDirection={"column"}
                p={2}
                rowGap={1}
                width={"33%"}
              >
                <CustomLabel isRequired label="Provider Type" />
                <Controller
                  control={control}
                  name="providerType"
                  render={({ field }) => (
                    <CustomSelect
                      value={field.value || ""}
                      placeholder={"Provider Type"}
                      items={providerTypes}
                      onChange={function (e: SelectChangeEvent<string>): void {
                        setValue("providerType", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                      hasError={!!errors.providerType}
                      errorMessage={errors.providerType?.message}
                      name={field.name}
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
                <CustomLabel isRequired label="First Name" />
                <Grid container columnGap={1}>
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
              </Grid>
              <Grid
                container
                flexDirection={"column"}
                p={2}
                rowGap={1}
                width={"33%"}
              >
                <CustomLabel isRequired label="Last Name" />
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
                width={"33%"}
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
                width={"33%"}
              >
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
              <Grid
                container
                flexDirection={"column"}
                p={2}
                rowGap={1}
                width={"33%"}
              >
                <CustomLabel isRequired label="NPI" />
                <Controller
                  control={control}
                  name="npi"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      maxLength={10}
                      value={field.value || ""}
                      placeholder={"Enter NPI"}
                      hasError={!!errors.npi}
                      errorMessage={errors.npi?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid
              borderRadius={"6px"}
              border={`1px solid ${theme.palette.grey[300]}`}
              paddingBottom={1}
              // border={1}
              flexDirection={"column"}
              // width={"99%"}
              container
              m={2}
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
                  <CustomLabel isRequired label="Line 1" />
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
                  <CustomLabel isRequired label="State" />
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
                  <CustomLabel isRequired label="City" />
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
                  <CustomLabel isRequired label="Country" />
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
                  <CustomLabel isRequired label="Zip Code" />
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
            <Grid container flexDirection={"column"} m={2}>
              <Grid mb={1}>
                <Typography variant="bodyMedium" fontWeight={550}>
                  {"License Details"}
                </Typography>
              </Grid>
              <Grid
                p={1}
                bgcolor={theme.palette.secondary.light}
                container
                flexDirection={"column"}
                justifyContent={"space-between"}
                rowGap={0.5}
              >
                {licensesArray.map((license, index) => (
                  <Grid
                    container
                    key={license.id}
                    justifyContent={"space-between"}
                  >
                    <Grid width={"29%"}>
                      <CustomLabel label="Licensed Number" />
                      <Controller
                        control={control}
                        name={`licenses.${index}.licenseNumber`}
                        render={({ field }) => (
                          // <CustomSelect
                          // 	placeholder={"Select"}
                          // 	{...field}
                          // 	value={field.value || ""}
                          // 	items={[{ value: "One", label: "One" }]}
                          // 	hasError={
                          // 		!!errors.licenses?.length &&
                          // 		!!errors.licenses[index]?.licenseNumber
                          // 	}
                          // 	errorMessage={
                          // 		errors.licenses?.length
                          // 			? errors.licenses[index]?.licenseNumber?.message
                          // 			: ""
                          // 	}
                          // />
                          <CustomInput
                            {...field}
                            bgWhite
                            placeholder={"Enter License Number"}
                            name={"licenseNumber"}
                            value={field.value || ""}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"29%"}>
                      <CustomLabel label="Licensed State" />
                      <Controller
                        control={control}
                        name={`licenses.${index}.licensedStates`}
                        render={({ field }) => (
                          <CustomAutoComplete
                            placeholder={"Select"}
                            {...field}
                            value={field.value || ""}
                            bgWhite={true}
                            // onChange={(selectedValue) => {
                            // 	// selectedValue?.map((state) => {
                            // 	setValue(
                            // 		`licenses.${index}.licensedState`,
                            // 		selectedValue
                            // 	);
                            // 	// });
                            // }}
                            options={licensedStateOptions}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"29%"}>
                      <CustomLabel label="License Expiry Date" />
                      <Controller
                        control={control}
                        name={`licenses.${index}.expiryDate`}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            bgWhite
                            value={field.value}
                            onDateChange={function (
                              selectedDate: string,
                            ): void {
                              setValue(
                                `licenses.${index}.expiryDate`,
                                selectedDate,
                                { shouldValidate: true },
                              );
                            }}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <IconButton onClick={() => removeLicenses(index)}>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid mt={1}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      appendLicenses({
                        licensedStates: "",
                        expiryDate: "",
                        licenseNumber: "",
                      })
                    }
                  >
                    Add License Details
                  </Button>
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
