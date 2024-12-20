import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { Controller, FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Status from "../../../../common-components/status/status";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import CustomInput from "../../../../common-components/custom-input/custom-input";

export const scheduleNewDeviceFormSchema = yup.object().shape({
  appointmentType: yup.string(),
  devicePool: yup.string(),
  selectDevice: yup.string(),
  preferredDevice: yup.string(),
  beltNumber: yup.string(),
  deviceOut: yup.string(),
  studyFirstNight: yup.string(),
  returnDevice: yup.string(),
  receive: yup.string(),
});

interface ScheduleNewDeviceFormProps {
  onClose: () => void;
}

const ScheduleNewDeviceForm = (props: ScheduleNewDeviceFormProps) => {
  const initialValues = {
    appointmentType: "",
    devicePool: "",
    selectDevice: "",
    preferredDevice: "",
    beltNumber: "",
    deviceOut: "",
    studyFirstNight: "",
    returnDevice: "",
    receive: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(scheduleNewDeviceFormSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
  };

  return (
    <Grid container width={"100%"}>
      <form
        style={{ width: "100%", height: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Main Grid */}
        <Grid
          container
          flexDirection={"column"}
          alignContent={"center"}
          pt={5}
          rowGap={2.5}
          m={2}
        >
          {/* Header Grid */}
          <Grid container justifyContent={"flex-start"} width={"1440px"}>
            <Grid container columnGap={1.5} alignItems={"center"}>
              <IconButton onClick={props.onClose}>
                <ArrowBackIcon />
              </IconButton>
              <Typography fontWeight={700} variant="bodyLarge" color="#21262B">
                Schedule New Device
              </Typography>
              <Status bgColor="#E0EDFF" status={"NEW_ORDER"} width="100px" />
            </Grid>
          </Grid>
          {/* Form Grid */}
          <Grid
            container
            width={"1440px"}
            bgcolor={"white"}
            flexDirection={"column"}
            borderRadius={3.5}
            rowGap={2}
            p={2}
          >
            <Typography variant="bodyMedium">Appointment Details</Typography>
            <Grid container columnGap={2} width={"100%"}>
              <Grid width={"30%"}>
                <CustomLabel label="Appointment Type" />
                <Controller
                  control={control}
                  name="appointmentType"
                  render={({ field }) => (
                    <CustomSelect
                      placeholder={"Select Appointment Type"}
                      enableDeselect
                      items={[{ value: "active", label: "Active" }]}
                      onChange={function (e: SelectChangeEvent<string>): void {
                        setValue("appointmentType", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                      name={field.name}
                      value={field.value?.trim() || ""}
                    />
                  )}
                ></Controller>
              </Grid>
              <Grid width={"30%"}>
                <CustomLabel label="Device Pool" />
                <Controller
                  control={control}
                  name="devicePool"
                  render={({ field }) => (
                    <CustomSelect
                      placeholder={"Select Device Pool"}
                      enableDeselect
                      items={[{ value: "active", label: "Active" }]}
                      onChange={function (e: SelectChangeEvent<string>): void {
                        setValue("devicePool", e.target.value, {
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

            <Grid
              container
              width={"100%"}
              bgcolor={"#F2F4FA"}
              borderRadius={3.5}
            >
              <Grid
                container
                columnGap={1}
                p={2}
                alignItems={"center"}
                borderBottom={"1px solid #D1DAF5"}
                width={"100%"}
              >
                <Typography variant="bodyMedium" fontWeight={"900px"}>
                  Device Details
                </Typography>
                <Typography
                  variant="bodySmall"
                  fontSize={"12px"}
                  color="#595F63"
                >
                  (Referrer Prefers - AliceknightOne)
                </Typography>
              </Grid>
              <Grid
                container
                p={2}
                width={"100%"}
                columnGap={2}
                justifyContent={"space-between"}
              >
                <Grid width={"32%"}>
                  <CustomLabel label="Select Device" />
                  <Controller
                    control={control}
                    name="selectDevice"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Device"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("selectDevice", e.target.value, {
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
                  <CustomLabel label="Preferred Device" />
                  <Controller
                    control={control}
                    name="preferredDevice"
                    render={({ field }) => (
                      <CustomSelect
                        isDisabled={true}
                        placeholder={"AliceknightOne"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("preferredDevice", e.target.value, {
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
                  <CustomLabel label="Belt Number" />
                  <Controller
                    control={control}
                    name="beltNumber"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Belt Number"}
                        name={field.name}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
export default ScheduleNewDeviceForm;
