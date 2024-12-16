import { Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import CustomAutoComplete from "../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInputWithPrefix from "../../../common-components/custom-input-with-prefix/custom-input-with-prefix";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import { stateList } from "../../../utils/StateList";
import { theme } from "../../../utils/theme";

const FourOrderingProvider = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <Grid
      container
      flexDirection={"column"}
      width={"100%"}
      flexWrap={"nowrap"}
      maxHeight={"70vh"}
      overflow={"auto"}
    >
      <Grid
        width={"100%"}
        container
        rowGap={2}
        flexDirection={"column"}
        border={`1px solid ${theme.palette.grey[300]}`}
        mt={1}
        borderRadius={"16px"}
      >
        <Grid
          container
          height={"59px"}
          // pl={1}
          p={"0px 16px"}
          alignItems={"center"}
          borderBottom={`1px solid ${theme.palette.grey[300]}`}
        >
          <Typography variant="bodyMedium" fontWeight={"bold"}>
            Ordering Provider
          </Typography>
        </Grid>
        <Grid p={2} container flexDirection={"column"} rowGap={2}>
          <Grid container width={"100%"} justifyContent={"space-between"}>
            <Grid width={"24%"}>
              <CustomLabel label="Provider" />
              <Controller
                control={control}
                name="orderingPoviderName"
                render={({ field }) => (
                  <CustomAutoComplete
                    value={field.value?.trim() || ""}
                    placeholder={"Select Provider"}
                    hasError={!!errors.homePhone}
                    errorMessage={errors.homePhone?.message as string}
                    onChange={(e) => setValue("orderingPoviderName", e)}
                    options={[]}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Specialty" />
              <Controller
                control={control}
                name="orderingPoviderSpeciality"
                render={({ field }) => (
                  <CustomAutoComplete
                    options={[]}
                    {...field}
                    onChange={(e) => setValue("orderingPoviderSpeciality", e)}
                    value={field.value?.trim() || ""}
                    placeholder={"Select Specialty"}
                    hasError={!!errors.workPhone}
                    errorMessage={errors.workPhone?.message as string}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Phone" />
              <Controller
                control={control}
                name="orderingPoviderPhone"
                render={({ field }) => (
                  <CustomInputWithPrefix
                    onChange={(e) =>
                      setValue("orderingPoviderPhone", e.target.value)
                    }
                    prefix={`+1`}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Phone"}
                    hasError={!!errors.cellPhone}
                    errorMessage={errors.cellPhone?.message as string}
                    name={field.name}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Fax" />
              <Controller
                control={control}
                name="orderingPoviderFax"
                render={({ field }) => (
                  <CustomInput
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Fax Number"}
                    hasError={!!errors.orderingPoviderFax}
                    errorMessage={errors.orderingPoviderFaxl?.message as string}
                    name={field.name}
                    onChange={(e) =>
                      setValue("orderingPoviderFax", e.target.value)
                    }
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
          <Grid container width={"100%"} columnGap={3}>
            <Grid width={"24%"}>
              <CustomLabel label="Tax ID" />
              <Controller
                control={control}
                name="orderingPoviderTaxId"
                render={({ field }) => (
                  <CustomInput
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Tax ID"}
                    hasError={!!errors.orderingPoviderTaxId}
                    errorMessage={
                      errors.orderingPoviderTaxId?.message as string
                    }
                    name={field.name}
                    onChange={(e) =>
                      setValue("orderingPoviderTaxId", e.target.value)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="NPI" />
              <Controller
                control={control}
                name="orderingPoviderNPI"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    onChange={(e) =>
                      setValue("orderingPoviderNPI", e.target.value)
                    }
                    value={field.value?.trim() || ""}
                    placeholder={"Enter NPI"}
                    hasError={!!errors.orderingPoviderNPI}
                    errorMessage={errors.orderingPoviderNPI?.message as string}
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
                name="orderingPoviderAddressLine1"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Address Line 1"}
                    hasError={
                      errors?.address && !!errors?.orderingPoviderAddressLine1
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressLine1 &&
                      (errors?.orderingPoviderAddressLine1?.message as string)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Address Line 2" />
              <Controller
                control={control}
                name="orderingPoviderAddressLine2"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value || ""}
                    placeholder={"Enter Address Line 2"}
                    hasError={
                      errors?.orderingPoviderAddressLine2 &&
                      !!errors?.orderingPoviderAddressLine2
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressLine2 &&
                      (errors?.orderingPoviderAddressLine2?.message as string)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"15.5%"}>
              <CustomLabel label="City" isRequired />
              <Controller
                control={control}
                name="orderingPoviderAddressCity"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value || ""}
                    placeholder={"Enter City"}
                    hasError={
                      errors?.orderingPoviderAddressCity &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      !!(errors?.orderingPoviderAddressCity as unknown as any)
                        .city
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressCity &&
                      (errors?.orderingPoviderAddressCity.message as string)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"15.5%"}>
              <CustomLabel isRequired label="State" />
              <Controller
                control={control}
                name="orderingPoviderAddressState"
                render={({ field }) => (
                  <CustomAutoComplete
                    {...field}
                    placeholder={"Search the state"}
                    options={stateList}
                    maxHeightForOptionsList={300}
                    value={field.value || ""}
                    hasError={
                      errors?.orderingPoviderAddressState &&
                      !!errors?.orderingPoviderAddressState
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressState &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (errors?.orderingPoviderAddressState as unknown as any)
                        .message
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"15.5%"}>
              <CustomLabel label="Zip Code" isRequired />
              <Controller
                control={control}
                name="orderingPoviderAddressZipcode"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value || ""}
                    placeholder={"Enter Zip Code"}
                    hasError={
                      errors?.orderingPoviderAddressZipcode &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      !!(errors?.orderingPoviderAddressZipcode as unknown as any)
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressZipcode &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (errors?.orderingPoviderAddressZipcode as unknown as any)
                        .message
                    }
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        width={"100%"}
        container
        // p={2}
        rowGap={2}
        flexDirection={"column"}
        border={`1px solid ${theme.palette.grey[300]}`}
        mt={1}
        borderRadius={"16px"}
      >
        <Grid
          container
          height={"59px"}
          // pl={1}
          p={"0px 16px"}
          alignItems={"center"}
          borderBottom={`1px solid ${theme.palette.grey[300]}`}
        >
          <Typography variant="bodyMedium" fontWeight={"bold"}>
            Millennium Provider
          </Typography>
        </Grid>
        <Grid p={2} container flexDirection={"column"} rowGap={2}>
          <Grid container width={"100%"} justifyContent={"space-between"}>
            <Grid width={"24%"}>
              <CustomLabel label="Provider" />
              <Controller
                control={control}
                name="millenniumProviderName"
                render={({ field }) => (
                  <CustomAutoComplete
                    options={[]}
                    value={field.value?.trim() || ""}
                    placeholder={"Select Provider"}
                    hasError={!!errors.millenniumProviderName}
                    errorMessage={
                      errors.millenniumProviderName?.message as string
                    }
                    onChange={(e) => setValue("millenniumProviderName", e)}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Specialty" />
              <Controller
                control={control}
                name="millenniumProviderSpeciality"
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    items={[]}
                    onChange={(e) =>
                      setValue("millenniumProviderSpeciality", e.target.value)
                    }
                    value={field.value?.trim() || ""}
                    placeholder={"Select Speciality"}
                    hasError={!!errors.millenniumProviderSpeciality}
                    errorMessage={
                      errors.millenniumProviderSpeciality?.message as string
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Phone" />
              <Controller
                control={control}
                name="millenniumProviderPhone"
                render={({ field }) => (
                  <CustomInputWithPrefix
                    onChange={(e) =>
                      setValue("millenniumProviderPhone", e.target.value)
                    }
                    prefix={`+1`}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Phone"}
                    hasError={!!errors.millenniumProviderPhone}
                    errorMessage={
                      errors.millenniumProviderPhone?.message as string
                    }
                    name={field.name}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Fax" />
              <Controller
                control={control}
                name="millenniumProviderFax"
                render={({ field }) => (
                  <CustomInput
                    value={field.value?.trim() || ""}
                    placeholder={"Fax"}
                    hasError={!!errors.millenniumProviderFax}
                    errorMessage={
                      errors.millenniumProviderFax?.message as string
                    }
                    name={field.name}
                    onChange={(e) =>
                      setValue("millenniumProviderFax", e.target.value)
                    }
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
          <Grid container width={"100%"} columnGap={3}>
            <Grid width={"24%"}>
              <CustomLabel label="Tax ID" />
              <Controller
                control={control}
                name="millenniumProviderTaxId"
                render={({ field }) => (
                  <CustomInput
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Tax ID"}
                    hasError={!!errors.millenniumProviderTaxId}
                    errorMessage={
                      errors.millenniumProviderTaxId?.message as string
                    }
                    name={field.name}
                    onChange={(e) =>
                      setValue("millenniumProviderTaxId", e.target.value)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="NPI" />
              <Controller
                control={control}
                name="millenniumProviderNpi"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    onChange={(e) =>
                      setValue("millenniumProviderNpi", e.target.value)
                    }
                    value={field.value?.trim() || ""}
                    placeholder={"Enter NPI"}
                    hasError={!!errors.millenniumProviderNpi}
                    errorMessage={
                      errors.millenniumProviderNpi?.message as string
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
                name="address.line1"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Address Line 1"}
                    hasError={
                      errors?.orderingPoviderAddressLine1 &&
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      !!(errors?.orderingPoviderAddressLine1 as unknown as any)
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressLine1 &&
                      (errors?.orderingPoviderAddressLine1.message as string)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Address Line 2" />
              <Controller
                control={control}
                name="orderingPoviderAddressLine2"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value || ""}
                    placeholder={"Enter Address Line 2"}
                    hasError={
                      errors?.address && !!errors?.orderingPoviderAddressLine2
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressLine2 &&
                      (errors?.orderingPoviderAddressLine2?.message as string)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"15.5%"}>
              <CustomLabel label="City" isRequired />
              <Controller
                control={control}
                name="orderingPoviderAddressCity"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value || ""}
                    placeholder={"Enter City"}
                    hasError={
                      errors?.orderingPoviderAddressCity &&
                      !!errors?.orderingPoviderAddressCity
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressCity &&
                      (errors?.orderingPoviderAddressCity?.message as string)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"15.5%"}>
              <CustomLabel isRequired label="State" />
              <Controller
                control={control}
                name="orderingPoviderAddressState"
                render={({ field }) => (
                  <CustomAutoComplete
                    {...field}
                    placeholder={"Search the state"}
                    options={stateList}
                    maxHeightForOptionsList={300}
                    value={field.value || ""}
                    hasError={
                      errors?.address && !!errors?.orderingPoviderAddressState
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressState &&
                      (errors?.orderingPoviderAddressState?.message as string)
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
                      errors?.orderingPoviderAddressZipcode &&
                      !!errors?.orderingPoviderAddressZipcode
                    }
                    errorMessage={
                      errors?.orderingPoviderAddressZipcode &&
                      (errors?.orderingPoviderAddressZipcode?.message as string)
                    }
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        width={"100%"}
        container
        // p={2}
        rowGap={2}
        flexDirection={"column"}
        border={`1px solid ${theme.palette.grey[300]}`}
        mt={1}
        borderRadius={"16px"}
      >
        <Grid
          container
          height={"59px"}
          // pl={1}
          p={"0px 16px"}
          alignItems={"center"}
          borderBottom={`1px solid ${theme.palette.grey[300]}`}
        >
          <Typography variant="bodyMedium" fontWeight={"bold"}>
            Dental Provider Details
          </Typography>
        </Grid>
        <Grid p={2} container flexDirection={"column"} rowGap={2}>
          <Grid container width={"100%"} justifyContent={"space-between"}>
            <Grid width={"24%"}>
              <CustomLabel label="Provider" />
              <Controller
                control={control}
                name="dentalProviderDetailsProviderName"
                render={({ field }) => (
                  <CustomAutoComplete
                    options={[]}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Home Phone Number"}
                    hasError={!!errors.dentalProviderDetailsProviderName}
                    errorMessage={
                      errors.dentalProviderDetailsProviderName
                        ?.message as string
                    }
                    onChange={(e) =>
                      setValue("dentalProviderDetailsProviderName", e)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Speciality" />
              <Controller
                control={control}
                name="dentalProviderDetailsProviderSpeciality"
                render={({ field }) => (
                  <CustomAutoComplete
                    {...field}
                    options={[]}
                    onChange={(e) =>
                      setValue("dentalProviderDetailsProviderSpeciality", e)
                    }
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Work Phone Number"}
                    hasError={!!errors.dentalProviderDetailsProviderSpeciality}
                    errorMessage={
                      errors.dentalProviderDetailsProviderSpeciality
                        ?.message as string
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Phone" />
              <Controller
                control={control}
                name="dentalProviderDetailsProviderPhone"
                render={({ field }) => (
                  <CustomInputWithPrefix
                    onChange={(e) =>
                      setValue(
                        "dentalProviderDetailsProviderPhone",
                        e.target.value,
                      )
                    }
                    prefix={`+1`}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Phone"}
                    hasError={!!errors.dentalProviderDetailsProviderPhone}
                    errorMessage={
                      errors.dentalProviderDetailsProviderPhone
                        ?.message as string
                    }
                    name={""}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Fax" />
              <Controller
                control={control}
                name="dentalProviderDetailsProviderFax"
                render={({ field }) => (
                  <CustomInputWithPrefix
                    prefix={`+1`}
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Fax"}
                    hasError={!!errors.dentalProviderDetailsProviderFax}
                    errorMessage={
                      errors.dentalProviderDetailsProviderFax?.message as string
                    }
                    name={field.name}
                    onChange={(e) =>
                      setValue(
                        "dentalProviderDetailsProviderFax",
                        e.target.value,
                      )
                    }
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
          <Grid container width={"100%"} columnGap={3}>
            <Grid width={"24%"}>
              <CustomLabel label="Provider Email" />
              <Controller
                control={control}
                name="dentalProviderDetailsProviderEmail"
                render={({ field }) => (
                  <CustomInput
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Provider's Email"}
                    hasError={!!errors.dentalProviderDetailsProviderEmail}
                    errorMessage={
                      errors.dentalProviderDetailsProviderEmail
                        ?.message as string
                    }
                    name={field.name}
                    onChange={(e) =>
                      setValue(
                        "dentalProviderDetailsProviderEmail",
                        e.target.value,
                      )
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Assistant Email" />
              <Controller
                control={control}
                name="dentalProviderDetailsProviderAssistantEmail"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    onChange={(e) =>
                      setValue(
                        "dentalProviderDetailsProviderAssistantEmail",
                        e.target.value,
                      )
                    }
                    value={field.value?.trim() || ""}
                    placeholder={"Enter Assistant's Email"}
                    hasError={
                      !!errors.dentalProviderDetailsProviderAssistantEmail
                    }
                    errorMessage={
                      errors.dentalProviderDetailsProviderAssistantEmail
                        ?.message as string
                    }
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        width={"100%"}
        container
        // p={2}
        rowGap={2}
        flexDirection={"column"}
        border={`1px solid ${theme.palette.grey[300]}`}
        mt={1}
        borderRadius={"16px"}
      >
        <Grid
          container
          height={"59px"}
          // pl={1}
          p={"0px 16px"}
          alignItems={"center"}
          borderBottom={`1px solid ${theme.palette.grey[300]}`}
        >
          <Typography variant="bodyMedium" fontWeight={"bold"}>
            Other Contacts
          </Typography>
        </Grid>
        <Grid p={2} container flexDirection={"column"} rowGap={2}>
          <Grid container width={"100%"} justifyContent={"space-between"}>
            <Grid width={"24%"}>
              <CustomLabel label="Preferred DME" />
              <Controller
                control={control}
                name="otherContactsPreferredDME"
                render={({ field }) => (
                  <CustomSelect
                    items={[]}
                    value={field.value?.trim() || ""}
                    placeholder={"Select Preferred DME"}
                    hasError={!!errors.otherContactsPreferredDME}
                    errorMessage={
                      errors.otherContactsPreferredDME?.message as string
                    }
                    name={field.name}
                    onChange={(e) =>
                      setValue("otherContactsPreferredDME", e.target.value)
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Other Providers" />
              <Controller
                control={control}
                name="otherContactsOtherProviders"
                render={({ field }) => (
                  <CustomAutoComplete
                    {...field}
                    onChange={(e) => setValue("otherContactsOtherProviders", e)}
                    options={[]}
                    value={field.value?.trim() || ""}
                    placeholder={"Select Other Providers"}
                    hasError={!!errors.otherContactsOtherProviders}
                    errorMessage={
                      errors.otherContactsOtherProviders?.message as string
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Sleep Lab" />
              <Controller
                control={control}
                name="otherContactsSleepLab"
                render={({ field }) => (
                  <CustomAutoComplete
                    onChange={(e) => setValue("otherContactsSleepLab", e)}
                    options={[]}
                    value={field.value?.trim() || ""}
                    placeholder={"Select Sleep Lab"}
                    hasError={!!errors.otherContactsSleepLab}
                    errorMessage={
                      errors.otherContactsSleepLab?.message as string
                    }
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Regional Manager" />
              <Controller
                control={control}
                name="otherContactsRegionalManager"
                render={({ field }) => (
                  <CustomAutoComplete
                    options={[]}
                    value={field.value?.trim() || ""}
                    placeholder={"Select Regional Manager"}
                    hasError={!!errors.otherContactsRegionalManager}
                    errorMessage={
                      errors.otherContactsRegionalManager?.message as string
                    }
                    onChange={(e) =>
                      setValue("otherContactsRegionalManager", e)
                    }
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
          <Grid container width={"100%"} columnGap={3}>
            <Grid width={"24%"}>
              <CustomLabel label="Sleep Advisor" />
              <Controller
                control={control}
                name="otherContactsSleepAdvisor"
                render={({ field }) => (
                  <CustomAutoComplete
                    options={[]}
                    value={field.value?.trim() || ""}
                    placeholder={"Select Sleep Advisor"}
                    hasError={!!errors.otherContactsSleepAdvisor}
                    errorMessage={
                      errors.otherContactsSleepAdvisor?.message as string
                    }
                    onChange={(e) => setValue("otherContactsSleepAdvisor", e)}
                  />
                )}
              />
            </Grid>{" "}
            <Grid width={"24%"}>
              <CustomLabel label="Marketing Rep" />
              <Controller
                control={control}
                name="workPhone"
                render={({ field }) => (
                  <CustomAutoComplete
                    {...field}
                    onChange={(e) => setValue("workPhone", e)}
                    options={[]}
                    value={field.value?.trim() || ""}
                    placeholder={"Select Marketing Rep"}
                    hasError={!!errors.workPhone}
                    errorMessage={errors.workPhone?.message as string}
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FourOrderingProvider;
