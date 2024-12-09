import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomAutoComplete from "../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import DatePicker from "../../../common-components/date-picker-field/date-picker-field";
import UploadLogo from "../../../common-components/image-upload/custom-image-upload";
import useApiFeedback from "../../../hooks/useApiFeedback";
import { ProviderRole } from "../../../models/provider/provider-modal";
import { ContentObject } from "../../../models/response/response-content-entity";
import { setIsLoading } from "../../../redux/actions/loader-action";
import {
  usePatientControllerServiceChangeAvatar2,
  usePatientControllerServiceCreatePatient,
  usePatientControllerServiceUpdatePatient,
} from "../../../sdk/queries";
import {
  Patient,
  PatientControllerService,
  Provider,
  ProviderControllerService,
} from "../../../sdk/requests";
import { splitPhoneNumber } from "../../../services/common/phone-formatter";
import { stateList } from "../../../utils/StateList";
import { theme } from "../../../utils/theme";
import { invitePatientFormSchema } from "./invite-patient-form-schema";
import TickIcon from "../../../assets/image_svg/icons/tick-complete.gif";

interface PatientInviteType {
  CloseDrawer: () => void;
  refetch: () => void;
  action: string;
  patientUuid?: string | null;
  xTenantId: string;
}

export const customStyle = {
  height: "8rem",
  width: "8rem",
};

const InvitePatientForm = (props: PatientInviteType) => {
  const [searchProvider, setSearchProvider] = useState("");
  const [searchNurse, setSearchNurse] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoadingProviderNurses, setIsLoadingProviderNurses] = useState(false);
  const dispatch = useDispatch();
  const { CloseDrawer, refetch, patientUuid, action, xTenantId } = props;
  const [nurseOptions, setNurseOptions] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);
  const [providerOptions, setProviderOptions] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);
  const [invitePatientData, setInvitePatientData] = useState<Patient>(
    {} as Patient,
  );

  const [isLoadingGetPatientData, setIsLoadingGetPatientdata] = useState(false);
  const getPatientById = async () => {
    if (!patientUuid) {
      return;
    }
    try {
      setIsLoadingGetPatientdata(true);
      const res = await PatientControllerService.getPatientById({
        xTenantId,
        patientUuid: patientUuid,
      });

      const patientData = (res as unknown as AxiosResponse).data as Patient;
      if (patientData) {
        setInvitePatientData(patientData);
      } else {
        setInvitePatientData({} as Patient);
      }
    } catch {
      //
    } finally {
      setIsLoadingGetPatientdata(false);
    }
  };

  useEffect(() => {
    getPatientById();
  }, [patientUuid]);

  useEffect(() => {
    if (!invitePatientData) {
      return;
    }
    if (invitePatientData?.avatar) {
      setAvatar(invitePatientData?.avatar);
    }
    setValue("address.city", invitePatientData?.address?.city || "");
    setValue("address.country", "USA" || "");
    setValue("address.line1", invitePatientData?.address?.line1 || "");
    setValue("address.line2", invitePatientData?.address?.line2 || "");
    setValue("address.state", invitePatientData?.address?.state || "");
    setValue("address.zipcode", invitePatientData?.address?.zipcode || "");
    setValue("firstName", invitePatientData.firstName);
    setValue("lastName", invitePatientData.lastName);
    setValue(
      "dob",
      invitePatientData &&
        invitePatientData?.birthDate &&
        invitePatientData?.birthDate != "-"
        ? format(new Date(invitePatientData?.birthDate), "MM-dd-yyyy")
        : "",
    );
    setValue("status", invitePatientData?.active ? "active" : "inactive" || "");
    setValue("schemaType", invitePatientData.schemaType || "INTERNAL");
    setValue(
      "primaryProvider",
      invitePatientData?.providerId
        ? Object.keys(invitePatientData?.providerId)[0]
        : "" || "",
    );
    setValue(
      "prefix",
      invitePatientData?.mobileNumber
        ? splitPhoneNumber(invitePatientData?.mobileNumber)?.countryCode
        : "+1",
    );
    setValue(
      "phone",
      invitePatientData?.mobileNumber
        ? splitPhoneNumber(invitePatientData?.mobileNumber)?.number
        : "" || "",
    );
    setValue(
      "nurse",
      invitePatientData?.nurseId
        ? Object.keys(invitePatientData?.nurseId)[0]
        : "" || "",
    );
    setValue("mrn", invitePatientData.mrn);
    setValue("email", invitePatientData.email);
  }, [invitePatientData]);

  const initialValues = {
    firstName: invitePatientData?.firstName?.trim() || "",
    lastName: invitePatientData?.lastName || "",
    email: invitePatientData?.email || "",
    phone: invitePatientData?.mobileNumber
      ? splitPhoneNumber(invitePatientData?.mobileNumber)?.number
      : "" || "",
    prefix: invitePatientData?.mobileNumber
      ? splitPhoneNumber(invitePatientData?.mobileNumber)?.countryCode
      : "+1",
    carePlan: "",
    status: invitePatientData?.active ? "active" : "inactive" || "",
    mrn: invitePatientData?.mrn || "",
    primaryProvider: invitePatientData?.providerId
      ? Object.keys(invitePatientData?.providerId)[0]
      : "" || "",
    address: {
      line1: invitePatientData?.address?.line1 || "",
      line2: invitePatientData?.address?.line2 || "",
      city: invitePatientData?.address?.city || "",
      country: "USA",
      state: invitePatientData?.address?.state || "",
      zipcode: invitePatientData?.address?.zipcode || "",
    },
    dob:
      invitePatientData &&
      invitePatientData?.birthDate &&
      invitePatientData?.birthDate != "-"
        ? format(new Date(invitePatientData?.birthDate), "MM-dd-yyyy")
        : "",
    nurse: invitePatientData?.nurseId
      ? Object.values(invitePatientData?.nurseId)[0]
      : "" || "",
    schemaType: invitePatientData?.schemaType || "INTERNAL",
  };

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(invitePatientFormSchema),
  });

  //Post
  const {
    mutateAsync: mutateAsyncInvitePatient,
    isSuccess: isSuccessCreate,
    isPending,
    isError,
    error,
    data,
  } = usePatientControllerServiceCreatePatient();

  useApiFeedback(
    isError,
    error,
    isSuccessCreate,
    (data?.message || "Created updated successfully!") as string,
  );

  //Put
  const {
    mutateAsync: mutateAsyncUpdatePatient,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: dataUpdate,
    isPending: isPendingEdit,
  } = usePatientControllerServiceUpdatePatient();

  useApiFeedback(
    isErrorUpdate,
    errorUpdate,
    isSuccessUpdate,
    (dataUpdate?.message || "Updated successfully!") as string,
  );

  const {
    mutateAsync: mutateAsyncAvatar,
    isPending: isPendingAvatar,
    error: errorAvatar,
    isError: isErrorAvatar,
  } = usePatientControllerServiceChangeAvatar2();

  useApiFeedback(isErrorAvatar, errorAvatar, false, "");

  const onSubmit = async (values: FieldValues) => {
    let payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobileNumber: values.prefix + values.phone,
      active:
        action === "Add" ? true : values.status === "active" ? true : false,
      address: {
        line1: values.address.line1,
        line2: values.address.line2,
        city: values.address.city,
        country: "USA",
        state: values.address.state,
        zipcode: values.address.zipcode,
      },
      nurseId: values.nurse ? { [values.nurse]: "" } : undefined,
      providerId: values.primaryProvider
        ? { [values.primaryProvider]: "" }
        : undefined,
      mrn: values.mrn || "",
      birthDate: values?.dob ? new Date(values?.dob || "").toISOString() : "",
      schemaType: values.schemaType || "",
    } as Patient;

    if (invitePatientData.gender) {
      payload = {
        ...payload,
        gender: invitePatientData.gender as "MALE" | "FEMALE" | "OTHER",
      };
    }
    if (invitePatientData.emergencyContact?.firstName) {
      payload = {
        ...payload,
        emergencyContact: invitePatientData.emergencyContact,
      };
    }
    if (action == "Edit") {
      await mutateAsyncUpdatePatient({
        requestBody: { ...(payload as Patient), uuid: invitePatientData?.uuid },
        xTenantId: xTenantId,
      });
      if (avatar && invitePatientData?.uuid) {
        if (avatar.includes("https")) {
          CloseDrawer();
          refetch();
          return;
        }
        await mutateAsyncAvatar({
          patientUuid: invitePatientData?.uuid || "",
          requestBody: {
            newAvatar: avatar.startsWith("data:image")
              ? avatar.replace(/data:image\/(jpeg|png);base64,/, "")
              : avatar,
          },
          xTenantId,
        });
      }
      setAvatar("");
    } else {
      await mutateAsyncInvitePatient({
        requestBody: {
          ...(payload as Patient),
        },
        xTenantId: xTenantId,
      });
    }
    CloseDrawer();
    refetch();
  };

  const getListOfProviderOrNurse = async (role: ProviderRole) => {
    const schemaTypeVal = getValues("schemaType");
    const xTenantIdVal =
      role === ProviderRole.PROVIDER
        ? xTenantId
        : role === ProviderRole.NURSE && schemaTypeVal === "EXTERNAL"
          ? "eamata"
          : xTenantId;

    try {
      setIsLoadingProviderNurses(true);
      const res = await ProviderControllerService.getAllProviders({
        page: 0,
        size: 100,
        sortBy: "modified",
        sortDirection: "desc",
        role,
        status: true,
        archive: false,
        xTenantId: xTenantIdVal,
        searchString:
          role === ProviderRole.NURSE ? searchNurse : searchProvider,
      });

      const data = (res as unknown as AxiosResponse).data as ContentObject<
        Provider[]
      >;
      const options = data.content.map((item) => {
        return {
          key: item.uuid || "",
          value: `${item.firstName} ${item.lastName}`,
        };
      });

      if (role === ProviderRole.NURSE) {
        setNurseOptions(options);
      } else if (role === ProviderRole.PROVIDER) {
        setProviderOptions(options);
      }
    } finally {
      setIsLoadingProviderNurses(false);
    }
  };

  const watchSchema = watch("schemaType");

  useEffect(() => {
    getListOfProviderOrNurse(ProviderRole.PROVIDER);
  }, []);

  useEffect(() => {
    getListOfProviderOrNurse(ProviderRole.NURSE);
  }, [watchSchema]);

  useEffect(() => {
    dispatch(
      setIsLoading(
        isPending ||
          isPendingAvatar ||
          isPendingEdit ||
          isLoadingProviderNurses ||
          isLoadingGetPatientData,
      ),
    );
  }, [
    dispatch,
    isPending,
    isLoadingGetPatientData,
    isPendingAvatar,
    isPendingEdit,
    isLoadingProviderNurses,
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: "100%", minWidth: "700px", width: "100%" }}
    >
      <Grid
        container
        height={"100%"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        overflow={"auto"}
        flexWrap={"nowrap"}
      >
        <Grid mt={2} mb={2} rowGap={3} container flexDirection={"column"}>
          <Grid container>
            {action === "Edit" && (
              <Grid width={"10rem"} p={1}>
                <UploadLogo
                  customStyle={customStyle}
                  handleSetImage={(image: string | ArrayBuffer | null) =>
                    setAvatar(image ? (image as string) : "")
                  }
                  imageUrl={avatar}
                />
              </Grid>
            )}
            <Grid flex={1} container flexDirection={"column"} rowGap={3}>
              <Grid container justifyContent={"space-between"}>
                <Grid
                  container
                  flexDirection={"column"}
                  rowGap={1}
                  width={"32%"}
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
                  width={"32%"}
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
                <Grid
                  container
                  flexDirection={"column"}
                  rowGap={1}
                  width={"32%"}
                >
                  <CustomLabel label="MRN" />
                  <Controller
                    control={control}
                    name="mrn"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter MRN"}
                        hasError={!!errors.mrn}
                        errorMessage={errors.mrn?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"} width={"100%"}>
                <Grid width={"32%"}>
                  <CustomLabel label="Date of Birth" />
                  <Controller
                    control={control}
                    name={`dob`}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        bgWhite
                        disableFuture
                        value={field.value}
                        onDateChange={function (selectedDate: string): void {
                          setValue(`dob`, selectedDate, {
                            shouldValidate: true,
                          });
                        }}
                        hasError={!!errors.dob}
                        errorMessage={errors.dob?.message || ""}
                      />
                    )}
                  />
                </Grid>{" "}
                <Grid width={"32%"}>
                  <CustomLabel isRequired label="Email" />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <Grid
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <CustomInput
                          paddingRight={
                            invitePatientData.emailVerified ? "20px" : "0px"
                          }
                          disableField={invitePatientData.emailVerified}
                          {...field}
                          value={field.value || ""}
                          placeholder={"Enter Email"}
                          hasError={!!errors.email}
                          errorMessage={errors.email?.message}
                        />
                        {invitePatientData.emailVerified && (
                          <span
                            style={{
                              position: "absolute",
                              right: "10px",
                              bottom: "6px",
                              background: "white",
                              // border: "2px solid"
                            }}
                          >
                            <img
                              width={"20px"}
                              height={"20px"}
                              src={TickIcon}
                            />
                            {/* <DownloadDoneTwoToneIcon fontSize="small" /> */}
                          </span>
                        )}
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid width={"32%"}>
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
            </Grid>
          </Grid>
          <Grid
            height={"fit-content"}
            flexDirection={"row"}
            container
            justifyContent={"space-between"}
          >
            <Grid width={"32%"} height={"fit-content"}>
              <CustomLabel label="Primary Provider" isRequired />
              <Controller
                control={control}
                name="primaryProvider"
                render={({ field }) => (
                  <CustomAutoComplete
                    placeholder={"Select Primary Provider"}
                    options={providerOptions}
                    {...field}
                    hasError={!!errors.primaryProvider}
                    errorMessage={errors.primaryProvider?.message}
                    onDebounceCall={(value) => setSearchProvider(value)}
                    onInputEmpty={() => setSearchProvider("")}
                  />
                )}
              />
            </Grid>
            <Grid width={"32%"} height={"fit-content"}>
              <CustomLabel label="Nurse Type" isRequired />
              <Controller
                control={control}
                name="schemaType"
                render={({ field }) => (
                  <CustomSelect
                    placeholder={"Select Status"}
                    items={[
                      {
                        value: "INTERNAL",
                        label: `${"Provider Group Nurses"}`,
                      },
                      { value: "EXTERNAL", label: "Eamata Nurses" },
                    ]}
                    {...field}
                    value={field.value || invitePatientData?.schemaType || ""}
                    hasError={!!errors.status}
                    errorMessage={errors.status?.message}
                  />
                )}
              />
            </Grid>
            <Grid width={"32%"} height={"fit-content"}>
              <CustomLabel label="Nurse" isRequired />
              <Controller
                control={control}
                name="nurse"
                render={({ field }) => (
                  <CustomAutoComplete
                    placeholder={"Select Nurse"}
                    options={nurseOptions}
                    {...field}
                    hasError={!!errors.nurse}
                    errorMessage={errors.nurse?.message}
                    onDebounceCall={(value) => setSearchNurse(value)}
                    onInputEmpty={() => setSearchNurse("")}
                  />
                )}
              />
            </Grid>
            {/* {action === "Edit" && ( */}
            <Grid
              width={"33%"}
              mt={"10px"}
              display={action !== "Edit" ? "none" : "block"}
            >
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
            {/* )} */}
          </Grid>

          <Grid
            borderRadius={"6px"}
            border={`1px solid ${theme.palette.grey[300]}`}
          >
            <Grid p={1.5} borderBottom={`1px solid ${theme.palette.grey[300]}`}>
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
                <CustomLabel label="City" />
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
                <CustomLabel label="Country" />
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

        <Grid height={"8%"} borderTop={`1px solid ${theme.palette.grey[300]}`}>
          <Grid container p={1} justifyContent={"flex-end"} gap={2}>
            <Button variant="outlined">
              <Typography>Cancel</Typography>
            </Button>
            <Button variant="contained" type="submit">
              <Typography>{action === "Edit" ? "Save" : "Invite"}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default InvitePatientForm;
