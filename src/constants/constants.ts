export const PATIENT_LOWER = "patient";
export const PROVIDER_LOWER = "provider";

export type StringMap = {
  [key: string]: string;
};

export const RolesPortalMap: StringMap = {
  PROVIDER: "provider",
  SUPER_ADMIN: "provider",
  FRONTDESK: "provider",
  NURSE: "provider",
  BILLER: "provider",
  SITE_ADMIN: "provider",
  PROVIDER_GROUP_ADMIN: "provider",
};
