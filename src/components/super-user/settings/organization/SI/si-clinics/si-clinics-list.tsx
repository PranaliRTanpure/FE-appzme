import React, { useEffect, useState } from "react";

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

import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";
import Paginator from "@/common-components/paginator/paginator";
import Status from "@/common-components/status/status";
import { heading, tableCellCss, typographyCss } from "@/common-components/table/common-table-widgets";
import { TableHeaders } from "@/common-components/table/table-models";

import MainDrawer from "@/components/ui/MainDrawer";
import { useDrawer } from "@/hooks/useDrawer";

import SiClinicDialog from "./si-clinic-dialog";

export const mockHeaders: TableHeaders[] = [
  { header: "Location ID", width: "145px" },
  { header: "Location Name" },
  { header: "Tax ID" },
  { header: "Tax Type" },
  { header: "Address" },
  { header: "City" },
  { header: "State" },
  { header: "Zip Code" },
  { header: "Contact No" },
  { header: "No Show Charges" },
  { header: "Status" },
  { header: "Action" },
];

const SiClinicsList = () => {
  const [selectedAction, setSelectedAction] = useState("Add");
  setSelectedAction;
  const [maxHeight, setMaxHeight] = useState<number>(330);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isEdit, setIsEdit] = React.useState(false);
  const { open: openDrawer, close: closeDrawer, content: contentDrawer } = useDrawer();

  const totalRecords = dummyLocations.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRecordsPerPageChange = (newSize: number) => {
    setRecordsPerPage(newSize);
    setCurrentPage(0);
  };

  const paginatedData = dummyLocations.slice(
    currentPage * recordsPerPage,
    currentPage * recordsPerPage + recordsPerPage
  );

  const handleDrawer = {
    addSiClinicForm: (action: string) => {
      setIsEdit(action === "Edit");
      openDrawer({
        title: `${action} Clinic`,
        identifier: "drawer-add-si-clinic-form",
      });
    },
  };

  const DrawerContent = () => {
    switch (contentDrawer.identifier) {
      case "drawer-add-si-clinic-form":
        return <SiClinicDialog isEdit={isEdit} handleDrawerClose={closeDrawer} />;
      default:
        return <div />;
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const statusBgColorMapping: Record<string, string> = {
    ACTIVE: "#E1FCDE",
    INACTIVE: "#FFF2F3",
  };

  useEffect(() => {
    const calculateHeight = () => {
      const availableHeight = window.innerHeight - 490;
      setMaxHeight(availableHeight);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <>
      <MainDrawer
        content={<DrawerContent />}
        drawerWidth={"850px"}
        anchor="right"
        showSecondButton={false}
        showMandatoryIndicator={false}
      />

      <Grid container width={"100%"} flexDirection={"column"} rowGap={3}>
        <Grid width={"100%"}>
          <TableContainer
            sx={{
              maxHeight: maxHeight,
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
                      <Grid pr={4} container flexDirection={"column"} alignContent={"flex-start"}>
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
                        <CustomClickableLink text={list?.locationID} onClick={function (): void {}} />
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                            {list?.locationName}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                            {list?.taxID}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                            {list?.taxType}
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
                            {list?.city}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                            {list?.state}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                            {list?.zipCode}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Typography sx={typographyCss} variant="bodySmall" color="#21262B" fontWeight={400}>
                            {list?.contactNo}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Typography
                            textAlign={"center"}
                            sx={typographyCss}
                            variant="bodySmall"
                            color="#21262B"
                            fontWeight={400}
                          >
                            {list?.noShowCharges}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Status
                            status={`${list.status}`}
                            width="74px"
                            bgColor={statusBgColorMapping[list?.status] || "gray"}
                          />
                        </Grid>
                      </TableCell>
                      <TableCell sx={heading} align="center">
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
                                onClick={() => {
                                  setSelectedAction(v);
                                  handleMenuClose();
                                  v === "Archive";
                                  if (v === "Edit") {
                                    handleDrawer.addSiClinicForm("Edit");
                                  }
                                }}
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
    </>
  );
};
export default SiClinicsList;

const dummyLocations = [
  {
    locationID: "L001",
    locationName: "Sunshine Clinic",
    taxID: "123-45-6789",
    taxType: "Federal",
    address: "123 Main St, Suite 101",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    contactNo: "+1-217-555-1234",
    noShowCharges: "$50",
    status: "ACTIVE",
  },
  {
    locationID: "L002",
    locationName: "Greenwood Medical Center",
    taxID: "987-65-4321",
    taxType: "State",
    address: "456 Oak St, Floor 2",
    city: "Greenwood",
    state: "CO",
    zipCode: "80014",
    contactNo: "+1-303-555-5678",
    noShowCharges: "$75",
    status: "INACTIVE",
  },
  {
    locationID: "L003",
    locationName: "Lakeside Health Clinic",
    taxID: "112-23-4567",
    taxType: "Federal",
    address: "789 Lakeside Dr, Unit 3",
    city: "Lakewood",
    state: "CA",
    zipCode: "90712",
    contactNo: "+1-562-555-7890",
    noShowCharges: "$40",
    status: "ACTIVE",
  },
  {
    locationID: "L004",
    locationName: "Riverbend Care Center",
    taxID: "334-56-7890",
    taxType: "State",
    address: "321 River Rd, Suite A",
    city: "Riverside",
    state: "TX",
    zipCode: "75001",
    contactNo: "+1-512-555-3456",
    noShowCharges: "$60",
    status: "ACTIVE",
  },
  {
    locationID: "L005",
    locationName: "Mountainview Hospital",
    taxID: "456-78-1234",
    taxType: "Federal",
    address: "100 Mountain View Ave, Building 1",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    contactNo: "+1-303-555-9012",
    noShowCharges: "$100",
    status: "INACTIVE",
  },
  {
    locationID: "L006",
    locationName: "Sunshine Clinic",
    taxID: "123-45-6789",
    taxType: "Federal",
    address: "123 Main St, Suite 101",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    contactNo: "+1-217-555-1234",
    noShowCharges: "$50",
    status: "ACTIVE",
  },
  {
    locationID: "L007",
    locationName: "Greenwood Medical Center",
    taxID: "987-65-4321",
    taxType: "State",
    address: "456 Oak St, Floor 2",
    city: "Greenwood",
    state: "CO",
    zipCode: "80014",
    contactNo: "+1-303-555-5678",
    noShowCharges: "$75",
    status: "INACTIVE",
  },
  {
    locationID: "L008",
    locationName: "Lakeside Health Clinic",
    taxID: "112-23-4567",
    taxType: "Federal",
    address: "789 Lakeside Dr, Unit 3",
    city: "Lakewood",
    state: "CA",
    zipCode: "90712",
    contactNo: "+1-562-555-7890",
    noShowCharges: "$40",
    status: "ACTIVE",
  },
  {
    locationID: "L009",
    locationName: "Riverbend Care Center",
    taxID: "334-56-7890",
    taxType: "State",
    address: "321 River Rd, Suite A",
    city: "Riverside",
    state: "TX",
    zipCode: "75001",
    contactNo: "+1-512-555-3456",
    noShowCharges: "$60",
    status: "ACTIVE",
  },
  {
    locationID: "L010",
    locationName: "Mountainview Hospital",
    taxID: "456-78-1234",
    taxType: "Federal",
    address: "100 Mountain View Ave, Building 1",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    contactNo: "+1-303-555-9012",
    noShowCharges: "$100",
    status: "INACTIVE",
  },
  {
    locationID: "L011",
    locationName: "Sunshine Clinic",
    taxID: "123-45-6789",
    taxType: "Federal",
    address: "123 Main St, Suite 101",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    contactNo: "+1-217-555-1234",
    noShowCharges: "$50",
    status: "ACTIVE",
  },
  {
    locationID: "L012",
    locationName: "Greenwood Medical Center",
    taxID: "987-65-4321",
    taxType: "State",
    address: "456 Oak St, Floor 2",
    city: "Greenwood",
    state: "CO",
    zipCode: "80014",
    contactNo: "+1-303-555-5678",
    noShowCharges: "$75",
    status: "INACTIVE",
  },
  {
    locationID: "L013",
    locationName: "Lakeside Health Clinic",
    taxID: "112-23-4567",
    taxType: "Federal",
    address: "789 Lakeside Dr, Unit 3",
    city: "Lakewood",
    state: "CA",
    zipCode: "90712",
    contactNo: "+1-562-555-7890",
    noShowCharges: "$40",
    status: "ACTIVE",
  },
  {
    locationID: "L014",
    locationName: "Riverbend Care Center",
    taxID: "334-56-7890",
    taxType: "State",
    address: "321 River Rd, Suite A",
    city: "Riverside",
    state: "TX",
    zipCode: "75001",
    contactNo: "+1-512-555-3456",
    noShowCharges: "$60",
    status: "ACTIVE",
  },
  {
    locationID: "L015",
    locationName: "Mountainview Hospital",
    taxID: "456-78-1234",
    taxType: "Federal",
    address: "100 Mountain View Ave, Building 1",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    contactNo: "+1-303-555-9012",
    noShowCharges: "$100",
    status: "INACTIVE",
  },
  {
    locationID: "L016",
    locationName: "Riverbend Care Center",
    taxID: "334-56-7890",
    taxType: "State",
    address: "321 River Rd, Suite A",
    city: "Riverside",
    state: "TX",
    zipCode: "75001",
    contactNo: "+1-512-555-3456",
    noShowCharges: "$60",
    status: "ACTIVE",
  },
  {
    locationID: "L017",
    locationName: "Mountainview Hospital",
    taxID: "456-78-1234",
    taxType: "Federal",
    address: "100 Mountain View Ave, Building 1",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    contactNo: "+1-303-555-9012",
    noShowCharges: "$100",
    status: "INACTIVE",
  },
];
