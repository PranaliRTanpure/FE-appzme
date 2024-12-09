import { Divider, SelectChangeEvent, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import DatePicker from "../../../common-components/date-picker-field/date-picker-field";
import UploadLogo from "../../../common-components/image-upload/custom-image-upload";
import { Gender, PrimaryLanguages } from "../../../constants/roles";
import { theme } from "../../../utils/theme";
export const customStyle = {
  height: "8rem",
  width: "8rem",
};
const OnePatientDetails = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <Grid
      width={"100%"}
      container
      p={2}
      flexDirection={"column"}
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"0px 0px 16px 16px"}
    >
      <Grid container>
        <Grid width={"160px"} container justifyContent={"center"}>
          <UploadLogo customStyle={customStyle} />
          <Typography variant="bodySmall" color="#74797B">
            Max. 800x400px
          </Typography>
        </Grid>
        <Grid flex={1} rowGap={2} container flexDirection={"column"}>
          <Grid container flex={1} justifyContent={"space-between"}>
            <Grid width={"49%"} container justifyContent={"space-between"}>
              <Grid width={"40%"}>
                <CustomLabel label="First Name" isRequired />
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value.trim() || ""}
                      placeholder={"Enter First Name"}
                      hasError={!!errors.firstName}
                      errorMessage={errors.firstName?.message as string}
                    />
                  )}
                />
              </Grid>
              <Grid width={"18%"}>
                <CustomLabel label="Middle Name Initial" />
                <Controller
                  control={control}
                  name="middleNameInitial"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value.trim() || ""}
                      placeholder={"Enter Initial"}
                      hasError={!!errors.middleNameInitial}
                      errorMessage={errors.middleNameInitial?.message as string}
                    />
                  )}
                />
              </Grid>{" "}
              <Grid width={"40%"}>
                <CustomLabel label="Last Name" isRequired />
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value.trim() || ""}
                      placeholder={"Enter Last Name"}
                      hasError={!!errors.lastName}
                      errorMessage={errors.lastName?.message as string}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid width={"49%"} container justifyContent={"space-between"}>
              <Grid width={"32%"}>
                <CustomLabel label="Date of Birth" isRequired />
                <Controller
                  control={control}
                  name={`dateOfBirth`}
                  render={({ field }) => (
                    <DatePicker
                      bgWhite={false}
                      {...field}
                      disableFuture
                      value={field.value}
                      onDateChange={function (selectedDate: string): void {
                        setValue(`dateOfBirth`, selectedDate, {
                          shouldValidate: true,
                        });
                      }}
                      hasError={!!errors.dateOfBirth}
                      errorMessage={
                        (errors.dateOfBirth?.message || "") as string
                      }
                    />
                  )}
                />
              </Grid>
              <Grid width={"32%"}>
                <CustomLabel label="Gender" isRequired />
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <CustomSelect
                      placeholder={"Select Gender"}
                      name={field.name}
                      value={field.value}
                      items={Gender}
                      bgWhite={false}
                      hasError={!!errors.gender}
                      errorMessage={errors.gender?.message as string}
                      onChange={function (e: SelectChangeEvent<string>): void {
                        setValue("gender", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  )}
                />
              </Grid>{" "}
              <Grid width={"32%"}>
                <CustomLabel label="Primary Language" isRequired />
                <Controller
                  control={control}
                  name="primaryLanguage"
                  render={({ field }) => (
                    <CustomSelect
                      placeholder={"Select Language"}
                      name={field.name}
                      bgWhite={false}
                      value={field.value}
                      items={PrimaryLanguages}
                      hasError={!!errors.primaryLanguage}
                      errorMessage={errors.primaryLanguage?.message as string}
                      onChange={function (e: SelectChangeEvent<string>): void {
                        setValue("primaryLanguage", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container flex={1} justifyContent={"space-between"}>
            <Grid width={"50%"} container columnGap={1}>
              <Grid width={"39%"}>
                <CustomLabel label="Height (inches)" isRequired />
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value.trim() || ""}
                      placeholder={"Enter First Name"}
                      hasError={!!errors.firstName}
                      errorMessage={errors.firstName?.message as string}
                    />
                  )}
                />
              </Grid>
              <Grid width={"40%"}>
                <CustomLabel label="Weight (lbs)" />
                <Controller
                  control={control}
                  name="middleNameInitial"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value.trim() || ""}
                      placeholder={"Enter Initial"}
                      hasError={!!errors.middleNameInitial}
                      errorMessage={errors.middleNameInitial?.message as string}
                    />
                  )}
                />
              </Grid>{" "}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid>Down</Grid>
    </Grid>
  );
};

export default OnePatientDetails;
