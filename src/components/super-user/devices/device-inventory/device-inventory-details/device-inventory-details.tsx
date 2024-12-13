import { Button, IconButton, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import Switcher from "../../../../../common-components/switcher/switcher";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeviceInventoryOverview from "./device-inventory-overview";

enum DeviceDetailsType {
  // eslint-disable-next-line no-unused-vars
  OVERVIEW = "Overview",
  // eslint-disable-next-line no-unused-vars
  ACTIVE_PATIENT_SCHEDULE = "Active Patients Schedule",
  // eslint-disable-next-line no-unused-vars
  ACTIVITY_LOG = "Activity Log",
}

const DeviceInventoryDetails = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [, setDetailType] = useState(DeviceDetailsType.OVERVIEW);

  return (
    <Grid
      container
      m={2}
      pt={2}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      width={"100%"}
    >
      {/* Grid 1 */}
      <Grid container columnGap={1} alignItems={"center"}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          fontWeight={700}
          variant="bodyLarge"
          sx={{ color: "#21262B" }}
        >
          IL20_25169
        </Typography>
        <Typography color="#74797B" variant="bodySmall" fontWeight={400}>
          {" "}
          {deviceId}
        </Typography>
      </Grid>
      {/* Grid 2 */}
      <Grid
        container
        sx={{ background: "white" }}
        p={3}
        mt={1.5}
        justifyContent={"space-between"}
        borderBottom={"1px solid #E7E7E7"}
      >
        <Grid>
          <Switcher
            options={["Overview", "Active Patients Schedule", "Activity Log"]}
            buttonWidth={"218px"}
            variant={"light"}
            onChange={(option: string): void => {
              setDetailType(option as DeviceDetailsType);
            }}
          />
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            startIcon={<ArchiveOutlinedIcon sx={{ color: "black" }} />}
            onClick={() => {}}
            sx={{ mr: 1, borderColor: "#C9CBCC", color: "black" }}
          >
            Archive Device
          </Button>
          <Button
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={() => {}}
            sx={{
              mr: 1,
              borderColor: "#C9CBCC",
              color: "black",
              background: "#F1F8FF",
            }}
          >
            Edit Details
          </Button>
        </Grid>
      </Grid>
      {/* Grid 3 */}
      <Grid container sx={{ background: "white" }}>
        <Grid width={"100%"}>
          <DeviceInventoryOverview />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DeviceInventoryDetails;
