import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  IconButton,
  ListItemIcon,
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
import { Grid, useMediaQuery } from "@mui/system";

import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";

import CustomInput from "../../../../common-components/custom-input/custom-input";
import Paginator from "../../../../common-components/paginator/paginator";
import Status from "../../../../common-components/status/status";
import { heading, tableCellCss, typographyCss } from "../../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../../common-components/table/table-models";
import { useDrawer } from "../../../../hooks/useDrawer";
import deviceManufacturersList from "../../../../mock-data/device-manufacturers-list.json";
import { theme } from "../../../../utils/theme";
import MainDrawer from "../../../ui/MainDrawer";
import DeviceManufacturersForm from "./device-manufacturers-form";

export const mockHeaders: TableHeaders[] = [
  { header: "Company" },
  { header: "Contact" },
  { header: "Phone" },
  { header: "Email" },
  { header: "Action" },
];

const DeviceManufacturersList = () => {
  const [selectedAction, setSelectedAction] = useState("Add");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const belowHeight768 = useMediaQuery("(max-height:768px)");
  const belowWidth1024 = useMediaQuery("(max-width:1024px)");
  const [isEdit, setIsEdit] = React.useState(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { open: openDrawer, close: closeDrawer, content: contentDrawer } = useDrawer();

  const handleDrawer = {
    deviceManufacturersForm: (action: string) => {
      setIsEdit(action === "Edit");
      openDrawer({
        title: `${action} Manufacturer`,
        identifier: "drawer-device-manufacturers-form",
      });
    },
  };

  const DrawerContent = () => {
    switch (contentDrawer.identifier) {
      case "drawer-device-manufacturers-form":
        return <DeviceManufacturersForm isEdit={isEdit} handleDrawerClose={closeDrawer} />;
      default:
        return <div />;
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <MainDrawer
        content={<DrawerContent />}
        drawerWidth={belowWidth1024 ? "750px" : "1000px"}
        anchor="right"
        showSecondButton={false}
        showMandatoryIndicator={true}
      />

      <Grid height={"100%"} p={2} width={"100%"} maxWidth={"100%"} overflow={"auto"}>
        <Grid
          border={`1px solid ${theme.palette.grey[300]}`}
          boxShadow={`0px 0px 16px 0px #021D2614`}
          height={"100%"}
          borderRadius={"8px"}
          container
          flexDirection={"column"}
        >
          <Grid container p={2} justifyContent={"space-between"} rowGap={2}>
            <Grid container alignItems={"center"} columnGap={1.5} rowGap={1}>
              <Typography variant="bodyLarge" fontWeight={600}>
                Manufacturers
              </Typography>

              <Grid>
                <Status bgColor="#E7E7E7" status={"190"} width="50px" />
              </Grid>
            </Grid>

            <Grid container alignItems={"center"} columnGap={1.5} rowGap={1}>
              <Grid
                container
                border={"1px solid #C9CBCC"}
                borderRadius={3}
                width={35}
                height={35}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <FilterAltOutlinedIcon sx={{ height: "19px", width: "19px" }} />
              </Grid>

              <Grid>
                <CustomInput
                  placeholder={"Search Manufacturers"}
                  name={""}
                  value={""}
                  onChange={() => {}}
                  onDebounceCall={() => {}}
                  onInputEmpty={() => {}}
                  hasStartSearchIcon={true}
                />
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleDrawer.deviceManufacturersForm("Create");
                  }}
                  startIcon={
                    <AddIcon
                      sx={{
                        color: "white",
                      }}
                    />
                  }
                  sx={{ background: "#106DCC" }}
                >
                  <Typography variant="bodySmall">Add New Manufacturer</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Table */}
          <Grid width={"100%"}>
            <TableContainer
              sx={{
                maxHeight: belowHeight768 ? "63vh" : "76vh",
                overflowY: "auto",
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
                        }}
                        align="left"
                        key={index}
                      >
                        <Grid
                          pr={4}
                          container
                          flexDirection={"column"}
                          alignContent={header.header === "Action" ? "center" : "flex-start"}
                        >
                          <Typography variant="bodySmall">{header.header}</Typography>
                        </Grid>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deviceManufacturersList.length > 0 ? (
                    deviceManufacturersList.map((list, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ ...heading }} align="left">
                          <CustomClickableLink text={list?.company} onClick={function (): void {}} />
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
                              {list?.phone}
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
                                },
                              },
                            }}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <MenuList autoFocusItem={!!anchorEl}>
                              {["Archive", "Edit"].map((v) => (
                                <MenuItem
                                  key={v}
                                  selected={v === selectedAction}
                                  onClick={() => {
                                    setSelectedAction(v);
                                    handleMenuClose();
                                    v === "Archive";
                                    if (v === "Edit") {
                                      handleDrawer.deviceManufacturersForm("Edit");
                                    }
                                  }}
                                >
                                  <ListItemIcon>
                                    {v === "Edit" && <ModeEditOutlineOutlinedIcon fontSize="small" />}
                                    {v === "Archive" && <ArchiveOutlinedIcon fontSize="small" />}
                                  </ListItemIcon>
                                  {v}
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
          </Grid>
          {/* Pagination */}
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
    </>
  );
};
export default DeviceManufacturersList;
