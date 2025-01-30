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
import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";
import Paginator from "@/common-components/paginator/paginator";
import { heading, tableCellCss, typographyCss } from "@/common-components/table/common-table-widgets";
import { TableHeaders } from "@/common-components/table/table-models";

export const mockHeaders: TableHeaders[] = [{ header: "Tittle" }, { header: "Created By" }, { header: "Action" }];

const MacrosList = () => {
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
            Macros
          </Typography>
        </Grid>
        <Grid>
          <CustomButton text="Create Macro" onClick={() => {}} variant="contained" startIcon={<AddIcon />} />
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
                      <CustomClickableLink text={list?.title} onClick={function (): void {}} />
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                          {list?.createdBy}
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
export default MacrosList;

const dummyData = [
  { title: "Project Alpha", createdBy: "John Doe" },
  { title: "Marketing Strategy", createdBy: "Jane Smith" },
  { title: "Product Roadmap", createdBy: "Emily Johnson" },
  { title: "Design Guidelines", createdBy: "Michael Brown" },
  { title: "Client Proposal", createdBy: "Sarah Davis" },
  { title: "Research Report", createdBy: "David Wilson" },
  { title: "Team Meeting Notes", createdBy: "Olivia Taylor" },
  { title: "Financial Analysis", createdBy: "James Anderson" },
  { title: "Sales Forecast", createdBy: "Sophia Martinez" },
  { title: "Technical Documentation", createdBy: "Robert Thomas" },
  { title: "User Experience Study", createdBy: "Charlotte White" },
  { title: "Investor Presentation", createdBy: "Daniel Harris" },
  { title: "Content Marketing Plan", createdBy: "Amelia Robinson" },
  { title: "HR Policies Update", createdBy: "Liam Walker" },
  { title: "Software Architecture", createdBy: "Mia Lee" },
  { title: "Quarterly Budget Review", createdBy: "Benjamin Hall" },
  { title: "Competitive Analysis", createdBy: "Ella Young" },
  { title: "Business Growth Plan", createdBy: "Henry King" },
  { title: "Customer Feedback Report", createdBy: "Grace Scott" },
  { title: "Training Manual", createdBy: "Lucas Green" },
  { title: "Legal Compliance Checklist", createdBy: "Ethan Baker" },
  { title: "Annual Performance Review", createdBy: "Isabella Adams" },
];
