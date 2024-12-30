import {
  addressLine1Max128ErrorMsg,
  addressLine1RequiredErrorMsg,
  cityMax64ErrorMsg,
  cityRequiredErrorMsg,
  cityStateRegexErrorMsg,
  emailRequiredErrorMsg,
  lessThan255ErrorMsg,
  phoneRegexErrorMsg,
  phoneRequiredErrorMsg,
  stateRequiredErrorMsg,
  zipCodeRegexErrorMsg,
  zipCodeRequiredErrorMsg,
} from "@/constants/error-messages";
import {
  cityStateRgex,
  emailRegExp,
  phoneRegex,
  zipCodeRegex,
} from "@/utils/regex";
import * as yup from "yup";

export const shippingFormSchema = yup.object().shape({
  recipientShip: yup.boolean(),
  recipientTendered: yup.boolean(),
  recipientException: yup.boolean(),
  recipientEstDelivery: yup.boolean(),
  recipientDelivery: yup.boolean(),
  RecipientNotifyVia: yup.string(),
  senderException: yup.boolean(),
  senderShip: yup.boolean(),
  senderTendered: yup.boolean(),
  senderEstDelivery: yup.boolean(),
  senderDelivery: yup.boolean(),
  notifyVia: yup.string(),
  signatureType: yup.string(),
  labelFormat: yup.string(),
  paperSize: yup.string(),
  service: yup.string(),
  shipDate: yup.string().required("Ship date is required"),
  weight: yup.string().required("Weight is required"),
  declaredValue: yup.string().required("Value is required"),
  fedExRate: yup.string().required("Rate is required"),
  serviceType: yup.string().required("Service Type is Required"),
  packageType: yup.string().required("Package type required"),
  shipperEmail: yup.string().required("Shipper email required"),
  contactName: yup.string().required("Company name is required"),
  billTranspotationTo: yup.string().required("Required"),
  yourReferenceType: yup.string(),
  referenceValue: yup.string(),
  resedentialAddress: yup.boolean(),
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
