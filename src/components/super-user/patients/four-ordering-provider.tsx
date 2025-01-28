import CustomRadioButton from "@/common-components/radio-button/radio-button";
import MainDrawer from "@/components/ui/MainDrawer";
import { useDrawer } from "@/hooks/useDrawer";
import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Typography } from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomAutoComplete from "../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInputWithPrefix from "../../../common-components/custom-input-with-prefix/custom-input-with-prefix";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import { stateList } from "../../../utils/StateList";
import { theme } from "../../../utils/theme";
import AddOrderingProviderForm from "../providers/add-ordering-providers/add-ordering-provider-form";

type FourOrderingProviderProps = {
  handleSelectedOrderType: (selectedOrder: "HST Order" | "OAT Order") => void;
};
const FourOrderingProvider = (props: FourOrderingProviderProps) => {
  const { handleSelectedOrderType } = props;
  const belowWidth1024 = useMediaQuery("(max-width:1024px)");
  const [orderType, setOrderType] = useState<"HST Order" | "OAT Order">(
    "HST Order",
  );
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const {
    open: openDrawer,
    close: closeDrawer,
    content: contentDrawer,
  } = useDrawer();

  const handleDrawer = {
    orderingProviderForm: (action: string) => {
      openDrawer({
        title: `${action} Ordering Provider`,
        identifier: "drawer-ordering-provider-form",
      });
    },
  };

  const DrawerContent = () => {
    switch (contentDrawer.identifier) {
      case "drawer-ordering-provider-form":
        return (
          <AddOrderingProviderForm
            isEdit={false}
            handleDrawerClose={() => {
              setOpen(false);
              closeDrawer();
            }}
          />
        );
      default:
        setOpen(false);
        return <div />;
    }
  };
  return (
    <>
      {open && (
        <MainDrawer
          content={<DrawerContent />}
          drawerWidth={belowWidth1024 ? "95%" : "1000px"}
          anchor="right"
          showSecondButton={false}
          showMandatoryIndicator={true}
        />
      )}
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
            justifyContent={"space-between"}
            p={"0px 16px"}
            width={"100%"}
            alignItems={"center"}
            borderBottom={`1px solid ${theme.palette.grey[300]}`}
          >
            <Grid container height={"100%"} justifyContent={"center"}>
              <Grid container alignContent={"center"}>
                <Typography variant="bodyMedium" fontWeight={"bold"}>
                  Ordering Provider
                </Typography>
              </Grid>
              <Grid height={"100%"} container>
                <Divider sx={{}} orientation="vertical" variant="inset" />
              </Grid>
              <Grid columnGap={2} container ml={2} alignItems={"center"}>
                <CustomLabel label="Provider" />
                <Grid minWidth={"250px"}>
                  <CustomAutoComplete
                    placeholder="Select Ordering Provider"
                    options={[]}
                    onChange={function (selectedValue: string | ""): void {
                      selectedValue;
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                handleDrawer.orderingProviderForm("Add");
                setOpen(true);
              }}
            >
              Add Provider
            </Button>
          </Grid>
          {true && (
            <Grid
              p={2}
              container
              flexDirection={"column"}
              rowGap={2}
              width={"100%"}
            >
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
                        hasError={!!errors.orderingPoviderName}
                        errorMessage={
                          errors.orderingPoviderName?.message as string
                        }
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
                        onChange={(e) =>
                          setValue("orderingPoviderSpeciality", e)
                        }
                        value={field.value?.trim() || ""}
                        placeholder={"Select Specialty"}
                        hasError={!!errors.orderingPoviderSpeciality}
                        errorMessage={
                          errors.orderingPoviderSpeciality?.message as string
                        }
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
                        hasError={!!errors.orderingPoviderPhone}
                        errorMessage={
                          errors.orderingPoviderPhone?.message as string
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
                    name="orderingPoviderFax"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Fax Number"}
                        hasError={!!errors.orderingPoviderFax}
                        errorMessage={
                          errors.orderingPoviderFaxl?.message as string
                        }
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
                        errorMessage={
                          errors.orderingPoviderNPI?.message as string
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
                    name="orderingPoviderAddressLine1"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Address Line 1"}
                        hasError={
                          errors?.address &&
                          !!errors?.orderingPoviderAddressLine1
                        }
                        errorMessage={
                          errors?.orderingPoviderAddressLine1 &&
                          (errors?.orderingPoviderAddressLine1
                            ?.message as string)
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
                          (errors?.orderingPoviderAddressLine2
                            ?.message as string)
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
                          (errors?.orderingPoviderAddressState
                            ?.message as string)
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
                          !!errors?.orderingPoviderAddressZipcode
                        }
                        errorMessage={
                          errors?.orderingPoviderAddressZipcode &&
                          (errors?.orderingPoviderAddressZipcode
                            ?.message as string)
                        }
                      />
                    )}
                  />
                </Grid>{" "}
              </Grid>
            </Grid>
          )}
          {
            <Grid
              p={2}
              width={"100%"}
              container
              flexDirection={"column"}
              rowGap={2}
            >
              <Grid container width={"100%"} justifyContent={"space-between"}>
                <Grid container columnGap={1}>
                  <CustomLabel variant="bodySmall" label="Specialty :" />
                  <Typography variant="bodySmall">Pediatrics</Typography>
                </Grid>{" "}
                <Grid container columnGap={1}>
                  <CustomLabel variant="bodySmall" label="Phone :" />
                  <Typography variant="bodySmall">(209) 555-0104</Typography>
                </Grid>{" "}
                <Grid container columnGap={1}>
                  <CustomLabel variant="bodySmall" label="Fax :" />
                  <Typography variant="bodySmall">031-3012-4567</Typography>
                </Grid>{" "}
                <Grid container columnGap={1}>
                  <CustomLabel variant="bodySmall" label="tax ID :" />
                  <Typography variant="bodySmall">44-3957294</Typography>
                </Grid>{" "}
                <Grid container columnGap={1}>
                  <CustomLabel variant="bodySmall" label="NPI :" />
                  <Typography variant="bodySmall">2323897539</Typography>
                </Grid>{" "}
                <Grid container columnGap={1}>
                  <CustomLabel variant="bodySmall" label="Address :" />
                  <Typography variant="bodySmall">
                    6391 Elgin St. Celina, Delaware 10299
                  </Typography>
                </Grid>{" "}
              </Grid>
            </Grid>
          }
          <Grid width={"100%"}>
            <Divider variant="middle" orientation="horizontal" />
          </Grid>
          <Grid p={2}>
            <CustomLabel label="Order Recieved" />
            <CustomRadioButton
              optionsArray={["HST Order", "OAT Order"]}
              selectedvalue={orderType}
              onChange={function (opt: string): void {
                const selectedOrder = opt as "HST Order" | "OAT Order";
                handleSelectedOrderType(selectedOrder);
                setOrderType(selectedOrder);
              }}
            />
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
                  name="millenniumProviderAddressLine1"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value?.trim() || ""}
                      placeholder={"Enter Address Line 1"}
                      hasError={
                        errors?.millenniumProviderAddressLine1 &&
                        !!errors?.millenniumProviderAddressLine1
                      }
                      errorMessage={
                        errors?.millenniumProviderAddressLine1 &&
                        (errors?.millenniumProviderAddressLine1
                          .message as string)
                      }
                    />
                  )}
                />
              </Grid>{" "}
              <Grid width={"24%"}>
                <CustomLabel label="Address Line 2" />
                <Controller
                  control={control}
                  name="millenniumProviderAddressLine2"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value || ""}
                      placeholder={"Enter Address Line 2"}
                      hasError={
                        errors?.address &&
                        !!errors?.millenniumProviderAddressLine2
                      }
                      errorMessage={
                        errors?.millenniumProviderAddressLine2 &&
                        (errors?.millenniumProviderAddressLine2
                          ?.message as string)
                      }
                    />
                  )}
                />
              </Grid>{" "}
              <Grid width={"15.5%"}>
                <CustomLabel label="City" isRequired />
                <Controller
                  control={control}
                  name="millenniumProviderCity"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value || ""}
                      placeholder={"Enter City"}
                      hasError={
                        errors?.millenniumProviderCity &&
                        !!errors?.millenniumProviderCity
                      }
                      errorMessage={
                        errors?.millenniumProviderCity &&
                        (errors?.millenniumProviderCity?.message as string)
                      }
                    />
                  )}
                />
              </Grid>{" "}
              <Grid width={"15.5%"}>
                <CustomLabel isRequired label="State" />
                <Controller
                  control={control}
                  name="millenniumProviderState"
                  render={({ field }) => (
                    <CustomAutoComplete
                      {...field}
                      placeholder={"Search the state"}
                      options={stateList}
                      maxHeightForOptionsList={300}
                      value={field.value || ""}
                      hasError={
                        errors?.address && !!errors?.millenniumProviderState
                      }
                      errorMessage={
                        errors?.millenniumProviderState &&
                        (errors?.millenniumProviderState?.message as string)
                      }
                    />
                  )}
                />
              </Grid>{" "}
              <Grid width={"15.5%"}>
                <CustomLabel label="Zip Code" isRequired />
                <Controller
                  control={control}
                  name="millenniumProviderZipcode"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      value={field.value || ""}
                      placeholder={"Enter Zip Code"}
                      hasError={
                        errors?.millenniumProviderZipcode &&
                        !!errors?.millenniumProviderZipcode
                      }
                      errorMessage={
                        errors?.millenniumProviderZipcode &&
                        (errors?.millenniumProviderZipcode?.message as string)
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
                      hasError={
                        !!errors.dentalProviderDetailsProviderSpeciality
                      }
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
                        errors.dentalProviderDetailsProviderFax
                          ?.message as string
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
                      onChange={(e) =>
                        setValue("otherContactsOtherProviders", e)
                      }
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
                  name="otherContactsMarketingRep"
                  render={({ field }) => (
                    <CustomAutoComplete
                      {...field}
                      onChange={(e) => setValue("otherContactsMarketingRep", e)}
                      options={[]}
                      value={field.value?.trim() || ""}
                      placeholder={"Select Marketing Rep"}
                      hasError={!!errors.otherContactsMarketingRep}
                      errorMessage={
                        errors.otherContactsMarketingRep?.message as string
                      }
                    />
                  )}
                />
              </Grid>{" "}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FourOrderingProvider;
