import CustomInput from "@/common-components/custom-input/custom-input";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomSelect from "@/common-components/custom-select/customSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  Divider,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { theme } from "@/utils/theme";
import { MilleniumScheduleAppointmentSchema } from "./millenium-schema";
import { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AdUnitsOutlinedIcon from "@mui/icons-material/AdUnitsOutlined";

interface MilleniumScheduleAppointmentProps {
  onClose: () => void;
}

const MilleniumScheduleAppointment = (
  props: MilleniumScheduleAppointmentProps,
) => {
  const [selectedAppointmentType, setSelectedAppointmentType] =
    useState<string>("");

  const appointmentTypes = [
    { value: "initial telehealth", label: "Initial Telehealth" },
    { value: "hst", label: "HST" },
    { value: "follow up telehealth", label: "Follow Up Telehealth" },
    { value: "DME Follow Up Telehealth", label: "DME Follow Up Telehealth" },
  ];

  const initialValues = {
    patient: "",
    appointmentType: "",
    dateTime: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(MilleniumScheduleAppointmentSchema),
  });

  const handleAppointmentTypeChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedAppointmentType(value);
    setValue("appointmentType", value, { shouldValidate: true });
  };

  const handleCancelSelectedForm = () => {
    setSelectedAppointmentType("");
  };

  const onSubmit = (data: FieldValues) => {
    data;
  };
  return (
    <form
      style={{ width: "100%", height: "100%", display: "flex" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        width={"100%"}
        flexDirection={"column"}
        rowGap={2}
        border={0}
      >
        {/* Form Grid */}
        {!selectedAppointmentType ? (
          <Grid container flexDirection={"column"} rowGap={2} pl={2} pr={2}>
            <Grid>
              <CustomLabel label="Patient" isRequired />
              <Controller
                control={control}
                name="patient"
                render={({ field }) => (
                  <CustomInput
                    placeholder={" Select Patient"}
                    hasStartSearchIcon={true}
                    hasError={!!errors.patient}
                    errorMessage={errors.patient?.message}
                    onChange={(event) => {
                      setValue("patient", event.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    name={field.name}
                    value={field.value?.trim() || ""}
                  />
                )}
              ></Controller>
            </Grid>
            <Grid container columnGap={1}>
              <Grid width={"49%"}>
                <CustomLabel label="Appointment Type" />
                <Controller
                  control={control}
                  name="appointmentType"
                  render={({ field }) => (
                    <CustomSelect
                      placeholder={"Select Appointment Type"}
                      enableDeselect
                      items={appointmentTypes}
                      onChange={handleAppointmentTypeChange}
                      name={field.name}
                      value={field.value?.trim() || ""}
                    />
                  )}
                ></Controller>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid flexDirection={"column"} rowGap={2} pl={2} pr={2}>
            <Grid
              container
              bgcolor={"#F4F4F4"}
              borderRadius={3}
              p={2}
              justifyContent={"space-between"}
            >
              <Avatar
                variant="circular"
                sx={{ width: "48px", height: "48px" }}
              />
              <Grid container flexDirection={"column"} rowGap={1.2} border={0}>
                <Grid container columnGap={0.8}>
                  <Typography
                    variant="bodySmall"
                    sx={{ "& span": { color: "#74797B" } }}
                  >
                    Alberta Flores <span>(9017)</span>
                  </Typography>
                  <Divider orientation="vertical" sx={{ width: "3px" }} />
                  <Typography variant="bodySmall">14 July 1998</Typography>
                  <Divider orientation="vertical" sx={{ width: "3px" }} />
                  <Typography variant="bodySmall">26 yrs</Typography>
                  <Divider orientation="vertical" sx={{ width: "3px" }} />
                  <Typography variant="bodySmall">Female</Typography>
                </Grid>
                <Grid container columnGap={0.8}>
                  <Grid container columnGap={0.5}>
                    <EmailOutlinedIcon
                      sx={{ fontSize: "18px", color: "#595F63" }}
                    />
                    <Typography variant="bodySmall" color="#74797B">
                      (569)-888-2244
                    </Typography>
                  </Grid>
                  <Grid container columnGap={0.5}>
                    <AdUnitsOutlinedIcon
                      sx={{ fontSize: "18px", color: "#595F63" }}
                    />
                    <Typography variant="bodySmall" color="#74797B">
                      tim.jennings@example.com
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Typography
                color="#106DCC"
                alignContent="center"
                variant="bodySmall"
              >
                Change Patient
              </Typography>
            </Grid>
          </Grid>
        )}
        {/* Button Grid */}
        <Grid borderTop={"1px solid #DEE4ED"}>
          <Grid container p={2} justifyContent={"flex-end"} columnGap={1}>
            <Grid>
              <Button
                variant="outlined"
                onClick={
                  !selectedAppointmentType
                    ? props.onClose
                    : handleCancelSelectedForm
                }
                sx={{ mr: 1, borderColor: "#C9CBCC", color: "black" }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button
                sx={{
                  p: "0px 10px",
                  bgcolor: theme.palette.secondary.main,
                  borderRadius: "12px",
                  color: theme.palette.common.white,
                }}
                type="submit"
                onClick={() => {}}
              >
                Create Appointment
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default MilleniumScheduleAppointment;
