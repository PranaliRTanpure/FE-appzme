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
  locationRequiredErrorMsg,
  phoneRegexErrorMsg,
  phoneRequiredErrorMsg,
  staffRoleRequiredErrorMsg,
  stateRequiredErrorMsg,
  zipCodeRegexErrorMsg,
  zipCodeRequiredErrorMsg,
} from "../../../../constants/error-messages";
import { Roles } from "../../../../constants/roles";
import {
  cityStateRgex,
  emailRegExp,
  nameRegex,
  phoneRegex,
  zipCodeRegex,
} from "../../../../utils/regex";

export const staffFormSchema = yup.object().shape({
  role: yup.string().required(staffRoleRequiredErrorMsg),
  status: yup.string(),
  firstName: yup
    .string()
    .required(firstNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  lastName: yup
    .string()
    .required(lastNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
  phone: yup
    .string()
    .required(phoneRequiredErrorMsg)
    .transform((value) => (value === "" ? null : value))
    .matches(phoneRegex, phoneRegexErrorMsg),
  prefix: yup.string().transform((value) => (value === "" ? null : value)),
  location: yup.string().when("role", (optionSelected) => {
    if (optionSelected[0] === Roles.SITE_ADMIN) {
      return yup.string().required(locationRequiredErrorMsg);
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
      .required(cityRequiredErrorMsg)
      .max(64, cityMax64ErrorMsg)
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
  gender: yup.string().required(genderRequiredErrorMessage),
});
