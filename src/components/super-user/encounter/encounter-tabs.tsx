import { Button, Tab, Tabs } from "@mui/material";
import { Grid } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CustomTabPanel,
  a11yProps,
} from "../../../common-components/custom-tab/custom-tab";
import EncounterList from "./encounters/encounter-list";
import EncounterMillennium from "./millenium/encounter-millenium";
import EncounterSleepImpression from "./sleep_impression/encounter_sleep_impression";
import EncounterHstEducation from "./hst_education/encounter_hst_education";
import { theme } from "@/utils/theme";
import AddIcon from "@mui/icons-material/Add";
import CustomDialog from "@/common-components/custom-dialog/custom-dialog";
import CreateEncounterForm from "./encounters/create-encounter-form";
import ScheduleAppointment from "./hst_education/schedule-appointment-form";
import MilleniumScheduleAppointment from "./millenium/millenium-schedule-appointment-form";
import { useDrawer } from "@/hooks/useDrawer";
import MainDrawer from "@/components/ui/MainDrawer";

const tabLabels = [
  "Encounters",
  "Millennium",
  "Sleep Impression",
  "HST Education",
];

const SettingsTabs = () => {
  const [value, setValue] = useState(0);
  // const [createEncounter, setCreateEncounter] = useState<boolean>(false);
  const [appointmentHST, setAppointmentHST] = useState<boolean>(false);
  const [appointmentMillenium, setAppointmentMillenium] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    open: openDrawer,
    close: closeDrawer,
    content: contentDrawer,
  } = useDrawer();

  const handleDrawer = {
    createEncounterForm: (action: string) => {
      openDrawer({
        title: `${action} Encounter`,
        identifier: "drawer-create-encounter-form",
      });
    },
  };

  const DrawerContent = () => {
    switch (contentDrawer.identifier) {
      case "drawer-create-encounter-form":
        return <CreateEncounterForm onClose={closeDrawer} />;
      default:
        return <div />;
    }
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setValue(+tab);
    }
  }, [searchParams]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (location.pathname === "/admin/settings") {
      navigate("/admin/settings?tab=" + newValue);
    }

    setValue(newValue);
  };

  return (
    <>
      <MainDrawer
        content={<DrawerContent />}
        drawerWidth={"730px"}
        showSecondButton={true}
        anchor="right"
      />
      <Grid width={"100%"} height={"100%"} p={0}>
        <Grid
          height={"100%"}
          borderRadius={"8px"}
          container
          flexDirection={"column"}
        >
          <Grid width={"100%"}>
            <Grid
              container
              justifyContent={"space-between"}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs value={value} onChange={handleChange}>
                {tabLabels?.map((item, index) => (
                  <Tab
                    sx={{ textTransform: "none", fontWeight: 550 }}
                    key={index}
                    label={item}
                    {...a11yProps(0)}
                  />
                ))}
              </Tabs>
              <Grid pt={1} pb={1} pr={2}>
                {value === 0 && (
                  <Button
                    startIcon={<AddIcon />}
                    sx={{
                      p: "0px 10px",
                      bgcolor: theme.palette.secondary.main,
                      borderRadius: "12px",
                      color: theme.palette.common.white,
                    }}
                    onClick={() => {
                      handleDrawer.createEncounterForm("Create");
                    }}
                  >
                    Create Encounter
                  </Button>
                )}
                {value === 1 && (
                  <Button
                    startIcon={<AddIcon />}
                    sx={{
                      p: "0px 10px",
                      bgcolor: theme.palette.secondary.main,
                      borderRadius: "12px",
                      color: theme.palette.common.white,
                    }}
                    onClick={() => setAppointmentMillenium(true)}
                  >
                    Schedule Appointment
                  </Button>
                )}
                {value === 2 && (
                  <Button
                    startIcon={<AddIcon />}
                    sx={{
                      p: "0px 10px",
                      bgcolor: theme.palette.secondary.main,
                      borderRadius: "12px",
                      color: theme.palette.common.white,
                    }}
                  >
                    Schedule Appointment
                  </Button>
                )}
                {value === 3 && (
                  <Button
                    startIcon={<AddIcon />}
                    sx={{
                      p: "0px 10px",
                      bgcolor: theme.palette.secondary.main,
                      borderRadius: "12px",
                      color: theme.palette.common.white,
                    }}
                    onClick={() => setAppointmentHST(true)}
                  >
                    Schedule Appointment
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid flex={1}>
              {tabLabels.map((item, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                  {item === "Encounters" && <EncounterList />}
                  {item === "Millennium" && <EncounterMillennium />}
                  {item === "Sleep Impression" && <EncounterSleepImpression />}
                  {item === "HST Education" && <EncounterHstEducation />}
                </CustomTabPanel>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* <CustomDialog
        onClose={() => setCreateEncounter(false)}
        open={createEncounter}
        title="Create Encounter"
        width={600}
        showDivider={true}
      >
        <CreateEncounterForm onClose={() => setCreateEncounter(false)} />
      </CustomDialog> */}

        <CustomDialog
          onClose={() => setAppointmentHST(false)}
          open={appointmentHST}
          title="Schedule HST Education Appointment"
          width={600}
          showDivider={true}
        >
          <ScheduleAppointment onClose={() => setAppointmentHST(false)} />
        </CustomDialog>

        <CustomDialog
          onClose={() => setAppointmentMillenium(false)}
          open={appointmentMillenium}
          title="Schedule Millennium Appointment"
          width={600}
          showDivider={true}
        >
          <MilleniumScheduleAppointment
            onClose={() => setAppointmentMillenium(false)}
          />
        </CustomDialog>
      </Grid>
    </>
  );
};
export default SettingsTabs;
