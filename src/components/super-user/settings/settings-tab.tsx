import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/system";

import Switcher from "@/common-components/switcher/switcher";

import { toCamelCase } from "@/utils/toCamelCase";

import MacrosList from "./macros/macros-list";
import OrganizationList from "./organization/organization-list";
import PracticeContactList from "./practice-contacts/practice-contacts-list";
import SiClinicsList from "./si-clinics/si-clinics-list";

enum SettingDetailsType {
  ORGANIZATION = "Organization",

  SI_CLINICS = "SI Clinics",

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
  const [detailType, setDetailType] = useState(SettingDetailsType.ORGANIZATION);

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
            "Organization",
            "SI Clinics",
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
          visibleCount={7}
          onChange={(option: string): void => {
            setDetailType(option as SettingDetailsType);
            navigate(`/super-user/settings?tabs=${toCamelCase(option.replace(" ", "-").replace(" ", "-"))}`);
          }}
        />
      </Grid>
      {/* Pages Grid */}
      <Grid container width={"100%"} borderRadius={3}>
        {detailType === SettingDetailsType.ORGANIZATION && (
          <Grid container width={"100%"}>
            <OrganizationList />
          </Grid>
        )}
        {detailType === SettingDetailsType.SI_CLINICS && (
          <Grid container width={"100%"}>
            <SiClinicsList />
          </Grid>
        )}
        {detailType === SettingDetailsType.MACROS && (
          <Grid container width={"100%"}>
            <MacrosList />
          </Grid>
        )}
        {detailType === SettingDetailsType.PRACTICE_CONTACTS && (
          <Grid container width={"100%"}>
            <PracticeContactList />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
export default SettingsTab;
