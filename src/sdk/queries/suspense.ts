// generated with @7nohe/openapi-react-query-codegen@1.4.1

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
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
import * as Common from "./common";
export const useUserControllerServiceGetAllUsersSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useUserControllerServiceGetUserSuspense = <
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
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseUserControllerServiceGetUserKeyFn(
      { userId, xTenantId },
      queryKey,
    ),
    queryFn: () =>
      UserControllerService.getUser({ userId, xTenantId }) as TData,
    ...options,
  });
export const useUserControllerServiceGetProfile1Suspense = <
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
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseUserControllerServiceGetProfile1KeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () => UserControllerService.getProfile1({ xTenantId }) as TData,
    ...options,
  });
export const useRolesAndPrivilegesControllerServiceGetAllRolesSuspense = <
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
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseRolesAndPrivilegesControllerServiceGetAllRolesKeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () =>
      RolesAndPrivilegesControllerService.getAllRoles({ xTenantId }) as TData,
    ...options,
  });
export const useRolesAndPrivilegesControllerServiceGetAllPrivilegesSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useProviderControllerServiceGetAllProvidersSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useProviderControllerServiceGetProviderByIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useProviderControllerServiceGetProfileSuspense = <
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
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseProviderControllerServiceGetProfileKeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () => ProviderControllerService.getProfile({ xTenantId }) as TData,
    ...options,
  });
export const useProviderGroupControllerServiceGetAllProviderGroupsSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useProviderGroupControllerServiceGetProviderGroupByIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePatientControllerServiceGetAllPatientSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePatientControllerServiceGetPatientByIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePatientControllerServiceGetProfile2Suspense = <
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
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetProfile2KeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () => PatientControllerService.getProfile2({ xTenantId }) as TData,
    ...options,
  });
export const usePatientControllerServiceDownloadTemplateSuspense = <
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
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceDownloadTemplateKeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () =>
      PatientControllerService.downloadTemplate({ xTenantId }) as TData,
    ...options,
  });
export const usePatientVitalControllerServiceGetPatientVitals1Suspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePatientVitalControllerServiceGetPatientVitalByIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePatientVitalControllerServiceGetPatientLatestVitalsSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePatientMedicationControllerServiceGetPatientMedicationSuspense =
  <
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
    useSuspenseQuery<TData, TError>({
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
export const usePatientMedicationControllerServiceGetPatientMedicationByIdSuspense =
  <
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
    useSuspenseQuery<TData, TError>({
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
export const useConsentFormControllerServiceGetAllConsentFormTemplateSuspense =
  <
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
    useSuspenseQuery<TData, TError>({
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
export const useConsentFormControllerServiceGetAllPatientConsentFormSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useConsentFormControllerServiceGetPatientConsentFormByIdSuspense =
  <
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
    useSuspenseQuery<TData, TError>({
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
export const useConsentFormControllerServiceGetConsentFormIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePatientAllergyControllerServiceGetPatientAllergySuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePatientAllergyControllerServiceGetPatientAllergyByIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useMedicalCodeControllerServiceGetMedicalCodesSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useMedicalCodeControllerServiceGetMedicalCodeByIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useLocationControllerServiceGetAllLocationsSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useLocationControllerServiceGetLocationByIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useAvailabilityControllerServiceGetProviderAvailabilitySettingSuspense =
  <
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
    useSuspenseQuery<TData, TError>({
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
export const useVitalControllerServiceGetPatientVitalsSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useLicenseStateControllerServiceGetAllLicensedStatesSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useEhrControllerServiceGetPractitionerByProviderIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useEhrControllerServiceGetOrganizationByPracticeIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useEhrControllerServiceGetLocationByLocationIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useEhrControllerServiceGetAccessToken1Suspense = <
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
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseEhrControllerServiceGetAccessToken1KeyFn(
      { xTenantId },
      queryKey,
    ),
    queryFn: () => EhrControllerService.getAccessToken1({ xTenantId }) as TData,
    ...options,
  });
