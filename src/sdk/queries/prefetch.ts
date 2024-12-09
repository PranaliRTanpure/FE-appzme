// generated with @7nohe/openapi-react-query-codegen@1.4.1

import { type QueryClient } from "@tanstack/react-query";
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
export const prefetchUseUserControllerServiceGetAllUsers = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseUserControllerServiceGetAllUsersKeyFn({
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
    }),
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
      }),
  });
export const prefetchUseUserControllerServiceGetUser = (
  queryClient: QueryClient,
  {
    userId,
    xTenantId,
  }: {
    userId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseUserControllerServiceGetUserKeyFn({
      userId,
      xTenantId,
    }),
    queryFn: () => UserControllerService.getUser({ userId, xTenantId }),
  });
export const prefetchUseUserControllerServiceGetProfile1 = (
  queryClient: QueryClient,
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseUserControllerServiceGetProfile1KeyFn({ xTenantId }),
    queryFn: () => UserControllerService.getProfile1({ xTenantId }),
  });
export const prefetchUseRolesAndPrivilegesControllerServiceGetAllRoles = (
  queryClient: QueryClient,
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseRolesAndPrivilegesControllerServiceGetAllRolesKeyFn({
      xTenantId,
    }),
    queryFn: () =>
      RolesAndPrivilegesControllerService.getAllRoles({ xTenantId }),
  });
export const prefetchUseRolesAndPrivilegesControllerServiceGetAllPrivileges = (
  queryClient: QueryClient,
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey:
      Common.UseRolesAndPrivilegesControllerServiceGetAllPrivilegesKeyFn({
        xTenantId,
      }),
    queryFn: () =>
      RolesAndPrivilegesControllerService.getAllPrivileges({ xTenantId }),
  });
export const prefetchUseProviderControllerServiceGetAllProviders = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseProviderControllerServiceGetAllProvidersKeyFn({
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
    }),
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
      }),
  });
export const prefetchUseProviderControllerServiceGetProviderById = (
  queryClient: QueryClient,
  {
    providerUuid,
    xTenantId,
  }: {
    providerUuid: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseProviderControllerServiceGetProviderByIdKeyFn({
      providerUuid,
      xTenantId,
    }),
    queryFn: () =>
      ProviderControllerService.getProviderById({ providerUuid, xTenantId }),
  });
export const prefetchUseProviderControllerServiceGetProfile = (
  queryClient: QueryClient,
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseProviderControllerServiceGetProfileKeyFn({ xTenantId }),
    queryFn: () => ProviderControllerService.getProfile({ xTenantId }),
  });
export const prefetchUseProviderGroupControllerServiceGetAllProviderGroups = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
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
      }),
  });
export const prefetchUseProviderGroupControllerServiceGetProviderGroupById = (
  queryClient: QueryClient,
  {
    providerGroupId,
    xTenantId,
  }: {
    providerGroupId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseProviderGroupControllerServiceGetProviderGroupByIdKeyFn(
      { providerGroupId, xTenantId },
    ),
    queryFn: () =>
      ProviderGroupControllerService.getProviderGroupById({
        providerGroupId,
        xTenantId,
      }),
  });
export const prefetchUsePatientControllerServiceGetAllPatient = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientControllerServiceGetAllPatientKeyFn({
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
    }),
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
      }),
  });
export const prefetchUsePatientControllerServiceGetPatientById = (
  queryClient: QueryClient,
  {
    patientUuid,
    xTenantId,
  }: {
    patientUuid: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientControllerServiceGetPatientByIdKeyFn({
      patientUuid,
      xTenantId,
    }),
    queryFn: () =>
      PatientControllerService.getPatientById({ patientUuid, xTenantId }),
  });
export const prefetchUsePatientControllerServiceGetProfile2 = (
  queryClient: QueryClient,
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientControllerServiceGetProfile2KeyFn({ xTenantId }),
    queryFn: () => PatientControllerService.getProfile2({ xTenantId }),
  });
export const prefetchUsePatientControllerServiceDownloadTemplate = (
  queryClient: QueryClient,
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientControllerServiceDownloadTemplateKeyFn({
      xTenantId,
    }),
    queryFn: () => PatientControllerService.downloadTemplate({ xTenantId }),
  });
export const prefetchUsePatientVitalControllerServiceGetPatientVitals1 = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientVitalControllerServiceGetPatientVitals1KeyFn({
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
    }),
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
      }),
  });
export const prefetchUsePatientVitalControllerServiceGetPatientVitalById = (
  queryClient: QueryClient,
  {
    patientVitalId,
    xTenantId,
  }: {
    patientVitalId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientVitalControllerServiceGetPatientVitalByIdKeyFn({
      patientVitalId,
      xTenantId,
    }),
    queryFn: () =>
      PatientVitalControllerService.getPatientVitalById({
        patientVitalId,
        xTenantId,
      }),
  });
export const prefetchUsePatientVitalControllerServiceGetPatientLatestVitals = (
  queryClient: QueryClient,
  {
    patientUuid,
    xTenantId,
  }: {
    patientUuid: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey:
      Common.UsePatientVitalControllerServiceGetPatientLatestVitalsKeyFn({
        patientUuid,
        xTenantId,
      }),
    queryFn: () =>
      PatientVitalControllerService.getPatientLatestVitals({
        patientUuid,
        xTenantId,
      }),
  });
export const prefetchUsePatientMedicationControllerServiceGetPatientMedication =
  (
    queryClient: QueryClient,
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
  ) =>
    queryClient.prefetchQuery({
      queryKey:
        Common.UsePatientMedicationControllerServiceGetPatientMedicationKeyFn({
          archive,
          page,
          patientUuid,
          searchString,
          size,
          sort,
          sortBy,
          status,
          xTenantId,
        }),
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
        }),
    });
export const prefetchUsePatientMedicationControllerServiceGetPatientMedicationById =
  (
    queryClient: QueryClient,
    {
      patientMedicationId,
      xTenantId,
    }: {
      patientMedicationId: string;
      xTenantId?: string;
    },
  ) =>
    queryClient.prefetchQuery({
      queryKey:
        Common.UsePatientMedicationControllerServiceGetPatientMedicationByIdKeyFn(
          { patientMedicationId, xTenantId },
        ),
      queryFn: () =>
        PatientMedicationControllerService.getPatientMedicationById({
          patientMedicationId,
          xTenantId,
        }),
    });
export const prefetchUseConsentFormControllerServiceGetAllConsentFormTemplate =
  (
    queryClient: QueryClient,
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
  ) =>
    queryClient.prefetchQuery({
      queryKey:
        Common.UseConsentFormControllerServiceGetAllConsentFormTemplateKeyFn({
          archive,
          page,
          searchString,
          size,
          sortBy,
          sortDirection,
          status,
          xTenantId,
        }),
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
        }),
    });
export const prefetchUseConsentFormControllerServiceGetAllPatientConsentForm = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey:
      Common.UseConsentFormControllerServiceGetAllPatientConsentFormKeyFn({
        page,
        patientUuid,
        searchString,
        size,
        sortBy,
        sortDirection,
        xTenantId,
      }),
    queryFn: () =>
      ConsentFormControllerService.getAllPatientConsentForm({
        page,
        patientUuid,
        searchString,
        size,
        sortBy,
        sortDirection,
        xTenantId,
      }),
  });
export const prefetchUseConsentFormControllerServiceGetPatientConsentFormById =
  (
    queryClient: QueryClient,
    {
      patientConsentFormUuid,
      xTenantId,
    }: {
      patientConsentFormUuid: string;
      xTenantId?: string;
    },
  ) =>
    queryClient.prefetchQuery({
      queryKey:
        Common.UseConsentFormControllerServiceGetPatientConsentFormByIdKeyFn({
          patientConsentFormUuid,
          xTenantId,
        }),
      queryFn: () =>
        ConsentFormControllerService.getPatientConsentFormById({
          patientConsentFormUuid,
          xTenantId,
        }),
    });
export const prefetchUseConsentFormControllerServiceGetConsentFormId = (
  queryClient: QueryClient,
  {
    consentFormId,
    xTenantId,
  }: {
    consentFormId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseConsentFormControllerServiceGetConsentFormIdKeyFn({
      consentFormId,
      xTenantId,
    }),
    queryFn: () =>
      ConsentFormControllerService.getConsentFormId({
        consentFormId,
        xTenantId,
      }),
  });
export const prefetchUsePatientAllergyControllerServiceGetPatientAllergy = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientAllergyControllerServiceGetPatientAllergyKeyFn({
      archive,
      page,
      patientUuid,
      searchString,
      size,
      sort,
      sortBy,
      status,
      xTenantId,
    }),
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
      }),
  });
export const prefetchUsePatientAllergyControllerServiceGetPatientAllergyById = (
  queryClient: QueryClient,
  {
    patientAllergyId,
    xTenantId,
  }: {
    patientAllergyId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey:
      Common.UsePatientAllergyControllerServiceGetPatientAllergyByIdKeyFn({
        patientAllergyId,
        xTenantId,
      }),
    queryFn: () =>
      PatientAllergyControllerService.getPatientAllergyById({
        patientAllergyId,
        xTenantId,
      }),
  });
export const prefetchUseMedicalCodeControllerServiceGetMedicalCodes = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseMedicalCodeControllerServiceGetMedicalCodesKeyFn({
      active,
      archive,
      page,
      searchString,
      size,
      sort,
      sortBy,
      type,
      xTenantId,
    }),
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
      }),
  });
export const prefetchUseMedicalCodeControllerServiceGetMedicalCodeById = (
  queryClient: QueryClient,
  {
    medicalCodeId,
    xTenantId,
  }: {
    medicalCodeId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseMedicalCodeControllerServiceGetMedicalCodeByIdKeyFn({
      medicalCodeId,
      xTenantId,
    }),
    queryFn: () =>
      MedicalCodeControllerService.getMedicalCodeById({
        medicalCodeId,
        xTenantId,
      }),
  });
export const prefetchUseLocationControllerServiceGetAllLocations = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseLocationControllerServiceGetAllLocationsKeyFn({
      archive,
      page,
      searchString,
      size,
      sortBy,
      sortDirection,
      state,
      status,
      xTenantId,
    }),
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
      }),
  });
export const prefetchUseLocationControllerServiceGetLocationById = (
  queryClient: QueryClient,
  {
    locationId,
    xTenantId,
  }: {
    locationId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseLocationControllerServiceGetLocationByIdKeyFn({
      locationId,
      xTenantId,
    }),
    queryFn: () =>
      LocationControllerService.getLocationById({ locationId, xTenantId }),
  });
export const prefetchUseAvailabilityControllerServiceGetProviderAvailabilitySetting =
  (
    queryClient: QueryClient,
    {
      providerUuid,
      xTenantId,
    }: {
      providerUuid: string;
      xTenantId?: string;
    },
  ) =>
    queryClient.prefetchQuery({
      queryKey:
        Common.UseAvailabilityControllerServiceGetProviderAvailabilitySettingKeyFn(
          { providerUuid, xTenantId },
        ),
      queryFn: () =>
        AvailabilityControllerService.getProviderAvailabilitySetting({
          providerUuid,
          xTenantId,
        }),
    });
export const prefetchUseVitalControllerServiceGetPatientVitals = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseVitalControllerServiceGetPatientVitalsKeyFn({
      page,
      searchString,
      size,
      sort,
      sortBy,
      xTenantId,
    }),
    queryFn: () =>
      VitalControllerService.getPatientVitals({
        page,
        searchString,
        size,
        sort,
        sortBy,
        xTenantId,
      }),
  });
export const prefetchUseLicenseStateControllerServiceGetAllLicensedStates = (
  queryClient: QueryClient,
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
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseLicenseStateControllerServiceGetAllLicensedStatesKeyFn({
      page,
      searchString,
      size,
      sortBy,
      sortDirection,
      xTenantId,
    }),
    queryFn: () =>
      LicenseStateControllerService.getAllLicensedStates({
        page,
        searchString,
        size,
        sortBy,
        sortDirection,
        xTenantId,
      }),
  });
export const prefetchUseEhrControllerServiceGetPractitionerByProviderId = (
  queryClient: QueryClient,
  {
    practitionerId,
    xTenantId,
  }: {
    practitionerId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseEhrControllerServiceGetPractitionerByProviderIdKeyFn({
      practitionerId,
      xTenantId,
    }),
    queryFn: () =>
      EhrControllerService.getPractitionerByProviderId({
        practitionerId,
        xTenantId,
      }),
  });
export const prefetchUseEhrControllerServiceGetOrganizationByPracticeId = (
  queryClient: QueryClient,
  {
    practiceId,
    xTenantId,
  }: {
    practiceId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseEhrControllerServiceGetOrganizationByPracticeIdKeyFn({
      practiceId,
      xTenantId,
    }),
    queryFn: () =>
      EhrControllerService.getOrganizationByPracticeId({
        practiceId,
        xTenantId,
      }),
  });
export const prefetchUseEhrControllerServiceGetLocationByLocationId = (
  queryClient: QueryClient,
  {
    locationId,
    xTenantId,
  }: {
    locationId: string;
    xTenantId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseEhrControllerServiceGetLocationByLocationIdKeyFn({
      locationId,
      xTenantId,
    }),
    queryFn: () =>
      EhrControllerService.getLocationByLocationId({ locationId, xTenantId }),
  });
export const prefetchUseEhrControllerServiceGetAccessToken1 = (
  queryClient: QueryClient,
  {
    xTenantId,
  }: {
    xTenantId?: string;
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseEhrControllerServiceGetAccessToken1KeyFn({ xTenantId }),
    queryFn: () => EhrControllerService.getAccessToken1({ xTenantId }),
  });
