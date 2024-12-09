import * as yup from "yup";
import {
  addressLine1Max128ErrorMsg,
  addressLine1RequiredErrorMsg,
  cityMax64ErrorMsg,
  cityRequiredErrorMsg,
  cityStateRegexErrorMsg,
  countryRequiredErrorMsg,
  ehrRequiredErrorMsg,
  emailRegexErrorMsg,
  emailRequiredErrorMsg,
  firstNameOrSurnameRegexErrorMsg,
  firstNameRequiredErrorMsg,
  lastNameRequiredErrorMsg,
  lessThan255ErrorMsg,
  npiRegexErrorMsg,
  npiRequiredErrorMsg,
  phoneRegexErrorMsg,
  practiceIdRequiredErrorMsg,
  providerTypeRequiredErrorMsg,
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
  optionSelected: yup.string(),
  providerType: yup.string().required(providerTypeRequiredErrorMsg),
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
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(phoneRegex, phoneRegexErrorMsg),
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
  avatar: yup.string(),
  licenses: yup.array().of(
    yup.object().shape({
      licenseNumber: yup.string(),
      licensedState: yup.string(),
      licenseExpiryDate: yup.string(),
    }),
  ),
  ehr: yup.string().when("optionSelected", (optionSelected) => {
    if (optionSelected[0] === "enrollFromEHR") {
      return yup.string().required(ehrRequiredErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
  practiceId: yup.string().when("optionSelected", (optionSelected) => {
    if (optionSelected[0] === "enrollFromEHR") {
      return yup.string().required(practiceIdRequiredErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
});
