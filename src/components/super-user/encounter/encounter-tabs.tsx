import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/system";

import CustomButtonOutlined from "@/common-components/button-outlined/custom-button";
import Switcher from "@/common-components/switcher/switcher";

import MainDrawer from "@/components/ui/MainDrawer";
import { useDrawer } from "@/hooks/useDrawer";

import CreateEncounterForm from "./encounters/create-encounter-form";
import EncounterList from "./encounters/encounter-list";
import EncounterHstEducation from "./hst_education/encounter_hst_education";
import ScheduleAppointment from "./hst_education/schedule-appointment-form";
import EncounterMillennium from "./millenium/encounter-millenium";
import MilleniumScheduleAppointment from "./millenium/millenium-schedule-appointment-form";
import EncounterSleepImpression from "./sleep_impression/encounter_sleep_impression";
import SlScheduleAppointmentForm from "./sleep_impression/sl-schedule-appointment-form";

const tabLabels = ["Encounters", "Millennium", "Sleep Impression", "HST Education"];

const SettingsTabs = () => {
  const [value, setValue] = useState<string>(tabLabels[0]);
  const navigate = useNavigate();

  const { open: openDrawer, close: closeDrawer, content: contentDrawer } = useDrawer();

  const handleDrawer = {
    createEncounterForm: (action: string) => {
      openDrawer({
        title: `${action} Encounter`,
        identifier: "drawer-create-encounter-form",
      });
    },
    createMilleniumForm: (action: string) => {
      openDrawer({
        title: `${action} Appointment`,
        identifier: "drawer-millenium-form",
      });
    },
    createHSTForm: (action: string) => {
      openDrawer({
        title: `${action} Appointment`,
        identifier: "drawer-hst-form",
      });
    },
    createSleepImpressionForm: (action: string) => {
      openDrawer({
        title: `${action} Appointment`,
        identifier: "drawer-sleep-impression-form",
      });
    },
  };

  const DrawerContent = () => {
    switch (contentDrawer.identifier) {
      case "drawer-create-encounter-form":
        return <CreateEncounterForm onClose={closeDrawer} />;
      case "drawer-millenium-form":
        return <MilleniumScheduleAppointment onClose={closeDrawer} />;
      case "drawer-hst-form":
        return <ScheduleAppointment onClose={closeDrawer} />;
      case "drawer-sleep-impression-form":
        return <SlScheduleAppointmentForm onClose={closeDrawer} />;
      default:
        return <div />;
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (location.pathname === "/admin/settings") {
      navigate("/admin/settings?" + newValue);
    }
  };

  const renderComponents = () => {
    if (value === tabLabels[0]) {
      return <EncounterList />;
    }
    if (value === tabLabels[1]) {
      return <EncounterMillennium />;
    }
    if (value === tabLabels[2]) {
      return <EncounterSleepImpression />;
    }
    if (value === tabLabels[3]) {
      return <EncounterHstEducation />;
    }
    return <></>;
  };
  return (
    <>
      <MainDrawer content={<DrawerContent />} drawerWidth={"730px"} showSecondButton={true} anchor="right" />
      <Grid width={"100%"} height={"100%"} p={2}>
        <Grid height={"100%"} borderRadius={"8px"} container flexDirection={"column"}>
          <Grid width={"100%"} height={"100%"} container flexDirection={"column"}>
            <Grid container pb={1.5} justifyContent={"space-between"} sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Switcher
                options={tabLabels}
                buttonWidth={"170px"}
                variant={"dark"}
                onChange={(option: string) => {
                  handleChange(option);
                }}
              />

              <Grid>
                <CustomButtonOutlined
                  variant="contained"
                  startIcon={<AddIcon />}
                  text={value === tabLabels[0] ? "Create Encounter" : "Schedule Appointment"}
                  onClick={() => {
                    value === tabLabels[0] && handleDrawer.createEncounterForm("Create");
                    value === tabLabels[1] && handleDrawer.createMilleniumForm("Schedule Millennium");
                    value === tabLabels[2] && handleDrawer.createSleepImpressionForm("Schedule Sleep Impression");
                    value === tabLabels[3] && handleDrawer.createHSTForm("Schedule HST Education");
                  }}
                />
              </Grid>
            </Grid>
            <Grid flex={1} width={"100%"}>
              {renderComponents()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default SettingsTabs;
