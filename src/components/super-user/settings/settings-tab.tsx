import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/system";

import Switcher from "@/common-components/switcher/switcher";

import { toCamelCase } from "@/utils/toCamelCase";

import MacrosList from "./macros/macros-list";
import MSLDetails from "./organization/msl-details";
import SiClinicsList from "./si-clinics/si-clinics-list";

enum SettingDetailsType {
  "MSL" = "MSL",

  SI = "SI",

  ENCOUNTER_TYPES = "Encounter Types",

  PRACTICE_CONTACTS = "Practice Contacts",

  MACROS = "Macros",

  INTAKECONSENT = "Intake/Consent",

  DEFAULT_WORDING = "Default Wording",

  ROLES_AND_PRIVILEGES = "Roles and Privileges",

  AVAILABILITY = "Availabillity",

  RATE_CHART = "Rate Chart",
}

const SettingsTab = () => {
  const navigate = useNavigate();
  const [detailType, setDetailType] = useState(SettingDetailsType.MSL);

  return (
    <Grid container width={"100%"} p={2} flexDirection={"column"} rowGap={1}>
      {/* Switcher Grid */}
      <Grid
        container
        width={"100%"}
        minWidth={"100%"}
        overflow={"auto"}
        sx={{ pb: 1, borderBottom: 1, borderColor: "divider" }}
      >
        <Switcher
          options={[
            "MSL",
            "SI",
            "Encounter Types",
            "Practice Contacts",
            "Macros",
            "Intake/Consent",
            "Default Wording",
            "Roles and Privileges",
            "Availabillity",
            "Rate Chart",
          ]}
          buttonWidth={"160px"}
          variant={"light"}
          onChange={(option: string): void => {
            setDetailType(option as SettingDetailsType);
            navigate(`/super-user/settings?tabs=${toCamelCase(option.replace(" ", "-").replace(" ", "-"))}`);
          }}
        />
      </Grid>
      {/* Pages Grid */}
      <Grid container width={"100%"} borderRadius={3}>
        {detailType === SettingDetailsType.MSL && (
          <Grid container width={"100%"}>
            <MSLDetails />
          </Grid>
        )}
        {detailType === SettingDetailsType.SI && (
          <Grid container width={"100%"}>
            <SiClinicsList />
          </Grid>
        )}
        {detailType === SettingDetailsType.MACROS && (
          <Grid container width={"100%"}>
            <MacrosList />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
export default SettingsTab;
