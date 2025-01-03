import * as yup from "yup";

export const MilleniumScheduleAppointmentSchema = yup.object().shape({
  patient: yup.string().required("Patient Name is required"),
  appointmentType: yup.string(),
  dateTime: yup.string(),
});
