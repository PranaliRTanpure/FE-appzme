import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import CustomButton from "@/common-components/button-outlined/custom-button";
import {
  ButtonBase,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { alpha, Grid, useMediaQuery } from "@mui/system";
import { useEffect, useState } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import CustomAutoComplete from "../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInputWithPrefix from "../../../common-components/custom-input-with-prefix/custom-input-with-prefix";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import { Gender } from "../../../constants/roles";
import { stateList } from "../../../utils/StateList";
import { theme } from "../../../utils/theme";

const TwoPatientContacts = () => {
  const {
    control,
    formState: { errors, touchedFields },
    setValue,
    getValues,
  } = useFormContext();

  const belowmd = useMediaQuery(theme.breakpoints.down("md"));

  const {
    fields: emergencyContactArray,
    append: appendEmergencyContact,
    remove: removeEmergencyContact,
  } = useFieldArray({ name: "emergencyContact", control });

  const [emergencyContactHasError, setEmergencyContactHasError] =
    useState(false);

  const watchEmergencyContact = useWatch({
    name: "emergencyContact",
    control,
  });

  const verifyEmergencyContactValues = () => {
    const emergencyContact = getValues("emergencyContact");
    if (
      emergencyContact &&
      (!emergencyContact[0]?.relationshipWithPatient ||
        !emergencyContact[0]?.fullName ||
        !emergencyContact[0]?.mobile)
    ) {
      setEmergencyContactHasError(true);

      return true;
    } else {
      setEmergencyContactHasError(false);
      return false;
    }
  };

  useEffect(() => {
    if (
      touchedFields.emergencyContact?.[0]?.relationshipWithPatient &&
      touchedFields.emergencyContact?.[0]?.fullName &&
      touchedFields.emergencyContact?.[0]?.mobile
    ) {
      verifyEmergencyContactValues();
    }
  }, [watchEmergencyContact]);

  const [isSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      verifyEmergencyContactValues();
    }
  }, [isSubmitting]);

  return (
    <Grid
      width={"100%"}
      container
      p={2}
      rowGap={2}
      flexDirection={"column"}
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"0px 0px 16px 16px"}
    >
      <Grid container width={"100%"} justifyContent={"space-between"}>
        <Grid width={"24%"}>
          <CustomLabel label="Home Phone" />
          <Controller
            control={control}
            name="homePhone"
            render={({ field }) => (
              <CustomInputWithPrefix
                prefix={`+1`}
                value={field.value?.trim() || ""}
                placeholder={"Enter Home Phone Number"}
                hasError={!!errors.homePhone}
                errorMessage={errors.homePhone?.message as string}
                name={field.name}
                onChange={(e) =>
                  setValue("homePhone", e.target.value, {
                    shouldValidate: true,
                  })
                }
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"24%"}>
          <CustomLabel label="Work Phone" />
          <Controller
            control={control}
            name="workPhone"
            render={({ field }) => (
              <CustomInputWithPrefix
                {...field}
                onChange={(e) =>
                  setValue("workPhone", e.target.value, {
                    shouldValidate: true,
                  })
                }
                prefix={`+1`}
                value={field.value.trim() || ""}
                placeholder={"Enter Work Phone Number"}
                hasError={!!errors.workPhone}
                errorMessage={errors.workPhone?.message as string}
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"24%"}>
          <CustomLabel label="Cell Phone" />
          <Controller
            control={control}
            name="cellPhone"
            render={({ field }) => (
              <CustomInputWithPrefix
                onChange={(e) =>
                  setValue("cellPhone", e.target.value, {
                    shouldValidate: true,
                  })
                }
                prefix={`+1`}
                value={field.value.trim() || ""}
                placeholder={"Enter Cell Phone Number"}
                hasError={!!errors.cellPhone}
                errorMessage={errors.cellPhone?.message as string}
                name={""}
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"24%"}>
          <CustomLabel label="Email" />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <CustomInput
                value={field.value.trim() || ""}
                placeholder={"Enter Initial"}
                hasError={!!errors.email}
                errorMessage={errors.email?.message as string}
                name={field.name}
                onChange={(e) =>
                  setValue("email", e.target.value, { shouldValidate: true })
                }
              />
            )}
          />
        </Grid>{" "}
      </Grid>
      <Grid container width={"100%"} justifyContent={"space-between"}>
        <Grid width={"24%"}>
          <CustomLabel label="Address Line 1" isRequired />
          <Controller
            control={control}
            name="line1"
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value.trim() || ""}
                placeholder={"Enter Address Line 1"}
                hasError={!!errors?.line1}
                errorMessage={errors.line1?.message as string}
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"24%"}>
          <CustomLabel label="Address Line 2" />
          <Controller
            control={control}
            name="line2"
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value || ""}
                placeholder={"Enter Address Line 2"}
                hasError={!!errors.line2}
                errorMessage={errors.line2?.message as string}
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"15.5%"}>
          <CustomLabel label="City" isRequired />
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value || ""}
                placeholder={"Enter City"}
                hasError={!!errors.city}
                errorMessage={errors.city?.message as string}
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"15.5%"}>
          <CustomLabel isRequired label="State" />
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <CustomAutoComplete
                {...field}
                placeholder={"Search the state"}
                options={stateList}
                maxHeightForOptionsList={300}
                value={field.value || ""}
                hasError={!!errors.state}
                errorMessage={errors.state?.message as string}
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"15.5%"}>
          <CustomLabel label="Zip Code" isRequired />
          <Controller
            control={control}
            name="zipcode"
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value || ""}
                placeholder={"Enter Zip Code"}
                hasError={!!errors.zipcode}
                errorMessage={errors.zipcode?.message as string}
              />
            )}
          />
        </Grid>{" "}
      </Grid>
      <Divider />
      <Grid container flexDirection={"column"}>
        <Typography variant="bodyMedium" fontWeight={600}>
          Emergency Contacts{emergencyContactHasError ? "true" : "false"}
        </Typography>
        <Grid bgcolor={alpha(theme.palette.secondary.main, 0.06)}>
          {emergencyContactArray.map((emergencyContactDetails, index) => (
            <Grid
              m={"10px 0px"}
              borderRadius={"10px"}
              container
              columnGap={2}
              key={emergencyContactDetails.id}
              p={2}
            >
              <Grid width={belowmd ? "250px" : "300px"}>
                <CustomLabel label="Relationship With Patient" isRequired />
                <Controller
                  control={control}
                  name={`emergencyContact.${index}.relationshipWithPatient`}
                  render={({ field }) => (
                    <CustomSelect
                      placeholder={"Select Patient Relationship"}
                      items={Gender}
                      {...field}
                      name="relationshipWithPatient"
                      bgWhite={true}
                      hasError={
                        index > 0 ? !field.value : emergencyContactHasError
                      }
                      errorMessage={"Enter relationship with patient"}
                    />
                  )}
                />
              </Grid>
              <Grid width={belowmd ? "250px" : "300px"}>
                <CustomLabel label="Full Name" isRequired />
                <Controller
                  control={control}
                  name={`emergencyContact.${index}.fullName`}
                  render={({ field }) => (
                    <CustomInput
                      placeholder={"Enter Full Name"}
                      {...field}
                      bgWhite={true}
                      name="fullName"
                      hasError={
                        index > 0 ? !field.value : emergencyContactHasError
                      }
                      errorMessage={"Enter full name"}
                    />
                  )}
                />
              </Grid>
              <Grid width={belowmd ? "250px" : "300px"}>
                <CustomLabel label="Mobile Number" />
                <Controller
                  control={control}
                  name={`emergencyContact.${index}.mobile`}
                  render={({ field }) => (
                    <CustomInputWithPrefix
                      prefix={`+1`}
                      value={field.value?.trim() || ""}
                      placeholder={"Enter Mobile Number"}
                      bgWhite
                      hasError={
                        index > 0 ? !field.value : emergencyContactHasError
                      }
                      errorMessage={"Enter mobile number"}
                      name={field.name}
                      onChange={(e) =>
                        setValue(
                          `emergencyContact.${index}.mobile`,
                          e.target.value,
                          {
                            shouldValidate: true,
                          },
                        )
                      }
                    />
                  )}
                />
              </Grid>
              <Divider orientation="vertical" />
              <Grid container alignContent={"flex-end"}>
                <ButtonBase
                  onClick={() => removeEmergencyContact(index)}
                  disabled={emergencyContactArray.length <= 1}
                >
                  <Grid
                    borderRadius={"12px"}
                    width={"44px"}
                    height={"44px"}
                    bgcolor={"#F5F6F8"}
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </Grid>
                </ButtonBase>
              </Grid>
            </Grid>
          ))}
          <Grid p={"0px 0px 20px 20px"}>
            <CustomButton
              variant={"outlined"}
              startIcon={<AddIcon />}
              text={"Add Emergency Contact"}
              onClick={() =>
                appendEmergencyContact({
                  relationshipWithPatient: "",
                  fullName: "",
                  mobile: "",
                })
              }
              sx={{ bgcolor: theme.palette.common.white }}
            />
          </Grid>
        </Grid>

        <Divider />
        <Grid p={2} container>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Decline Text Message Notification"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Authorization to send an unencrypted email to the specified email address"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default TwoPatientContacts;
