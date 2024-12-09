import * as yup from "yup";
import {
  addressLine1Max128ErrorMsg,
  addressLine1RequiredErrorMsg,
  birthDateRequiredErrorMsg,
  cityMax64ErrorMsg,
  cityRequiredErrorMsg,
  cityStateRegexErrorMsg,
  countryRequiredErrorMsg,
  emailRegexErrorMsg,
  emailRequiredErrorMsg,
  firstNameOrSurnameRegexErrorMsg,
  firstNameRequiredErrorMsg,
  lastNameRequiredErrorMsg,
  lessThan255ErrorMsg,
  mrnRegexErrorMsg,
  nurseRequiredErrorMsg,
  phoneRegexErrorMsg,
  phoneRequiredErrorMsg,
  providerRequiredErrorMsg,
  stateRequiredErrorMsg,
  zipCodeRegexErrorMsg,
  zipCodeRequiredErrorMsg,
} from "../../../constants/error-messages";
import {
  cityStateRgex,
  emailRegExp,
  mrnNumberRegex,
  nameRegex,
  phoneRegex,
  zipCodeRegex,
} from "../../../utils/regex";

export const invitePatientFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(firstNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  lastName: yup
    .string()
    .required(lastNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  email: yup
    .string()
    .required(emailRequiredErrorMsg)
    .matches(emailRegExp, emailRegexErrorMsg),
  phone: yup
    .string()
    .required(phoneRequiredErrorMsg)
    .transform((value) => (value === "" ? null : value))
    .matches(phoneRegex, phoneRegexErrorMsg),
  prefix: yup.string().transform((value) => (value === "" ? null : value)),
  carePlan: yup.string(),
  status: yup.string(),
  mrn: yup.string().nullable().matches(mrnNumberRegex, mrnRegexErrorMsg),
  primaryProvider: yup.string().required(providerRequiredErrorMsg),
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
  dob: yup.string().required(birthDateRequiredErrorMsg),
  nurse: yup.string().required(nurseRequiredErrorMsg),
  schemaType: yup.string(),
});
