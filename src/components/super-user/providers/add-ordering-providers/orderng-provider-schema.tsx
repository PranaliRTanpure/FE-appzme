import * as yup from "yup";
import {
  addressLine1Max128ErrorMsg,
  addressLine1RequiredErrorMsg,
  alternatePhoneRequiredErrorMsg,
  cityMax64ErrorMsg,
  cityRequiredErrorMsg,
  cityStateRegexErrorMsg,
  emailRequiredErrorMsg,
  firstNameOrSurnameRegexErrorMsg,
  firstNameRequiredErrorMsg,
  lastNameRequiredErrorMsg,
  lessThan255ErrorMsg,
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

export const OrderngProviderSchema = yup.object().shape({
  avatar: yup.string(),
  firstName: yup
    .string()
    .required(firstNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  middleName: yup.string(),
  lastName: yup
    .string()
    .required(lastNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  suffix: yup.string(),
  supervisingProvider: yup.string(),
  alternatePhone: yup
    .string()
    .required(alternatePhoneRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  phone: yup
    .string()
    .required(phoneRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  npi: yup
    .string()
    .required(npiRequiredErrorMsg)
    .matches(npiRegExp, npiRegexErrorMsg),
  physicianPortalAccess: yup.boolean(),
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
  }),
  preferredDME: yup.string(),
  defaultPreferredLab: yup.string(),
  preferredHSTDevice: yup.string(),
  fUTelemed: yup.boolean(),
  preferredPGName: yup.string(),
  preferredPGOfficeContact: yup.string(),
  preferredPGMarketer: yup.string(),
  speciality: yup.string(),
  fax: yup.string(),
});
