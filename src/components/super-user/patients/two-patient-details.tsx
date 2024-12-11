import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  ButtonBase,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { alpha, Grid, useMediaQuery } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
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
    formState: { errors },
    setValue,
  } = useFormContext();

  const belowmd = useMediaQuery(theme.breakpoints.down("md"));

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
                onChange={(e) => setValue("homePhone", e.target.value)}
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
                onChange={(e) => setValue("workPhone", e.target.value)}
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
                onChange={(e) => setValue("cellPhone", e.target.value)}
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
                hasError={!!errors.middleNameInitial}
                errorMessage={errors.middleNameInitial?.message as string}
                name={field.name}
                onChange={(e) => setValue("email", e.target.value)}
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
            name="address.line1"
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value.trim() || ""}
                placeholder={"Enter Address Line 1"}
                hasError={
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  errors?.address && !!(errors?.address as unknown as any).line1
                }
                errorMessage={
                  errors?.address &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (errors?.address as unknown as any).line1.message
                }
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"24%"}>
          <CustomLabel label="Address Line 2" />
          <Controller
            control={control}
            name="address.line2"
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value || ""}
                placeholder={"Enter Address Line 2"}
                hasError={
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  errors?.address && !!(errors?.address as unknown as any).line2
                }
                errorMessage={
                  errors?.address &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (errors?.address as unknown as any).line2.message
                }
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"15.5%"}>
          <CustomLabel label="City" isRequired />
          <Controller
            control={control}
            name="address.city"
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value || ""}
                placeholder={"Enter City"}
                hasError={
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  errors?.address && !!(errors?.address as unknown as any).city
                }
                errorMessage={
                  errors?.address &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (errors?.address as unknown as any).city.message
                }
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"15.5%"}>
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
                hasError={
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  errors?.address && !!(errors?.address as unknown as any).state
                }
                errorMessage={
                  errors?.address &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (errors?.address as unknown as any).state.message
                }
              />
            )}
          />
        </Grid>{" "}
        <Grid width={"15.5%"}>
          <CustomLabel label="Zip Code" isRequired />
          <Controller
            control={control}
            name="address.zipcode"
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value || ""}
                placeholder={"Enter Zip Code"}
                hasError={
                  errors?.address &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  !!(errors?.address as unknown as any).zipcode
                }
                errorMessage={
                  errors?.address &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (errors?.address as unknown as any).zipcode.message
                }
              />
            )}
          />
        </Grid>{" "}
      </Grid>
      <Divider />
      <Grid container flexDirection={"column"}>
        <Typography variant="bodyMedium" fontWeight={600}>
          Emergency Contacts
        </Typography>
        <Grid
          m={"10px 0px"}
          borderRadius={"10px"}
          container
          columnGap={2}
          p={2}
          bgcolor={alpha(theme.palette.secondary.main, 0.06)}
        >
          <Grid width={belowmd ? "250px" : "300px"}>
            <CustomLabel label="Relationship With Patient" isRequired />
            <Controller
              control={control}
              name="emergencyContact.relationshipWithPatient"
              render={({ field }) => (
                <CustomSelect
                  placeholder={"Select Patient Relationship"}
                  items={Gender}
                  {...field}
                  bgWhite={true}
                  hasError={
                    errors?.emergencyContact &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    !!(errors?.emergencyContact as unknown as any)
                      .relationshipWithPatient
                  }
                  errorMessage={
                    errors?.emergencyContact &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (errors?.emergencyContact as unknown as any)
                      .relationshipWithPatient.message
                  }
                />
              )}
            />
          </Grid>
          <Grid width={belowmd ? "250px" : "300px"}>
            <CustomLabel label="Full Name" isRequired />
            <Controller
              control={control}
              name="emergencyContact.fullName"
              render={({ field }) => (
                <CustomInput
                  placeholder={"Enter Full Name"}
                  {...field}
                  bgWhite={true}
                  hasError={
                    errors?.emergencyContact &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    !!(errors?.emergencyContact as unknown as any).fullName
                  }
                  errorMessage={
                    errors?.emergencyContact &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (errors?.emergencyContact as unknown as any).fullName
                      .message
                  }
                />
              )}
            />
          </Grid>
          <Grid width={belowmd ? "250px" : "300px"}>
            <CustomLabel label="Mobile Number" />
            <Controller
              control={control}
              name="emergencyContact.mobile"
              render={({ field }) => (
                <CustomInputWithPrefix
                  prefix={`+1`}
                  value={field.value?.trim() || ""}
                  placeholder={"Enter Mobile Number"}
                  bgWhite
                  hasError={
                    errors?.emergencyContact &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    !!(errors?.emergencyContact as unknown as any).mobile
                  }
                  errorMessage={
                    errors?.emergencyContact &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (errors?.emergencyContact as unknown as any).mobile.message
                  }
                  name={field.name}
                  onChange={(e) =>
                    setValue("emergencyContact.mobile", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />
          </Grid>
          <Divider orientation="vertical" />
          <Grid container alignContent={"flex-end"}>
            <ButtonBase>
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
