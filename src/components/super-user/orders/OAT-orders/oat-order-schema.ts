import * as yup from "yup";

export const oatOrderFormSchema = yup.object().shape({
  orderDate: yup.string(),
  orderingPhysician: yup.string(),
  npi: yup.string(),
  fax: yup.string(),
  dentistProvider: yup.string(),
  medicalNecessity: yup.string(),
});
