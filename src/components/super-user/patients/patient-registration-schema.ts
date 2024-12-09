import * as yup from "yup";
import {
  firstNameOrSurnameRegexErrorMsg,
  firstNameRequiredErrorMsg,
} from "../../../constants/error-messages";
import { nameRegex } from "../../../utils/regex";

export const patientRegistrationFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(firstNameRequiredErrorMsg)
    .matches(nameRegex, firstNameOrSurnameRegexErrorMsg),
});
