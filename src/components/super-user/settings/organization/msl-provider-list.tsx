import React, { useEffect, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";

import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";
import Paginator from "@/common-components/paginator/paginator";
import Status from "@/common-components/status/status";
import { heading, tableCellCss } from "@/common-components/table/common-table-widgets";
import CustomTableRow from "@/common-components/table/custom-table-row";
import { TableHeaders } from "@/common-components/table/table-models";

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

const MSLProviderList = () => {
  const [maxHeight, setMaxHeight] = useState<number>(330);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const totalRecords = dummyData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRecordsPerPageChange = (newSize: number) => {
    setRecordsPerPage(newSize);
    setCurrentPage(0);
  };

  const paginatedData = dummyData.slice(currentPage * recordsPerPage, currentPage * recordsPerPage + recordsPerPage);

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
    <>
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
              {paginatedData.length > 0 ? (
                paginatedData.map((list, index) => (
                  <TableRow hover key={index}>
                    <CustomTableRow
                      children={<CustomClickableLink text={list?.providerName} onClick={function (): void {}} />}
                    />
                    <CustomTableRow value={list?.email} />
                    <CustomTableRow value={list?.address} />
                    <CustomTableRow value={list?.phone} />
                    <CustomTableRow value={list?.npi} />
                    <CustomTableRow value={list?.licensedState} />
                    <CustomTableRow value={list?.licenseNumber} />
                    <CustomTableRow value={list?.licenseExpDate} />
                    <CustomTableRow children={<Status width="100px" status={list.status} />} />
                    <CustomTableRow
                      children={
                        <Grid pr={6} height={"100%"}>
                          <IconButton onClick={() => {}} sx={{ p: 0 }}>
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      }
                    />
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
          page={currentPage}
          totalPages={totalPages}
          totalRecord={totalRecords}
          onPageChange={handlePageChange}
          onRecordsPerPageChange={handleRecordsPerPageChange}
          defaultSize={recordsPerPage}
        />
      </Grid>
    </>
  );
};

export default MSLProviderList;

const dummyData = [
  {
    providerName: "Dr. John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Springfield, IL",
    phone: "(217) 555-1234",
    npi: "1234567890",
    licensedState: "Illinois",
    licenseNumber: "IL123456",
    licenseExpDate: "2026-12-31",
    status: "INACTIVE",
  },
  {
    providerName: "Dr. Jane Smith",
    email: "janesmith@example.com",
    address: "456 Elm St, Austin, TX",
    phone: "(512) 555-2345",
    npi: "2345678901",
    licensedState: "Texas",
    licenseNumber: "TX234567",
    licenseExpDate: "2025-06-15",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Michael Johnson",
    email: "michaelj@example.com",
    address: "789 Oak St, Denver, CO",
    phone: "(303) 555-3456",
    npi: "3456789012",
    licensedState: "Colorado",
    licenseNumber: "CO345678",
    licenseExpDate: "2024-09-30",
    status: "INACTIVE",
  },
  {
    providerName: "Dr. Emily Brown",
    email: "emilybrown@example.com",
    address: "321 Pine St, Miami, FL",
    phone: "(305) 555-4567",
    npi: "4567890123",
    licensedState: "Florida",
    licenseNumber: "FL456789",
    licenseExpDate: "2027-01-25",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. William Davis",
    email: "williamd@example.com",
    address: "654 Cedar St, Seattle, WA",
    phone: "(206) 555-5678",
    npi: "5678901234",
    licensedState: "Washington",
    licenseNumber: "WA567890",
    licenseExpDate: "2026-04-12",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Olivia Martinez",
    email: "oliviam@example.com",
    address: "987 Maple St, Boston, MA",
    phone: "(617) 555-6789",
    npi: "6789012345",
    licensedState: "Massachusetts",
    licenseNumber: "MA678901",
    licenseExpDate: "2025-11-05",
    status: "INACTIVE",
  },
  {
    providerName: "Dr. Daniel Wilson",
    email: "danielw@example.com",
    address: "159 Birch St, Phoenix, AZ",
    phone: "(602) 555-7890",
    npi: "7890123456",
    licensedState: "Arizona",
    licenseNumber: "AZ789012",
    licenseExpDate: "2026-03-10",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Sophia Anderson",
    email: "sophiaa@example.com",
    address: "753 Spruce St, San Diego, CA",
    phone: "(858) 555-8901",
    npi: "8901234567",
    licensedState: "California",
    licenseNumber: "CA890123",
    licenseExpDate: "2024-08-20",
    status: "INACTIVE",
  },
  {
    providerName: "Dr. David Thompson",
    email: "davidth@example.com",
    address: "951 Willow St, Chicago, IL",
    phone: "(312) 555-9012",
    npi: "9012345678",
    licensedState: "Illinois",
    licenseNumber: "IL901234",
    licenseExpDate: "2027-02-18",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Isabella White",
    email: "isabellaw@example.com",
    address: "357 Redwood St, Dallas, TX",
    phone: "(214) 555-0123",
    npi: "0123456789",
    licensedState: "Texas",
    licenseNumber: "TX012345",
    licenseExpDate: "2025-07-30",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. James Harris",
    email: "jamesh@example.com",
    address: "246 Aspen St, Atlanta, GA",
    phone: "(404) 555-1234",
    npi: "1234567890",
    licensedState: "Georgia",
    licenseNumber: "GA123456",
    licenseExpDate: "2024-10-22",
    status: "INACTIVE",
  },
  {
    providerName: "Dr. Mia Clark",
    email: "miac@example.com",
    address: "135 Cypress St, Portland, OR",
    phone: "(503) 555-2345",
    npi: "2345678901",
    licensedState: "Oregon",
    licenseNumber: "OR234567",
    licenseExpDate: "2026-12-01",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Benjamin Lewis",
    email: "benjaminl@example.com",
    address: "864 Hickory St, Nashville, TN",
    phone: "(615) 555-3456",
    npi: "3456789012",
    licensedState: "Tennessee",
    licenseNumber: "TN345678",
    licenseExpDate: "2027-03-17",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Charlotte Walker",
    email: "charlottew@example.com",
    address: "482 Chestnut St, Columbus, OH",
    phone: "(614) 555-4567",
    npi: "4567890123",
    licensedState: "Ohio",
    licenseNumber: "OH456789",
    licenseExpDate: "2025-09-28",
    status: "INACTIVE",
  },
  {
    providerName: "Dr. Ethan Hall",
    email: "ethanh@example.com",
    address: "294 Magnolia St, Indianapolis, IN",
    phone: "(317) 555-5678",
    npi: "5678901234",
    licensedState: "Indiana",
    licenseNumber: "IN567890",
    licenseExpDate: "2026-06-12",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Amelia Scott",
    email: "amelias@example.com",
    address: "708 Dogwood St, Kansas City, MO",
    phone: "(816) 555-6789",
    npi: "6789012345",
    licensedState: "Missouri",
    licenseNumber: "MO678901",
    licenseExpDate: "2027-05-25",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Lucas Green",
    email: "lucasg@example.com",
    address: "523 Sycamore St, Charlotte, NC",
    phone: "(704) 555-7890",
    npi: "7890123456",
    licensedState: "North Carolina",
    licenseNumber: "NC789012",
    licenseExpDate: "2026-02-05",
    status: "INACTIVE",
  },
  {
    providerName: "Dr. Harper Young",
    email: "harpery@example.com",
    address: "678 Juniper St, Minneapolis, MN",
    phone: "(612) 555-8901",
    npi: "8901234567",
    licensedState: "Minnesota",
    licenseNumber: "MN890123",
    licenseExpDate: "2025-11-14",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Henry King",
    email: "henryk@example.com",
    address: "412 Alder St, Tampa, FL",
    phone: "(813) 555-9012",
    npi: "9012345678",
    licensedState: "Florida",
    licenseNumber: "FL901234",
    licenseExpDate: "2026-01-18",
    status: "ACTIVE",
  },
  {
    providerName: "Dr. Evelyn Adams",
    email: "evelyna@example.com",
    address: "293 Poplar St, Denver, CO",
    phone: "(303) 555-0123",
    npi: "0123456789",
    licensedState: "Colorado",
    licenseNumber: "CO012345",
    licenseExpDate: "2024-08-22",
    status: "INACTIVE",
  },
  {
    providerName: "Dr. Liam Baker",
    email: "liamb@example.com",
    address: "187 Ash St, Houston, TX",
    phone: "(713) 555-1234",
    npi: "1234567890",
    licensedState: "Texas",
    licenseNumber: "TX123456",
    licenseExpDate: "2027-04-30",
    status: "ACTIVE",
  },
];
