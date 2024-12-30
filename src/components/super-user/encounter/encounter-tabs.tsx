import { Tab, Tabs } from "@mui/material";
import { Grid } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CustomTabPanel,
  a11yProps,
} from "../../../common-components/custom-tab/custom-tab";
import EncounterList from "./encounter-list";
import EncounterMillennium from "./encounter-millenium";

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
    <Grid width={"100%"} height={"100%"} p={0}>
      <Grid
        height={"100%"}
        borderRadius={"8px"}
        container
        flexDirection={"column"}
      >
        <Grid width={"100%"}>
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
                {item === "Encounters" && <EncounterList />}
                {item === "Millennium" && <EncounterMillennium />}
                {item === "Sleep Impression" && <></>}
                {item === "HST Education" && <></>}
              </CustomTabPanel>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SettingsTabs;
