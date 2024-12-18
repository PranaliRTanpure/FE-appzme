import { Button } from "@mui/material";
import { Grid } from "@mui/system";

const DeviceManufacturersForm = () => {
  return (
    <Grid container width={"100%"} height={"100%"} border={1}>
      <form style={{ height: "100%", width: "100%" }}>
        <Grid container width={"100%"} height={"100%"}>
          <Grid container width={"100%"} height={"100%"}>
            form
          </Grid>
          {/* Button */}
          <Grid
            container
            justifyContent="flex-end"
            rowGap={1}
            columnGap={1}
            mb={1}
            width={"100%"}
            sx={{
              flex: 1,
              alignContent: "flex-end",
              justifyContent: "flex-end",
            }}
            // border={'1px solid red'}
          >
            {/* <Grid> */}
            <Button
              type="submit"
              variant="contained"
              sx={{ background: "#106DCC" }}
            >
              Save
            </Button>
            {/* </Grid> */}
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default DeviceManufacturersForm;
