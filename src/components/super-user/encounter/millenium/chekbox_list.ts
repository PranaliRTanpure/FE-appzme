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

export const timeSlots = [
  { key: 1, value: "09:00 AM", isActive: true },
  { key: 2, value: "10:00 AM", isActive: false },
  { key: 3, value: "11:00 AM", isActive: true },
  { key: 4, value: "12:00 PM", isActive: false },
  { key: 5, value: "01:00 PM", isActive: true },
  { key: 6, value: "02:00 PM", isActive: false },
  { key: 7, value: "03:00 PM", isActive: true },
  { key: 8, value: "04:00 PM", isActive: false },
];
