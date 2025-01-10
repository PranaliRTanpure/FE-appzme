import { Grid } from "@mui/system";
import InterpretationNotesHeader from "./interpretation-notes-header";
// import React from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { initialValuesInterpretationNote, interpretationNoteFormSchema } from "./interpretation-notes-schema";
import OneStudySummary from "./one-study-summary";
import TwoInterpretationForm from "./two-interpretation-form";
import ThreeSignoff from "./three-signoff";

// const steps = [
//   'Study Summary',
//   'Interpretation Form',
//   'Interpretation Sign Off'
// ]

const InterpretationNoteStepper = () => {
  // const [activeStep, setActiveStep] = React.useState(0);
  // const [completed] = React.useState<{ [k: number]: boolean; }>({});

  // const totalSteps = () => {
  //   return steps.length;
  // };

  // const completedSteps = () => {
  //   return Object.keys(completed).length;
  // };

  // const isLastStep = () => {
  //   return activeStep === totalSteps() - 1;
  // };

  // const allStepsCompleted = () => {
  //   return completedSteps() === totalSteps();
  // };

  // const handleNext = () => {
  //   handleSubmit(
  //     () => {
  //       setValue("activeStep", (activeStep + 1).toString());
  //       setActiveStep((prevStep) => prevStep + 1);
  //     },
  //     (errors) => {
  //       errors;
  //     },
  //   )();
  // };

  // const handleBack = () => {
  //   setValue("activeStep", (activeStep - 1).toString());
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleStep = (step: number) => () => {
  //   setActiveStep(step);
  // };

  // const handleComplete = () => {
  //   setCompleted({
  //     ...completed,
  //     [activeStep]: true,
  //   });
  //   handleNext();
  // };

  // const method = useForm({
  //   defaultValues: initialValuesInterpretationNote,
  //   resolver: yupResolver(interpretationNoteFormSchema),
  // });

  // const { setValue, handleSubmit } = method;

  const renderStepComponent = (step: number) => {
    switch (step) {
      case 0:
        return <OneStudySummary />;
      case 1:
        return <TwoInterpretationForm />;
      case 2:
        return <ThreeSignoff />;
      default:
        return <ThreeSignoff />;
    }
  };

  renderStepComponent;

  return (
    <Grid
      height={"100%"}
      container
      width={"100%"}
      p={2}
      flexDirection={"column"}
      rowGap={2}
    >
      {/* Heaer Block */}
      <InterpretationNotesHeader />
    </Grid>
  );
};
export default InterpretationNoteStepper;
