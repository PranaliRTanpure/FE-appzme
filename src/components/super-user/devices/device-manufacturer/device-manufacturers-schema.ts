import * as yup from "yup";
import {
  addressLine1Max128ErrorMsg,
  addressLine1RequiredErrorMsg,
  alternatePhoneRequiredErrorMsg,
  cityMax64ErrorMsg,
  cityRequiredErrorMsg,
  cityStateRegexErrorMsg,
  contactRequiredErrorMsg,
  emailRequiredErrorMsg,
  lessThan255ErrorMsg,
  modelDetailsRequiredErrorMsg,
  phoneRegexErrorMsg,
  phoneRequiredErrorMsg,
  stateRequiredErrorMsg,
  zipCodeRegexErrorMsg,
  zipCodeRequiredErrorMsg,
} from "../../../../constants/error-messages";
import {
  cityStateRgex,
  emailRegExp,
  phoneRegex,
  zipCodeRegex,
} from "../../../../utils/regex";

export const manufacturerFormSchema = yup.object().shape({
  modleDetails: yup
    .array()
    .of(
      yup.object().shape({
        modelName: yup.string(),
        modelType: yup.string(),
      }),
    )
    .min(1, modelDetailsRequiredErrorMsg),
  company: yup.string().required("Company name is required"),
  office: yup.string().required("Office Name is Required"),
  fax: yup.string(),
  contact: yup
    .string()
    .required(contactRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  alternatePhone: yup
    .string()
    .required(alternatePhoneRequiredErrorMsg)
    .matches(phoneRegex, phoneRegexErrorMsg),
  phone: yup
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
  }),
});
