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
  lessThan255ErrorMsg,
  nameRequiredErrorMsg,
  phoneRegexErrorMsg,
  phoneRequiredErrorMsg,
  practiceIdRequiredErrorMsg,
  stateRequiredErrorMsg,
  subdomainRequiredErrorMsg,
  zipCodeRegexErrorMsg,
  zipCodeRequiredErrorMsg,
} from "../../../constants/error-messages";
import {
  cityStateRgex,
  emailRegExp,
  phoneRegex,
  zipCodeRegex,
} from "../../../utils/regex";

export const manualEntryFormSchema = yup.object().shape({
  name: yup.string().required(nameRequiredErrorMsg),
  optionSelected: yup.string(),
  phone: yup
    .string()
    .required(phoneRequiredErrorMsg)
    .transform((value) => (value === "" ? null : value))
    .matches(phoneRegex, phoneRegexErrorMsg),
  prefix: yup.string().when("optionSelected", (optionSelected) => {
    if (optionSelected[0] === "manualEntry") {
      return yup.string().transform((value) => (value === "" ? null : value));
    } else {
      return yup.string().notRequired();
    }
  }),
  status: yup.string().when("optionSelected", (optionSelected) => {
    if (optionSelected[0] === "manualEntry") {
      return yup.string().required(subdomainRequiredErrorMsg);
    } else {
      return yup.string().notRequired();
    }
  }),
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
