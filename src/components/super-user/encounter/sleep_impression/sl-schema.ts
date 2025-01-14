import * as yup from "yup";

export const ScheduleAppointmentSchema = yup.object().shape({
  patient: yup.string().required("Patient Name is required"),
  appointmentType: yup.string(),
  dateTime: yup.string(),
  clinic: yup.string(),
  dentalProvider: yup.string(),
  guestProviders: yup.array().of(yup.string()),
  searchForms: yup.string(),
});
