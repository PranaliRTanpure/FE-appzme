// generated with @7nohe/openapi-react-query-codegen@1.4.1

import { UseQueryResult } from "@tanstack/react-query";
import {
  AvailabilityControllerService,
  ConsentFormControllerService,
  EhrControllerService,
  LicenseStateControllerService,
  LocationControllerService,
  MedicalCodeControllerService,
  PatientAllergyControllerService,
  PatientControllerService,
  PatientMedicationControllerService,
  PatientVitalControllerService,
  ProviderControllerService,
  ProviderGroupControllerService,
  RolesAndPrivilegesControllerService,
  UserControllerService,
  VitalControllerService,
} from "../requests/services.gen";
export type UserControllerServiceGetAllUsersDefaultResponse = Awaited<
  ReturnType<typeof UserControllerService.getAllUsers>
>;
export type UserControllerServiceGetAllUsersQueryResult<
  TData = UserControllerServiceGetAllUsersDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUserControllerServiceGetAllUsersKey =
  "UserControllerServiceGetAllUsers";
export const UseUserControllerServiceGetAllUsersKeyFn = (
  {
    archive,
    locationId,
    page,
    role,
    roleType,
    searchString,
    size,
    sortBy,
    sortDirection,
    status,
    xTenantId,
  }: {
    archive?: boolean;
    locationId?: string;
    page?: number;
    role?: string;
    roleType?: "PROVIDER" | "STAFF" | "PATIENT";
    searchString?: string;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    status?: boolean;
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useUserControllerServiceGetAllUsersKey,
  ...(queryKey ?? [
    {
      archive,
      locationId,
      page,
      role,
      roleType,
      searchString,
      size,
      sortBy,
      sortDirection,
      status,
      xTenantId,
    },
  ]),
];
export type UserControllerServiceGetUserDefaultResponse = Awaited<
  ReturnType<typeof UserControllerService.getUser>
>;
export type UserControllerServiceGetUserQueryResult<
  TData = UserControllerServiceGetUserDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUserControllerServiceGetUserKey =
  "UserControllerServiceGetUser";
export const UseUserControllerServiceGetUserKeyFn = (
  {
    userId,
    xTenantId,
  }: {
    userId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useUserControllerServiceGetUserKey,
  ...(queryKey ?? [{ userId, xTenantId }]),
];
export type UserControllerServiceGetProfile1DefaultResponse = Awaited<
  ReturnType<typeof UserControllerService.getProfile1>
>;
export type UserControllerServiceGetProfile1QueryResult<
  TData = UserControllerServiceGetProfile1DefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUserControllerServiceGetProfile1Key =
  "UserControllerServiceGetProfile1";
export const UseUserControllerServiceGetProfile1KeyFn = (
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [useUserControllerServiceGetProfile1Key, ...(queryKey ?? [{ xTenantId }])];
export type RolesAndPrivilegesControllerServiceGetAllRolesDefaultResponse =
  Awaited<ReturnType<typeof RolesAndPrivilegesControllerService.getAllRoles>>;
export type RolesAndPrivilegesControllerServiceGetAllRolesQueryResult<
  TData = RolesAndPrivilegesControllerServiceGetAllRolesDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useRolesAndPrivilegesControllerServiceGetAllRolesKey =
  "RolesAndPrivilegesControllerServiceGetAllRoles";
export const UseRolesAndPrivilegesControllerServiceGetAllRolesKeyFn = (
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useRolesAndPrivilegesControllerServiceGetAllRolesKey,
  ...(queryKey ?? [{ xTenantId }]),
];
export type RolesAndPrivilegesControllerServiceGetAllPrivilegesDefaultResponse =
  Awaited<
    ReturnType<typeof RolesAndPrivilegesControllerService.getAllPrivileges>
  >;
export type RolesAndPrivilegesControllerServiceGetAllPrivilegesQueryResult<
  TData = RolesAndPrivilegesControllerServiceGetAllPrivilegesDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useRolesAndPrivilegesControllerServiceGetAllPrivilegesKey =
  "RolesAndPrivilegesControllerServiceGetAllPrivileges";
export const UseRolesAndPrivilegesControllerServiceGetAllPrivilegesKeyFn = (
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useRolesAndPrivilegesControllerServiceGetAllPrivilegesKey,
  ...(queryKey ?? [{ xTenantId }]),
];
export type ProviderControllerServiceGetAllProvidersDefaultResponse = Awaited<
  ReturnType<typeof ProviderControllerService.getAllProviders>
>;
export type ProviderControllerServiceGetAllProvidersQueryResult<
  TData = ProviderControllerServiceGetAllProvidersDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useProviderControllerServiceGetAllProvidersKey =
  "ProviderControllerServiceGetAllProviders";
export const UseProviderControllerServiceGetAllProvidersKeyFn = (
  {
    archive,
    page,
    role,
    searchString,
    size,
    sortBy,
    sortDirection,
    state,
    status,
    xTenantId,
  }: {
    archive?: boolean;
    page?: number;
    role?:
      | "PROVIDER"
      | "PATIENT"
      | "SUPER_ADMIN"
      | "FRONTDESK"
      | "BILLER"
      | "NURSE"
      | "ANONYMOUS"
      | "PROVIDER_GROUP_ADMIN"
      | "ADMIN"
      | "SITE_ADMIN";
    searchString?: string;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    state?: string;
    status?: boolean;
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useProviderControllerServiceGetAllProvidersKey,
  ...(queryKey ?? [
    {
      archive,
      page,
      role,
      searchString,
      size,
      sortBy,
      sortDirection,
      state,
      status,
      xTenantId,
    },
  ]),
];
export type ProviderControllerServiceGetProviderByIdDefaultResponse = Awaited<
  ReturnType<typeof ProviderControllerService.getProviderById>
>;
export type ProviderControllerServiceGetProviderByIdQueryResult<
  TData = ProviderControllerServiceGetProviderByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useProviderControllerServiceGetProviderByIdKey =
  "ProviderControllerServiceGetProviderById";
export const UseProviderControllerServiceGetProviderByIdKeyFn = (
  {
    providerUuid,
    xTenantId,
  }: {
    providerUuid: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useProviderControllerServiceGetProviderByIdKey,
  ...(queryKey ?? [{ providerUuid, xTenantId }]),
];
export type ProviderControllerServiceGetProfileDefaultResponse = Awaited<
  ReturnType<typeof ProviderControllerService.getProfile>
>;
export type ProviderControllerServiceGetProfileQueryResult<
  TData = ProviderControllerServiceGetProfileDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useProviderControllerServiceGetProfileKey =
  "ProviderControllerServiceGetProfile";
export const UseProviderControllerServiceGetProfileKeyFn = (
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useProviderControllerServiceGetProfileKey,
  ...(queryKey ?? [{ xTenantId }]),
];
export type ProviderGroupControllerServiceGetAllProviderGroupsDefaultResponse =
  Awaited<
    ReturnType<typeof ProviderGroupControllerService.getAllProviderGroups>
  >;
export type ProviderGroupControllerServiceGetAllProviderGroupsQueryResult<
  TData = ProviderGroupControllerServiceGetAllProviderGroupsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useProviderGroupControllerServiceGetAllProviderGroupsKey =
  "ProviderGroupControllerServiceGetAllProviderGroups";
export const UseProviderGroupControllerServiceGetAllProviderGroupsKeyFn = (
  {
    archive,
    page,
    searchString,
    size,
    sortBy,
    sortDirection,
    state,
    status,
    xTenantId,
  }: {
    archive?: boolean;
    page?: number;
    searchString?: string;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    state?: string;
    status?: boolean;
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useProviderGroupControllerServiceGetAllProviderGroupsKey,
  ...(queryKey ?? [
    {
      archive,
      page,
      searchString,
      size,
      sortBy,
      sortDirection,
      state,
      status,
      xTenantId,
    },
  ]),
];
export type ProviderGroupControllerServiceGetProviderGroupByIdDefaultResponse =
  Awaited<
    ReturnType<typeof ProviderGroupControllerService.getProviderGroupById>
  >;
export type ProviderGroupControllerServiceGetProviderGroupByIdQueryResult<
  TData = ProviderGroupControllerServiceGetProviderGroupByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useProviderGroupControllerServiceGetProviderGroupByIdKey =
  "ProviderGroupControllerServiceGetProviderGroupById";
export const UseProviderGroupControllerServiceGetProviderGroupByIdKeyFn = (
  {
    providerGroupId,
    xTenantId,
  }: {
    providerGroupId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useProviderGroupControllerServiceGetProviderGroupByIdKey,
  ...(queryKey ?? [{ providerGroupId, xTenantId }]),
];
export type PatientControllerServiceGetAllPatientDefaultResponse = Awaited<
  ReturnType<typeof PatientControllerService.getAllPatient>
>;
export type PatientControllerServiceGetAllPatientQueryResult<
  TData = PatientControllerServiceGetAllPatientDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientControllerServiceGetAllPatientKey =
  "PatientControllerServiceGetAllPatient";
export const UsePatientControllerServiceGetAllPatientKeyFn = (
  {
    archive,
    mrn,
    name,
    page,
    searchString,
    size,
    sortBy,
    sortDirection,
    status,
    xTenantId,
  }: {
    archive?: boolean;
    mrn?: string;
    name?: string;
    page?: number;
    searchString?: string;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    status?: boolean;
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  usePatientControllerServiceGetAllPatientKey,
  ...(queryKey ?? [
    {
      archive,
      mrn,
      name,
      page,
      searchString,
      size,
      sortBy,
      sortDirection,
      status,
      xTenantId,
    },
  ]),
];
export type PatientControllerServiceGetPatientByIdDefaultResponse = Awaited<
  ReturnType<typeof PatientControllerService.getPatientById>
>;
export type PatientControllerServiceGetPatientByIdQueryResult<
  TData = PatientControllerServiceGetPatientByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientControllerServiceGetPatientByIdKey =
  "PatientControllerServiceGetPatientById";
export const UsePatientControllerServiceGetPatientByIdKeyFn = (
  {
    patientUuid,
    xTenantId,
  }: {
    patientUuid: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  usePatientControllerServiceGetPatientByIdKey,
  ...(queryKey ?? [{ patientUuid, xTenantId }]),
];
export type PatientControllerServiceGetProfile2DefaultResponse = Awaited<
  ReturnType<typeof PatientControllerService.getProfile2>
>;
export type PatientControllerServiceGetProfile2QueryResult<
  TData = PatientControllerServiceGetProfile2DefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientControllerServiceGetProfile2Key =
  "PatientControllerServiceGetProfile2";
export const UsePatientControllerServiceGetProfile2KeyFn = (
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  usePatientControllerServiceGetProfile2Key,
  ...(queryKey ?? [{ xTenantId }]),
];
export type PatientControllerServiceDownloadTemplateDefaultResponse = Awaited<
  ReturnType<typeof PatientControllerService.downloadTemplate>
>;
export type PatientControllerServiceDownloadTemplateQueryResult<
  TData = PatientControllerServiceDownloadTemplateDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientControllerServiceDownloadTemplateKey =
  "PatientControllerServiceDownloadTemplate";
export const UsePatientControllerServiceDownloadTemplateKeyFn = (
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  usePatientControllerServiceDownloadTemplateKey,
  ...(queryKey ?? [{ xTenantId }]),
];
export type PatientVitalControllerServiceGetPatientVitals1DefaultResponse =
  Awaited<ReturnType<typeof PatientVitalControllerService.getPatientVitals1>>;
export type PatientVitalControllerServiceGetPatientVitals1QueryResult<
  TData = PatientVitalControllerServiceGetPatientVitals1DefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientVitalControllerServiceGetPatientVitals1Key =
  "PatientVitalControllerServiceGetPatientVitals1";
export const UsePatientVitalControllerServiceGetPatientVitals1KeyFn = (
  {
    endDate,
    page,
    patientUuid,
    size,
    sort,
    sortBy,
    startDate,
    timeFilter,
    vitalName,
    xTenantId,
  }: {
    endDate?: string;
    page?: number;
    patientUuid: string;
    size?: number;
    sort?: string;
    sortBy?: string;
    startDate?: string;
    timeFilter?: "LAST_MONTH" | "LAST_WEEK" | "PAST_24_HOURS" | "DATE_RANGE";
    vitalName?: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  usePatientVitalControllerServiceGetPatientVitals1Key,
  ...(queryKey ?? [
    {
      endDate,
      page,
      patientUuid,
      size,
      sort,
      sortBy,
      startDate,
      timeFilter,
      vitalName,
      xTenantId,
    },
  ]),
];
export type PatientVitalControllerServiceGetPatientVitalByIdDefaultResponse =
  Awaited<ReturnType<typeof PatientVitalControllerService.getPatientVitalById>>;
export type PatientVitalControllerServiceGetPatientVitalByIdQueryResult<
  TData = PatientVitalControllerServiceGetPatientVitalByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientVitalControllerServiceGetPatientVitalByIdKey =
  "PatientVitalControllerServiceGetPatientVitalById";
export const UsePatientVitalControllerServiceGetPatientVitalByIdKeyFn = (
  {
    patientVitalId,
    xTenantId,
  }: {
    patientVitalId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  usePatientVitalControllerServiceGetPatientVitalByIdKey,
  ...(queryKey ?? [{ patientVitalId, xTenantId }]),
];
export type PatientVitalControllerServiceGetPatientLatestVitalsDefaultResponse =
  Awaited<
    ReturnType<typeof PatientVitalControllerService.getPatientLatestVitals>
  >;
export type PatientVitalControllerServiceGetPatientLatestVitalsQueryResult<
  TData = PatientVitalControllerServiceGetPatientLatestVitalsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientVitalControllerServiceGetPatientLatestVitalsKey =
  "PatientVitalControllerServiceGetPatientLatestVitals";
export const UsePatientVitalControllerServiceGetPatientLatestVitalsKeyFn = (
  {
    patientUuid,
    xTenantId,
  }: {
    patientUuid: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  usePatientVitalControllerServiceGetPatientLatestVitalsKey,
  ...(queryKey ?? [{ patientUuid, xTenantId }]),
];
export type PatientMedicationControllerServiceGetPatientMedicationDefaultResponse =
  Awaited<
    ReturnType<typeof PatientMedicationControllerService.getPatientMedication>
  >;
export type PatientMedicationControllerServiceGetPatientMedicationQueryResult<
  TData = PatientMedicationControllerServiceGetPatientMedicationDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientMedicationControllerServiceGetPatientMedicationKey =
  "PatientMedicationControllerServiceGetPatientMedication";
export const UsePatientMedicationControllerServiceGetPatientMedicationKeyFn = (
  {
    archive,
    page,
    patientUuid,
    searchString,
    size,
    sort,
    sortBy,
    status,
    xTenantId,
  }: {
    archive?: boolean;
    page?: number;
    patientUuid: string;
    searchString?: string;
    size?: number;
    sort?: string;
    sortBy?: string;
    status?: boolean;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  usePatientMedicationControllerServiceGetPatientMedicationKey,
  ...(queryKey ?? [
    {
      archive,
      page,
      patientUuid,
      searchString,
      size,
      sort,
      sortBy,
      status,
      xTenantId,
    },
  ]),
];
export type PatientMedicationControllerServiceGetPatientMedicationByIdDefaultResponse =
  Awaited<
    ReturnType<
      typeof PatientMedicationControllerService.getPatientMedicationById
    >
  >;
export type PatientMedicationControllerServiceGetPatientMedicationByIdQueryResult<
  TData = PatientMedicationControllerServiceGetPatientMedicationByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientMedicationControllerServiceGetPatientMedicationByIdKey =
  "PatientMedicationControllerServiceGetPatientMedicationById";
export const UsePatientMedicationControllerServiceGetPatientMedicationByIdKeyFn =
  (
    {
      patientMedicationId,
      xTenantId,
    }: {
      patientMedicationId: string;
      xTenantId?: string;
    },
    queryKey?: unknown[],
  ) => [
    usePatientMedicationControllerServiceGetPatientMedicationByIdKey,
    ...(queryKey ?? [{ patientMedicationId, xTenantId }]),
  ];
export type ConsentFormControllerServiceGetAllConsentFormTemplateDefaultResponse =
  Awaited<
    ReturnType<typeof ConsentFormControllerService.getAllConsentFormTemplate>
  >;
export type ConsentFormControllerServiceGetAllConsentFormTemplateQueryResult<
  TData = ConsentFormControllerServiceGetAllConsentFormTemplateDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useConsentFormControllerServiceGetAllConsentFormTemplateKey =
  "ConsentFormControllerServiceGetAllConsentFormTemplate";
export const UseConsentFormControllerServiceGetAllConsentFormTemplateKeyFn = (
  {
    archive,
    page,
    searchString,
    size,
    sortBy,
    sortDirection,
    status,
    xTenantId,
  }: {
    archive?: boolean;
    page?: number;
    searchString?: string;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    status?: boolean;
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useConsentFormControllerServiceGetAllConsentFormTemplateKey,
  ...(queryKey ?? [
    {
      archive,
      page,
      searchString,
      size,
      sortBy,
      sortDirection,
      status,
      xTenantId,
    },
  ]),
];
export type ConsentFormControllerServiceGetAllPatientConsentFormDefaultResponse =
  Awaited<
    ReturnType<typeof ConsentFormControllerService.getAllPatientConsentForm>
  >;
export type ConsentFormControllerServiceGetAllPatientConsentFormQueryResult<
  TData = ConsentFormControllerServiceGetAllPatientConsentFormDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useConsentFormControllerServiceGetAllPatientConsentFormKey =
  "ConsentFormControllerServiceGetAllPatientConsentForm";
export const UseConsentFormControllerServiceGetAllPatientConsentFormKeyFn = (
  {
    page,
    patientUuid,
    searchString,
    size,
    sortBy,
    sortDirection,
    xTenantId,
  }: {
    page?: number;
    patientUuid: string;
    searchString?: string;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useConsentFormControllerServiceGetAllPatientConsentFormKey,
  ...(queryKey ?? [
    { page, patientUuid, searchString, size, sortBy, sortDirection, xTenantId },
  ]),
];
export type ConsentFormControllerServiceGetPatientConsentFormByIdDefaultResponse =
  Awaited<
    ReturnType<typeof ConsentFormControllerService.getPatientConsentFormById>
  >;
export type ConsentFormControllerServiceGetPatientConsentFormByIdQueryResult<
  TData = ConsentFormControllerServiceGetPatientConsentFormByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useConsentFormControllerServiceGetPatientConsentFormByIdKey =
  "ConsentFormControllerServiceGetPatientConsentFormById";
export const UseConsentFormControllerServiceGetPatientConsentFormByIdKeyFn = (
  {
    patientConsentFormUuid,
    xTenantId,
  }: {
    patientConsentFormUuid: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useConsentFormControllerServiceGetPatientConsentFormByIdKey,
  ...(queryKey ?? [{ patientConsentFormUuid, xTenantId }]),
];
export type ConsentFormControllerServiceGetConsentFormIdDefaultResponse =
  Awaited<ReturnType<typeof ConsentFormControllerService.getConsentFormId>>;
export type ConsentFormControllerServiceGetConsentFormIdQueryResult<
  TData = ConsentFormControllerServiceGetConsentFormIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useConsentFormControllerServiceGetConsentFormIdKey =
  "ConsentFormControllerServiceGetConsentFormId";
export const UseConsentFormControllerServiceGetConsentFormIdKeyFn = (
  {
    consentFormId,
    xTenantId,
  }: {
    consentFormId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useConsentFormControllerServiceGetConsentFormIdKey,
  ...(queryKey ?? [{ consentFormId, xTenantId }]),
];
export type PatientAllergyControllerServiceGetPatientAllergyDefaultResponse =
  Awaited<ReturnType<typeof PatientAllergyControllerService.getPatientAllergy>>;
export type PatientAllergyControllerServiceGetPatientAllergyQueryResult<
  TData = PatientAllergyControllerServiceGetPatientAllergyDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientAllergyControllerServiceGetPatientAllergyKey =
  "PatientAllergyControllerServiceGetPatientAllergy";
export const UsePatientAllergyControllerServiceGetPatientAllergyKeyFn = (
  {
    archive,
    page,
    patientUuid,
    searchString,
    size,
    sort,
    sortBy,
    status,
    xTenantId,
  }: {
    archive?: boolean;
    page?: number;
    patientUuid: string;
    searchString?: string;
    size?: number;
    sort?: string;
    sortBy?: string;
    status?: boolean;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  usePatientAllergyControllerServiceGetPatientAllergyKey,
  ...(queryKey ?? [
    {
      archive,
      page,
      patientUuid,
      searchString,
      size,
      sort,
      sortBy,
      status,
      xTenantId,
    },
  ]),
];
export type PatientAllergyControllerServiceGetPatientAllergyByIdDefaultResponse =
  Awaited<
    ReturnType<typeof PatientAllergyControllerService.getPatientAllergyById>
  >;
export type PatientAllergyControllerServiceGetPatientAllergyByIdQueryResult<
  TData = PatientAllergyControllerServiceGetPatientAllergyByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientAllergyControllerServiceGetPatientAllergyByIdKey =
  "PatientAllergyControllerServiceGetPatientAllergyById";
export const UsePatientAllergyControllerServiceGetPatientAllergyByIdKeyFn = (
  {
    patientAllergyId,
    xTenantId,
  }: {
    patientAllergyId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  usePatientAllergyControllerServiceGetPatientAllergyByIdKey,
  ...(queryKey ?? [{ patientAllergyId, xTenantId }]),
];
export type MedicalCodeControllerServiceGetMedicalCodesDefaultResponse =
  Awaited<ReturnType<typeof MedicalCodeControllerService.getMedicalCodes>>;
export type MedicalCodeControllerServiceGetMedicalCodesQueryResult<
  TData = MedicalCodeControllerServiceGetMedicalCodesDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useMedicalCodeControllerServiceGetMedicalCodesKey =
  "MedicalCodeControllerServiceGetMedicalCodes";
export const UseMedicalCodeControllerServiceGetMedicalCodesKeyFn = (
  {
    active,
    archive,
    page,
    searchString,
    size,
    sort,
    sortBy,
    type,
    xTenantId,
  }: {
    active?: boolean;
    archive?: boolean;
    page?: number;
    searchString?: string;
    size?: number;
    sort?: string;
    sortBy?: string;
    type?: "PATIENT" | "ICD" | "CPT";
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useMedicalCodeControllerServiceGetMedicalCodesKey,
  ...(queryKey ?? [
    {
      active,
      archive,
      page,
      searchString,
      size,
      sort,
      sortBy,
      type,
      xTenantId,
    },
  ]),
];
export type MedicalCodeControllerServiceGetMedicalCodeByIdDefaultResponse =
  Awaited<ReturnType<typeof MedicalCodeControllerService.getMedicalCodeById>>;
export type MedicalCodeControllerServiceGetMedicalCodeByIdQueryResult<
  TData = MedicalCodeControllerServiceGetMedicalCodeByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useMedicalCodeControllerServiceGetMedicalCodeByIdKey =
  "MedicalCodeControllerServiceGetMedicalCodeById";
export const UseMedicalCodeControllerServiceGetMedicalCodeByIdKeyFn = (
  {
    medicalCodeId,
    xTenantId,
  }: {
    medicalCodeId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useMedicalCodeControllerServiceGetMedicalCodeByIdKey,
  ...(queryKey ?? [{ medicalCodeId, xTenantId }]),
];
export type LocationControllerServiceGetAllLocationsDefaultResponse = Awaited<
  ReturnType<typeof LocationControllerService.getAllLocations>
>;
export type LocationControllerServiceGetAllLocationsQueryResult<
  TData = LocationControllerServiceGetAllLocationsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useLocationControllerServiceGetAllLocationsKey =
  "LocationControllerServiceGetAllLocations";
export const UseLocationControllerServiceGetAllLocationsKeyFn = (
  {
    archive,
    page,
    searchString,
    size,
    sortBy,
    sortDirection,
    state,
    status,
    xTenantId,
  }: {
    archive?: boolean;
    page?: number;
    searchString?: string;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    state?: string;
    status?: boolean;
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useLocationControllerServiceGetAllLocationsKey,
  ...(queryKey ?? [
    {
      archive,
      page,
      searchString,
      size,
      sortBy,
      sortDirection,
      state,
      status,
      xTenantId,
    },
  ]),
];
export type LocationControllerServiceGetLocationByIdDefaultResponse = Awaited<
  ReturnType<typeof LocationControllerService.getLocationById>
>;
export type LocationControllerServiceGetLocationByIdQueryResult<
  TData = LocationControllerServiceGetLocationByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useLocationControllerServiceGetLocationByIdKey =
  "LocationControllerServiceGetLocationById";
export const UseLocationControllerServiceGetLocationByIdKeyFn = (
  {
    locationId,
    xTenantId,
  }: {
    locationId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useLocationControllerServiceGetLocationByIdKey,
  ...(queryKey ?? [{ locationId, xTenantId }]),
];
export type AvailabilityControllerServiceGetProviderAvailabilitySettingDefaultResponse =
  Awaited<
    ReturnType<
      typeof AvailabilityControllerService.getProviderAvailabilitySetting
    >
  >;
export type AvailabilityControllerServiceGetProviderAvailabilitySettingQueryResult<
  TData = AvailabilityControllerServiceGetProviderAvailabilitySettingDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useAvailabilityControllerServiceGetProviderAvailabilitySettingKey =
  "AvailabilityControllerServiceGetProviderAvailabilitySetting";
export const UseAvailabilityControllerServiceGetProviderAvailabilitySettingKeyFn =
  (
    {
      providerUuid,
      xTenantId,
    }: {
      providerUuid: string;
      xTenantId?: string;
    },
    queryKey?: unknown[],
  ) => [
    useAvailabilityControllerServiceGetProviderAvailabilitySettingKey,
    ...(queryKey ?? [{ providerUuid, xTenantId }]),
  ];
export type VitalControllerServiceGetPatientVitalsDefaultResponse = Awaited<
  ReturnType<typeof VitalControllerService.getPatientVitals>
>;
export type VitalControllerServiceGetPatientVitalsQueryResult<
  TData = VitalControllerServiceGetPatientVitalsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useVitalControllerServiceGetPatientVitalsKey =
  "VitalControllerServiceGetPatientVitals";
export const UseVitalControllerServiceGetPatientVitalsKeyFn = (
  {
    page,
    searchString,
    size,
    sort,
    sortBy,
    xTenantId,
  }: {
    page?: number;
    searchString?: string;
    size?: number;
    sort?: string;
    sortBy?: string;
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useVitalControllerServiceGetPatientVitalsKey,
  ...(queryKey ?? [{ page, searchString, size, sort, sortBy, xTenantId }]),
];
export type LicenseStateControllerServiceGetAllLicensedStatesDefaultResponse =
  Awaited<
    ReturnType<typeof LicenseStateControllerService.getAllLicensedStates>
  >;
export type LicenseStateControllerServiceGetAllLicensedStatesQueryResult<
  TData = LicenseStateControllerServiceGetAllLicensedStatesDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useLicenseStateControllerServiceGetAllLicensedStatesKey =
  "LicenseStateControllerServiceGetAllLicensedStates";
export const UseLicenseStateControllerServiceGetAllLicensedStatesKeyFn = (
  {
    page,
    searchString,
    size,
    sortBy,
    sortDirection,
    xTenantId,
  }: {
    page?: number;
    searchString?: string;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useLicenseStateControllerServiceGetAllLicensedStatesKey,
  ...(queryKey ?? [
    { page, searchString, size, sortBy, sortDirection, xTenantId },
  ]),
];
export type EhrControllerServiceGetPractitionerByProviderIdDefaultResponse =
  Awaited<ReturnType<typeof EhrControllerService.getPractitionerByProviderId>>;
export type EhrControllerServiceGetPractitionerByProviderIdQueryResult<
  TData = EhrControllerServiceGetPractitionerByProviderIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useEhrControllerServiceGetPractitionerByProviderIdKey =
  "EhrControllerServiceGetPractitionerByProviderId";
export const UseEhrControllerServiceGetPractitionerByProviderIdKeyFn = (
  {
    practitionerId,
    xTenantId,
  }: {
    practitionerId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useEhrControllerServiceGetPractitionerByProviderIdKey,
  ...(queryKey ?? [{ practitionerId, xTenantId }]),
];
export type EhrControllerServiceGetOrganizationByPracticeIdDefaultResponse =
  Awaited<ReturnType<typeof EhrControllerService.getOrganizationByPracticeId>>;
export type EhrControllerServiceGetOrganizationByPracticeIdQueryResult<
  TData = EhrControllerServiceGetOrganizationByPracticeIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useEhrControllerServiceGetOrganizationByPracticeIdKey =
  "EhrControllerServiceGetOrganizationByPracticeId";
export const UseEhrControllerServiceGetOrganizationByPracticeIdKeyFn = (
  {
    practiceId,
    xTenantId,
  }: {
    practiceId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useEhrControllerServiceGetOrganizationByPracticeIdKey,
  ...(queryKey ?? [{ practiceId, xTenantId }]),
];
export type EhrControllerServiceGetLocationByLocationIdDefaultResponse =
  Awaited<ReturnType<typeof EhrControllerService.getLocationByLocationId>>;
export type EhrControllerServiceGetLocationByLocationIdQueryResult<
  TData = EhrControllerServiceGetLocationByLocationIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useEhrControllerServiceGetLocationByLocationIdKey =
  "EhrControllerServiceGetLocationByLocationId";
export const UseEhrControllerServiceGetLocationByLocationIdKeyFn = (
  {
    locationId,
    xTenantId,
  }: {
    locationId: string;
    xTenantId?: string;
  },
  queryKey?: unknown[],
) => [
  useEhrControllerServiceGetLocationByLocationIdKey,
  ...(queryKey ?? [{ locationId, xTenantId }]),
];
export type EhrControllerServiceGetAccessToken1DefaultResponse = Awaited<
  ReturnType<typeof EhrControllerService.getAccessToken1>
>;
export type EhrControllerServiceGetAccessToken1QueryResult<
  TData = EhrControllerServiceGetAccessToken1DefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useEhrControllerServiceGetAccessToken1Key =
  "EhrControllerServiceGetAccessToken1";
export const UseEhrControllerServiceGetAccessToken1KeyFn = (
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: unknown[],
) => [
  useEhrControllerServiceGetAccessToken1Key,
  ...(queryKey ?? [{ xTenantId }]),
];
export type UserControllerServiceAddUserMutationResult = Awaited<
  ReturnType<typeof UserControllerService.addUser>
>;
export type UserControllerServiceVerifyUserMutationResult = Awaited<
  ReturnType<typeof UserControllerService.verifyUser>
>;
export type UserControllerServiceVerifyOtpMutationResult = Awaited<
  ReturnType<typeof UserControllerService.verifyOtp>
>;
export type UserControllerServiceSetPasswordMutationResult = Awaited<
  ReturnType<typeof UserControllerService.setPassword>
>;
export type UserControllerServiceResendOtpMutationResult = Awaited<
  ReturnType<typeof UserControllerService.resendOtp>
>;
export type UserControllerServiceLogoutMutationResult = Awaited<
  ReturnType<typeof UserControllerService.logout>
>;
export type UserControllerServiceGetAccessTokenMutationResult = Awaited<
  ReturnType<typeof UserControllerService.getAccessToken>
>;
export type UserControllerServiceChangePasswordMutationResult = Awaited<
  ReturnType<typeof UserControllerService.changePassword>
>;
export type UserControllerServiceGetAccessTokenFromRefreshTokenMutationResult =
  Awaited<
    ReturnType<typeof UserControllerService.getAccessTokenFromRefreshToken>
  >;
export type RolesAndPrivilegesControllerServiceAddRoleMutationResult = Awaited<
  ReturnType<typeof RolesAndPrivilegesControllerService.addRole>
>;
export type ProviderControllerServiceCreateProviderMutationResult = Awaited<
  ReturnType<typeof ProviderControllerService.createProvider>
>;
export type ProviderGroupControllerServiceCreateProviderGroupMutationResult =
  Awaited<
    ReturnType<typeof ProviderGroupControllerService.createProviderGroup>
  >;
export type PatientControllerServiceCreatePatientMutationResult = Awaited<
  ReturnType<typeof PatientControllerService.createPatient>
>;
export type PatientControllerServiceUploadFileMutationResult = Awaited<
  ReturnType<typeof PatientControllerService.uploadFile>
>;
export type PatientVitalControllerServiceCreatePatientVitalMutationResult =
  Awaited<ReturnType<typeof PatientVitalControllerService.createPatientVital>>;
export type PatientVitalControllerServiceCreateListPatientVitalMutationResult =
  Awaited<
    ReturnType<typeof PatientVitalControllerService.createListPatientVital>
  >;
export type PatientMedicationControllerServiceCreatePatientMedicationMutationResult =
  Awaited<
    ReturnType<
      typeof PatientMedicationControllerService.createPatientMedication
    >
  >;
export type ConsentFormControllerServiceCreateConsentFormsMutationResult =
  Awaited<ReturnType<typeof ConsentFormControllerService.createConsentForms>>;
export type ConsentFormControllerServiceAddPatientConsentMutationResult =
  Awaited<ReturnType<typeof ConsentFormControllerService.addPatientConsent>>;
export type PatientAllergyControllerServiceCreatePatientAllergyMutationResult =
  Awaited<
    ReturnType<typeof PatientAllergyControllerService.createPatientAllergy>
  >;
export type MedicalCodeControllerServiceCreateMedicalCodeMutationResult =
  Awaited<ReturnType<typeof MedicalCodeControllerService.createMedicalCode>>;
export type LocationControllerServiceCreateLocationMutationResult = Awaited<
  ReturnType<typeof LocationControllerService.createLocation>
>;
export type AvailabilityControllerServiceSetProviderAvailabilitySettingMutationResult =
  Awaited<
    ReturnType<
      typeof AvailabilityControllerService.setProviderAvailabilitySetting
    >
  >;
export type UserControllerServiceUpdateUserArchiveStatusMutationResult =
  Awaited<ReturnType<typeof UserControllerService.updateUserArchiveStatus>>;
export type UserControllerServiceUpdateUserMutationResult = Awaited<
  ReturnType<typeof UserControllerService.updateUser>
>;
export type UserControllerServiceChangeAvatar3MutationResult = Awaited<
  ReturnType<typeof UserControllerService.changeAvatar3>
>;
export type RolesAndPrivilegesControllerServiceUpdateRoleMutationResult =
  Awaited<ReturnType<typeof RolesAndPrivilegesControllerService.updateRole>>;
export type ProviderControllerServiceUpdateProviderMutationResult = Awaited<
  ReturnType<typeof ProviderControllerService.updateProvider>
>;
export type ProviderControllerServiceUpdateProviderArchiveStatusMutationResult =
  Awaited<
    ReturnType<typeof ProviderControllerService.updateProviderArchiveStatus>
  >;
export type ProviderControllerServiceUploadVideoMutationResult = Awaited<
  ReturnType<typeof ProviderControllerService.uploadVideo>
>;
export type ProviderControllerServiceChangeAvatarMutationResult = Awaited<
  ReturnType<typeof ProviderControllerService.changeAvatar>
>;
export type ProviderGroupControllerServiceUpdateProviderGroupMutationResult =
  Awaited<
    ReturnType<typeof ProviderGroupControllerService.updateProviderGroup>
  >;
export type ProviderGroupControllerServiceSyncDatabaseSchemaMutationResult =
  Awaited<ReturnType<typeof ProviderGroupControllerService.syncDatabaseSchema>>;
export type ProviderGroupControllerServiceUpdateProviderGroupArchiveStatusMutationResult =
  Awaited<
    ReturnType<
      typeof ProviderGroupControllerService.updateProviderGroupArchiveStatus
    >
  >;
export type ProviderGroupControllerServiceChangeAvatar1MutationResult = Awaited<
  ReturnType<typeof ProviderGroupControllerService.changeAvatar1>
>;
export type PatientControllerServiceUpdatePatientMutationResult = Awaited<
  ReturnType<typeof PatientControllerService.updatePatient>
>;
export type PatientControllerServiceUpdatePatientArchiveStatusMutationResult =
  Awaited<
    ReturnType<typeof PatientControllerService.updatePatientArchiveStatus>
  >;
export type PatientControllerServiceChangeAvatar2MutationResult = Awaited<
  ReturnType<typeof PatientControllerService.changeAvatar2>
>;
export type PatientVitalControllerServiceUpdatePatientVitalMutationResult =
  Awaited<ReturnType<typeof PatientVitalControllerService.updatePatientVital>>;
export type PatientMedicationControllerServiceUpdatePatientMedicationMutationResult =
  Awaited<
    ReturnType<
      typeof PatientMedicationControllerService.updatePatientMedication
    >
  >;
export type PatientMedicationControllerServiceDeletePatientMedicationIdMutationResult =
  Awaited<
    ReturnType<
      typeof PatientMedicationControllerService.deletePatientMedicationId
    >
  >;
export type ConsentFormControllerServiceUpdatePatientConsentStatusMutationResult =
  Awaited<
    ReturnType<typeof ConsentFormControllerService.updatePatientConsentStatus>
  >;
export type ConsentFormControllerServiceUpdateConsentFormsMutationResult =
  Awaited<ReturnType<typeof ConsentFormControllerService.updateConsentForms>>;
export type ConsentFormControllerServiceUpdateConsentFormArchiveStatusMutationResult =
  Awaited<
    ReturnType<
      typeof ConsentFormControllerService.updateConsentFormArchiveStatus
    >
  >;
export type PatientAllergyControllerServiceUpdatePatientAllergyMutationResult =
  Awaited<
    ReturnType<typeof PatientAllergyControllerService.updatePatientAllergy>
  >;
export type PatientAllergyControllerServiceUpdatePatientAllergyArchiveStatusMutationResult =
  Awaited<
    ReturnType<
      typeof PatientAllergyControllerService.updatePatientAllergyArchiveStatus
    >
  >;
export type MedicalCodeControllerServiceUpdateMedicalCodeMutationResult =
  Awaited<ReturnType<typeof MedicalCodeControllerService.updateMedicalCode>>;
export type MedicalCodeControllerServiceUpdateMedicalCodeStatusMutationResult =
  Awaited<
    ReturnType<typeof MedicalCodeControllerService.updateMedicalCodeStatus>
  >;
export type MedicalCodeControllerServiceUpdateMedicalCodeArchiveStatusMutationResult =
  Awaited<
    ReturnType<
      typeof MedicalCodeControllerService.updateMedicalCodeArchiveStatus
    >
  >;
export type LocationControllerServiceUpdateLocationMutationResult = Awaited<
  ReturnType<typeof LocationControllerService.updateLocation>
>;
export type LocationControllerServiceUpdateLocationArchiveStatusMutationResult =
  Awaited<
    ReturnType<typeof LocationControllerService.updateLocationArchiveStatus>
  >;
export type ProviderControllerServiceDeleteVideoMutationResult = Awaited<
  ReturnType<typeof ProviderControllerService.deleteVideo>
>;
