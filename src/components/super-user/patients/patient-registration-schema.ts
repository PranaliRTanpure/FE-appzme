import * as yup from "yup";
import {
  addressLine1Max128ErrorMsg,
  addressLine1RequiredErrorMsg,
  birthDateRequiredErrorMsg,
  cityMax64ErrorMsg,
  cityRequiredErrorMsg,
  cityStateRegexErrorMsg,
  countryRequiredErrorMsg,
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
  firstName: yup
    .string()
    .required(firstNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  middleNameInitial: yup.string(),
  lastName: yup
    .string()
    .required(lastNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  dateOfBirth: yup.string().required(birthDateRequiredErrorMsg),
  gender: yup.string().required(genderRequiredErrorMessage),
  primaryLanguage: yup.string().required(),
  height: yup.string().nullable().required(heightRequiredErrorMsg),
  weight: yup.string().nullable().required(),
  specialNeeds: yup.string().required(specialNeedsRequiredErrorMsg),
  employed: yup.string(),
  patientPortal: yup.string(),
  avatar: yup.string(),
  homePhone: yup
    .string()
    .required(phoneRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  workPhone: yup
    .string()
    .required(phoneRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  cellPhone: yup
    .string()
    .required(phoneRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  email: yup
    .string()
    .required(emailRequiredErrorMsg)
    .matches(emailRegExp, phoneRegexErrorMsg),
  address: yup.object().shape({
    line1: yup
      .string()
      .max(128, addressLine1Max128ErrorMsg)
      .required(addressLine1RequiredErrorMsg),
    line2: yup.string().max(128, addressLine1Max128ErrorMsg),
    city: yup
      .string()
      .max(64, cityMax64ErrorMsg)
      .required(cityRequiredErrorMsg)
      .matches(cityStateRgex, cityStateRegexErrorMsg),
    state: yup
      .string()
      .max(50, lessThan255ErrorMsg)
      .required(stateRequiredErrorMsg)
      .matches(cityStateRgex, cityStateRegexErrorMsg),
    zipcode: yup
      .string()
      .required(zipCodeRequiredErrorMsg)
      .matches(zipCodeRegex, zipCodeRegexErrorMsg),
    country: yup.string().required(countryRequiredErrorMsg),
  }),
  emergencyContact: yup
    .array()
    .of(
      yup.object().shape({
        relationshipWithPatient: yup.string(),
        fullName: yup.string(),
        mobile: yup.string().matches(phoneRegex, phoneRegexErrorMsg),
      }),
    )
    .min(1, ""),
  declineTextMessage: yup.string(),
  authorisationForEmail: yup.string(),
});
