import * as yup from "yup";
import {
  addressLine1Max128ErrorMsg,
  addressLine1RequiredErrorMsg,
  cityMax64ErrorMsg,
  cityRequiredErrorMsg,
  cityStateRegexErrorMsg,
  countryRequiredErrorMsg,
  emailRegexErrorMsg,
  emailRequiredErrorMsg,
  firstNameOrSurnameRegexErrorMsg,
  firstNameRequiredErrorMsg,
  genderRequiredErrorMessage,
  lastNameRequiredErrorMsg,
  lessThan255ErrorMsg,
  licenseStatesRequiredErrorMsg,
  npiRegexErrorMsg,
  npiRequiredErrorMsg,
  phoneRegexErrorMsg,
  phoneRequiredErrorMsg,
  stateRequiredErrorMsg,
  zipCodeRegexErrorMsg,
  zipCodeRequiredErrorMsg,
} from "../../../../constants/error-messages";
import {
  cityStateRgex,
  emailRegExp,
  nameRegex,
  npiRegExp,
  phoneRegex,
  zipCodeRegex,
} from "../../../../utils/regex";

export const manualEntryFormSchema = yup.object().shape({
  gender: yup.string().required(genderRequiredErrorMessage),
  firstName: yup
    .string()
    .required(firstNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  lastName: yup
    .string()
    .required(lastNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  npi: yup
    .string()
    .required(npiRequiredErrorMsg)
    .matches(npiRegExp, npiRegexErrorMsg),
  phone: yup
    .string()
    .required(phoneRequiredErrorMsg)
    .transform((value) => (value === "" ? null : value))
    .matches(phoneRegex, phoneRegexErrorMsg),
  prefix: yup.string().transform((value) => (value === "" ? null : value)),
  email: yup
    .string()
    .required(emailRequiredErrorMsg)
    .matches(emailRegExp, emailRegexErrorMsg),
  address: yup.object().shape({
    line1: yup
      .string()
      .max(128, addressLine1Max128ErrorMsg)
      .required(addressLine1RequiredErrorMsg),
    line2: yup.string().max(128, addressLine1Max128ErrorMsg),
    city: yup
      .string()
      .required(cityRequiredErrorMsg)
      .matches(cityStateRgex, cityStateRegexErrorMsg)
      .max(64, cityMax64ErrorMsg),
    state: yup
      .string()
      .required(stateRequiredErrorMsg)
      .matches(cityStateRgex, cityStateRegexErrorMsg)
      .max(50, lessThan255ErrorMsg),
    zipcode: yup
      .string()
      .required(zipCodeRequiredErrorMsg)
      .matches(zipCodeRegex, zipCodeRegexErrorMsg),
    country: yup.string().required(countryRequiredErrorMsg),
  }),
  avatar: yup.string(),
  licenses: yup
    .array()
    .of(
      yup.object().shape({
        licenseNumber: yup.string(),
        licensedState: yup.string(),
        licenseExpiryDate: yup.string(),
      }),
    )
    .min(1, licenseStatesRequiredErrorMsg),
  status: yup.string(),
});
