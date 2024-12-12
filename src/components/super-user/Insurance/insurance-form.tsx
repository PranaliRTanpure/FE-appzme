import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import CustomAutoComplete from "../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import DatePicker from "../../../common-components/date-picker-field/date-picker-field";
import CustomRadioButton from "../../../common-components/radio-button/radio-button";
import { stateList } from "../../../utils/StateList";
import { theme } from "../../../utils/theme";
import { insuranceSchema } from "./insurance-schema";

type InsuranceFormType = {
  onClose: () => void;
};

const InsuranceForm = (props: InsuranceFormType) => {
  const { onClose } = props;

  const initialValues = {
    insuranceName: "",
    idNumber: "",
    planName: "",
    groupId: "",
    groupName: "",
    startDate: "",
    endDate: "",
    patientRelationshipToSubscriber: "",
    subscriberFirstName: "",
    subscriberLastName: "",
    subscriberMiddleNameInitial: "",
    subscriberDateOfBirth: "",
    subscriberAddressLine1: "",
    subscriberAddressLine2: "",
    subscriberAddressCity: "",
    subscriberAddressState: "",
    subscriberAddressZipcode: "",
    insuranceCardFrontSide: "   ",
    insuranceCardBackSide: "",
  };
  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(insuranceSchema),
  });

  const belowmd = useMediaQuery(theme.breakpoints.down("md"));

  const {
    control,
    formState: { errors },
    setValue,
  } = method;

  return (
    <Grid container flexDirection={"column"}>
      <Grid height={"58px"} container p={2} columnGap={2} alignItems={"center"}>
        <IconButton onClick={() => onClose()}>
          <CloseIcon fontSize="small" />
        </IconButton>
        <Typography variant="bodyMedium">Add Primary Insurance</Typography>
      </Grid>

      <Grid
        p={2}
        borderTop={`1px solid ${theme.palette.grey[300]}`}
        flex={1}
        container
        rowGap={2}
      >
        <Grid container rowGap={2} width={"100%"}>
          <Grid container width={"100%"} justifyContent={"space-between"}>
            <Grid width={"24%"}>
              <CustomLabel label="Insurance Name" isRequired />
              <Controller
                control={control}
                name="insuranceName"
                render={({ field }) => (
                  <CustomInput
                    value={field.value?.trim() || ""}
                    placeholder={"Select Insurance Name"}
                    hasError={!!errors.insuranceName}
                    errorMessage={errors.insuranceName?.message as string}
                    name={field.name}
                    onChange={(e) => setValue("insuranceName", e.target.value)}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="ID Number" />
              <Controller
                control={control}
                name="idNumber"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    onChange={(e) => setValue("groupId", e.target.value)}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter ID Number"}
                    hasError={!!errors.groupId}
                    errorMessage={errors.groupId?.message as string}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Plan Name" />
              <Controller
                control={control}
                name="planName"
                render={({ field }) => (
                  <CustomSelect
                    onChange={(e) => setValue("planName", e.target.value)}
                    value={field.value?.trim() || ""}
                    items={[{ label: "", value: "" }]}
                    placeholder={"Select Plan"}
                    hasError={!!errors.planName}
                    errorMessage={errors.planName?.message as string}
                    name={""}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Group ID" />
              <Controller
                control={control}
                name="groupId"
                render={({ field }) => (
                  <CustomInput
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Group ID"}
                    hasError={!!errors.groupId}
                    errorMessage={errors.groupId?.message as string}
                    name={field.name}
                    onChange={(e) => setValue("groupId", e.target.value)}
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
          <Grid container width={"100%"} columnGap={3}>
            <Grid width={"24%"}>
              <CustomLabel label="Group Name" isRequired />
              <Controller
                control={control}
                name="groupName"
                render={({ field }) => (
                  <CustomInput
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Group Name"}
                    hasError={!!errors.groupName}
                    errorMessage={errors.groupName?.message as string}
                    name={field.name}
                    onChange={(e) => setValue("groupName", e.target.value)}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Start Date" />
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    bgWhite={false}
                    disableFuture
                    value={field.value}
                    onDateChange={function (selectedDate: string): void {
                      setValue(`startDate`, selectedDate, {
                        shouldValidate: true,
                      });
                    }}
                    hasError={!!errors.startDate}
                    errorMessage={errors.startDate?.message || ""}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="End Date" />
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    bgWhite={false}
                    disableFuture
                    value={field.value}
                    onDateChange={function (selectedDate: string): void {
                      setValue(`endDate`, selectedDate, {
                        shouldValidate: true,
                      });
                    }}
                    hasError={!!errors.endDate}
                    errorMessage={errors.endDate?.message || ""}
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        p={2}
        borderTop={`1px solid ${theme.palette.grey[300]}`}
        flex={1}
        container
        // rowGap={2}
        flexDirection={"column"}
      >
        <CustomLabel label="Patient’s Relationship to Subscriber" isRequired />
        <CustomRadioButton
          optionsArray={["Self", "Spouse", "Child", "Other"]}
          selectedvalue={""}
          onChange={function (opt: string): void {
            setValue("patientRelationshipToSubscriber", opt);
          }}
        />
      </Grid>
      <Grid
        p={2}
        borderTop={`1px solid ${theme.palette.grey[300]}`}
        flex={1}
        container
        // rowGap={2}
        flexDirection={"column"}
      >
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
              <CustomLabel label="Subscriber’s First Name" isRequired />
              <Controller
                control={control}
                name="subscriberFirstName"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value.trim() || ""}
                    placeholder={"Enter First Name"}
                    hasError={!!errors.subscriberFirstName}
                    errorMessage={errors.subscriberFirstName?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid width={"18%"}>
              <CustomLabel label="Middle Name Initial" />
              <Controller
                control={control}
                name="subscriberMiddleNameInitial"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Initial"}
                    hasError={!!errors.subscriberMiddleNameInitial}
                    errorMessage={
                      errors.subscriberMiddleNameInitial?.message as string
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"40%"}>
              <CustomLabel label="Subscriber’s Last Name" isRequired />
              <Controller
                control={control}
                name="subscriberLastName"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Last Name"}
                    hasError={!!errors.subscriberLastName}
                    errorMessage={errors.subscriberLastName?.message as string}
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
              <CustomLabel label="Subscriber’s Date of Birth" isRequired />
              <Controller
                control={control}
                name={`subscriberDateOfBirth`}
                render={({ field }) => (
                  <DatePicker
                    bgWhite={false}
                    {...field}
                    disableFuture
                    value={field.value}
                    onDateChange={function (selectedDate: string): void {
                      setValue(`subscriberDateOfBirth`, selectedDate, {
                        shouldValidate: true,
                      });
                    }}
                    hasError={!!errors.subscriberDateOfBirth}
                    errorMessage={
                      (errors.subscriberDateOfBirth?.message || "") as string
                    }
                  />
                )}
              />
            </Grid>
            <Grid width={"32%"}>
              <CustomLabel label="Address Line 1" isRequired />
              <Controller
                control={control}
                name="subscriberAddressLine1"
                render={({ field }) => (
                  <CustomInput
                    placeholder={"Enter Address Line 1"}
                    name={field.name}
                    value={field.value}
                    bgWhite={false}
                    hasError={!!errors.subscriberAddressLine1}
                    errorMessage={
                      errors.subscriberAddressLine1?.message as string
                    }
                    onChange={function (e: SelectChangeEvent<string>): void {
                      setValue("subscriberAddressLine1", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"32%"}>
              <CustomLabel label="Address Line 2" isRequired />
              <Controller
                control={control}
                name="subscriberAddressLine2"
                render={({ field }) => (
                  <CustomInput
                    placeholder={"Enter Address Line 2"}
                    name={field.name}
                    bgWhite={false}
                    value={field.value || ""}
                    hasError={!!errors.subscriberAddressLine2}
                    errorMessage={
                      errors.subscriberAddressLine2?.message as string
                    }
                    onChange={function (e: SelectChangeEvent<string>): void {
                      setValue("subscriberAddressLine2", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        p={"0px 16px 16px 16px"}
        flex={1}
        container
        flexDirection={"column"}
      >
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
            <Grid width={"32%"}>
              <CustomLabel label="City" isRequired />
              <Controller
                control={control}
                name={`subscriberAddressCity`}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value || ""}
                    placeholder={"Enter City"}
                    hasError={
                      errors?.subscriberAddressCity &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      !!(errors?.subscriberAddressCity as unknown as any).city
                    }
                    errorMessage={
                      errors?.subscriberAddressCity &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (errors?.subscriberAddressCity as unknown as any).city
                        .message
                    }
                  />
                )}
              />
            </Grid>
            <Grid width={"32%"}>
              <CustomLabel isRequired label="State" />
              <Controller
                control={control}
                name="subscriberAddressState"
                render={({ field }) => (
                  <CustomAutoComplete
                    {...field}
                    placeholder={"Search the state"}
                    options={stateList}
                    maxHeightForOptionsList={300}
                    value={field.value || ""}
                    hasError={
                      errors?.subscriberAddressState &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      !!(errors?.subscriberAddressState as unknown as any).state
                    }
                    errorMessage={
                      errors?.subscriberAddressState &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (errors?.subscriberAddressState as unknown as any).state
                        .message
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"32%"}>
              <CustomLabel label="Zip Code" isRequired />
              <Controller
                control={control}
                name="subscriberAddressZipcode"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value || ""}
                    placeholder={"Enter Zip Code"}
                    hasError={
                      errors?.subscriberAddressZipcode &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      !!(errors?.subscriberAddressZipcode as unknown as any)
                        .zipcode
                    }
                    errorMessage={
                      errors?.subscriberAddressZipcode &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (errors?.subscriberAddressZipcode as unknown as any)
                        .zipcode.message
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InsuranceForm;
