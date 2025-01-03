import CustomInput from "@/common-components/custom-input/custom-input";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomSelect from "@/common-components/custom-select/customSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, SelectChangeEvent } from "@mui/material";
import { Grid } from "@mui/system";
import { Controller, FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { theme } from "@/utils/theme";
import DatePicker from "@/common-components/date-picker-field/date-picker-field";

export const ScheduleAppointmentFormSchema = yup.object().shape({
  patient: yup.string().required("Patient Name is required"),
  educator: yup.string(),
  dateTime: yup.string(),
});

interface ScheduleAppointmentFormProps {
  onClose: () => void;
}

const ScheduleAppointment = (props: ScheduleAppointmentFormProps) => {
  const initialValues = {
    patient: "",
    educator: "",
    dateTime: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(ScheduleAppointmentFormSchema),
  });

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
              <CustomLabel label="Educator" />
              <Controller
                control={control}
                name="educator"
                render={({ field }) => (
                  <CustomSelect
                    placeholder={"Select Educator"}
                    enableDeselect
                    items={[{ value: "active", label: "Active" }]}
                    onChange={function (e: SelectChangeEvent<string>): void {
                      setValue("educator", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    name={field.name}
                    value={field.value?.trim() || ""}
                  />
                )}
              ></Controller>
            </Grid>
            <Grid width={"49%"}>
              <CustomLabel label="Date & Time" />
              <Controller
                control={control}
                name={`dateTime`}
                render={({ field }) => (
                  <DatePicker
                    bgWhite={false}
                    {...field}
                    disableFuture
                    value={field.value}
                    onDateChange={function (selectedDate: string): void {
                      setValue(`dateTime`, selectedDate, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Button Grid */}
        <Grid borderTop={"1px solid #DEE4ED"}>
          <Grid container p={2} justifyContent={"flex-end"} columnGap={1}>
            <Grid>
              <Button
                variant="outlined"
                onClick={props.onClose}
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
export default ScheduleAppointment;
