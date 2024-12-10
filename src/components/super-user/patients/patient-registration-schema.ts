import * as yup from "yup";
import {
  birthDateRequiredErrorMsg,
  firstNameOrSurnameRegexErrorMsg,
  firstNameRequiredErrorMsg,
  genderRequiredErrorMessage,
  heightRequiredErrorMsg,
  lastNameRequiredErrorMsg,
  specialNeedsRequiredErrorMsg,
} from "../../../constants/error-messages";
import { nameRegex } from "../../../utils/regex";

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
});
