import * as yup from "yup";

export const MilleniumScheduleAppointmentSchema = yup.object().shape({
  patient: yup.string().required("Patient Name is required"),
  appointmentType: yup.string(),
  dateTime: yup.string(),
  millenniumProvider: yup.string(),
  dentalProvider: yup.string(),
  sleepAdvisor: yup.string(),
  regionalManager: yup.string(),
  guestProviders: yup.array().of(yup.string()),
});
