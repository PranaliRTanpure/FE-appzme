import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";

import CustomButton from "@/common-components/button-outlined/custom-button";
import Paginator from "@/common-components/paginator/paginator";
import { heading, tableCellCss, typographyCss } from "@/common-components/table/common-table-widgets";
import { TableHeaders } from "@/common-components/table/table-models";

export const mockHeaders: TableHeaders[] = [
  { header: "Name" },
  { header: "Practicce Type" },
  { header: "Address" },
  { header: "Contact No" },
  { header: "Email" },
  { header: "Fax" },
  { header: "Action" },
];

const PracticeContactList = () => {
  const [selectedAction, setSelectedAction] = useState("");
  setSelectedAction;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container width={"100%"} flexDirection={"column"} rowGap={3}>
      {/* Grid 1 */}
      <Grid container width={"100%"} justifyContent={"space-between"}>
        <Grid alignContent={"center"}>
          <Typography variant="bodyMedium" fontWeight={500}>
            Practice Contacts
          </Typography>
        </Grid>
        <Grid>
          <CustomButton text="Add Practice Contact" onClick={() => {}} variant="contained" startIcon={<AddIcon />} />
        </Grid>
      </Grid>
      {/* Grid 2 */}
      <Grid width={"100%"}>
        <TableContainer
          sx={{
            maxHeight: "69vh",
            overflowY: "auto",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px -2px #1018281A",
          }}
        >
          <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
            <TableHead>
              <TableRow>
                {mockHeaders.map((header, index) => (
                  <TableCell
                    sx={{
                      ...heading,
                      minWidth: header.minWidth ? header.minWidth : "inherit",
                      maxWidth: header.maxWidth ? header.maxWidth : "inherit",
                      width: header.width ? header.width : "inherit",
                    }}
                    align="left"
                    key={index}
                  >
                    <Grid
                      pr={4}
                      container
                      flexDirection={"column"}
                      alignContent={header.header === "Action" ? "flex-end" : "flex-start"}
                    >
                      <Typography variant="bodySmall">{header.header}</Typography>
                    </Grid>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ background: "white" }}>
              {paginatedData.length > 0 ? (
                paginatedData.map((list, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                          {list?.name}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                          {list?.practiceType}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                          {list?.address}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                          {list?.contact}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                          {list?.email}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                          {list?.fax}
                        </Typography>
                      </Grid>
                    </TableCell>

                    <TableCell sx={heading} align="right">
                      <Grid pr={6} height={"100%"}>
                        <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleMenuClose}
                        slotProps={{
                          paper: {
                            style: {
                              marginTop: "30px",
                              width: "120px",
                              boxShadow: "none",
                              borderRadius: "12px",
                              background: "white",
                            },
                          },
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuList autoFocusItem={!!anchorEl}>
                          {["Archive", "Edit", "Restore"].map((v) => (
                            <MenuItem
                              key={v}
                              selected={v === selectedAction}
                              // onClick={() => {
                              //     setSelectedAction(v);
                              //     handleMenuClose();
                              //     v === "Archive";
                              //     if (v === "Edit") {
                              //         handleDrawer.addSiClinicForm("Edit");
                              //     }
                              // }}
                              onClick={() => {}}
                            >
                              <Typography variant="bodySmall">{v}</Typography>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography variant="bodySmall" fontWeight={550}>
                      No records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <Grid container>
          <Paginator
            page={currentPage}
            totalPages={totalPages}
            totalRecord={totalRecords}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            defaultSize={recordsPerPage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PracticeContactList;

const dummyData = [
  {
    name: "John Doe",
    practiceType: "SL",
    address: "123 Main St, Springfield, IL",
    contact: "(217) 555-1234",
    email: "johndoe@example.com",
    fax: "(217) 555-5678",
  },
  {
    name: "Jane Smith",
    practiceType: "DME",
    address: "456 Elm St, Austin, TX",
    contact: "(512) 555-2345",
    email: "janesmith@example.com",
    fax: "(512) 555-6789",
  },
  {
    name: "Michael Johnson",
    practiceType: "Hospital",
    address: "789 Oak St, Denver, CO",
    contact: "(303) 555-3456",
    email: "michaelj@example.com",
    fax: "(303) 555-7890",
  },
  {
    name: "Emily Brown",
    practiceType: "SL",
    address: "321 Pine St, Miami, FL",
    contact: "(305) 555-4567",
    email: "emilybrown@example.com",
    fax: "(305) 555-8901",
  },
  {
    name: "William Davis",
    practiceType: "DME",
    address: "654 Cedar St, Seattle, WA",
    contact: "(206) 555-5678",
    email: "williamd@example.com",
    fax: "(206) 555-9012",
  },
  {
    name: "Olivia Martinez",
    practiceType: "Hospital",
    address: "987 Maple St, Boston, MA",
    contact: "(617) 555-6789",
    email: "oliviam@example.com",
    fax: "(617) 555-0123",
  },
  {
    name: "Daniel Wilson",
    practiceType: "SL",
    address: "159 Birch St, Phoenix, AZ",
    contact: "(602) 555-7890",
    email: "danielw@example.com",
    fax: "(602) 555-1234",
  },
  {
    name: "Sophia Anderson",
    practiceType: "DME",
    address: "753 Spruce St, San Diego, CA",
    contact: "(858) 555-8901",
    email: "sophiaa@example.com",
    fax: "(858) 555-2345",
  },
  {
    name: "David Thompson",
    practiceType: "Hospital",
    address: "951 Willow St, Chicago, IL",
    contact: "(312) 555-9012",
    email: "davidth@example.com",
    fax: "(312) 555-3456",
  },
  {
    name: "Isabella White",
    practiceType: "SL",
    address: "357 Redwood St, Dallas, TX",
    contact: "(214) 555-0123",
    email: "isabellaw@example.com",
    fax: "(214) 555-4567",
  },
  {
    name: "James Harris",
    practiceType: "DME",
    address: "246 Aspen St, Atlanta, GA",
    contact: "(404) 555-1234",
    email: "jamesh@example.com",
    fax: "(404) 555-5678",
  },
  {
    name: "Mia Clark",
    practiceType: "Hospital",
    address: "135 Cypress St, Portland, OR",
    contact: "(503) 555-2345",
    email: "miac@example.com",
    fax: "(503) 555-6789",
  },
  {
    name: "Benjamin Lewis",
    practiceType: "SL",
    address: "864 Hickory St, Nashville, TN",
    contact: "(615) 555-3456",
    email: "benjaminl@example.com",
    fax: "(615) 555-7890",
  },
  {
    name: "Charlotte Walker",
    practiceType: "DME",
    address: "482 Chestnut St, Columbus, OH",
    contact: "(614) 555-4567",
    email: "charlottew@example.com",
    fax: "(614) 555-8901",
  },
  {
    name: "Ethan Hall",
    practiceType: "Hospital",
    address: "294 Magnolia St, Indianapolis, IN",
    contact: "(317) 555-5678",
    email: "ethanh@example.com",
    fax: "(317) 555-9012",
  },
  {
    name: "Amelia Scott",
    practiceType: "SL",
    address: "708 Dogwood St, Kansas City, MO",
    contact: "(816) 555-6789",
    email: "amelias@example.com",
    fax: "(816) 555-0123",
  },
  {
    name: "Lucas Green",
    practiceType: "DME",
    address: "523 Sycamore St, Charlotte, NC",
    contact: "(704) 555-7890",
    email: "lucasg@example.com",
    fax: "(704) 555-1234",
  },
  {
    name: "Harper Young",
    practiceType: "Hospital",
    address: "678 Juniper St, Minneapolis, MN",
    contact: "(612) 555-8901",
    email: "harpery@example.com",
    fax: "(612) 555-2345",
  },
  {
    name: "Henry King",
    practiceType: "SL",
    address: "412 Alder St, Tampa, FL",
    contact: "(813) 555-9012",
    email: "henryk@example.com",
    fax: "(813) 555-3456",
  },
  {
    name: "Evelyn Adams",
    practiceType: "DME",
    address: "293 Poplar St, Denver, CO",
    contact: "(303) 555-0123",
    email: "evelyna@example.com",
    fax: "(303) 555-4567",
  },
  {
    name: "Liam Baker",
    practiceType: "Hospital",
    address: "187 Ash St, Houston, TX",
    contact: "(713) 555-1234",
    email: "liamb@example.com",
    fax: "(713) 555-5678",
  },
];
