import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Button,
  ButtonBase,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { Box, Grid } from "@mui/system";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { customLabelStyles } from "../../../common-components/custom-label/widgets/custom-label-styles";
import { theme } from "../../../utils/theme";
import { patientRegistrationFormSchema } from "./patient-registration-schema";
import OnePatientDetails from "./One-patient-details";

const steps = [
  "Patient Details",
  "Contact Information",
  "Insurances",
  "Provider Information",
];

const PatientRegistrationStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((_step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  //   const handleReset = () => {
  //     setActiveStep(0);
  //     setCompleted({});
  //   };

  const initialValues = {
    firstName: "",
    middleNameInitial: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    primaryLanguage: "",
    height: "",
    weight: "",
    specialNeeds: "",
    employed: "",
    patientPortal: "",
    avatar: "",
  };

  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(patientRegistrationFormSchema),
  });

  const {
    formState: { errors },
  } = method;

  errors;

  const renderStepComponent = (step: number) => {
    switch (step) {
      case 0:
        return <OnePatientDetails />;
      //   case 2:
      //     return <StepTwoComponent />;
      //   case 3:
      //     return <StepThreeComponent />;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <FormProvider {...method}>
      <form style={{ height: "100%", width: "100%" }}>
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
            p={2}
          >
            <Grid
              border={`1px solid ${theme.palette.grey[300]}`}
              borderRadius={"16px 16px 0px 0px"}
            >
              <Grid
                borderBottom={`1px solid ${theme.palette.grey[300]}`}
                height={"57px"}
                p={"16px 24px 16px 24px"}
                container
                justifyContent={"space-between"}
              >
                <ButtonBase
                  sx={{ display: "flex", columnGap: "16px", fontWeight: 600 }}
                >
                  <ArrowBackIcon />
                  <Typography variant="bodyLarge">
                    Patient Registration
                  </Typography>
                </ButtonBase>
                <Grid container columnGap={1}>
                  <span style={customLabelStyles.required}>*</span>
                  <Typography
                    variant="bodySmall"
                    sx={{ color: theme.palette.common.black }}
                  >
                    Indicates Mandatory Fields{" "}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                height={"64px"}
                p={"12px 24px"}
                container
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
                              ? "#1E88E5 !important" // Active step label color
                              : completed[index]
                                ? "#black !important" // Completed step label color
                                : "#9e9e9e !important", // Inactive step label color
                          fontWeight:
                            index === activeStep || completed[index]
                              ? "bold !important"
                              : "normal  !important", // Bold for active/completed
                        },
                        "& .MuiStepIcon-root": {
                          color: completed[index]
                            ? "#4caf50 !important" // Green for completed
                            : index === activeStep
                              ? "#1E88E5 !important" // Blue for active step
                              : "#e0e0e0 !important", // Grey for inactive
                        },
                        "& .MuiStepIcon-text": {
                          fill:
                            index === activeStep
                              ? "#fff !important"
                              : "#000 !important", // White text for active step number
                        },
                      }}
                    >
                      <StepButton
                        color="inherit"
                        onClick={handleStep(index)}
                        sx={{
                          borderRadius: "12px",
                          backgroundColor:
                            index === activeStep ? "#E3F2FD" : "transparent", // Blue bg for active step
                          padding: "8px 16px", // Adjust padding
                        }}
                      >
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            </Grid>

            <Grid container justifyContent={"flex-start"}>
              {renderStepComponent(activeStep)}
            </Grid>
          </Grid>

          <Grid
            container
            alignItems={"center"}
            justifyContent={"flex-end"}
            minHeight={"70px"}
            // border={1}
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
                  handleComplete();
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
  );
};

export default PatientRegistrationStepper;
