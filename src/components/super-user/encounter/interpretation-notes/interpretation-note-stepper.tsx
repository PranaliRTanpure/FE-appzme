import { Box, Grid } from "@mui/system";
import InterpretationNotesHeader from "./interpretation-notes-header";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  initialValuesInterpretationNote,
  interpretationNoteFormSchema,
} from "./interpretation-notes-schema";
import OneStudySummary from "./one-study-summary";
import TwoInterpretationForm from "./two-interpretation-form";
import ThreeSignoff from "./three-signoff";
import { theme } from "@/utils/theme";
import { Button, Step, StepButton, Stepper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const steps = [
  "Study Summary",
  "Interpretation Form",
  "Interpretation Sign Off",
];

const InterpretationNoteStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed] = React.useState<{ [k: number]: boolean }>({});

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

  const handleNext = () => {
    handleSubmit(
      () => {
        setValue("activeStep", (activeStep + 1).toString());
        setActiveStep((prevStep) => prevStep + 1);
      },
      (errors) => {
        errors;
      },
    )();
  };

  const handleBack = () => {
    setValue("activeStep", (activeStep - 1).toString());
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  // const handleComplete = () => {
  //   setCompleted({
  //     ...completed,
  //     [activeStep]: true,
  //   });
  //   handleNext();
  // };

  const method = useForm({
    defaultValues: initialValuesInterpretationNote,
    resolver: yupResolver(interpretationNoteFormSchema),
  });

  const { setValue, handleSubmit } = method;

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
      container
      width={"100%"}
      height={"100%"}
      p={2}
      flexDirection={"column"}
    >
      {/* Heaer Block */}
      <Grid container width={"100%"}>
        <InterpretationNotesHeader />
      </Grid>
      {/* Stepper */}
      <Grid container flexDirection={"column"} flex={1}>
        <FormProvider {...method}>
          <form
            style={{ height: "100%", width: "100%", border: "1px solid red" }}
          >
            <Grid
              flexDirection={"column"}
              bgcolor={"#F5F6F8"}
              container
              height={"100%"}
              justifyContent={"space-between"}
            >
              <Grid
                container
                flexDirection={"column"}
                bgcolor={"#F5F6F8"}
                flex={1}
              >
                <Grid container width={"100%"}>
                  <Grid
                    container
                    width={"100%"}
                    height={"64px"}
                    p={"12px 24px"}
                    alignItems={"center"}
                  >
                    <Stepper activeStep={activeStep} connector={null}>
                      {steps.map((label, index) => (
                        <Step
                          key={label}
                          completed={completed[index]}
                          sx={{
                            marginRight: "30px",
                            "& .MuiStepLabel-label": {
                              color:
                                index === activeStep
                                  ? "#106DCC !important" // Active step label color
                                  : completed[index]
                                    ? "black !important" // Completed step label color
                                    : "#9e9e9e !important", // Inactive step label color
                              fontWeight:
                                index === activeStep || completed[index]
                                  ? "500px !important"
                                  : "normal  !important", // Bold for active/completed
                            },
                            "& .MuiStepIcon-root": {
                              color: completed[index]
                                ? "#4caf50 !important" // Green for completed
                                : index === activeStep
                                  ? "#C0DFFF !important" // Blue for active step
                                  : "#e0e0e0 !important", // Grey for inactive
                            },
                            "& .MuiStepIcon-text": {
                              fill:
                                index === activeStep
                                  ? "#2484AD !important"
                                  : "#000 !important", // White text for active step number
                            },
                          }}
                        >
                          <StepButton
                            color="inherit"
                            onClick={handleStep(index)}
                            sx={{
                              borderRadius: "14px",
                              backgroundColor:
                                index === activeStep
                                  ? "#E0EFFF"
                                  : "transparent",
                              padding: "5px 16px",
                            }}
                          >
                            {label}
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                  </Grid>
                </Grid>

                <Grid container justifyContent={"flex-start"} p={2}>
                  {renderStepComponent(activeStep)}
                </Grid>
              </Grid>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"flex-end"}
                minHeight={"70px"}
                borderTop={`1px solid ${theme.palette.grey[300]}`}
              >
                <Grid container>
                  <Button
                    variant="outlined"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    startIcon={<ArrowBackIcon />}
                  >
                    Previous
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => {
                      handleNext();
                    }}
                    sx={{ mr: 1 }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </Grid>
  );
};
export default InterpretationNoteStepper;
