import {
  addressLine1Max128ErrorMsg,
  alternatePhoneRequiredErrorMsg,
  cityMax64ErrorMsg,
  cityStateRegexErrorMsg,
  emailRequiredErrorMsg,
  lessThan255ErrorMsg,
  phoneRegexErrorMsg,
  zipCodeRegexErrorMsg,
} from "@/constants/error-messages";
import {
  cityStateRgex,
  emailRegExp,
  phoneRegex,
  zipCodeRegex,
} from "@/utils/regex";
import * as yup from "yup";

export const addStaffFormSchema = yup.object().shape({
  firstName: yup.string().required("First Name required"),
  middleInitial: yup.string(),
  lastName: yup.string().required("Last Name required"),
  organization: yup.string(),
  role: yup.string(),
  avatar: yup.string(),
  alternatePhone: yup
    .string()
    .required(alternatePhoneRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  phone: yup
    .string()
    // .required(phoneRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  email: yup
    .string()
    .required(emailRequiredErrorMsg)
    .matches(emailRegExp, phoneRegexErrorMsg),
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
