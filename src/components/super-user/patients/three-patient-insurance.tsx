import { Grid } from "@mui/system";
import { theme } from "../../../utils/theme";

const ThreePatientInsurance = () => {
  return (
    <Grid
      width={"100%"}
      container
      p={2}
      rowGap={2}
      flexDirection={"column"}
      border={`1px solid ${theme.palette.grey[300]}`}
      mt={1}
      borderRadius={"16px"}
    >
      <Grid>sad</Grid>
      <Grid>asdA</Grid>
    </Grid>
  );
};

export default ThreePatientInsurance;
