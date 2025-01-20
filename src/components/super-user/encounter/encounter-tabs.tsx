import CustomButtonOutlined from "@/common-components/button-outlined/custom-button";
import MainDrawer from "@/components/ui/MainDrawer";
import { useDrawer } from "@/hooks/useDrawer";
import { theme } from "@/utils/theme";
import AddIcon from "@mui/icons-material/Add";
import { Tab, Tabs } from "@mui/material";
import { alpha, Grid } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  a11yProps,
  CustomTabPanel,
} from "../../../common-components/custom-tab/custom-tab";
import CreateEncounterForm from "./encounters/create-encounter-form";
import EncounterList from "./encounters/encounter-list";
import EncounterHstEducation from "./hst_education/encounter_hst_education";
import ScheduleAppointment from "./hst_education/schedule-appointment-form";
import EncounterMillennium from "./millenium/encounter-millenium";
import MilleniumScheduleAppointment from "./millenium/millenium-schedule-appointment-form";
import EncounterSleepImpression from "./sleep_impression/encounter_sleep_impression";
import SlScheduleAppointmentForm from "./sleep_impression/sl-schedule-appointment-form";

const tabLabels = [
  "Encounters",
  "Millennium",
  "Sleep Impression",
  "HST Education",
];

const SettingsTabs = () => {
  const [value, setValue] = useState(0);
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
      <Grid width={"100%"} height={"100%"} p={2}>
        <Grid
          height={"100%"}
          borderRadius={"8px"}
          container
          flexDirection={"column"}
        >
          <Grid
            width={"100%"}
            height={"100%"}
            container
            flexDirection={"column"}
          >
            <Grid
              container
              justifyContent={"space-between"}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ padding: "0" }}
                aria-label="simple tabs example"
              >
                {tabLabels?.map((item, index) => (
                  <Tab
                    sx={{
                      textTransform: "none",
                      ".css-1uuxvpa-MuiTabs-indicator ": {
                        bottom: "0",
                        position: "absolute",
                      },
                      fontWeight: 550,
                      background:
                        index === value
                          ? alpha(theme.palette.secondary.main, 0.2)
                          : "none",
                    }}
                    key={index}
                    label={item}
                    {...a11yProps(0)}
                  />
                ))}
              </Tabs>
              <Grid pt={1} pb={1}>
                <CustomButtonOutlined
                  variant="contained"
                  startIcon={<AddIcon />}
                  text={
                    value === 0 ? "Create Encounter" : "Schedule Appointment"
                  }
                  onClick={() => {
                    value === 0 && handleDrawer.createEncounterForm("Create");
                    value === 1 &&
                      handleDrawer.createMilleniumForm("Schedule Millennium");
                    value === 2 &&
                      handleDrawer.createSleepImpressionForm(
                        "Schedule Sleep Impression",
                      );
                    value === 3 &&
                      handleDrawer.createHSTForm("Schedule HST Education");
                  }}
                />
              </Grid>
            </Grid>
            <Grid flex={1} width={"100%"}>
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
      </Grid>
    </>
  );
};
export default SettingsTabs;
