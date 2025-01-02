import { Status } from "@/constants/status";

export const MillenniumAppointmentStatus = [
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

export const EncounterType = [
  { key: Status.INITIAL_TELEHEALTH, checked: false, borderColor: "#105FCE" },
  { key: Status.FOLLOW_UP_TELEHEALTH, checked: false, borderColor: "#B50ED2" },
  { key: Status.HST, checked: false, borderColor: "#4C3EEA" },
  { key: Status.FOLLOW_UP_DME, checked: false, borderColor: "#17B6A9" },
];
