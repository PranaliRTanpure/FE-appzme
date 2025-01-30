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
  { header: "Staff Name" },
  { header: "Email" },
  { header: "Address" },
  { header: "Phone" },
  { header: "Status" },
  { header: "Action" },
];

const MSLStaffList = () => {
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
                      children={<CustomClickableLink text={list?.staffName} onClick={function (): void {}} />}
                    />
                    <CustomTableRow value={list?.email} />
                    <CustomTableRow value={list?.address} />
                    <CustomTableRow value={list?.phone} />
                    <CustomTableRow children={<Status width="100px" status={list?.status} />} />
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
export default MSLStaffList;

const dummyData = [
  {
    staffName: "Alice Johnson",
    email: "alice.johnson@example.com",
    address: "123 Maple St, Springfield, IL",
    phone: "(217) 555-1234",
    status: "ACTIVE",
  },
  {
    staffName: "Bob Williams",
    email: "bob.williams@example.com",
    address: "456 Oak St, Austin, TX",
    phone: "(512) 555-2345",
    status: "INACTIVE",
  },
  {
    staffName: "Charlie Brown",
    email: "charlie.brown@example.com",
    address: "789 Pine St, Denver, CO",
    phone: "(303) 555-3456",
    status: "ACTIVE",
  },
  {
    staffName: "Daisy Miller",
    email: "daisy.miller@example.com",
    address: "321 Cedar St, Miami, FL",
    phone: "(305) 555-4567",
    status: "INACTIVE",
  },
  {
    staffName: "Ethan Davis",
    email: "ethan.davis@example.com",
    address: "654 Birch St, Seattle, WA",
    phone: "(206) 555-5678",
    status: "ACTIVE",
  },
  {
    staffName: "Fiona White",
    email: "fiona.white@example.com",
    address: "987 Willow St, Boston, MA",
    phone: "(617) 555-6789",
    status: "ACTIVE",
  },
  {
    staffName: "George Anderson",
    email: "george.anderson@example.com",
    address: "159 Redwood St, Phoenix, AZ",
    phone: "(602) 555-7890",
    status: "INACTIVE",
  },
  {
    staffName: "Hannah Clark",
    email: "hannah.clark@example.com",
    address: "753 Aspen St, San Diego, CA",
    phone: "(858) 555-8901",
    status: "ACTIVE",
  },
  {
    staffName: "Isaac Harris",
    email: "isaac.harris@example.com",
    address: "951 Magnolia St, Chicago, IL",
    phone: "(312) 555-9012",
    status: "INACTIVE",
  },
  {
    staffName: "Jessica Lewis",
    email: "jessica.lewis@example.com",
    address: "357 Cypress St, Dallas, TX",
    phone: "(214) 555-0123",
    status: "ACTIVE",
  },
  {
    staffName: "Kevin Hall",
    email: "kevin.hall@example.com",
    address: "246 Hickory St, Atlanta, GA",
    phone: "(404) 555-1234",
    status: "INACTIVE",
  },
  {
    staffName: "Liam Scott",
    email: "liam.scott@example.com",
    address: "135 Chestnut St, Portland, OR",
    phone: "(503) 555-2345",
    status: "ACTIVE",
  },
  {
    staffName: "Mia Thompson",
    email: "mia.thompson@example.com",
    address: "864 Dogwood St, Nashville, TN",
    phone: "(615) 555-3456",
    status: "ACTIVE",
  },
  {
    staffName: "Nathan King",
    email: "nathan.king@example.com",
    address: "482 Sycamore St, Columbus, OH",
    phone: "(614) 555-4567",
    status: "INACTIVE",
  },
  {
    staffName: "Olivia Walker",
    email: "olivia.walker@example.com",
    address: "294 Alder St, Indianapolis, IN",
    phone: "(317) 555-5678",
    status: "ACTIVE",
  },
  {
    staffName: "Patrick Young",
    email: "patrick.young@example.com",
    address: "708 Spruce St, Kansas City, MO",
    phone: "(816) 555-6789",
    status: "ACTIVE",
  },
  {
    staffName: "Quinn Green",
    email: "quinn.green@example.com",
    address: "523 Poplar St, Charlotte, NC",
    phone: "(704) 555-7890",
    status: "INACTIVE",
  },
  {
    staffName: "Rachel Adams",
    email: "rachel.adams@example.com",
    address: "678 Juniper St, Minneapolis, MN",
    phone: "(612) 555-8901",
    status: "ACTIVE",
  },
  {
    staffName: "Samuel Baker",
    email: "samuel.baker@example.com",
    address: "412 Maple St, Tampa, FL",
    phone: "(813) 555-9012",
    status: "ACTIVE",
  },
  {
    staffName: "Tina Robinson",
    email: "tina.robinson@example.com",
    address: "293 Elm St, Denver, CO",
    phone: "(303) 555-0123",
    status: "INACTIVE",
  },
  {
    staffName: "Rachel Adams",
    email: "rachel.adams@example.com",
    address: "678 Juniper St, Minneapolis, MN",
    phone: "(612) 555-8901",
    status: "ACTIVE",
  },
  {
    staffName: "Samuel Baker",
    email: "samuel.baker@example.com",
    address: "412 Maple St, Tampa, FL",
    phone: "(813) 555-9012",
    status: "INACTIVE",
  },
];
