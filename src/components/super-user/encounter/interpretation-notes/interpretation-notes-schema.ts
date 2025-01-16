import * as yup from "yup";

export const interpretationNoteFormSchema = yup.object().shape({
  activeStep: yup.string(),
  degreeOfSleepApnea: yup.string(),
  impressionName: yup.string(),
});

export const initialValuesInterpretationNote = {
  activeStep: "0",
  degreeOfSleepApnea: "",
  impressionName: "",
};
