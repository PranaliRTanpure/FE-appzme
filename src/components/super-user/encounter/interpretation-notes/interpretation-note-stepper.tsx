import { Grid } from "@mui/system";
import InterpretationNotesHeader from "./interpretation-notes-header";

const InterpretationNoteStepper = () => {
  return (
    <Grid
      height={"100%"}
      container
      width={"100%"}
      p={2}
      flexDirection={"column"}
    >
      {/* Heaer Block */}
      <InterpretationNotesHeader />
    </Grid>
  );
};
export default InterpretationNoteStepper;
