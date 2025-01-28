import { Button, IconButton, Typography } from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import Switcher from "../../../../../common-components/switcher/switcher";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeviceInventoryOverview from "./device-inventory-overview";
import ActivePatientSchedule from "./active-patient-schedule";
import ActiveLog from "./active-log";
import CustomInput from "../../../../../common-components/custom-input/custom-input";
import DatePicker from "../../../../../common-components/date-picker-field/date-picker-field";

enum DeviceDetailsType {
  OVERVIEW = "Overview",

  ACTIVE_PATIENT_SCHEDULE = "Active Patients Schedule",

  ACTIVITY_LOG = "Activity Log",
}

const DeviceInventoryDetails = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [detailType, setDetailType] = useState(DeviceDetailsType.OVERVIEW);
  const [isEditMode, setIsEditMode] = useState(false);
  const belowHeight768 = useMediaQuery("(max-height:768px)");

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

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
          {deviceId}
        </Typography>
      </Grid>
      {/* Grid 2 */}
      <Grid
        container
        sx={{ position: "sticky" }}
        p={2}
        justifyContent={"space-between"}
        borderBottom={"1px solid #E7E7E7"}
        width={"100%"}
        rowGap={1}
        columnGap={0.2}
      >
        <Grid>
          <Switcher
            options={["Overview", "Active Patients Schedule", "Activity Log"]}
            buttonWidth={belowHeight768 ? "150px" : "207px"}
            variant={"light"}
            onChange={(option: string): void => {
              setDetailType(option as DeviceDetailsType);
            }}
          />
        </Grid>
        {detailType === DeviceDetailsType.OVERVIEW && (
          <>
            {isEditMode ? (
              <Grid container alignContent={"center"}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ mr: 1, borderColor: "#C9CBCC", color: "black" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ background: "#106DCC" }}
                  onClick={handleSave}
                >
                  <Typography variant="bodySmall">Save Changes</Typography>
                </Button>
              </Grid>
            ) : (
              <Grid container alignContent={"center"}>
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
                  onClick={() => setIsEditMode(true)}
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
            )}
          </>
        )}
        {detailType === DeviceDetailsType.ACTIVE_PATIENT_SCHEDULE && (
          <Grid container alignContent={"center"}>
            <CustomInput
              placeholder={"Serach Patient"}
              name={""}
              value={""}
              onChange={() => {}}
              onDebounceCall={() => {}}
              onInputEmpty={() => {}}
              hasStartSearchIcon={true}
              bgWhite
            />
          </Grid>
        )}
        {detailType === DeviceDetailsType.ACTIVITY_LOG && (
          <Grid
            container
            alignContent={"center"}
            columnGap={1}
            justifyContent={"space-between"}
            rowGap={1}
          >
            <Grid mt={1}>
              <Typography variant="bodySmall">Set Date Range</Typography>
            </Grid>
            <Grid>
              <DatePicker
                bgWhite
                disableFuture
                value={""}
                onDateChange={() => {}}
              />
            </Grid>
            <Grid mt={1}>
              <Typography variant="bodySmall">to </Typography>
            </Grid>
            <Grid>
              <DatePicker bgWhite value={""} onDateChange={() => {}} />
            </Grid>
          </Grid>
        )}
      </Grid>
      {/* Grid 3 */}
      <Grid
        container
        width={"100%"}
        sx={{ background: "white", boxShadow: "0px 0px 4px -2px #1018280F" }}
      >
        {detailType === DeviceDetailsType.OVERVIEW && (
          <Grid container width={"100%"} borderRadius={12}>
            <DeviceInventoryOverview isEditMode={isEditMode} />
          </Grid>
        )}
        {detailType === DeviceDetailsType.ACTIVE_PATIENT_SCHEDULE && (
          <Grid container width={"100%"} borderRadius={12}>
            <ActivePatientSchedule />
          </Grid>
        )}
        {detailType === DeviceDetailsType.ACTIVITY_LOG && (
          <Grid container borderRadius={12} width={"100%"}>
            <ActiveLog />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
export default DeviceInventoryDetails;
