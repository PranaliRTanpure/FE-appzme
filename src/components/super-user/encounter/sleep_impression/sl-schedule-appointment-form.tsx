import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { ScheduleAppointmentSchema } from "./sl-schema";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import CustomLabel from "@/common-components/custom-label/custom-label";
import DrawerBody from "@/components/ui/DrawerBody";
import { Box, Grid } from "@mui/system";
import CustomSelect from "@/common-components/custom-select/customSelect";
import { theme } from "@/utils/theme";
import { timeSlotsSl } from "./checkbox_list";
import PatientDetails from "./patient-details-sl";
import DatePicker from "@/common-components/date-picker-field/date-picker-field";
import CustomAutocompleteMultiselect from "@/common-components/custom-autocomplete-multiselect/custom-auto-multiselect";

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

interface ScheduleAppointmentProps {
  onClose: () => void;
}

const SlScheduleAppointmentForm = (props: ScheduleAppointmentProps) => {
  const footerRef = useRef<HTMLDivElement>();
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
    { value: "eval/screening", label: "Eval/Screening" },
    { value: "consult/records", label: "Consult/Records" },
    { value: "OAT Delivery", label: "OAT Delivery" },
    { value: "Follow-Up (reg or ann.)", label: "Follow-Up (reg or ann.)" },
    {
      value: "Other (Phone Call)/records",
      label: "Other (Phone Call)/Records",
    },
  ];

  const initialValues = {
    patient: "",
    appointmentType: "",
    dateTime: "",
    clinic: "",
    dentalProvider: "",
    guestProviders: [""],
    searchForms: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(ScheduleAppointmentSchema),
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
    <DrawerBody padding={3} offset={footerRef?.current?.offsetHeight}>
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
          <Grid container width={"100%"} flexDirection={"column"} rowGap={2}>
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
                        setAppointmentTypeSelected(
                          Boolean(selectedValue.trim()),
                        );
                      }}
                      name={field.name}
                      value={field.value?.trim() || ""}
                    />
                  )}
                ></Controller>
              </Grid>
              {appointmentTypeSelected && (
                <Grid width={"49%"}>
                  <CustomLabel label="Clinic" />
                  <Controller
                    control={control}
                    name="clinic"
                    render={({ field }) => (
                      <CustomSelect
                        placeholder={"Select Clinic"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("clinic", e.target.value, {
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
              <Grid
                container
                width={"100%"}
                flexDirection={"column"}
                rowGap={1}
              >
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
                          disablePast
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
                      {timeSlotsSl.map((slot) => (
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
                <Grid container width={"100%"} pt={1}>
                  <Grid width={"49%"}>
                    <CustomLabel label="Send Forms" />
                    <Controller
                      control={control}
                      name="patient"
                      render={({ field }) => (
                        <CustomAutoComplete
                          placeholder={" Search and Select Forms"}
                          hasStartSearchIcon={true}
                          hideArrow
                          value={field.value || ""}
                          options={[
                            { key: "315645", value: "John Doe" },
                            { key: "789123", value: "Jane Smith" },
                          ]}
                          onChange={(selectedValue: string | "") => {
                            field.onChange(selectedValue);
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          {/* Button Grid */}
          <Box
            ref={footerRef}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: "20px 24px",
            }}
          >
            <Grid container p={0} justifyContent={"flex-end"} columnGap={1}>
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
          </Box>
        </Grid>
      </form>
    </DrawerBody>
  );
};
export default SlScheduleAppointmentForm;
