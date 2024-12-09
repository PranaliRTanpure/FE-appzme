import { yupResolver } from "@hookform/resolvers/yup";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Grid } from "@mui/system";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import CustomInput from "../../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import UploadLogo from "../../../../common-components/image-upload/custom-image-upload";
import { theme } from "../../../../utils/theme";
import { manualEntryFormSchema } from "./provider-schema";
export const customStyle = {
  height: "8rem",
  width: "8rem",
};
const ProviderForm = () => {
  const [valueRadio, setValueRadio] = useState("manualEntry");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);
  };

  const initialValues = {
    optionSelected: valueRadio,
    providerType: "",
    firstName: "",
    lastName: "",
    npi: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
    avatar: "",
    licenses: [{ licenseNumber: "", licensedState: "", licenseExpiryDate: "" }],
    ehr: "AthenaHealth",
    practiceId: "212356456",
  };

  const {
    control,
    // handleSubmit,
    // setValue,
    // getValues,
    // reset,
    // watch,

    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(manualEntryFormSchema),
  });

  const {
    fields: licensesArray,
    append: appendLicenses,
    remove: removeLicenses,
  } = useFieldArray({ name: "licenses", control });

  return (
    <form style={{ height: "100%", minWidth: "700px" }}>
      <Grid
        height={"100%"}
        container
        flexDirection={"column"}
        overflow={"auto"}
        flexWrap={"nowrap"}
        justifyContent={"space-between"}
      >
        <Grid
          // height={"92%"}
          // minHeight={"92%"}
          container
          flexDirection={"column"}
        >
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
          {valueRadio === "manualEntry" && (
            <Grid mt={2} mb={2} rowGap={3} container flexDirection={"column"}>
              <Grid container>
                <Grid width={"10rem"} p={1}>
                  <UploadLogo customStyle={customStyle} />
                </Grid>
                <Grid flex={1} container flexDirection={"column"} rowGap={3}>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    width={"100%"}
                  >
                    <Grid width={"48%"}>
                      <CustomLabel label="Provider Type" />
                      <Controller
                        control={control}
                        name="providerType"
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={"Select"}
                            items={[{ value: "One", label: "One" }]}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"48%"}>
                      <CustomLabel label="NPI" />
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
                  <Grid container justifyContent={"space-between"}>
                    <Grid width={"48%"}>
                      <CustomLabel label="First Name" />
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
                      <CustomLabel label="Phone" />
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            maxLength={10}
                            value={field.value || ""}
                            placeholder={"Enter  Phone"}
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
                  <CustomLabel label="Email" />
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
                  <CustomLabel label="Phone" />
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        maxLength={10}
                        value={field.value || ""}
                        placeholder={"Enter Phone"}
                        hasError={!!errors.phone}
                        errorMessage={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid
                borderRadius={"6px"}
                border={`1px solid ${theme.palette.grey[300]}`}
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
                    <CustomLabel label="State" />
                    <Controller
                      control={control}
                      name="address.state"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={field.value || ""}
                          placeholder={"Enter State"}
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

              <Grid container flexDirection={"column"}>
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
                            <CustomSelect
                              placeholder={"Select"}
                              {...field}
                              value={field.value || ""}
                              items={[{ value: "One", label: "One" }]}
                              hasError={
                                !!errors.licenses?.length &&
                                !!errors.licenses[index]?.licenseNumber
                              }
                              errorMessage={
                                errors.licenses?.length
                                  ? errors.licenses[index]?.licenseNumber
                                      ?.message
                                  : ""
                              }
                            />
                          )}
                        />
                      </Grid>{" "}
                      <Grid width={"29%"}>
                        <CustomLabel label="Licensed State" />
                        <Controller
                          control={control}
                          name={`licenses.${index}.licensedState`}
                          render={({ field }) => (
                            <CustomSelect
                              placeholder={"Select"}
                              {...field}
                              value={field.value || ""}
                              items={[{ value: "One", label: "One" }]}
                              hasError={
                                !!errors.licenses?.length &&
                                !!errors.licenses[index]?.licensedState
                              }
                              errorMessage={
                                errors.licenses?.length
                                  ? errors.licenses[index]?.licensedState
                                      ?.message
                                  : ""
                              }
                            />
                          )}
                        />
                      </Grid>{" "}
                      <Grid width={"29%"}>
                        <CustomLabel label="License Expiry Date" />
                        <Controller
                          control={control}
                          name={`licenses.${index}.licenseExpiryDate`}
                          render={({ field }) => (
                            <CustomSelect
                              placeholder={"Select"}
                              {...field}
                              value={field.value || ""}
                              items={[{ value: "One", label: "One" }]}
                              hasError={
                                !!errors.licenses?.length &&
                                !!errors.licenses[index]?.licenseExpiryDate
                              }
                              errorMessage={
                                errors.licenses?.length
                                  ? errors.licenses[index]?.licenseExpiryDate
                                      ?.message
                                  : ""
                              }
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
              <Grid>
                <Grid>
                  <Typography variant="bodyMedium" fontWeight={550}>
                    Result
                  </Typography>
                  <Divider sx={{ mt: "10px", mb: "10px" }} />
                </Grid>
                <Grid container flexDirection={"column"} rowGap={2}>
                  -
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid height={"8%"} borderTop={`1px solid ${theme.palette.grey[300]}`}>
          <Grid container p={1} justifyContent={"flex-end"}>
            <Button
              startIcon={<DoneOutlinedIcon />}
              variant="contained"
              type="submit"
            >
              <Typography variant="bodySmall">Add Provider</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProviderForm;
