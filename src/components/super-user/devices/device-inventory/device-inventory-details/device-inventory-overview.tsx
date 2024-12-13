import { Divider, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { theme } from "../../../../../utils/theme";
import CustomLabel from "../../../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../../../common-components/custom-select/customSelect";
import CustomInput from "../../../../../common-components/custom-input/custom-input";

const DeviceInventoryOverview = () => {
  return (
    <Grid container p={2} width={"100%"} columnGap={2}>
      {/* Grid 1 */}
      <Grid
        container
        border={"1px solid #E7E7E7"}
        width={"49.5%"}
        borderRadius={2}
        flexDirection={"column"}
      >
        <Grid p={2}>
          <Typography variant="bodyMedium">Basic Details</Typography>
        </Grid>
        <Divider
          sx={{
            margin: "2px",
            background: theme.palette.common.white,
          }}
          orientation="horizontal"
          variant="middle"
          flexItem
        />
        <Grid p={2}>
          <Grid display={"flex"} justifyContent={"space-evenly"} columnGap={1}>
            <Grid width={280}>
              <CustomLabel label="Device Type" />
              <CustomSelect
                placeholder={"Select Device"}
                enableDeselect
                items={[{ value: "active", label: "Active" }]}
                onChange={() => {}}
                name={""}
                value={""}
              />
            </Grid>
            <Grid width={280}>
              <CustomLabel label="Serial Number" />
              <CustomInput
                placeholder={"Enter Serial Number"}
                onChange={() => {}}
                onDebounceCall={() => {}}
                onInputEmpty={() => {}}
                name={""}
                value={""}
              />
            </Grid>
            <Grid width={280}>
              <CustomLabel label="Pool" />
              <CustomSelect
                placeholder={"Select Pool"}
                enableDeselect
                items={[{ value: "active", label: "Active" }]}
                onChange={() => {}}
                name={""}
                value={""}
              />
            </Grid>
          </Grid>
          <Grid pt={2}>
            <CustomLabel label="Notes" />
            <CustomInput
              placeholder={"Write a note"}
              onChange={() => {}}
              onDebounceCall={() => {}}
              onInputEmpty={() => {}}
              name={""}
              value={""}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Grid 2 */}
      <Grid
        container
        border={"1px solid #E7E7E7"}
        width={"49.5%"}
        borderRadius={2}
        flexDirection={"column"}
      >
        <Grid p={2}>
          <Typography variant="bodyMedium" fontWeight={500}>
            Device Status
          </Typography>
        </Grid>
        <Divider
          sx={{
            margin: "2px",
            background: theme.palette.common.white,
          }}
          orientation="horizontal"
          variant="middle"
          flexItem
        />
        <Grid p={2}>juhhuk</Grid>
      </Grid>
    </Grid>
  );
};
export default DeviceInventoryOverview;
