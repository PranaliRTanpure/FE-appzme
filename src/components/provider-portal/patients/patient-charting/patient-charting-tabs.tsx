import { Tab, Tabs } from "@mui/material";
import { Grid } from "@mui/system";
import React, { useState } from "react";
import {
  a11yProps,
  CustomTabPanel,
} from "../../../../common-components/custom-tab/custom-tab";
import ConsentForm from "../../consent-forms/consent-forms-list";
import VitalsDetails from "./vitals/vitals";

const tabLabels = [
  "Vitals",
  "Alerts",
  "Care Plans",
  "Allergies",
  "Medications",
  "Diagnosis",
  "Appointments",
  "Time Logs",
  "Devices",
];

const PatientChartingTabs = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    event;
  };
  return (
    <Grid
      height={"100%"}
      p={2}
      width={"100%"}
      maxWidth={"100%"}
      overflow={"auto"}
    >
      <Grid
        height={"100%"}
        borderRadius={"8px"}
        container
        flexDirection={"column"}
      >
        <Grid>
          <Grid sx={{ borderBottom: 1, borderColor: "divider" }}>
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
          </Grid>
          <Grid flex={1}>
            {tabLabels.map((item, index) => (
              <CustomTabPanel key={index} value={value} index={index}>
                {item === "Vitals" && <VitalsDetails />}
                {item === "Consent Forms" && <ConsentForm />}
              </CustomTabPanel>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PatientChartingTabs;
