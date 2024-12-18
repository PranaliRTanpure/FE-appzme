/* eslint-disable no-unused-vars */
export enum AppointmentStatusEnum {
  BLOCKED_DATE = "Blocked Date",
  CONFLICTED = "Conflicted",
  MULTIPLE_EVENTS = "Multiple Events",
  DEVICE_OUT_PLANNED = "Device Out (Planned)",
  DEVICE_OUT_COMPLETED = "Device Out (Completed)",
  STUDY_FIRST_NIGHT_COMPLETED = "Study First Night (Completed)",
  RETURN_DEVICE_PLANNED = "Return Device (Planned)",
  RETURN_DEVICE_COMPLETED = "Return Device (Completed)",
  RECEIVE_DEVICE_PLANNED = "Receive Device (Planned)",
  RECEIVE_DEVICE_COMPLETED = "Receive Device (Completed)",
}

export const StatusBgColorMapping: Record<AppointmentStatusEnum, string> = {
  [AppointmentStatusEnum.BLOCKED_DATE]: "#DBDBDB",
  [AppointmentStatusEnum.CONFLICTED]: "#B50025",
  [AppointmentStatusEnum.MULTIPLE_EVENTS]: "#00C1DE",
  [AppointmentStatusEnum.DEVICE_OUT_PLANNED]: "#FFC208",
  [AppointmentStatusEnum.DEVICE_OUT_COMPLETED]: "#3C6FD6",
  [AppointmentStatusEnum.STUDY_FIRST_NIGHT_COMPLETED]: "#C0D3F9",
  [AppointmentStatusEnum.RETURN_DEVICE_PLANNED]: "#7C20AD",
  [AppointmentStatusEnum.RETURN_DEVICE_COMPLETED]: "#F5E2FF",
  [AppointmentStatusEnum.RECEIVE_DEVICE_PLANNED]: "#11BB66",
  [AppointmentStatusEnum.RECEIVE_DEVICE_COMPLETED]: "#C7FFE3",
};
