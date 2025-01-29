import * as yup from "yup";

import { addressLine1Max128ErrorMsg, cityMax64ErrorMsg, lessThan255ErrorMsg } from "@/constants/error-messages";

export const addSiClinicSchema = yup.object().shape({
  locationId: yup.string(),
  locationName: yup.string(),
  taxId: yup.string(),
  contactNumber: yup.string(),
  taxType: yup.string(),
  noShowCharges: yup.string(),
  status: yup.string(),
  address: yup.object().shape({
    line1: yup.string().max(128, addressLine1Max128ErrorMsg),
    line2: yup.string().max(128, addressLine1Max128ErrorMsg),
    city: yup.string().max(64, cityMax64ErrorMsg),

    state: yup.string().max(50, lessThan255ErrorMsg),

    zipcode: yup.string(),
  }),
});
