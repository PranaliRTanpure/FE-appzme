import { ENV } from "../../constants/config";
import { ENVIRONMENTS } from "../../constants/environments";

export function GetTenantId() {
  const url = window.location.href;

  const regex =
    ENV === ENVIRONMENTS.DEVELOPMENT
      ? /https:\/\/(.*?)\.dev\.care\.eamata\.com/
      : ENV === ENVIRONMENTS.QA
        ? /https:\/\/(.*?)\.qa\.care\.eamata\.com/
        : ENV === ENVIRONMENTS.UAT
          ? /https:\/\/(.*?)\.uat\.care\.eamata\.com/
          : /https:\/\/(.*?)\.dev\.care\.eamata\.com/;

  const match = url.match(regex);
  let xTenantId = "";

  if (match) {
    xTenantId = match[1];
  }
  return ENV === ENVIRONMENTS.DEVELOPMENT
    ? `dev_${xTenantId}`
    : ENV === ENVIRONMENTS.QA
      ? `qa_${xTenantId}`
      : ENV === ENVIRONMENTS.UAT
        ? `uat_${xTenantId}`
        : `qa_${xTenantId}`;
}
