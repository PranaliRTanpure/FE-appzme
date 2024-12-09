import { yupResolver } from "@hookform/resolvers/yup";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Button, IconButton, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import CustomAutoComplete from "../../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInput from "../../../../common-components/custom-input/custom-input";
// import { errorStyle } from "../../../../common-components/custom-input/widgets/custom-input-styles";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import DatePicker from "../../../../common-components/date-picker-field/date-picker-field";
import UploadLogo from "../../../../common-components/image-upload/custom-image-upload";
import { AlertSeverity } from "../../../../common-components/snackbar-alert/snackbar-alert";
import { Gender } from "../../../../constants/roles";
import useApiFeedback from "../../../../hooks/useApiFeedback";
import { ProviderRole } from "../../../../models/provider/provider-modal";
import { ErrorResponseEntity } from "../../../../models/response/error-response";
import { ContentObject } from "../../../../models/response/response-content-entity";
import { setIsLoading } from "../../../../redux/actions/loader-action";
import { setSnackbarOn } from "../../../../redux/actions/snackbar-action";
import {
  useProviderControllerServiceChangeAvatar,
  useProviderControllerServiceCreateProvider,
  useProviderControllerServiceUpdateProvider,
} from "../../../../sdk/queries";
import {
  LicenseStateControllerService,
  Provider,
  ProviderControllerService,
} from "../../../../sdk/requests";
import { GetTenantId } from "../../../../services/common/get-tenant-id";
import { splitPhoneNumber } from "../../../../services/common/phone-formatter";
import { stateList } from "../../../../utils/StateList";
import { theme } from "../../../../utils/theme";
import { manualEntryFormSchema } from "./nurse-schema";

export const customStyle = {
  height: "8rem",
  width: "8rem",
};

type NurseFormProps = {
  nurse: Provider | null;
  refetchList?: () => void;
  isEdit?: boolean;
  handleDrawerClose: () => void;
  isNurse: boolean;
};

const NurseForm = (props: NurseFormProps) => {
  const { nurse, refetchList, handleDrawerClose, isEdit, isNurse } = props;
  const [avatar, setAvatar] = useState<string>("");
  // const [providerProfile, setProviderProfile] = useState<string | undefined>("")
  const dispatch = useDispatch();

  const {
    mutateAsync,
    isPending,
    isSuccess: isSuccessCreate,
    isError,
    error,
    data: dataCreate,
  } = useProviderControllerServiceCreateProvider();

  useApiFeedback(
    isError,
    error,
    isSuccessCreate,
    (dataCreate?.message || "Created user successfully!") as string,
  );
  const {
    mutateAsync: mutateAsyncUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    data: dataUpdate,
  } = useProviderControllerServiceUpdateProvider();

  useApiFeedback(
    isErrorUpdate,
    errorUpdate,
    isSuccessUpdate,
    (dataUpdate?.message || "Created updated successfully!") as string,
  );

  const [licensedStateOptions, setLicensedStateOptions] = useState<
    {
      key: string;
      value: string;
      info: string;
    }[]
  >([]);

  const { data, isSuccess } = useQuery({
    queryKey: ["list-of-licensed-states"],
    queryFn: () =>
      LicenseStateControllerService.getAllLicensedStates({
        page: 0,
        size: 100,
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      const res = (data as unknown as AxiosResponse).data as ContentObject<
        { id: number; country: "US"; state: string }[]
      >;

      const licensedStateOpt = res.content.map((item) => {
        return {
          key: `${item.state.toString()}`,
          value: item.state,
          info: item.id.toString(),
        };
      });

      setLicensedStateOptions(licensedStateOpt);
    }
  }, [data, isSuccess]);

  const initialValues = {
    firstName: nurse?.firstName || "",
    lastName: nurse?.lastName || "",
    npi: nurse?.npi || "",
    email: nurse?.email || "",
    phone: nurse?.phone ? splitPhoneNumber(nurse?.phone)?.number : "" || "",
    prefix: nurse?.phone ? splitPhoneNumber(nurse?.phone)?.countryCode : "+1",
    address: {
      line1: nurse?.address?.line1 || "",
      line2: nurse?.address?.line2 || "",
      city: nurse?.address?.city || "",
      state: nurse?.address?.state || "",
      zipcode: nurse?.address?.zipcode || "",
      country: nurse?.address?.country || "USA",
    },
    avatar: avatar || "",
    licenses: nurse?.providerLicenseDetails?.map((v) => {
      return {
        licenseNumber: v.licenseNumber,
        licensedState: v.licensedStates?.length
          ? `${v.licensedStates[0].state}`
          : "",
        licenseExpiryDate: format(new Date(v.expiryDate || ""), "MM-dd-yyyy"),
      };
    }) || [
      {
        licenseNumber: "",
        licensedState: "",
        licenseExpiryDate: "",
      },
    ],
    status: nurse?.active ? "active" : "inactive" || "",
    gender: nurse?.gender || "",
  };

  const getIdOfState = (state: string) => {
    let idValue = "";
    licensedStateOptions.map((stateVal) => {
      if (stateVal.value == state) {
        idValue = stateVal.info;
      }
    });
    return idValue;
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
    watch,
    getValues,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(manualEntryFormSchema),
  });

  const {
    fields: licensesArray,
    append: appendLicenses,
    remove: removeLicenses,
  } = useFieldArray({ name: "licenses", control });

  //avatar api
  const { mutateAsync: mutateAsyncAvatar } =
    useProviderControllerServiceChangeAvatar();

  //getAvatarForProvider
  const xtenentId = GetTenantId();
  const getProviderProfile = async () => {
    if (!nurse?.uuid) {
      return;
    }
    try {
      let response = ProviderControllerService.getProviderById({
        providerUuid: nurse?.uuid as string,
        xTenantId: xtenentId,
      });
      if (response) {
        let allData = (await response).data as Provider;
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

  const [licenseHasError, setLicenseHasError] = useState(false);

  const onSubmit = async (values: unknown) => {
    const formValues = values as typeof initialValues;
    const noLicenseAdded = verifyLicensesValues();

    if (noLicenseAdded) {
      return;
    }
    let payload = {} as Provider;
    if (formValues.licenses[0].licenseNumber) {
      payload = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        npi: formValues.npi,
        email: formValues.email,
        phone: `${formValues.prefix}${formValues.phone}`,

        active: !isEdit ? true : formValues.status === "active" ? true : false,
        address: {
          line1: formValues.address.line1,
          line2: formValues.address.line2,
          city: formValues.address.city,
          country: "USA",
          state: formValues.address.state,
          zipcode: formValues.address.zipcode,
        },
        providerLicenseDetails: formValues.licenses.map(
          (item: {
            licenseExpiryDate: string | undefined;
            licensedState: string | undefined;
            licenseNumber: string | undefined;
          }) => {
            return {
              licenseNumber: item.licenseNumber || "",
              expiryDate: item?.licenseExpiryDate
                ? new Date(item?.licenseExpiryDate || "").toISOString()
                : "",
              licensedStates: [
                {
                  state: item.licensedState,
                  id: item?.licensedState
                    ? +getIdOfState(item?.licensedState)
                    : "",
                },
              ],
            };
          },
        ),
        gender: formValues.gender,
        role: isNurse ? ProviderRole.NURSE : ProviderRole.PROVIDER,
        chatbotTone: nurse?.chatbotTone,
        introduction: nurse?.introduction,
      } as Provider;
    } else {
      payload = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        npi: formValues.npi,
        email: formValues.email,
        phone: `${formValues.prefix}${formValues.phone}`,

        active: !isEdit ? true : formValues.status === "active" ? true : false,
        address: {
          line1: formValues.address.line1,
          line2: formValues.address.line2,
          city: formValues.address.city,
          country: formValues.address.country,
          state: formValues.address.state,
          zipcode: formValues.address.zipcode,
        },

        gender: formValues.gender,
        role: isNurse ? ProviderRole.NURSE : ProviderRole.PROVIDER,
        chatbotTone: nurse?.chatbotTone,
        introduction: nurse?.introduction,
      } as Provider;
    }

    if (isEdit) {
      await mutateAsyncUpdate({
        requestBody: { ...payload, uuid: nurse?.uuid || "" },
      });

      if (avatar.includes("http")) {
        handleDrawerClose();
        refetchList && refetchList();
        return;
      }

      await mutateAsyncAvatar({
        providerUuid: nurse?.uuid as string,
        requestBody: {
          newAvatar: avatar.startsWith("data:image")
            ? avatar.replace(/data:image\/(jpeg|png);base64,/, "")
            : avatar,
        },
      });
    } else {
      await mutateAsync({ requestBody: payload as Provider });
    }

    handleDrawerClose();
    refetchList && refetchList();
  };

  useEffect(() => {
    dispatch(setIsLoading(isPending));
  }, [dispatch, isPending]);

  const watchLicense = watch("licenses");

  const verifyLicensesValues = () => {
    const licenses = getValues("licenses");
    if (
      licenses &&
      (!licenses[0]?.licenseExpiryDate ||
        !licenses[0]?.licenseNumber ||
        !licenses[0]?.licensedState)
    ) {
      setLicenseHasError(true);

      return true;
    } else {
      setLicenseHasError(false);
      return false;
    }
  };

  useEffect(() => {
    if (
      touchedFields.licenses?.[0]?.licenseNumber &&
      touchedFields.licenses?.[0]?.licenseExpiryDate &&
      touchedFields.licenses?.[0]?.licensedState
    ) {
      verifyLicensesValues();
    }

    const valLicenseStates = getValues("licenses");
    const statesArray: string[] = [];
    if (valLicenseStates && valLicenseStates?.length > 0) {
      valLicenseStates.map((license) => {
        if (license?.licensedState) {
          statesArray.push(license.licensedState);
        }
      });
    }

    const updatedLicensedStateOptions = licensedStateOptions.map((option) => ({
      ...option,
      hide: statesArray.includes(option.key), // Set hide to true if key exists in statesArray
    }));

    setLicensedStateOptions(updatedLicensedStateOptions);
  }, [watchLicense]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      verifyLicensesValues();
    }
  }, [isSubmitting]);
  // const below1030 = useMediaQuery("(max-width:1030px)");
  // const below1370 = useMediaQuery("(max-width:1370px)");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: "100%", minWidth: "700px" }}
    >
      <Grid
        height={"100%"}
        container
        flexDirection={"column"}
        overflow={"auto"}
        flexWrap={"nowrap"}
        justifyContent={"space-between"}
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Opera
          },
          "&::-moz-scrollbar": {
            display: "none", // For Firefox
          },
        }}
      >
        <Grid container flexDirection={"column"}>
          <Grid
            mt={2}
            mb={2}
            rowGap={3}
            container
            flexDirection={"row"}
            // height={below1030 ? "607px" : below1370 ? "600px" : "740px"}
            position={"absolute"}
            top={"60px"}
            bottom={"55px"}
            overflow={"auto"}
            // left={"0px"}
            // right={"5px"}
            sx={{
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none", // For Chrome, Safari, and Opera
              },
              "&::-moz-scrollbar": {
                display: "none", // For Firefox
              },
            }}
          >
            <Grid container width={"100%"}>
              {isEdit && (
                <Grid width={"10rem"} p={1}>
                  <UploadLogo
                    customStyle={customStyle}
                    handleSetImage={(image: string | ArrayBuffer | null) => {
                      setAvatar(image as string);
                    }}
                    imageUrl={avatar}
                  />
                </Grid>
              )}
              <Grid
                container
                width={"100%"}
                pr={1}
                flexDirection={"column"}
                rowGap={3}
              >
                <Grid container justifyContent={"space-between"}>
                  <Grid
                    container
                    flexDirection={"column"}
                    rowGap={1}
                    width={"33%"}
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
                    rowGap={1}
                    width={"33%"}
                  >
                    <CustomLabel isRequired label="Last Name" />
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
                  {/*  no-secret: false positive for NPI field */}
                  <Grid
                    container
                    flexDirection={"column"}
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
                          value={field.value || ""}
                          placeholder={"Enter NPI"}
                          disableField={isEdit}
                          maxLength={10}
                          hasError={!!errors.npi}
                          errorMessage={errors.npi?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent={"space-between"} width={"100%"}>
                  <Grid width={"48%"}>
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
                          disableField={isEdit}
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
                  {isEdit && (
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
                            hasError={!!errors.status}
                            errorMessage={errors.status?.message}
                          />
                        )}
                      />
                    </Grid>
                  )}
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
              </Grid>
            </Grid>

            <Grid
              // borderRadius={"6px"}
              pt={1}
              borderTop={`1px solid ${theme.palette.grey[300]}`}
              width={"100%"}
            >
              <Grid
                p={1.5}
                pl={1}
                // border={2}
                // borderBottom={`1px solid ${theme.palette.grey[300]}`}
              >
                <Typography variant="bodyMedium" fontWeight={550}>
                  Address
                </Typography>
              </Grid>

              <Grid p={1} container justifyContent={"space-between"}>
                <Grid width={"48%"}>
                  <CustomLabel label="Address Line 1" isRequired />
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
                  <CustomLabel label="Address Line 2" />
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
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter City"}
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
                        value={field.value || ""}
                        disableField={true}
                        placeholder={"Enter Country"}
                        hasError={!!errors.address?.country}
                        errorMessage={errors.address?.country?.message}
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

            <Grid container flexDirection={"column"} width={"100%"}>
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
                {/* {licenseHasError && (
                  <Grid>
                    <Typography sx={errorStyle} variant="caption">
                      At least one license details required
                    </Typography>
                  </Grid>
                )} */}
                {licensesArray.map((license, index) => (
                  <Grid
                    container
                    key={license.id}
                    justifyContent={"space-between"}
                  >
                    <Grid width={"29%"}>
                      <CustomLabel label="Licensed Number" isRequired />
                      <Controller
                        control={control}
                        name={`licenses.${index}.licenseNumber`}
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            onChange={(e) => {
                              setValue(
                                `licenses.${index}.licenseNumber`,
                                e.target.value,
                                { shouldTouch: true },
                              );
                            }}
                            bgWhite
                            placeholder={"Enter License Number"}
                            name={"licenseNumber"}
                            value={field.value || ""}
                            hasError={licenseHasError}
                            errorMessage={"Enter at least one license number"}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"29%"}>
                      <CustomLabel label="Licensed State" isRequired />
                      <Controller
                        control={control}
                        name={`licenses.${index}.licensedState`}
                        render={({ field }) => (
                          <CustomAutoComplete
                            placeholder={"Select"}
                            {...field}
                            onChange={(e) => {
                              setValue(`licenses.${index}.licensedState`, e, {
                                shouldTouch: true,
                              });
                            }}
                            value={field.value || ""}
                            bgWhite={true}
                            options={licensedStateOptions}
                            hasError={licenseHasError}
                            errorMessage={"Enter at least one license state"}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"29%"}>
                      <CustomLabel label="License Expiry Date" isRequired />
                      <Controller
                        control={control}
                        name={`licenses.${index}.licenseExpiryDate`}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            bgWhite
                            value={field.value}
                            disablePast
                            onDateChange={function (
                              selectedDate: string,
                            ): void {
                              setValue(
                                `licenses.${index}.licenseExpiryDate`,
                                selectedDate,
                                { shouldValidate: true, shouldTouch: true },
                              );
                            }}
                            hasError={licenseHasError}
                            errorMessage={"Enter license expiry-date "}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <IconButton
                        onClick={() => removeLicenses(index)}
                        disabled={licensesArray.length <= 1}
                      >
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
                        licensedState: "",
                        licenseExpiryDate: "",
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
        <Grid
          height={"8%"}
          borderTop={`1px solid ${theme.palette.grey[300]}`}
          position={"absolute"}
          bottom={"0px"}
          zIndex={1}
          right={"10px"}
          left={"0px"}
          bgcolor={"white"}
        >
          <Grid container p={1} justifyContent={"flex-end"}>
            <Button
              onClick={() => setIsSubmitting((prev) => !prev)}
              startIcon={isEdit ? <></> : <DoneOutlinedIcon />}
              variant="contained"
              type="submit"
            >
              <Typography variant="bodySmall">
                {isEdit ? "Save" : isNurse ? "Add Nurse" : "Add Provider"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default NurseForm;
