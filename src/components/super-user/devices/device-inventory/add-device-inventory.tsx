import { Grid } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomInput from "../../../../common-components/custom-input/custom-input";

const AddDeviceInventory = () => {
  return (
    <Grid
      container
      flexDirection={"column"}
      alignContent={"center"}
      pt={7}
      rowGap={2.5}
    >
      {/* Grid 1 */}
      <Grid container justifyContent={"space-between"} width={"934px"}>
        <Grid container columnGap={3} alignContent={"center"}>
          <ArrowBackIcon />
          <Typography fontWeight={700} variant="bodyLarge">
            Add New Device
          </Typography>
        </Grid>
        <Grid container columnGap={2}>
          <Button
            variant="outlined"
            onClick={() => {}}
            sx={{ mr: 1, borderColor: "#C9CBCC", color: "black" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {}}
            sx={{ mr: 1, background: "#106DCC" }}
          >
            Save Device
          </Button>
        </Grid>
      </Grid>
      {/* Grid 2 */}
      <Grid
        container
        p={3}
        sx={{ background: "white", borderRadius: "10px" }}
        flexDirection={"column"}
        rowGap={2}
        width={"934px"}
      >
        <Grid container justifyContent={"space-between"} columnGap={1}>
          <Grid width={"255px"}>
            <CustomLabel label="Device Type" />
            <CustomSelect
              placeholder={"Select Device"}
              name={""}
              value={""}
              enableDeselect
              items={[{ value: "active", label: "Active" }]}
              onChange={() => {}}
            />
          </Grid>
          <Grid>
            <CustomLabel label="Serial Number" />
            <CustomInput
              placeholder={"Enter Serial Number"}
              name={""}
              value={""}
              onChange={() => {}}
              onDebounceCall={() => {}}
              onInputEmpty={() => {}}
            />
          </Grid>
          <Grid width={"290px"}>
            <CustomLabel label="Pool" />
            <CustomSelect
              placeholder={"select Pool"}
              name={""}
              value={""}
              enableDeselect
              items={[{ value: "active", label: "Active" }]}
              onChange={() => {}}
            />
          </Grid>
        </Grid>
        <Grid container>
          <CustomLabel label="Notes" />
          <CustomInput
            placeholder={"Write a note"}
            name={""}
            value={""}
            onChange={() => {}}
            onDebounceCall={() => {}}
            onInputEmpty={() => {}}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default AddDeviceInventory;
