import * as yup from "yup";
import {
  addressLine1Max128ErrorMsg,
  addressLine1RequiredErrorMsg,
  birthDateRequiredErrorMsg,
  cityRequiredErrorMsg,
  cityStateRegexErrorMsg,
  countryRequiredErrorMsg,
  emailRegexErrorMsg,
  emailRequiredErrorMsg,
  firstNameOrSurnameRegexErrorMsg,
  firstNameRequiredErrorMsg,
  genderRequiredErrorMessage,
  heightRequiredErrorMsg,
  lastNameRequiredErrorMsg,
  lessThan255ErrorMsg,
  phoneRegexErrorMsg,
  phoneRequiredErrorMsg,
  specialNeedsRequiredErrorMsg,
  stateRequiredErrorMsg,
  zipCodeRegexErrorMsg,
  zipCodeRequiredErrorMsg,
} from "../../../constants/error-messages";
import {
  cityStateRgex,
  emailRegExp,
  nameRegex,
  phoneRegex,
  zipCodeRegex,
} from "../../../utils/regex";

export const patientRegistrationFormSchema = yup.object().shape({
  activeStep: yup.string(),

  firstName: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "0") {
      return yup
        .string()
        .required(firstNameRequiredErrorMsg)
        .matches(nameRegex, firstNameOrSurnameRegexErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  middleNameInitial: yup.string(),
  lastName: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "0") {
      return yup
        .string()
        .required(lastNameRequiredErrorMsg)
        .matches(nameRegex, firstNameOrSurnameRegexErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  dateOfBirth: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "0") {
      return yup.string().required(birthDateRequiredErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),

  gender: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "0") {
      return yup.string().required(genderRequiredErrorMessage);
    } else {
      return yup.string().notRequired();
    }
  }),
  primaryLanguage: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "0") {
      return yup.string().required("");
    } else {
      return yup.string().notRequired();
    }
  }),
  height: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "0") {
      return yup.string().nullable().required(heightRequiredErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  weight: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "0") {
      return yup.string().nullable().required(heightRequiredErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  specialNeeds: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "0") {
      return yup.string().nullable().required(specialNeedsRequiredErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  employed: yup.string(),
  patientPortal: yup.string(),
  avatar: yup.string(),
  homePhone: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "1") {
      return yup
        .string()
        .nullable()
        .required(phoneRequiredErrorMsg)
        .matches(phoneRegex, phoneRegexErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  workPhone: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "1") {
      return yup
        .string()
        .nullable()
        .required(phoneRequiredErrorMsg)
        .matches(phoneRegex, phoneRegexErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  cellPhone: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "1") {
      return yup
        .string()
        .nullable()
        .required(phoneRequiredErrorMsg)
        .matches(phoneRegex, phoneRegexErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  email: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "1") {
      return yup
        .string()
        .required(emailRequiredErrorMsg)
        .matches(emailRegExp, emailRegexErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),

  line1: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "1") {
      return yup
        .string()
        .max(128, addressLine1Max128ErrorMsg)
        .required(addressLine1RequiredErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),

  line2: yup.string().max(128, addressLine1Max128ErrorMsg),
  city: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "1") {
      return yup
        .string()
        .required(cityRequiredErrorMsg)
        .matches(cityStateRgex, cityStateRegexErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  state: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "1") {
      return yup
        .string()
        .required(stateRequiredErrorMsg)
        .max(50, lessThan255ErrorMsg)
        .matches(cityStateRgex, cityStateRegexErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),

  zipcode: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "1") {
      return yup
        .string()
        .required(zipCodeRequiredErrorMsg)
        .max(50, lessThan255ErrorMsg)
        .matches(zipCodeRegex, zipCodeRegexErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),

  country: yup.string().when("activeStep", (activeStepVal) => {
    if (activeStepVal[0] === "1") {
      return yup
        .string()
        .required(countryRequiredErrorMsg)
        .max(50, lessThan255ErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  emergencyContact: yup
    .array()
    .of(
      yup.object().shape({
        relationshipWithPatient: yup.string(),
        fullName: yup.string(),
        mobile: yup.string(),
      }),
    )
    .min(1, ""),
  declineTextMessage: yup.string(),
  authorisationForEmail: yup.string(),
  orderingPoviderName: yup.string(),
  orderingPoviderSpeciality: yup.string(),

  orderingPoviderPhone: yup.string(),
  orderingPoviderFax: yup.string(),
  orderingPoviderTaxId: yup.string(),
  orderingPoviderNPI: yup.string(),

  orderingPoviderAddressLine1: yup.string(),
  orderingPoviderAddressLine2: yup.string(),
  orderingPoviderAddressCity: yup.string(),
  orderingPoviderAddressState: yup.string(),
  orderingPoviderAddressZipcode: yup.string(),

  millenniumProviderName: yup.string(),
  millenniumProviderSpeciality: yup.string(),
  millenniumProviderPhone: yup.string(),
  millenniumProviderFax: yup.string(),
  millenniumProviderTaxId: yup.string(),
  millenniumProviderNpi: yup.string(),

  millenniumProviderAddressLine1: yup.string(),
  millenniumProviderAddressLine2: yup.string(),
  millenniumProviderCity: yup.string(),
  millenniumProviderState: yup.string(),
  millenniumProviderZipcode: yup.string(),

  dentalProviderDetailsProviderName: yup.string(),
  dentalProviderDetailsProviderSpeciality: yup.string(),
  dentalProviderDetailsProviderPhone: yup.string(),
  dentalProviderDetailsProviderFax: yup.string(),
  dentalProviderDetailsProviderEmail: yup.string(),
  dentalProviderDetailsProviderAssistantEmail: yup.string(),
  otherContactsPreferredDME: yup.string(),
  otherContactsSleepLab: yup.string(),
  otherContactsOtherProviders: yup.string(),
  otherContactsRegionalManager: yup.string(),
  otherContactsMarketingRep: yup.string(),
  otherContactsSleepAdvisor: yup.string(),
});

export const initialValuesPatientRegistration = {
  activeStep: "0",
  firstName: "",
  middleNameInitial: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  primaryLanguage: "",
  height: "",
  weight: "",
  specialNeeds: "",
  employed: "",
  patientPortal: "",
  avatar: "",

  homePhone: "",
  workPhone: "",
  cellPhone: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  zipcode: "",
  country: "USA",
  emergencyContact: [
    {
      relationshipWithPatient: "",
      fullName: "",
      mobile: "",
    },
  ],

  declineTextMessage: "",
  authorisationForEmail: "",

  orderingPoviderName: "",
  orderingPoviderSpeciality: "",

  orderingPoviderPhone: "",
  orderingPoviderFax: "",
  orderingPoviderTaxId: "",
  orderingPoviderNPI: "",

  orderingPoviderAddressLine1: "",
  orderingPoviderAddressLine2: "",
  orderingPoviderAddressCity: "",
  orderingPoviderAddressState: "",
  orderingPoviderAddressZipcode: "",

  millenniumProviderName: "",
  millenniumProviderSpeciality: "",
  millenniumProviderPhone: "",
  millenniumProviderFax: "",
  millenniumProviderTaxId: "",
  millenniumProviderNpi: "",
  millenniumProviderAddressLine1: "",
  millenniumProviderAddressLine2: "",
  millenniumProviderCity: "",
  millenniumProviderState: "",
  millenniumProviderZipcode: "",

  dentalProviderDetailsProviderName: "",
  dentalProviderDetailsProviderSpeciality: "",
  dentalProviderDetailsProviderPhone: "",
  dentalProviderDetailsProviderFax: "",
  dentalProviderDetailsProviderEmail: "",
  dentalProviderDetailsProviderAssistantEmail: "",
  otherContactsPreferredDME: "",
  otherContactsSleepLab: "",
  otherContactsOtherProviders: "",
  otherContactsRegionalManager: "",
  otherContactsMarketingRep: "",
  otherContactsSleepAdvisor: "",
};
