import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomSelect from "@/common-components/custom-select/customSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { theme } from "@/utils/theme";
import { MilleniumScheduleAppointmentSchema } from "./millenium-schema";
import { useEffect, useState } from "react";
import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import PatientDetails from "./patient-details";
import DatePicker from "@/common-components/date-picker-field/date-picker-field";
import CustomAutocompleteMultiselect from "@/common-components/custom-autocomplete-multiselect/custom-auto-multiselect";
import { timeSlots } from "./chekbox_list";

const data = [
  {
    id: "1001",
    name: "John Doe",
    content: "This is some sample content.",
    date: "2025-01-01",
    gender: "Male",
    mobileno: "1234567890",
    email: "john.doe@example.com",
  },
  {
    id: "1002",
    name: "Jane Smith",
    content: "This is another sample content.",
    date: "2025-01-02",
    gender: "Female",
    mobileno: "9876543210",
    email: "jane.smith@example.com",
  },
  {
    id: "1003",
    name: "Sam Wilson",
    content: "A quick brown fox jumps over the lazy dog.",
    date: "2025-01-03",
    gender: "Male",
    mobileno: "4567891230",
    email: "sam.wilson@example.com",
  },
  {
    id: "1004",
    name: "Lisa Brown",
    content: "Sample content for testing.",
    date: "2025-01-04",
    gender: "Female",
    mobileno: "7891234560",
    email: "lisa.brown@example.com",
  },
  {
    id: "1005",
    name: "Tom Harris",
    content: "Lorem ipsum dolor sit amet.",
    date: "2025-01-05",
    gender: "Male",
    mobileno: "3216549870",
    email: "tom.harris@example.com",
  },
];

interface MilleniumScheduleAppointmentProps {
  onClose: () => void;
}

const MilleniumScheduleAppointment = (
  props: MilleniumScheduleAppointmentProps,
) => {
  const [patientValue, setPatientValue] = useState<string | null>("");
  const [patientOptions, setPatientOptions] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);
  const [appointmentTypeSelected, setAppointmentTypeSelected] = useState(false);
  // const [selectedPatientDetails, setSelectedPatientDetails] = useState<any | null>(null);

  useEffect(() => {
    const updatedOptions = data.map((item) => ({
      key: item.id,
      value: item.name,
    }));

    setPatientOptions(updatedOptions);
  }, []);

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
    millenniumProvider: "",
    dentalProvider: "",
    sleepAdvisor: "",
    regionalManager: "",
    guestProviders: [""],
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(MilleniumScheduleAppointmentSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
    props.onClose();
  };

  const handleClose = () => {
    if (patientValue) {
      setPatientValue(null);
      reset();
    } else {
      props.onClose();
    }
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
        <Grid
          container
          width={"100%"}
          flexDirection={"column"}
          rowGap={2}
          pl={2}
          pr={2}
        >
          {!patientValue && (
            <Grid>
              <CustomLabel label="Patient" isRequired />
              <Controller
                control={control}
                name="patient"
                render={({ field }) => (
                  <CustomAutoComplete
                    placeholder={" Select Patient"}
                    hasStartSearchIcon={true}
                    hasError={!!errors.patient}
                    errorMessage={errors.patient?.message}
                    // onChange={(value: string | "") => {
                    //   field.onChange(value);
                    //   setPatientValue(value);
                    // }}
                    onChange={(value: string | "") => {
                      field.onChange(value);
                      setPatientValue(value);
                      // const patient = data.find((item) => item.name === value);
                      // setSelectedPatientDetails(patient || null);
                    }}
                    value={patientValue || ""}
                    options={patientOptions}
                  />
                )}
              />
            </Grid>
          )}
          {patientValue && (
            <PatientDetails
              handleClose={handleClose}
              // patientDetails={selectedPatientDetails}
            />
          )}
          <Grid container width={"100%"} columnGap={1}>
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
                    onChange={(e: SelectChangeEvent<string>): void => {
                      const selectedValue = e.target.value;
                      setValue("appointmentType", selectedValue, {
                        shouldValidate: true,
                      });
                      setAppointmentTypeSelected(Boolean(selectedValue.trim()));
                    }}
                    name={field.name}
                    value={field.value?.trim() || ""}
                  />
                )}
              ></Controller>
            </Grid>
            {appointmentTypeSelected && (
              <Grid width={"49%"}>
                <CustomLabel label="Millennium Provider" />
                <Controller
                  control={control}
                  name="millenniumProvider"
                  render={({ field }) => (
                    <CustomSelect
                      placeholder={"Select Millennium Provider"}
                      enableDeselect
                      items={[{ value: "active", label: "Active" }]}
                      onChange={function (e: SelectChangeEvent<string>): void {
                        setValue("millenniumProvider", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                      name={field.name}
                      value={field.value?.trim() || ""}
                    />
                  )}
                ></Controller>
              </Grid>
            )}
          </Grid>
          {appointmentTypeSelected && (
            <Grid container width={"100%"} flexDirection={"column"}>
              <Grid container width={"100%"} columnGap={1}>
                <Grid width={"49%"}>
                  <CustomLabel label="Dental Provider" />
                  <Controller
                    control={control}
                    name="dentalProvider"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Dental Provider"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("dentalProvider", e.target.value, {
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
                  <CustomLabel label="Sleep Advisior" />
                  <Controller
                    control={control}
                    name="sleepAdvisor"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Sleep Advisior"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("sleepAdvisor", e.target.value, {
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
              <Grid container width={"100%"} pt={1}>
                <Grid width={"49%"}>
                  <CustomLabel label="Regional Manager" />
                  <Controller
                    control={control}
                    name="regionalManager"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Regional Manager"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("regionalManager", e.target.value, {
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
              <Grid container width={"100%"} pt={1}>
                <Grid width={"100%"}>
                  <CustomLabel label="Search by Provider" />
                  <Controller
                    control={control}
                    name="guestProviders"
                    render={({ field }) => (
                      <CustomAutocompleteMultiselect
                        placeholder="Search and select"
                        onChange={(value: string[] | []) => {
                          field.onChange(value);
                        }}
                        options={[
                          { key: "315645", value: "John Doe" },
                          { key: "789123", value: "Jane Smith" },
                        ]}
                        value={field.value as string[]}
                        limitTags={1}
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>
              <Grid container width={"100%"} pt={1}>
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
              <Grid container width={"100%"} pt={1}>
                <CustomLabel label="Select Available Time Slots" />
                <Grid
                  width={"100%"}
                  border={"1px solid #C9CBCC"}
                  borderRadius={5}
                  p={2}
                >
                  <Grid container spacing={1}>
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.key}
                        sx={{
                          p: "0px 10px",
                          bgcolor: slot.isActive ? "#F1F8FF" : "white",
                          borderRadius: "12px",
                          border: slot.isActive
                            ? "1px solid #106DCC"
                            : "1px solid #9B9D9F",
                        }}
                        type="button"
                        onClick={() => {}}
                      >
                        <Typography
                          variant="bodySmall"
                          sx={{ color: slot.isActive ? "#106DCC" : "black" }}
                        >
                          {slot.value}
                        </Typography>
                      </Button>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        {/* Button Grid */}
        <Grid borderTop={"1px solid #DEE4ED"}>
          <Grid container p={2} justifyContent={"flex-end"} columnGap={1}>
            <Grid>
              <Button
                variant="outlined"
                onClick={handleClose}
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
