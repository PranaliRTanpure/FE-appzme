import { Grid, useMediaQuery } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  MenuList,
  MenuItem,
  Menu,
  ListItemIcon,
} from "@mui/material";
import Paginator from "../../../../common-components/paginator/paginator";
import Status from "../../../../common-components/status/status";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "../../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../../common-components/table/table-models";
import { useState } from "react";
import { theme } from "../../../../utils/theme";
import CustomInput from "../../../../common-components/custom-input/custom-input";
import deviceManufacturersList from "../../../../mock-data/device-manufacturers-list.json";
import CustomDrawer from "../../../../common-components/custom-drawer/custom-drawer";
import DeviceManufacturersForm from "./device-manufacturers-form";
import React from "react";

export const mockHeaders: TableHeaders[] = [
  { header: "Company" },
  { header: "Contact" },
  { header: "Phone" },
  { header: "Email" },
  { header: "Action" },
];

const DeviceManufacturers = () => {
  const [isFormOpen, SetIsFormOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState("Add");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const belowHeight768 = useMediaQuery("(max-height:768px)");

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Grid
        height={"100%"}
        p={2}
        width={"100%"}
        maxWidth={"100%"}
        overflow={"auto"}
      >
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
              <Typography variant="bodyLarge" fontWeight={"bold"}>
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
                <FilterListIcon sx={{ height: "19px", width: "19px" }} />
              </Grid>

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
                    setSelectedAction("Add");
                    SetIsFormOpen(true);
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
                  <Typography variant="bodySmall">
                    Add New Manufacturer
                  </Typography>
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
                          minWidth: header.minWidth
                            ? header.minWidth
                            : "inherit",
                          maxWidth: header.maxWidth
                            ? header.maxWidth
                            : "inherit",
                        }}
                        align="left"
                        key={index}
                      >
                        <Grid
                          pr={4}
                          container
                          flexDirection={"column"}
                          alignContent={
                            header.header === "Action" ? "center" : "flex-start"
                          }
                        >
                          <Typography variant="bodySmall">
                            {header.header}
                          </Typography>
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
                          <Grid container flexDirection={"column"}>
                            <Grid container flexDirection={"column"}>
                              <Link
                                underline="always"
                                sx={{
                                  color: "#106DCC",
                                  cursor: "pointer",
                                }}
                              >
                                <Typography
                                  fontWeight={500}
                                  color="#106DCC"
                                  variant="bodySmall"
                                >
                                  {list?.company}
                                </Typography>
                              </Link>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography
                              sx={typographyCss}
                              variant="bodySmall"
                              color="#21262B"
                              fontWeight={400}
                            >
                              {list?.contact}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography
                              sx={typographyCss}
                              variant="bodySmall"
                              color="#21262B"
                              fontWeight={400}
                            >
                              {list?.phone}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography
                              sx={typographyCss}
                              variant="bodySmall"
                              color="#21262B"
                              fontWeight={400}
                            >
                              {list?.email}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={heading} align="center">
                          <Grid pr={6}>
                            <IconButton onClick={handleMenuClick}>
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
                                    v === "Edit" && SetIsFormOpen(true);
                                  }}
                                >
                                  <ListItemIcon>
                                    {v === "Edit" && (
                                      <ModeEditOutlineOutlinedIcon fontSize="small" />
                                    )}
                                    {v === "Archive" && (
                                      <ArchiveOutlinedIcon fontSize="small" />
                                    )}
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
      {/* Drawer */}
      <CustomDrawer
        drawerWidth="1000px"
        anchor={"right"}
        open={isFormOpen}
        onArrowClose={() => SetIsFormOpen(false)}
        title={
          selectedAction === "Edit" ? "Edit Manufactures" : "Add Manufactures"
        }
        showMandatoryIndicator={true}
      >
        <DeviceManufacturersForm onClose={() => SetIsFormOpen(false)} />
      </CustomDrawer>
    </>
  );
};
export default DeviceManufacturers;
