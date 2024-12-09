import { Grid } from "@mui/system";
import PatientsList from "../../../components/provider-portal/patients/patients-list";

const ProviderPatientsPage = () => {
  return (
    <Grid width={"100%"}>
      <PatientsList />
    </Grid>
  );
};

export default ProviderPatientsPage;
