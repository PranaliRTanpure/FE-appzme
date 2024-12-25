import {
  Button,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shippingFormSchema } from "./device-scheduling-schema";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import { stateList } from "@/utils/StateList";
import CustomSelect from "@/common-components/custom-select/customSelect";
import DatePicker from "@/common-components/date-picker-field/date-picker-field";
import CustomInputWithPrefix from "@/common-components/custom-input-with-prefix/custom-input-with-prefix";

const ShippingLabel = () => {
  const initialValues = {
    phone: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
    },
    contactName: "",
    email: "",
    resedentialAddress: false,
    billTranspotationTo: "",
    yourReferenceType: "",
    referenceValue: "",
    shipDate: "",
    weight: "",
    declaredValue: "",
    fedExRate: "",
    serviceType: "",
    packageType: "",
    shipperEmail: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(shippingFormSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
  };
  return (
    <form
      style={{ height: "100%", width: "100%", border: "1px solid red" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Main Grid */}
      <Grid container flexDirection={"column"} width={"100%"} height={"100%"}>
        {/* Main Grid 1 */}
        <Grid container flexDirection={"column"} width={"100%"} border={1}>
          <Grid
            container
            bgcolor={"#F2F4FA"}
            flexDirection={"column"}
            rowGap={1.5}
            p={2}
          >
            <Grid container columnGap={2} border={0}>
              <Typography variant="bodyMedium" fontWeight={600}>
                From
              </Typography>
              <ButtonBase sx={{ fontWeight: 600 }}>
                <EditOutlinedIcon sx={{ color: "#106DCC", fontSize: "19px" }} />
                <Typography variant="bodySmall" color="#106DCC" ml={0.7}>
                  Edit Address
                </Typography>
              </ButtonBase>
            </Grid>
            <Typography variant="bodySmall" fontWeight={400}>
              Millennium Sleep lab, 10820 Sunset Office Drive, Suite 130, Sunset
              Hills, Missouri, 63127-1029, United States
            </Typography>
          </Grid>
          {/* Form */}
          <Grid container rowGap={3} p={2} flexDirection={"column"}>
            {/* TO */}
            <Grid container flexDirection={"column"} rowGap={2}>
              <Typography variant="bodySmall" fontWeight={500}>
                To
              </Typography>
              <Grid
                container
                justifyContent={"space-between"}
                flexDirection={"row"}
                width={"100%"}
              >
                <Grid width={"32%"}>
                  <CustomLabel label="Contact Name" isRequired />
                  <Controller
                    control={control}
                    name="contactName"
                    render={({ field }) => (
                      <CustomInput
                        placeholder={"Enter Contact Name"}
                        hasError={!!errors.contactName}
                        errorMessage={errors.contactName?.message}
                        onChange={(event) => {
                          setValue("contactName", event.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                        value={field.value?.trim() || ""}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid width={"32%"}>
                  <CustomLabel label="Address Line 1" isRequired />
                  <Controller
                    control={control}
                    name="address.line1"
                    render={({ field }) => (
                      <CustomInput
                        placeholder={"Enter Address Line 1"}
                        hasError={
                          errors?.address &&
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          !!(errors?.address as unknown as any).line1
                        }
                        errorMessage={
                          errors?.address &&
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (errors?.address as unknown as any).line1.message
                        }
                        onChange={(event) => {
                          setValue("address.line1", event.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                        value={field.value?.trim() || ""}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid width={"32%"}>
                  <CustomLabel label="Address Line 2" />
                  <Controller
                    control={control}
                    name="address.line2"
                    render={({ field }) => (
                      <CustomInput
                        placeholder={"Enter Address Line 2"}
                        hasError={
                          errors?.address &&
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          !!(errors?.address as unknown as any).line2
                        }
                        errorMessage={
                          errors?.address &&
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (errors?.address as unknown as any).line2?.message
                        }
                        onChange={(event) => {
                          setValue("address.line2", event.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                        value={field.value?.trim() || ""}
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"} width={"100%"}>
                <Grid width={"32%"}>
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
                          errors?.address &&
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          !!(errors?.address as unknown as any).city
                        }
                        errorMessage={
                          errors?.address &&
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (errors?.address as unknown as any).city.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid width={"32%"}>
                  <CustomLabel isRequired label="State" />
                  <Controller
                    control={control}
                    name="address.state"
                    render={({ field }) => (
                      <CustomAutoComplete
                        {...field}
                        placeholder={"Enter state"}
                        options={stateList}
                        maxHeightForOptionsList={300}
                        value={field.value || ""}
                        hasError={
                          errors?.address &&
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          !!(errors?.address as unknown as any).state
                        }
                        errorMessage={
                          errors?.address &&
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (errors?.address as unknown as any).state.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid width={"32%"}>
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
                </Grid>
              </Grid>
              <Grid container width={"100%"} justifyContent={"space-between"}>
                <Grid width={"32%"}>
                  <CustomLabel label="Phone" isRequired />
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <CustomInput
                        placeholder={"Enter  Phone"}
                        hasError={!!errors.phone}
                        errorMessage={errors.phone?.message}
                        onChange={(event) => {
                          setValue("phone", event.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                        value={field.value?.trim() || ""}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid width={"32%"}>
                  <CustomLabel label="Email" isRequired />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <CustomInput
                        placeholder={"Enter  Email"}
                        hasError={!!errors.email}
                        errorMessage={errors.email?.message}
                        onChange={(event) => {
                          setValue("email", event.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                        value={field.value?.trim() || ""}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid container alignItems={"flex-end"} width={"32%"}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        name="resedentialAddress"
                      />
                    }
                    label="This is Residential Address"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Package and Shipment Details */}
            <Grid container rowGap={2} flexDirection={"column"}>
              <Typography variant="bodySmall" fontWeight={500}>
                Package and Shipment Details
              </Typography>
              <Grid container justifyContent={"space-between"}>
                <Grid width={"32%"}>
                  <CustomLabel label="Ship Date" isRequired />
                  <Controller
                    control={control}
                    name={`shipDate`}
                    render={({ field }) => (
                      <DatePicker
                        bgWhite={false}
                        onDateChange={function (selectedDate: string): void {
                          setValue(`shipDate`, selectedDate, {
                            shouldValidate: true,
                          });
                        }}
                        hasError={!!errors.shipDate}
                        errorMessage={
                          (errors.shipDate?.message || "") as string
                        }
                        value={field.value}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"21%"}>
                  <CustomLabel label="Weight" isRequired />
                  <Controller
                    control={control}
                    name="weight"
                    render={({ field }) => (
                      <CustomInputWithPrefix
                        onChange={(e) => setValue("weight", e.target.value)}
                        prefix={`lbs`}
                        value={field.value.trim() || ""}
                        placeholder={"Enter"}
                        hasError={!!errors.weight}
                        errorMessage={errors.weight?.message as string}
                        name={field.name}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"21%"}>
                  <CustomLabel label="Declared Value" isRequired />
                  <Controller
                    control={control}
                    name="declaredValue"
                    render={({ field }) => (
                      <CustomInputWithPrefix
                        onChange={(e) =>
                          setValue("declaredValue", e.target.value)
                        }
                        prefix={`$US`}
                        value={field.value.trim() || ""}
                        placeholder={"Enter"}
                        hasError={!!errors.declaredValue}
                        errorMessage={errors.declaredValue?.message as string}
                        name={field.name}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"21%"}>
                  <CustomLabel label="FedEX Rate" isRequired />
                  <Controller
                    control={control}
                    name="fedExRate"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Rate"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("fedExRate", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        hasError={!!errors.fedExRate}
                        errorMessage={errors.fedExRate?.message}
                        name={field.name}
                        value={field.value?.trim() || ""}
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"}>
                <Grid width={"32%"}></Grid>
                <Grid width={"32%"}></Grid>
                <Grid width={"32%"}></Grid>
              </Grid>
            </Grid>
            {/* Billing Details */}
            <Grid container rowGap={2} flexDirection={"column"}>
              <Typography variant="bodySmall" fontWeight={500}>
                Billing Details
              </Typography>
              <Grid container width={"100%"} justifyContent={"space-between"}>
                <Grid width={"32%"}>
                  <CustomLabel label="Bill Transportation To" isRequired />
                  <Controller
                    control={control}
                    name="billTranspotationTo"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Bill To"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("billTranspotationTo", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        hasError={!!errors.billTranspotationTo}
                        errorMessage={errors.billTranspotationTo?.message}
                        name={field.name}
                        value={field.value?.trim() || ""}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid width={"32%"}>
                  <CustomLabel label="Your Reference Type" />
                  <Controller
                    control={control}
                    name="yourReferenceType"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Reference Type"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("yourReferenceType", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                        value={field.value?.trim() || ""}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid width={"32%"}>
                  <CustomLabel label="Reference Value" isRequired />
                  <Controller
                    control={control}
                    name="referenceValue"
                    render={({ field }) => (
                      <CustomInput
                        placeholder={"Enter Reference Value"}
                        onChange={(event) => {
                          setValue("referenceValue", event.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                        value={field.value?.trim() || ""}
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Main Grid 2 */}
        <Grid
          container
          flex={1}
          alignContent={"flex-end"}
          width={"100%"}
          position={"sticky"}
          bottom={0}
          zIndex={1}
          border={1}
        >
          <Grid textAlign={"end"} width={"100%"} p={2} bgcolor={"white"}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {}}
              sx={{ mr: 1 }}
            >
              Create Label
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default ShippingLabel;
