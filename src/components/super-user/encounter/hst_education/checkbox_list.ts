import { Status } from "@/constants/status";

export const HstEducationAppointmentStatus = [
  { key: Status.ALL, checked: false },
  { key: Status.SCHEDULED, checked: false },
  { key: Status.CHECKED_IN, checked: false },
  { key: Status.IN_SESSION, checked: false },
  { key: Status.SEEN, checked: false },
  { key: Status.SIGN_OFF, checked: false },
  { key: Status.RESCHEDULE, checked: false },
  { key: Status.NO_SHOW, checked: false },
  { key: Status.PENALTIES, checked: false },
  { key: Status.CANCEL, checked: false },
];
