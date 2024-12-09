import { yupResolver } from "@hookform/resolvers/yup";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Button, Divider, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Grid } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomAutoComplete from "../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import useApiFeedback from "../../../hooks/useApiFeedback";
import { setIsLoading } from "../../../redux/actions/loader-action";
import {
  useLocationControllerServiceCreateLocation,
  useLocationControllerServiceUpdateLocation,
} from "../../../sdk/queries";
import { Location } from "../../../sdk/requests";
import { splitPhoneNumber } from "../../../services/common/phone-formatter";
import { stateList } from "../../../utils/StateList";
import { theme } from "../../../utils/theme";
import { manualEntryFormSchema } from "./location-schema";

export interface LocationDataProp {
  locationData: Location | null;
  handleDrawerClose: () => void;
  isEdit?: boolean;
  isView?: boolean;
  statesToIgnore: string[];
  refetchList?: () => void;
  xTenantId: string;
}

const LocationForm = (props: LocationDataProp) => {
  const { handleDrawerClose, locationData, isEdit, refetchList, xTenantId } =
    props;
  const [valueRadio, setValueRadio] = useState("manualEntry");
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);
  };

  const { mutateAsync, isSuccess, isError, error, data, isPending } =
    useLocationControllerServiceCreateLocation();

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || "Location added successfully!") as string,
  );

  const {
    mutateAsync: mutateAsyncEdit,
    data: dataEdit,
    isSuccess: isSuccessEdit,
    isError: isErrorEdit,
    error: errorEdit,
    isPending: isPendingEdit,
  } = useLocationControllerServiceUpdateLocation();

  useApiFeedback(
    isErrorEdit,
    errorEdit,
    isSuccessEdit,
    (dataEdit?.message || "Location updated successfully!") as string,
  );

  const initialValues = {
    optionSelected: valueRadio,
    name: locationData?.name || "",
    phone: locationData?.phone
      ? splitPhoneNumber(locationData?.phone)?.number
      : "" || "",
    prefix: locationData?.phone
      ? splitPhoneNumber(locationData?.phone)?.countryCode
      : "+1",
    address: {
      line1: locationData?.address?.line1 || "",
      line2: locationData?.address?.line2 || "",
      city: locationData?.address?.city || "",
      state: locationData?.address?.state || "",
      zipcode: locationData?.address?.zipcode || "",
      country: locationData?.address?.country || "USA",
    },
    ehr: "AthenaHealth",
    practiceId: "212356456",
    status: locationData?.active ? "active" : "inactive" || "",
    email: locationData?.email || "",
  };

  const {
    control,
    handleSubmit,
    // setValue,
    // getValues,
    // reset,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(manualEntryFormSchema),
  });

  const onSubmit = async (values: unknown) => {
    let payload: Location = {} as Location;
    let val = values as typeof initialValues;

    if (val.optionSelected === "manualEntry") {
      payload = {
        address: {
          line1: val.address.line1,
          line2: val.address.line2,
          city: val.address.city,
          state: val.address.state,
          country: val.address.country,
          zipcode: val.address.zipcode,
        },
        name: val.name,
        phone: `${val.prefix}${val.phone}` || "",
        email: val.email,
        active: !isEdit ? true : val.status === "active" ? true : false,
      } as Location;
    } else {
      //TODO
    }

    if (isEdit) {
      await mutateAsyncEdit({
        requestBody: { ...payload, uuid: locationData?.uuid || "" },
        xTenantId: xTenantId,
      });
    } else {
      await mutateAsync({ requestBody: payload, xTenantId: xTenantId });
    }
    handleDrawerClose();
    refetchList && refetchList();
  };

  useEffect(() => {
    dispatch(setIsLoading(isPending || isPendingEdit));
  }, [dispatch, isPending, isPendingEdit]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: "100%", width: "100%" }}
    >
      <Grid
        height={"100%"}
        container
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Grid
          height={"92%"}
          minHeight={"92%"}
          container
          flexDirection={"column"}
        >
          {!isEdit && (
            <Grid>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueRadio}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="manualEntry"
                    control={<Radio />}
                    label="Manual Entry"
                  />
                  <FormControlLabel
                    value="enrollFromEHR"
                    control={<Radio />}
                    label="Enroll From EHR"
                  />
                </RadioGroup>
              </FormControl>
              <Divider />
            </Grid>
          )}
          {valueRadio === "manualEntry" && (
            <Grid mt={2} mb={2} rowGap={3} container flexDirection={"column"}>
              <Grid container justifyContent={"space-between"}>
                <Grid width={"48%"}>
                  <CustomLabel label="Name" isRequired />
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Location Name"}
                        hasError={!!errors.name}
                        errorMessage={errors.name?.message}
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
                        disableField={isEdit}
                      />
                    )}
                  />
                </Grid>
                {isEdit && (
                  <Grid width={"48%"}>
                    <CustomLabel label="Status" isRequired />
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
                )}
              </Grid>
              <Grid
                borderRadius={"6px"}
                border={`1px solid ${theme.palette.grey[300]}`}
                paddingBottom={1}
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
                          errorMessage={
                            errors.address?.line1?.message as string
                          }
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
                    <CustomLabel label="Country" isRequired />
                    <Controller
                      control={control}
                      name="address.country"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={"USA"}
                          disableField
                          placeholder={"Enter Location Country"}
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
            </Grid>
          )}
          {valueRadio === "enrollFromEHR" && (
            <Grid mt={2} mb={2} rowGap={3} container flexDirection={"column"}>
              <Grid container justifyContent={"space-between"}>
                <Grid width={"48%"}>
                  <CustomLabel label="EHR" />
                  <Controller
                    control={control}
                    name="ehr"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select EHR"}
                        items={[
                          { value: "AthenaHealth", label: "AthenaHealth" },
                        ]}
                        {...field}
                        value={field.value || ""}
                        hasError={!!errors.ehr}
                        errorMessage={errors.ehr?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"48%"}>
                  <CustomLabel label="Practice ID" />
                  <Controller
                    control={control}
                    name="practiceId"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value || ""}
                        placeholder={"Enter Practice ID"}
                        hasError={!!errors.practiceId}
                        errorMessage={errors.practiceId?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container p={1} justifyContent={"flex-end"}>
                <Button
                  // startIcon={<DoneOutlinedIcon />}
                  variant="contained"
                  type="submit"
                >
                  <Typography variant="bodySmall">Fetch Details</Typography>
                </Button>
              </Grid>
              <Grid>
                <Grid>
                  <Typography variant="bodyMedium" fontWeight={550}>
                    Result
                  </Typography>
                  <Divider sx={{ mt: "10px", mb: "10px" }} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid height={"8%"} borderTop={`1px solid ${theme.palette.grey[300]}`}>
          <Grid container p={1} justifyContent={"flex-end"}>
            <Button
              startIcon={isEdit ? <></> : <DoneOutlinedIcon />}
              variant="contained"
              type="submit"
            >
              <Typography variant="bodySmall">
                {isEdit ? "Save" : "Add Location"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LocationForm;
