import * as yup from "yup";

import {
  addressLine1Max128ErrorMsg,
  addressLine1RequiredErrorMsg,
  alternatePhoneRequiredErrorMsg,
  cityMax64ErrorMsg,
  cityStateRegexErrorMsg,
  emailRequiredErrorMsg,
  lessThan255ErrorMsg,
  phoneRegexErrorMsg,
  phoneRequiredErrorMsg,
  stateRequiredErrorMsg,
  zipCodeRegexErrorMsg,
  zipCodeRequiredErrorMsg,
} from "@/constants/error-messages";
import { cityStateRgex, emailRegExp, phoneRegex, zipCodeRegex } from "@/utils/regex";

export const addStaffFormSchema = yup.object().shape({
  firstName: yup.string().required("First Name required"),
  middleInitial: yup.string(),
  lastName: yup.string().required("Last Name required"),
  organization: yup.string(),
  role: yup.string(),
  avatar: yup.string(),
  alternatePhone: yup.string().required(alternatePhoneRequiredErrorMsg).matches(phoneRegex, phoneRegexErrorMsg),
  phone: yup
    .string()
    // .required(phoneRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  email: yup.string().required("email required"),
  // email: yup
  //   .string()
  //   .required(emailRequiredErrorMsg)
  //   .matches(emailRegExp, phoneRegexErrorMsg),
  address: yup.object().shape({
    line1: yup
      .string()
      //   .required(addressLine1RequiredErrorMsg)
      .max(128, addressLine1Max128ErrorMsg),
    line2: yup.string().max(128, addressLine1Max128ErrorMsg),
    city: yup
      .string()
      .max(64, cityMax64ErrorMsg)
      //   .required(cityRequiredErrorMsg)
      .matches(cityStateRgex, cityStateRegexErrorMsg),
    state: yup
      .string()
      .max(50, lessThan255ErrorMsg)
      //   .required(stateRequiredErrorMsg)
      .matches(cityStateRgex, cityStateRegexErrorMsg),
    zipcode: yup
      .string()
      //   .required(zipCodeRequiredErrorMsg)
      .matches(zipCodeRegex, zipCodeRegexErrorMsg),
  }),
});

export const addProviderFormSchema = yup.object().shape({
  licenseDetails: yup
    .array()
    .of(
      yup.object().shape({
        licensedNumber: yup.string().required("Licensed Number reruired"),
        licenseExpiry: yup
          .string()
          .typeError("License expiry date is required")
          .required("License expiry date is required"),
        licensedState: yup.string().required("Licensed State reruired"),
      })
    )
    .min(1, "At least one Liscense detail is required"),
  firstName: yup.string().required("First Name required"),
  middleInitial: yup.string(),
  lastName: yup.string().required("Last Name required"),
  organization: yup.string().required("Organization Required"),
  suffix: yup.string().required("Suffix required"),
  avatar: yup.string(),
  clinicLocation: yup.string().required("Clinic Location reruired"),
  providerType: yup.string().required("Provider Type required"),
  supervisingProvider: yup.string(),
  npi: yup.string().required("Npi required"),
  speciality: yup.string(),
  fax: yup.string(),
  alternatePhone: yup.string().required(alternatePhoneRequiredErrorMsg).matches(phoneRegex, phoneRegexErrorMsg),
  phone: yup.string().required(phoneRequiredErrorMsg).matches(phoneRegex, phoneRegexErrorMsg),
  email: yup.string().required(emailRequiredErrorMsg).matches(emailRegExp, phoneRegexErrorMsg),
  address: yup.object().shape({
    line1: yup.string().required(addressLine1RequiredErrorMsg).max(128, addressLine1Max128ErrorMsg),
    line2: yup.string().max(128, addressLine1Max128ErrorMsg),
    city: yup
      .string()
      .max(64, cityMax64ErrorMsg)
      //   .required(cityRequiredErrorMsg)
      .matches(cityStateRgex, cityStateRegexErrorMsg),
    state: yup
      .string()
      .max(50, lessThan255ErrorMsg)
      .required(stateRequiredErrorMsg)
      .matches(cityStateRgex, cityStateRegexErrorMsg),
    zipcode: yup.string().required(zipCodeRequiredErrorMsg).matches(zipCodeRegex, zipCodeRegexErrorMsg),
  }),
  defaultDentalProvider: yup.string(),
  preferredDme: yup.string(),
  defaultPreferredLab: yup.string(),
  preferredHstDevice: yup.string(),
});
