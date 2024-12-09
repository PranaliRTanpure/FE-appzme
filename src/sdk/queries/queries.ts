// generated with @7nohe/openapi-react-query-codegen@1.4.1

import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
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
import {
  AvailabilitySetting,
  ChangeAvatarRequest,
  ChangePasswordRequest,
  ConsentFormTemplate,
  Location,
  LoginRequest,
  LogoutRequest,
  MedicalCode,
  Patient,
  PatientAllergy,
  PatientConsentForm,
  PatientMedication,
  PatientVital,
  PatientVitalRequest,
  Provider,
  ProviderGroup,
  ResetPasswordRequest,
  Role,
  User,
} from "../requests/types.gen";
import * as Common from "./common";
export const useUserControllerServiceGetAllUsers = <
  TData = Common.UserControllerServiceGetAllUsersDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseUserControllerServiceGetAllUsersKeyFn(
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
      queryKey,
    ),
    queryFn: () =>
      UserControllerService.getAllUsers({
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
      }) as TData,
    ...options,
  });
export const useUserControllerServiceGetUser = <
  TData = Common.UserControllerServiceGetUserDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    userId,
    xTenantId,
  }: {
    userId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseUserControllerServiceGetUserKeyFn(
      { userId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      UserControllerService.getUser({ userId, xTenantId }) as TData,
    ...options,
  });
export const useUserControllerServiceGetProfile1 = <
  TData = Common.UserControllerServiceGetProfile1DefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseUserControllerServiceGetProfile1KeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () => UserControllerService.getProfile1({ xTenantId }) as TData,
    ...options,
  });
export const useRolesAndPrivilegesControllerServiceGetAllRoles = <
  TData = Common.RolesAndPrivilegesControllerServiceGetAllRolesDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseRolesAndPrivilegesControllerServiceGetAllRolesKeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () =>
      RolesAndPrivilegesControllerService.getAllRoles({ xTenantId }) as TData,
    ...options,
  });
export const useRolesAndPrivilegesControllerServiceGetAllPrivileges = <
  TData = Common.RolesAndPrivilegesControllerServiceGetAllPrivilegesDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseRolesAndPrivilegesControllerServiceGetAllPrivilegesKeyFn(
        { xTenantId },
        queryKey,
      ),
    queryFn: () =>
      RolesAndPrivilegesControllerService.getAllPrivileges({
        xTenantId,
      }) as TData,
    ...options,
  });
export const useProviderControllerServiceGetAllProviders = <
  TData = Common.ProviderControllerServiceGetAllProvidersDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseProviderControllerServiceGetAllProvidersKeyFn(
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
      queryKey,
    ),
    queryFn: () =>
      ProviderControllerService.getAllProviders({
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
      }) as TData,
    ...options,
  });
export const useProviderControllerServiceGetProviderById = <
  TData = Common.ProviderControllerServiceGetProviderByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    providerUuid,
    xTenantId,
  }: {
    providerUuid: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseProviderControllerServiceGetProviderByIdKeyFn(
      { providerUuid, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      ProviderControllerService.getProviderById({
        providerUuid,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useProviderControllerServiceGetProfile = <
  TData = Common.ProviderControllerServiceGetProfileDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseProviderControllerServiceGetProfileKeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () => ProviderControllerService.getProfile({ xTenantId }) as TData,
    ...options,
  });
export const useProviderGroupControllerServiceGetAllProviderGroups = <
  TData = Common.ProviderGroupControllerServiceGetAllProviderGroupsDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseProviderGroupControllerServiceGetAllProviderGroupsKeyFn(
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
      queryKey,
    ),
    queryFn: () =>
      ProviderGroupControllerService.getAllProviderGroups({
        archive,
        page,
        searchString,
        size,
        sortBy,
        sortDirection,
        state,
        status,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useProviderGroupControllerServiceGetProviderGroupById = <
  TData = Common.ProviderGroupControllerServiceGetProviderGroupByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    providerGroupId,
    xTenantId,
  }: {
    providerGroupId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseProviderGroupControllerServiceGetProviderGroupByIdKeyFn(
      { providerGroupId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      ProviderGroupControllerService.getProviderGroupById({
        providerGroupId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const usePatientControllerServiceGetAllPatient = <
  TData = Common.PatientControllerServiceGetAllPatientDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetAllPatientKeyFn(
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
      queryKey,
    ),
    queryFn: () =>
      PatientControllerService.getAllPatient({
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
      }) as TData,
    ...options,
  });
export const usePatientControllerServiceGetPatientById = <
  TData = Common.PatientControllerServiceGetPatientByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    patientUuid,
    xTenantId,
  }: {
    patientUuid: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetPatientByIdKeyFn(
      { patientUuid, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      PatientControllerService.getPatientById({
        patientUuid,
        xTenantId,
      }) as TData,
    ...options,
  });
export const usePatientControllerServiceGetProfile2 = <
  TData = Common.PatientControllerServiceGetProfile2DefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetProfile2KeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () => PatientControllerService.getProfile2({ xTenantId }) as TData,
    ...options,
  });
export const usePatientControllerServiceDownloadTemplate = <
  TData = Common.PatientControllerServiceDownloadTemplateDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceDownloadTemplateKeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () =>
      PatientControllerService.downloadTemplate({ xTenantId }) as TData,
    ...options,
  });
export const usePatientVitalControllerServiceGetPatientVitals1 = <
  TData = Common.PatientVitalControllerServiceGetPatientVitals1DefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientVitalControllerServiceGetPatientVitals1KeyFn(
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
      queryKey,
    ),
    queryFn: () =>
      PatientVitalControllerService.getPatientVitals1({
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
      }) as TData,
    ...options,
  });
export const usePatientVitalControllerServiceGetPatientVitalById = <
  TData = Common.PatientVitalControllerServiceGetPatientVitalByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    patientVitalId,
    xTenantId,
  }: {
    patientVitalId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientVitalControllerServiceGetPatientVitalByIdKeyFn(
      { patientVitalId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      PatientVitalControllerService.getPatientVitalById({
        patientVitalId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const usePatientVitalControllerServiceGetPatientLatestVitals = <
  TData = Common.PatientVitalControllerServiceGetPatientLatestVitalsDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    patientUuid,
    xTenantId,
  }: {
    patientUuid: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UsePatientVitalControllerServiceGetPatientLatestVitalsKeyFn(
        { patientUuid, xTenantId },
        queryKey,
      ),
    queryFn: () =>
      PatientVitalControllerService.getPatientLatestVitals({
        patientUuid,
        xTenantId,
      }) as TData,
    ...options,
  });
export const usePatientMedicationControllerServiceGetPatientMedication = <
  TData = Common.PatientMedicationControllerServiceGetPatientMedicationDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UsePatientMedicationControllerServiceGetPatientMedicationKeyFn(
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
        queryKey,
      ),
    queryFn: () =>
      PatientMedicationControllerService.getPatientMedication({
        archive,
        page,
        patientUuid,
        searchString,
        size,
        sort,
        sortBy,
        status,
        xTenantId,
      }) as TData,
    ...options,
  });
export const usePatientMedicationControllerServiceGetPatientMedicationById = <
  TData = Common.PatientMedicationControllerServiceGetPatientMedicationByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    patientMedicationId,
    xTenantId,
  }: {
    patientMedicationId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UsePatientMedicationControllerServiceGetPatientMedicationByIdKeyFn(
        { patientMedicationId, xTenantId },
        queryKey,
      ),
    queryFn: () =>
      PatientMedicationControllerService.getPatientMedicationById({
        patientMedicationId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useConsentFormControllerServiceGetAllConsentFormTemplate = <
  TData = Common.ConsentFormControllerServiceGetAllConsentFormTemplateDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseConsentFormControllerServiceGetAllConsentFormTemplateKeyFn(
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
        queryKey,
      ),
    queryFn: () =>
      ConsentFormControllerService.getAllConsentFormTemplate({
        archive,
        page,
        searchString,
        size,
        sortBy,
        sortDirection,
        status,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useConsentFormControllerServiceGetAllPatientConsentForm = <
  TData = Common.ConsentFormControllerServiceGetAllPatientConsentFormDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseConsentFormControllerServiceGetAllPatientConsentFormKeyFn(
        {
          page,
          patientUuid,
          searchString,
          size,
          sortBy,
          sortDirection,
          xTenantId,
        },
        queryKey,
      ),
    queryFn: () =>
      ConsentFormControllerService.getAllPatientConsentForm({
        page,
        patientUuid,
        searchString,
        size,
        sortBy,
        sortDirection,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useConsentFormControllerServiceGetPatientConsentFormById = <
  TData = Common.ConsentFormControllerServiceGetPatientConsentFormByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    patientConsentFormUuid,
    xTenantId,
  }: {
    patientConsentFormUuid: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseConsentFormControllerServiceGetPatientConsentFormByIdKeyFn(
        { patientConsentFormUuid, xTenantId },
        queryKey,
      ),
    queryFn: () =>
      ConsentFormControllerService.getPatientConsentFormById({
        patientConsentFormUuid,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useConsentFormControllerServiceGetConsentFormId = <
  TData = Common.ConsentFormControllerServiceGetConsentFormIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    consentFormId,
    xTenantId,
  }: {
    consentFormId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseConsentFormControllerServiceGetConsentFormIdKeyFn(
      { consentFormId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      ConsentFormControllerService.getConsentFormId({
        consentFormId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const usePatientAllergyControllerServiceGetPatientAllergy = <
  TData = Common.PatientAllergyControllerServiceGetPatientAllergyDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientAllergyControllerServiceGetPatientAllergyKeyFn(
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
      queryKey,
    ),
    queryFn: () =>
      PatientAllergyControllerService.getPatientAllergy({
        archive,
        page,
        patientUuid,
        searchString,
        size,
        sort,
        sortBy,
        status,
        xTenantId,
      }) as TData,
    ...options,
  });
export const usePatientAllergyControllerServiceGetPatientAllergyById = <
  TData = Common.PatientAllergyControllerServiceGetPatientAllergyByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    patientAllergyId,
    xTenantId,
  }: {
    patientAllergyId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UsePatientAllergyControllerServiceGetPatientAllergyByIdKeyFn(
        { patientAllergyId, xTenantId },
        queryKey,
      ),
    queryFn: () =>
      PatientAllergyControllerService.getPatientAllergyById({
        patientAllergyId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useMedicalCodeControllerServiceGetMedicalCodes = <
  TData = Common.MedicalCodeControllerServiceGetMedicalCodesDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseMedicalCodeControllerServiceGetMedicalCodesKeyFn(
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
      queryKey,
    ),
    queryFn: () =>
      MedicalCodeControllerService.getMedicalCodes({
        active,
        archive,
        page,
        searchString,
        size,
        sort,
        sortBy,
        type,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useMedicalCodeControllerServiceGetMedicalCodeById = <
  TData = Common.MedicalCodeControllerServiceGetMedicalCodeByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    medicalCodeId,
    xTenantId,
  }: {
    medicalCodeId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseMedicalCodeControllerServiceGetMedicalCodeByIdKeyFn(
      { medicalCodeId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      MedicalCodeControllerService.getMedicalCodeById({
        medicalCodeId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useLocationControllerServiceGetAllLocations = <
  TData = Common.LocationControllerServiceGetAllLocationsDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseLocationControllerServiceGetAllLocationsKeyFn(
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
      queryKey,
    ),
    queryFn: () =>
      LocationControllerService.getAllLocations({
        archive,
        page,
        searchString,
        size,
        sortBy,
        sortDirection,
        state,
        status,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useLocationControllerServiceGetLocationById = <
  TData = Common.LocationControllerServiceGetLocationByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    locationId,
    xTenantId,
  }: {
    locationId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseLocationControllerServiceGetLocationByIdKeyFn(
      { locationId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      LocationControllerService.getLocationById({
        locationId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useAvailabilityControllerServiceGetProviderAvailabilitySetting = <
  TData = Common.AvailabilityControllerServiceGetProviderAvailabilitySettingDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    providerUuid,
    xTenantId,
  }: {
    providerUuid: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseAvailabilityControllerServiceGetProviderAvailabilitySettingKeyFn(
        { providerUuid, xTenantId },
        queryKey,
      ),
    queryFn: () =>
      AvailabilityControllerService.getProviderAvailabilitySetting({
        providerUuid,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useVitalControllerServiceGetPatientVitals = <
  TData = Common.VitalControllerServiceGetPatientVitalsDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseVitalControllerServiceGetPatientVitalsKeyFn(
      { page, searchString, size, sort, sortBy, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      VitalControllerService.getPatientVitals({
        page,
        searchString,
        size,
        sort,
        sortBy,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useLicenseStateControllerServiceGetAllLicensedStates = <
  TData = Common.LicenseStateControllerServiceGetAllLicensedStatesDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
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
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseLicenseStateControllerServiceGetAllLicensedStatesKeyFn(
      { page, searchString, size, sortBy, sortDirection, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      LicenseStateControllerService.getAllLicensedStates({
        page,
        searchString,
        size,
        sortBy,
        sortDirection,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useEhrControllerServiceGetPractitionerByProviderId = <
  TData = Common.EhrControllerServiceGetPractitionerByProviderIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    practitionerId,
    xTenantId,
  }: {
    practitionerId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseEhrControllerServiceGetPractitionerByProviderIdKeyFn(
      { practitionerId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      EhrControllerService.getPractitionerByProviderId({
        practitionerId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useEhrControllerServiceGetOrganizationByPracticeId = <
  TData = Common.EhrControllerServiceGetOrganizationByPracticeIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    practiceId,
    xTenantId,
  }: {
    practiceId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseEhrControllerServiceGetOrganizationByPracticeIdKeyFn(
      { practiceId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      EhrControllerService.getOrganizationByPracticeId({
        practiceId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useEhrControllerServiceGetLocationByLocationId = <
  TData = Common.EhrControllerServiceGetLocationByLocationIdDefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    locationId,
    xTenantId,
  }: {
    locationId: string;
    xTenantId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseEhrControllerServiceGetLocationByLocationIdKeyFn(
      { locationId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      EhrControllerService.getLocationByLocationId({
        locationId,
        xTenantId,
      }) as TData,
    ...options,
  });
export const useEhrControllerServiceGetAccessToken1 = <
  TData = Common.EhrControllerServiceGetAccessToken1DefaultResponse,
  TError = unknown,
  TQueryKey extends unknown[] = unknown[],
>(
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseEhrControllerServiceGetAccessToken1KeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () => EhrControllerService.getAccessToken1({ xTenantId }) as TData,
    ...options,
  });
export const useUserControllerServiceAddUser = <
  TData = Common.UserControllerServiceAddUserMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: User;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: User;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      UserControllerService.addUser({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceVerifyUser = <
  TData = Common.UserControllerServiceVerifyUserMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        email: string;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      email: string;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ email, xTenantId }) =>
      UserControllerService.verifyUser({
        email,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceVerifyOtp = <
  TData = Common.UserControllerServiceVerifyOtpMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        email: string;
        linkType: string;
        otp: string;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      email: string;
      linkType: string;
      otp: string;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ email, linkType, otp, xTenantId }) =>
      UserControllerService.verifyOtp({
        email,
        linkType,
        otp,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceSetPassword = <
  TData = Common.UserControllerServiceSetPasswordMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        linkType: string;
        requestBody: ResetPasswordRequest;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      linkType: string;
      requestBody: ResetPasswordRequest;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ linkType, requestBody, xTenantId }) =>
      UserControllerService.setPassword({
        linkType,
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceResendOtp = <
  TData = Common.UserControllerServiceResendOtpMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        email: string;
        linkType: string;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      email: string;
      linkType: string;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ email, linkType, xTenantId }) =>
      UserControllerService.resendOtp({
        email,
        linkType,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceLogout = <
  TData = Common.UserControllerServiceLogoutMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: LogoutRequest;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: LogoutRequest;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      UserControllerService.logout({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceGetAccessToken = <
  TData = Common.UserControllerServiceGetAccessTokenMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: LoginRequest;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: LoginRequest;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      UserControllerService.getAccessToken({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceChangePassword = <
  TData = Common.UserControllerServiceChangePasswordMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ChangePasswordRequest;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ChangePasswordRequest;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      UserControllerService.changePassword({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceGetAccessTokenFromRefreshToken = <
  TData = Common.UserControllerServiceGetAccessTokenFromRefreshTokenMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        refreshToken: string;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      refreshToken: string;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ refreshToken, xTenantId }) =>
      UserControllerService.getAccessTokenFromRefreshToken({
        refreshToken,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useRolesAndPrivilegesControllerServiceAddRole = <
  TData = Common.RolesAndPrivilegesControllerServiceAddRoleMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: Role;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: Role;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      RolesAndPrivilegesControllerService.addRole({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderControllerServiceCreateProvider = <
  TData = Common.ProviderControllerServiceCreateProviderMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: Provider;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: Provider;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      ProviderControllerService.createProvider({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderGroupControllerServiceCreateProviderGroup = <
  TData = Common.ProviderGroupControllerServiceCreateProviderGroupMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ProviderGroup;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ProviderGroup;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      ProviderGroupControllerService.createProviderGroup({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientControllerServiceCreatePatient = <
  TData = Common.PatientControllerServiceCreatePatientMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: Patient;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: Patient;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      PatientControllerService.createPatient({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientControllerServiceUploadFile = <
  TData = Common.PatientControllerServiceUploadFileMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        formData: { file: Blob | File };
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      formData: { file: Blob | File };
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ formData, xTenantId }) =>
      PatientControllerService.uploadFile({
        formData,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientVitalControllerServiceCreatePatientVital = <
  TData = Common.PatientVitalControllerServiceCreatePatientVitalMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PatientVital;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PatientVital;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      PatientVitalControllerService.createPatientVital({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientVitalControllerServiceCreateListPatientVital = <
  TData = Common.PatientVitalControllerServiceCreateListPatientVitalMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PatientVitalRequest;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PatientVitalRequest;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      PatientVitalControllerService.createListPatientVital({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientMedicationControllerServiceCreatePatientMedication = <
  TData = Common.PatientMedicationControllerServiceCreatePatientMedicationMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PatientMedication;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PatientMedication;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      PatientMedicationControllerService.createPatientMedication({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useConsentFormControllerServiceCreateConsentForms = <
  TData = Common.ConsentFormControllerServiceCreateConsentFormsMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ConsentFormTemplate;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ConsentFormTemplate;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      ConsentFormControllerService.createConsentForms({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useConsentFormControllerServiceAddPatientConsent = <
  TData = Common.ConsentFormControllerServiceAddPatientConsentMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PatientConsentForm;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PatientConsentForm;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      ConsentFormControllerService.addPatientConsent({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientAllergyControllerServiceCreatePatientAllergy = <
  TData = Common.PatientAllergyControllerServiceCreatePatientAllergyMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PatientAllergy;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PatientAllergy;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      PatientAllergyControllerService.createPatientAllergy({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useMedicalCodeControllerServiceCreateMedicalCode = <
  TData = Common.MedicalCodeControllerServiceCreateMedicalCodeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: MedicalCode;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: MedicalCode;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      MedicalCodeControllerService.createMedicalCode({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useLocationControllerServiceCreateLocation = <
  TData = Common.LocationControllerServiceCreateLocationMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: Location;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: Location;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      LocationControllerService.createLocation({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useAvailabilityControllerServiceSetProviderAvailabilitySetting = <
  TData = Common.AvailabilityControllerServiceSetProviderAvailabilitySettingMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: AvailabilitySetting;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: AvailabilitySetting;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      AvailabilityControllerService.setProviderAvailabilitySetting({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceUpdateUserArchiveStatus = <
  TData = Common.UserControllerServiceUpdateUserArchiveStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        status: boolean;
        userId: string;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      status: boolean;
      userId: string;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ status, userId, xTenantId }) =>
      UserControllerService.updateUserArchiveStatus({
        status,
        userId,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceUpdateUser = <
  TData = Common.UserControllerServiceUpdateUserMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: User;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: User;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      UserControllerService.updateUser({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUserControllerServiceChangeAvatar3 = <
  TData = Common.UserControllerServiceChangeAvatar3MutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ChangeAvatarRequest;
        userUuid: string;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ChangeAvatarRequest;
      userUuid: string;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, userUuid, xTenantId }) =>
      UserControllerService.changeAvatar3({
        requestBody,
        userUuid,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useRolesAndPrivilegesControllerServiceUpdateRole = <
  TData = Common.RolesAndPrivilegesControllerServiceUpdateRoleMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: Role;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: Role;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      RolesAndPrivilegesControllerService.updateRole({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderControllerServiceUpdateProvider = <
  TData = Common.ProviderControllerServiceUpdateProviderMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: Provider;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: Provider;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      ProviderControllerService.updateProvider({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderControllerServiceUpdateProviderArchiveStatus = <
  TData = Common.ProviderControllerServiceUpdateProviderArchiveStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        providerId: string;
        status: boolean;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      providerId: string;
      status: boolean;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ providerId, status, xTenantId }) =>
      ProviderControllerService.updateProviderArchiveStatus({
        providerId,
        status,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderControllerServiceUploadVideo = <
  TData = Common.ProviderControllerServiceUploadVideoMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        providerUuid: string;
        requestBody?: { file: Blob | File };
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      providerUuid: string;
      requestBody?: { file: Blob | File };
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ providerUuid, requestBody, xTenantId }) =>
      ProviderControllerService.uploadVideo({
        providerUuid,
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderControllerServiceChangeAvatar = <
  TData = Common.ProviderControllerServiceChangeAvatarMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        providerUuid: string;
        requestBody: ChangeAvatarRequest;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      providerUuid: string;
      requestBody: ChangeAvatarRequest;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ providerUuid, requestBody, xTenantId }) =>
      ProviderControllerService.changeAvatar({
        providerUuid,
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderGroupControllerServiceUpdateProviderGroup = <
  TData = Common.ProviderGroupControllerServiceUpdateProviderGroupMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ProviderGroup;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ProviderGroup;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      ProviderGroupControllerService.updateProviderGroup({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderGroupControllerServiceSyncDatabaseSchema = <
  TData = Common.ProviderGroupControllerServiceSyncDatabaseSchemaMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        uuid: string;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      uuid: string;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ uuid, xTenantId }) =>
      ProviderGroupControllerService.syncDatabaseSchema({
        uuid,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderGroupControllerServiceUpdateProviderGroupArchiveStatus =
  <
    TData = Common.ProviderGroupControllerServiceUpdateProviderGroupArchiveStatusMutationResult,
    TError = unknown,
    TContext = unknown,
  >(
    options?: Omit<
      UseMutationOptions<
        TData,
        TError,
        {
          providerGroupId: string;
          status: boolean;
          xTenantId?: string;
        },
        TContext
      >,
      "mutationFn"
    >,
  ) =>
    useMutation<
      TData,
      TError,
      {
        providerGroupId: string;
        status: boolean;
        xTenantId?: string;
      },
      TContext
    >({
      mutationFn: ({ providerGroupId, status, xTenantId }) =>
        ProviderGroupControllerService.updateProviderGroupArchiveStatus({
          providerGroupId,
          status,
          xTenantId,
        }) as unknown as Promise<TData>,
      ...options,
    });
export const useProviderGroupControllerServiceChangeAvatar1 = <
  TData = Common.ProviderGroupControllerServiceChangeAvatar1MutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        providerGroupId: string;
        requestBody: ChangeAvatarRequest;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      providerGroupId: string;
      requestBody: ChangeAvatarRequest;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ providerGroupId, requestBody, xTenantId }) =>
      ProviderGroupControllerService.changeAvatar1({
        providerGroupId,
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientControllerServiceUpdatePatient = <
  TData = Common.PatientControllerServiceUpdatePatientMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: Patient;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: Patient;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      PatientControllerService.updatePatient({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientControllerServiceUpdatePatientArchiveStatus = <
  TData = Common.PatientControllerServiceUpdatePatientArchiveStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        patientId: string;
        status: boolean;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      patientId: string;
      status: boolean;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ patientId, status, xTenantId }) =>
      PatientControllerService.updatePatientArchiveStatus({
        patientId,
        status,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientControllerServiceChangeAvatar2 = <
  TData = Common.PatientControllerServiceChangeAvatar2MutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        patientUuid: string;
        requestBody: ChangeAvatarRequest;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      patientUuid: string;
      requestBody: ChangeAvatarRequest;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ patientUuid, requestBody, xTenantId }) =>
      PatientControllerService.changeAvatar2({
        patientUuid,
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientVitalControllerServiceUpdatePatientVital = <
  TData = Common.PatientVitalControllerServiceUpdatePatientVitalMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PatientVital;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PatientVital;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      PatientVitalControllerService.updatePatientVital({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientMedicationControllerServiceUpdatePatientMedication = <
  TData = Common.PatientMedicationControllerServiceUpdatePatientMedicationMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PatientMedication;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PatientMedication;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      PatientMedicationControllerService.updatePatientMedication({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientMedicationControllerServiceDeletePatientMedicationId = <
  TData = Common.PatientMedicationControllerServiceDeletePatientMedicationIdMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        patientMedicationId: string;
        status?: boolean;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      patientMedicationId: string;
      status?: boolean;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ patientMedicationId, status, xTenantId }) =>
      PatientMedicationControllerService.deletePatientMedicationId({
        patientMedicationId,
        status,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useConsentFormControllerServiceUpdatePatientConsentStatus = <
  TData = Common.ConsentFormControllerServiceUpdatePatientConsentStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        patientUuid: string;
        status: boolean;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      patientUuid: string;
      status: boolean;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ patientUuid, status, xTenantId }) =>
      ConsentFormControllerService.updatePatientConsentStatus({
        patientUuid,
        status,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useConsentFormControllerServiceUpdateConsentForms = <
  TData = Common.ConsentFormControllerServiceUpdateConsentFormsMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ConsentFormTemplate;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ConsentFormTemplate;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      ConsentFormControllerService.updateConsentForms({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useConsentFormControllerServiceUpdateConsentFormArchiveStatus = <
  TData = Common.ConsentFormControllerServiceUpdateConsentFormArchiveStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        consentFormId: string;
        status: boolean;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      consentFormId: string;
      status: boolean;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ consentFormId, status, xTenantId }) =>
      ConsentFormControllerService.updateConsentFormArchiveStatus({
        consentFormId,
        status,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientAllergyControllerServiceUpdatePatientAllergy = <
  TData = Common.PatientAllergyControllerServiceUpdatePatientAllergyMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PatientAllergy;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PatientAllergy;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      PatientAllergyControllerService.updatePatientAllergy({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const usePatientAllergyControllerServiceUpdatePatientAllergyArchiveStatus =
  <
    TData = Common.PatientAllergyControllerServiceUpdatePatientAllergyArchiveStatusMutationResult,
    TError = unknown,
    TContext = unknown,
  >(
    options?: Omit<
      UseMutationOptions<
        TData,
        TError,
        {
          patientAllergyId: string;
          status: boolean;
          xTenantId?: string;
        },
        TContext
      >,
      "mutationFn"
    >,
  ) =>
    useMutation<
      TData,
      TError,
      {
        patientAllergyId: string;
        status: boolean;
        xTenantId?: string;
      },
      TContext
    >({
      mutationFn: ({ patientAllergyId, status, xTenantId }) =>
        PatientAllergyControllerService.updatePatientAllergyArchiveStatus({
          patientAllergyId,
          status,
          xTenantId,
        }) as unknown as Promise<TData>,
      ...options,
    });
export const useMedicalCodeControllerServiceUpdateMedicalCode = <
  TData = Common.MedicalCodeControllerServiceUpdateMedicalCodeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: MedicalCode;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: MedicalCode;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      MedicalCodeControllerService.updateMedicalCode({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useMedicalCodeControllerServiceUpdateMedicalCodeStatus = <
  TData = Common.MedicalCodeControllerServiceUpdateMedicalCodeStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        medicalCodeId: string;
        status: boolean;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      medicalCodeId: string;
      status: boolean;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ medicalCodeId, status, xTenantId }) =>
      MedicalCodeControllerService.updateMedicalCodeStatus({
        medicalCodeId,
        status,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useMedicalCodeControllerServiceUpdateMedicalCodeArchiveStatus = <
  TData = Common.MedicalCodeControllerServiceUpdateMedicalCodeArchiveStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        medicalCodeId: string;
        status: boolean;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      medicalCodeId: string;
      status: boolean;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ medicalCodeId, status, xTenantId }) =>
      MedicalCodeControllerService.updateMedicalCodeArchiveStatus({
        medicalCodeId,
        status,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useLocationControllerServiceUpdateLocation = <
  TData = Common.LocationControllerServiceUpdateLocationMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: Location;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: Location;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ requestBody, xTenantId }) =>
      LocationControllerService.updateLocation({
        requestBody,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useLocationControllerServiceUpdateLocationArchiveStatus = <
  TData = Common.LocationControllerServiceUpdateLocationArchiveStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        locationId: string;
        status: boolean;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      locationId: string;
      status: boolean;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ locationId, status, xTenantId }) =>
      LocationControllerService.updateLocationArchiveStatus({
        locationId,
        status,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useProviderControllerServiceDeleteVideo = <
  TData = Common.ProviderControllerServiceDeleteVideoMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        providerUuid: string;
        xTenantId?: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      providerUuid: string;
      xTenantId?: string;
    },
    TContext
  >({
    mutationFn: ({ providerUuid, xTenantId }) =>
      ProviderControllerService.deleteVideo({
        providerUuid,
        xTenantId,
      }) as unknown as Promise<TData>,
    ...options,
  });
