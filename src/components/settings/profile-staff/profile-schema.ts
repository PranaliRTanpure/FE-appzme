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
  lastNameRequiredErrorMsg,
  lessThan255ErrorMsg,
  newPasswordRequiredErrorMsg,
  passwordRegexErrorMsg,
  phoneRegexErrorMsg,
  stateRequiredErrorMsg,
  zipCodeRegexErrorMsg,
  zipCodeRequiredErrorMsg,
} from "../../../constants/error-messages";
import {
  cityStateRgex,
  emailRegExp,
  nameRegex,
  passwordRegx,
  phoneRegex,
  zipCodeRegex,
} from "../../../utils/regex";

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string(),
  newPassword: yup
    .string()
    .required(newPasswordRequiredErrorMsg)
    .matches(passwordRegx, passwordRegexErrorMsg),
  confirmNewPassword: yup
    .string()
    .required("Confirm new password")
    .oneOf(
      [yup.ref("newPassword") as unknown as string],
      "Passwords must match",
    ),
});

export const editProfileSchema = yup.object().shape({
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
    .transform((value) => (value === "" ? null : value))
    .matches(phoneRegex, phoneRegexErrorMsg),
  prefix: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value)),
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
});
