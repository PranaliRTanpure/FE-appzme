import CustomButton from "@/common-components/button-outlined/custom-button";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  ButtonBase,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { Box, Grid, useMediaQuery } from "@mui/system";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { customLabelStyles } from "../../../common-components/custom-label/widgets/custom-label-styles";
import { theme } from "../../../utils/theme";
import FourOrderingProvider from "./four-ordering-provider";
import OnePatientDetails from "./One-patient-details";
import {
  initialValuesPatientRegistration,
  patientRegistrationFormSchema,
} from "./patient-registration-schema";
import ThreePatientInsurance from "./three-patient-insurance";
import TwoPatientContacts from "./two-patient-details";
import MainDrawer from "@/components/ui/MainDrawer";
import { useDrawer } from "@/hooks/useDrawer";
import HSTOrderForm from "../orders/hst-order-form";

const steps = [
  "Patient Details",
  "Contact Information",
  "Insurances",
  "Provider Information",
];

const PatientRegistrationStepper = () => {
  const [activeStep, setActiveStep] = React.useState(3);
  const [completed] = React.useState<{ [k: number]: boolean }>({});
  const [orderType, setOrderType] = useState<"HST Order" | "OAT Order">(
    "HST Order",
  );

  const handleNext = () => {
    // console.log("Active Step:", activeStep, "Order Type:", orderType);
    if (activeStep === 3 && orderType === "HST Order") {
      orderType;
      handleDrawer.addHSTForm("Add");
      return;
    }

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

  const method = useForm({
    defaultValues: initialValuesPatientRegistration,
    resolver: yupResolver(patientRegistrationFormSchema),
  });

  const { setValue, handleSubmit } = method;

  const renderStepComponent = (step: number) => {
    switch (step) {
      case 0:
        return <OnePatientDetails />;
      case 1:
        return <TwoPatientContacts />;
      case 2:
        return <ThreePatientInsurance />;
      case 3:
        return <FourOrderingProvider handleSelectedOrderType={setOrderType} />;
      default:
        return <FourOrderingProvider handleSelectedOrderType={setOrderType} />;
    }
  };

  const belowWidth1024 = useMediaQuery("(max-width:1024px)");

  const {
    open: openDrawer,
    close: closeDrawer,
    content: contentDrawer,
  } = useDrawer();

  const handleDrawer = {
    addHSTForm: (action: string) => {
      // console.log("Opening Drawer for:", action);
      openDrawer({
        title: `${action} HST Provider`,
        identifier: "drawer-hst-allform",
      });
    },
  };

  const DrawerContent = () => {
    // console.log("Current contentDrawer:", contentDrawer);
    switch (contentDrawer.identifier) {
      case "drawer-hst-allform":
        // console.log("Rendering HSTOrderForm...");
        return <HSTOrderForm isEdit={false} handleDrawerClose={closeDrawer} />;
      default:
        return <div />;
    }
  };

  return (
    <>
      <MainDrawer
        content={<DrawerContent />}
        drawerWidth={belowWidth1024 ? "95%" : "1000px"}
        anchor="right"
        showSecondButton={false}
        showMandatoryIndicator={true}
      />
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
                              index === activeStep ? "#E3F2FD" : "transparent",
                            padding: "8px 16px",
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
              borderTop={`1px solid ${theme.palette.grey[300]}`}
            >
              <Grid container columnGap={1}>
                <CustomButton
                  variant={"outlined"}
                  text={"Previous"}
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBack}
                />
                <CustomButton
                  variant={"contained"}
                  text={"Next"}
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleNext}
                />
                <Box sx={{ flex: "1 1 auto" }} />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default PatientRegistrationStepper;
