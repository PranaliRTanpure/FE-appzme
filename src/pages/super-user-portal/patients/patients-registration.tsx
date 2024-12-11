import { Grid } from "@mui/system";
import PatientRegistrationStepper from "../../../components/super-user/patients/patient-registration-stepper";
// import PatientsList from "../../../components/provider-portal/patients/patients-list";

const PatientsRegistration = () => {
  return (
    <Grid width={"100%"}>
      <PatientRegistrationStepper />
      {/* <PatientsList /> */}
    </Grid>
  );
};

export default PatientsRegistration;
