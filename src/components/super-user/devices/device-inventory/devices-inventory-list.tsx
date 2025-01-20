import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";
import CustomFilters from "@/common-components/custom-filters/custom filters";
import AddIcon from "@mui/icons-material/Add";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { Box, Grid, useMediaQuery } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../common-components/custom-input/custom-input";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import Paginator from "../../../../common-components/paginator/paginator";
import Status from "../../../../common-components/status/status";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "../../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../../common-components/table/table-models";
import deviceInventoryList from "../../../../mock-data/device-inventory.json";
import { theme } from "../../../../utils/theme";
import AddDeviceInventory from "./add-device-inventory";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import Checkbox from "@/common-components/custom-checkbox/checkbox";

export const Headers: TableHeaders[] = [
  { header: "Device Name" },
  { header: "Serial Number" },
  { header: "Pool" },
  { header: "Status" },
  { header: "Action" },
];

const DevicesInventoryList = () => {
  const [selectedDevice] = useState("");
  const [isFormOpen, SetIsFormOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const belowHeight768 = useMediaQuery("(max-height:768px)");
  const belowWidth1440 = useMediaQuery("(max-width:1440px)");
  const belowWidth1366 = useMediaQuery("(max-width:1366px)");
  const belowWidth1024 = useMediaQuery("(max-width:1024px)");
  const navigate = useNavigate();

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setSelectedRows(paginatedData.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const totalRecords = deviceInventoryList.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  const handleRecordsPerPageChange = (newSize: number) => {
    setRecordsPerPage(newSize);
    setCurrentPage(0);
  };

  const paginatedData = deviceInventoryList.slice(
    currentPage * recordsPerPage,
    currentPage * recordsPerPage + recordsPerPage,
  );

  const statusBgColorMapping: Record<string, string> = {
    LOST: "#FFF2F3",
    READY: "#E1FCDE",
    IN_USE: "#E0EFFF",
    BROKEN: "#FFF2D2",
  };

  const tabData = [
    { label: "Patient Name", content: "Content for Item One" },
    { label: "Open Date", content: "Content for Item Two" },
    { label: "Type", content: "Content for Item Three" },
    { label: "Stage", content: "Content for Item Three" },
    { label: "Scheduling Status", content: "Content for Item Three" },
    { label: "Aging", content: "Content for Item Three" },
    { label: "Action Date", content: "Content for Item Three" },
  ];

  type TabPanelProps = React.PropsWithChildren<{
    value: number;
    index: number;
  }>;

  const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return value === index && <Box>{children}</Box>;
  };

  return (
    <>
      {!isFormOpen && (
        <Grid
          height={"100%"}
          pl={2}
          pr={2}
          width={"100%"}
          maxWidth={"100%"}
          overflow={"auto"}
        >
          <Grid
            height={"100%"}
            borderRadius={"8px"}
            container
            flexDirection={"column"}
          >
            <Grid container p={2} justifyContent={"space-between"} rowGap={2}>
              <Grid container alignItems={"center"} columnGap={1.5} rowGap={1}>
                <Typography variant="bodyLarge" fontWeight={600}>
                  Inventory
                </Typography>

                <Grid>
                  <Status bgColor="#E7E7E7" status={"190"} width="50px" />
                </Grid>

                <Divider
                  sx={{
                    margin: "2px",
                    background: theme.palette.common.white,
                  }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />

                <Grid container width={"200px"}>
                  <CustomSelect
                    placeholder={"Select a Device"}
                    name={""}
                    value={selectedDevice}
                    enableDeselect
                    items={[{ value: "active", label: "Active" }]}
                    onChange={() => {}}
                    bgWhite
                  />
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
                  bgcolor={"white"}
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
                  bgcolor={"white"}
                >
                  <IconButton onClick={() => setIsFilterOpen(true)}>
                    <FilterAltOutlinedIcon
                      sx={{ height: "19px", width: "19px" }}
                    />
                  </IconButton>
                </Grid>
                <Grid>
                  <CustomInput
                    placeholder={"Serach Patient"}
                    name={""}
                    value={""}
                    onChange={() => {}}
                    onDebounceCall={() => {}}
                    onInputEmpty={() => {}}
                    hasStartSearchIcon={true}
                    bgWhite
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="outlined"
                    onClick={() => {}}
                    sx={{ background: "#FFFFFF" }}
                  >
                    <Typography
                      variant="bodySmall"
                      color="black"
                      fontWeight={500}
                    >
                      Import CSV
                    </Typography>
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    onClick={() => SetIsFormOpen(true)}
                    startIcon={
                      <AddIcon
                        sx={{
                          color: "white",
                        }}
                      />
                    }
                    sx={{ background: "#106DCC" }}
                  >
                    <Typography variant="bodySmall">Add New Device</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* Table Grid */}
            <Grid width={"100%"}>
              <TableContainer
                sx={{
                  maxHeight: belowHeight768 ? "63vh" : "76vh",
                  border: "1px solid #E6EAED",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 8px -2px #1018281A",
                }}
              >
                <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ ...heading }} align="left">
                        <Checkbox
                          checked={
                            selectedRows.length === paginatedData.length &&
                            paginatedData.length > 0
                          }
                          indeterminate={
                            selectedRows.length > 0 &&
                            selectedRows.length < paginatedData.length
                          }
                          handleChange={handleSelectAllChange}
                        />
                      </TableCell>
                      {Headers.map((header, index) => (
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
                              header.header === "Action" ||
                              header.header === "Status"
                                ? "flex-end"
                                : "flex-start"
                            }
                          >
                            <Typography variant="bodyExtraSmall">
                              {header.header}
                            </Typography>
                          </Grid>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ bgcolor: "white" }}>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((list, index) => (
                        <TableRow hover key={index}>
                          <TableCell sx={{ border: "1px solid red" }}>
                            <Checkbox
                              checked={selectedRows.includes(index)}
                              handleChange={() => handleCheckboxChange(index)}
                            />
                          </TableCell>
                          <TableCell>
                            <CustomClickableLink
                              text={list?.deviceName}
                              onClick={function (): void {
                                navigate(
                                  `/super-user/devices/${list.serialNumber.replace("#", "")}`,
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Grid container flexDirection={"column"}>
                              <Typography
                                sx={typographyCss}
                                variant="bodySmall"
                              >
                                {list?.serialNumber}
                              </Typography>
                            </Grid>
                          </TableCell>
                          <TableCell>
                            <Grid container flexDirection={"column"}>
                              <Typography
                                sx={typographyCss}
                                variant="bodySmall"
                              >
                                {list?.pool}
                              </Typography>
                            </Grid>
                          </TableCell>
                          <TableCell>
                            <Grid
                              container
                              flexDirection={"column"}
                              alignContent={"flex-end"}
                              pr={1}
                            >
                              <Status
                                status={`${list.status}`}
                                width="74px"
                                bgColor={
                                  statusBgColorMapping[list?.status] || "gray"
                                }
                              />
                            </Grid>
                          </TableCell>
                          <TableCell>
                            <Grid
                              container
                              flexDirection={"column"}
                              alignContent={"flex-end"}
                            >
                              <IconButton onClick={() => {}} disableRipple>
                                <ArchiveOutlinedIcon
                                  sx={{ marginInline: "27px" }}
                                />
                              </IconButton>
                            </Grid>
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
            {/* Paginator */}
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
          </Grid>
        </Grid>
      )}

      {isFormOpen && (
        <AddDeviceInventory onClose={() => SetIsFormOpen(false)} />
      )}

      {/* Filter grid */}
      <CustomFilters
        onOpen={isFilterOpen}
        style={{
          top: belowWidth1024
            ? "45%"
            : belowWidth1366
              ? "45%"
              : belowWidth1440
                ? "37%"
                : "35%",
          left: belowWidth1024
            ? "50%"
            : belowWidth1366
              ? "60%"
              : belowWidth1440
                ? "62%"
                : "73%",
          width: "600px",
        }}
        onClick={() => setIsFilterOpen(false)}
      >
        <Grid container width={"100%"}>
          <Grid
            container
            flexDirection={"column"}
            width={"32%"}
            borderRight={"1px solid #E8EBEC"}
          >
            <Stack direction="row" gap={2}>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={(_event, newValue) => setValue(newValue)}
                sx={{
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                {tabData.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab.label}
                    sx={{
                      alignItems: "flex-start",
                      textAlign: "left",
                      width: "100%",
                      "&.Mui-selected": {
                        color: "#1976d2",
                        fontWeight: "bold",
                        backgroundColor: "#E3F2FD",
                        borderRadius: "4px",
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Stack>
          </Grid>
          <Grid flexDirection={"column"} width={"68%"} p={1}>
            {tabData.map((tab, index) => (
              <TabPanel key={index} value={value} index={index}>
                <Typography variant="bodyMedium">{tab.content}</Typography>
              </TabPanel>
            ))}
          </Grid>
        </Grid>
      </CustomFilters>
    </>
  );
};
export default DevicesInventoryList;
