export type StringMap = {
  [key: string]: string;
};

export type StringMap2 = {
  [key: string]: string | boolean | number;
};

export const Roles = {
  PROVIDER_GROUP_ADMIN: "PROVIDER_GROUP_ADMIN",
  FRONTDESK: "FRONTDESK",
  BILLER: "BILLER",
  ENB: "ENB",
  PSYCHIATRIST: "PSYCHIATRIST",
  THERAPIST: "THERAPIST",
  NURSE: "NURSE",
  PATIENT: "PATIENT",
  ANONYMOUS: "ANONYMOUS",
  PROVIDER: "PROVIDER",
  SITE_ADMIN: "SITE_ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
};

export const RolesPortalMap: StringMap = {
  FRONTDESK: "provider",
  BILLER: "provider",
  ENB: "provider",
  PSYCHIATRIST: "provider",
  THERAPIST: "provider",
  NURSE: "provider",
  PATIENT: "patient",
  PROVIDER_GROUP_ADMIN: "provider",
};

export const RoleType = {
  STAFF: "STAFF",
  PROVIDER: "PROVIDER",
  PATIENT: "PATIENT",
};

export const RolesOfUsers = [
  { key: Roles.FRONTDESK, value: "Front desk" },
  { key: Roles.BILLER, value: "Biller" },
  { key: Roles.ENB, value: Roles.ENB },
];

export const Gender = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export const RolesOfAdminUsers = [
  { value: Roles.FRONTDESK, label: "Front desk" },
  { value: Roles.BILLER, label: "Biller" },
  { value: Roles.SUPER_ADMIN, label: "Super Admin" },
];

export const RolesOfPGUsers = [
  { value: Roles.PROVIDER_GROUP_ADMIN, label: "Provider Group Admin" },
  { value: Roles.SITE_ADMIN, label: "Site Admin" },
  { value: Roles.BILLER, label: "Biller" },
  { value: Roles.FRONTDESK, label: "Front desk" },
];

export const PrimaryLanguages = [
  { value: "ENGLISH", label: "English" },
  { value: "SPANISH", label: "Spanish" },
];
