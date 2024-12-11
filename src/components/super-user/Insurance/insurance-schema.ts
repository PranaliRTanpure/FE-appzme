import * as yup from "yup";
import { nameRequiredErrorMsg } from "../../../constants/error-messages";

export const insuranceSchema = yup.object().shape({
  insuranceName: yup.string().required(nameRequiredErrorMsg),
  idNumber: yup.string(),
  planName: yup.string(),
  groupId: yup.string(),
  groupName: yup.string(),
  startDate: yup.string(),
  endDate: yup.string(),
  patientRelationshipToSubscriber: yup.string().required(),
  subscriberFirstName: yup.string().required(),
  subscriberLastName: yup.string().required(),
  subscriberMiddleNameInitial: yup.string(),
  subscriberDateOfBirth: yup.string().required(),
  subscriberAddressLine1: yup.string().required(),
  subscriberAddressLine2: yup.string(),
  subscriberAddressCity: yup.string().required(),
  subscriberAddressState: yup.string().required(),
  subscriberAddressZipcode: yup.string().required(),
  insuranceCardFrontSide: yup.string(),
  insuranceCardBackSide: yup.string(),
});
