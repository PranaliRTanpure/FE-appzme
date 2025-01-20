import * as yup from "yup";

export const HSTOrderFormSchema = yup.object().shape({
  orderDate: yup.string(),
  referrer: yup.string(),
  PEType: yup.string(),
  DevicePool: yup.string(),
  marketer: yup.string(),
  billingPartner: yup.string(),
  teleMedFollowUp: yup.boolean(),
  reasonForTest: yup.string(),
});
