import { Divider, SelectChangeEvent } from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomInputWithPrefix from "../../../common-components/custom-input-with-prefix/custom-input-with-prefix";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import DatePicker from "../../../common-components/date-picker-field/date-picker-field";
import CustomRadioButton from "../../../common-components/radio-button/radio-button";
import { Gender, PrimaryLanguages } from "../../../constants/roles";
import { theme } from "../../../utils/theme";
import { CustomUploadImage } from "@/common-components/custom-image-upload/UploadImage";

export const customStyle = {
  height: "8rem",
  width: "8rem",
};

const OnePatientDetails = () => {
  const belowmd = useMediaQuery(theme.breakpoints.down("md"));
  const [isSpecialNeeds, setIsSpecialNeeds] = useState("");
  const [isEmployed, setIsEmployed] = useState("");
  const [isPetientPortal, setIsPatientPortal] = useState("");

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
      maxHeight={belowmd ? "500px" : "100%"}
      overflow={"auto"}
      rowGap={2}
      flexDirection={"column"}
      flexWrap={"nowrap"}
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"0px 0px 16px 16px"}
    >
      <Grid container>
        <Grid width={"132px"} p={1}>
          <CustomUploadImage
            name="avatar"
            defaultImage={""}
            isLoading={false}
          />
        </Grid>

        <Grid flex={1} rowGap={2} container flexDirection={"column"}>
          <Grid
            container
            flex={1}
            flexDirection={belowmd ? "column" : "row"}
            justifyContent={"space-between"}
          >
            <Grid
              width={belowmd ? "100%" : "49%"}
              container
              justifyContent={"space-between"}
            >
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
            <Grid
              width={belowmd ? "100%" : "49%"}
              container
              justifyContent={"space-between"}
            >
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
                      enableAdd
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
            <Grid width={belowmd ? "100%" : "50%"} container columnGap={1}>
              <Grid width={"39%"}>
                <CustomLabel label="Height (inches)" isRequired />
                <Controller
                  control={control}
                  name="height"
                  render={({ field }) => (
                    <CustomInputWithPrefix
                      {...field}
                      prefix={`"`}
                      value={field.value.trim() || ""}
                      placeholder={"Enter height"}
                      hasError={!!errors.height}
                      errorMessage={errors.height?.message as string}
                    />
                  )}
                />
              </Grid>
              <Grid width={"40%"}>
                <CustomLabel label="Weight (lbs)" />
                <Controller
                  control={control}
                  name="weight"
                  render={({ field }) => (
                    <CustomInputWithPrefix
                      {...field}
                      prefix={`lbs`}
                      value={field.value.trim() || ""}
                      placeholder={"Enter weight"}
                      hasError={!!errors.weight}
                      errorMessage={errors.weight?.message as string}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid container p={1.5} rowGap={3}>
        <Grid container flexDirection={"column"} width={"100%"}>
          <CustomLabel label="Special Needs" isRequired />
          <Grid container width={"100%"} columnGap={1}>
            <CustomRadioButton
              optionsArray={["Yes", "No"]}
              selectedvalue={isSpecialNeeds}
              onChange={function (opt: string): void {
                setIsSpecialNeeds(opt);
              }}
            />
            <Grid flex={1}>
              <Controller
                control={control}
                name="specialNeeds"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    disableField={isSpecialNeeds === "Yes" ? false : true}
                    value={field.value.trim() || ""}
                    placeholder={"Enter Details"}
                    hasError={!!errors.specialNeeds}
                    errorMessage={errors.specialNeeds?.message as string}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container flexDirection={"column"} width={"100%"}>
          <CustomLabel label="Employed" />
          <Grid container width={"100%"} columnGap={1}>
            <CustomRadioButton
              optionsArray={["Yes", "No"]}
              selectedvalue={isEmployed}
              onChange={function (opt: string): void {
                setIsEmployed(opt);
              }}
            />
            <Grid flex={1}>
              <Controller
                control={control}
                name="employed"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    disableField={isEmployed === "Yes" ? false : true}
                    value={field.value.trim() || ""}
                    placeholder={"Enter Employer"}
                    hasError={!!errors.employed}
                    errorMessage={errors.employed?.message as string}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container flexDirection={"column"} width={"100%"}>
          <CustomLabel label="Patient Portal" />
          <Grid container width={"100%"} columnGap={1}>
            <CustomRadioButton
              optionsArray={["Yes", "No"]}
              selectedvalue={isPetientPortal}
              onChange={function (opt: string): void {
                setIsPatientPortal(opt);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OnePatientDetails;
