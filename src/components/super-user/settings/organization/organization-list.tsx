import { useCallback, useEffect, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Grid } from "@mui/system";

import CustomButton from "@/common-components/button-outlined/custom-button";
import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";
import Paginator from "@/common-components/paginator/paginator";
import Status from "@/common-components/status/status";
import Switcher from "@/common-components/switcher/switcher";
import { heading, tableCellCss } from "@/common-components/table/common-table-widgets";
import CustomTableRow from "@/common-components/table/custom-table-row";
import { TableHeaders } from "@/common-components/table/table-models";

import { theme } from "@/utils/theme";

const widthOfTitle = "180px";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Grid container>
    <Typography width={widthOfTitle} color="#9B9D9F" variant="bodySmall">
      {label} &nbsp;&nbsp;:&nbsp;
    </Typography>
    <Typography variant="bodySmall">{value}</Typography>
  </Grid>
);

export const Headers: TableHeaders[] = [
  { header: "Provider Name" },
  { header: "Email" },
  { header: "Address" },
  { header: "Phone" },
  { header: "NPI" },
  { header: "Licensed State" },
  { header: "License Number" },
  { header: "License Exp" },
  { header: "Status" },
  { header: "Action" },
];

const OrganizationList = () => {
  const [selectedOrg, setSelectedOrg] = useState<"MSL" | "SI">("MSL");
  selectedOrg;
  const handleSwitcherChange = useCallback((option: string) => {
    setSelectedOrg(option as "MSL" | "SI");
  }, []);

  const [maxHeight, setMaxHeight] = useState<number>(350);

  useEffect(() => {
    const calculateHeight = () => {
      const availableHeight = window.innerHeight - 480;
      setMaxHeight(availableHeight);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <Grid height="100%" container flexDirection="column" width="100%" rowGap={1}>
      <Switcher options={["MSL", "SI"]} variant="light" onChange={handleSwitcherChange} buttonWidth={"100px"} />

      <Grid
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          bgcolor: theme.palette.common.white,
          p: 2,
        }}
        width="100%"
      >
        <Grid container alignItems="center" justifyContent="space-between" width="100%">
          <Typography variant="bodyMedium" fontWeight={500}>
            Millennium Sleep Labs
          </Typography>
          <CustomButton
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            text="Edit Details"
            onClick={() => undefined} // Placeholder for actual function
          />
        </Grid>

        <Grid container mt={1} spacing={2}>
          <Grid size={6} container flexDirection="column" rowGap={2}>
            <InfoRow label="Organization Name" value="Millennium Sleep Labs" />
            <InfoRow label="Contact Information" value="877-933-9470" />
            <InfoRow label="Physical Address" value="2715 Ash Dr. San Jose, South Dakota 83475" />
          </Grid>
          <Grid size={6} container flexDirection="column" rowGap={2}>
            <InfoRow label="Billing Address" value="2715 Ash Dr. San Jose, South Dakota 83475" />
            <InfoRow label="Tax ID" value="1234567890" />
            <InfoRow label="Type" value="Type" />
          </Grid>
        </Grid>
      </Grid>
      <Grid container width={"100%"} flexDirection={"column"} rowGap={1}>
        <Switcher
          options={["Providers", "Staff"]}
          buttonWidth={"100px"}
          variant={"light"}
          onChange={function (option: string): void {
            option;
          }}
        />

        <Grid width={"100%"}>
          <TableContainer
            sx={{
              maxHeight: maxHeight,
              maxWidth: "100%",
              overflowY: "auto",
              bgcolor: "white",
            }}
          >
            <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
              <TableHead>
                <TableRow>
                  {Headers.map((header, index) => (
                    <TableCell
                      sx={{
                        ...heading,
                        minWidth: header.minWidth ? header.minWidth : "inherit",
                        maxWidth: header.maxWidth ? header.maxWidth : "inherit",
                      }}
                      align="left"
                      key={index}
                    >
                      <Grid pr={4} container flexDirection={"column"}>
                        <Typography variant="bodySmall">{header.header}</Typography>
                      </Grid>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableDataEncounter.length > 0 ? (
                  tableDataEncounter.map((list, index) => (
                    <TableRow hover key={index}>
                      <CustomTableRow
                        children={<CustomClickableLink text={list?.providerName} onClick={function (): void {}} />}
                      />
                      <CustomTableRow value={list?.email} />
                      <CustomTableRow value={list?.address} />
                      <CustomTableRow value={list?.phone} />
                      <CustomTableRow value={list?.npi} />
                      <CustomTableRow value={list?.licenedState} />
                      <CustomTableRow value={list?.licenedNumber} />
                      <CustomTableRow value={list?.licenedExp} />
                      <CustomTableRow children={<Status width="100px" status="ACTIVE" />} />
                      <CustomTableRow value={list?.action} />
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <CustomTableRow value="No records found" />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container sx={{ borderTop: "1px solid #E7E7E7" }}>
          <Paginator
            page={0}
            totalPages={5}
            totalRecord={5}
            onPageChange={() => {}}
            onRecordsPerPageChange={() => {}}
            defaultSize={10}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrganizationList;

export const tableDataEncounter = [
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
  {
    providerName: "-",
    email: "-",
    address: "-",
    phone: "-",
    npi: "-",
    licenedState: "-",
    licenedNumber: "-",
    licenedExp: "-",
    status: "-",
    action: "-",
  },
];
