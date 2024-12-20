import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
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
} from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import CustomInput from "../../../common-components/custom-input/custom-input";
import { theme } from "../../../utils/theme";

import Paginator from "../../../common-components/paginator/paginator";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../common-components/table/table-models";

export const Headers: TableHeaders[] = [
  { header: "Patient Name", width: "200px", minWidth: "200px" },
  { header: "Open Date", width: "150px", minWidth: "150px" },
  { header: "Type" },
  { header: "Stage" },
  { header: "Scheduling Status", width: "200px", minWidth: "200px" },
  { header: "Aging" },
  { header: "Next Action By", width: "200px", minWidth: "200px" },
  { header: "Action Date", width: "200px", minWidth: "200px" },
  { header: "Schedule Date", width: "170px", minWidth: "170px" },
  { header: "Ordering Provider", width: "200px", minWidth: "200px" },
  { header: "SI Practice", width: "150px", minWidth: "150px" },
  { header: "State", width: "180px", minWidth: "180px" },
  { header: "Primary Insurance", width: "200px", minWidth: "200px" },
  { header: "Action" },
];

const EncounterList = () => {
  const belowHeight768 = useMediaQuery("(max-height:768px)");

  return (
    <Grid height={"100%"} width={"100%"} maxWidth={"100%"} overflow={"auto"}>
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
            <Grid>
              <CustomInput
                placeholder={"Serach Patient"}
                name={""}
                value={""}
                onChange={() => {}}
                onDebounceCall={() => {}}
                onInputEmpty={() => {}}
                hasStartSearchIcon={true}
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
            <Button
              startIcon={<AddIcon />}
              sx={{
                p: "0px 10px",
                bgcolor: theme.palette.secondary.main,
                borderRadius: "12px",
                color: theme.palette.common.white,
              }}
            >
              Create Encounter
            </Button>
          </Grid>
        </Grid>
        <Grid width={"100%"}>
          <TableContainer
            sx={{
              maxHeight: belowHeight768 ? "63vh" : "72vh",
              maxWidth: "100%",
              overflowY: "auto",
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
                      <Grid
                        pr={4}
                        container
                        flexDirection={"column"}
                        alignContent={
                          header.header === "Status" ? "flex-end" : "flex-start"
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
                {tableDataEncounter.length > 0 ? (
                  tableDataEncounter.map((list, index) => (
                    <TableRow hover key={index}>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Grid container flexDirection={"column"}>
                            <Link
                              underline="always"
                              sx={{
                                color: "#106DCC",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                // navigate(
                                // );
                              }}
                            >
                              <Typography
                                fontWeight={500}
                                color="#106DCC"
                                variant="bodySmall"
                              >
                                {list?.patientName}
                              </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.openDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.stage}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.scheduleDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.aging}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.nextActionBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.actionDate}
                        </Typography>
                      </TableCell>{" "}
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.scheduleDate}
                        </Typography>
                      </TableCell>{" "}
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.orderingProvider}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.siPractice}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.stage}
                        </Typography>
                      </TableCell>{" "}
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.primaryInsurance}
                        </Typography>
                      </TableCell>{" "}
                      <TableCell>
                        <Typography sx={typographyCss} variant="bodySmall">
                          {list?.action}
                        </Typography>
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
export default EncounterList;

export const tableDataEncounter = [
  {
    patientName: "Jenny Wilson",
    openDate: "2020-05-03",
    type: "Init. THx",
    stage: "No Ins.",
    schedulingStatus: "1st call",
    aging: "2 d",
    nextActionBy: "R. Bellow",
    actionDate: "2020-05-03",
    scheduleDate: "2020-05-05",
    orderingProvider: "David Wilson",
    siPractice: "Toledo",
    state: "UT",
    primaryInsurance: "Medicaid",
    action: "...",
  },
  {
    patientName: "Devon Lane",
    openDate: "2020-05-05",
    type: "HST",
    stage: "Miss. Docs",
    schedulingStatus: "2nd call",
    aging: "4 d",
    nextActionBy: "A. Torres",
    actionDate: "2020-05-05",
    scheduleDate: "2020-05-06",
    orderingProvider: "Emily Chang",
    siPractice: "Toledo",
    state: "IL",
    primaryInsurance: "ATC Medicare...",
    action: "...",
  },
  {
    patientName: "Jane Cooper",
    openDate: "2020-05-06",
    type: "Eval",
    stage: "VOB Pend.",
    schedulingStatus: "Scans sent",
    aging: "1 d",
    nextActionBy: "E. Enerique",
    actionDate: "2020-05-06",
    scheduleDate: "2020-05-02",
    orderingProvider: "Rachel Lewis",
    siPractice: "Toledo",
    state: "NC",
    primaryInsurance: "BETTER HEALTH",
    action: "...",
  },
  {
    patientName: "Jenny Wilson",
    openDate: "2020-05-03",
    type: "Init. THx",
    stage: "No Ins.",
    schedulingStatus: "1st call",
    aging: "2 d",
    nextActionBy: "R. Bellow",
    actionDate: "2020-05-03",
    scheduleDate: "2020-05-05",
    orderingProvider: "David Wilson",
    siPractice: "Toledo",
    state: "UT",
    primaryInsurance: "Medicaid",
    action: "...",
  },
  {
    patientName: "Devon Lane",
    openDate: "2020-05-05",
    type: "HST",
    stage: "Miss. Docs",
    schedulingStatus: "2nd call",
    aging: "4 d",
    nextActionBy: "A. Torres",
    actionDate: "2020-05-05",
    scheduleDate: "2020-05-06",
    orderingProvider: "Emily Chang",
    siPractice: "Toledo",
    state: "IL",
    primaryInsurance: "ATC Medicare...",
    action: "...",
  },
  {
    patientName: "Jane Cooper",
    openDate: "2020-05-06",
    type: "Eval",
    stage: "VOB Pend.",
    schedulingStatus: "Scans sent",
    aging: "1 d",
    nextActionBy: "E. Enerique",
    actionDate: "2020-05-06",
    scheduleDate: "2020-05-02",
    orderingProvider: "Rachel Lewis",
    siPractice: "Toledo",
    state: "NC",
    primaryInsurance: "BETTER HEALTH",
    action: "...",
  },
  {
    patientName: "Jenny Wilson",
    openDate: "2020-05-03",
    type: "Init. THx",
    stage: "No Ins.",
    schedulingStatus: "1st call",
    aging: "2 d",
    nextActionBy: "R. Bellow",
    actionDate: "2020-05-03",
    scheduleDate: "2020-05-05",
    orderingProvider: "David Wilson",
    siPractice: "Toledo",
    state: "UT",
    primaryInsurance: "Medicaid",
    action: "...",
  },
  {
    patientName: "Devon Lane",
    openDate: "2020-05-05",
    type: "HST",
    stage: "Miss. Docs",
    schedulingStatus: "2nd call",
    aging: "4 d",
    nextActionBy: "A. Torres",
    actionDate: "2020-05-05",
    scheduleDate: "2020-05-06",
    orderingProvider: "Emily Chang",
    siPractice: "Toledo",
    state: "IL",
    primaryInsurance: "ATC Medicare...",
    action: "...",
  },
  {
    patientName: "Jane Cooper",
    openDate: "2020-05-06",
    type: "Eval",
    stage: "VOB Pend.",
    schedulingStatus: "Scans sent",
    aging: "1 d",
    nextActionBy: "E. Enerique",
    actionDate: "2020-05-06",
    scheduleDate: "2020-05-02",
    orderingProvider: "Rachel Lewis",
    siPractice: "Toledo",
    state: "NC",
    primaryInsurance: "BETTER HEALTH",
    action: "...",
  },
  {
    patientName: "Jenny Wilson",
    openDate: "2020-05-03",
    type: "Init. THx",
    stage: "No Ins.",
    schedulingStatus: "1st call",
    aging: "2 d",
    nextActionBy: "R. Bellow",
    actionDate: "2020-05-03",
    scheduleDate: "2020-05-05",
    orderingProvider: "David Wilson",
    siPractice: "Toledo",
    state: "UT",
    primaryInsurance: "Medicaid",
    action: "...",
  },
  {
    patientName: "Devon Lane",
    openDate: "2020-05-05",
    type: "HST",
    stage: "Miss. Docs",
    schedulingStatus: "2nd call",
    aging: "4 d",
    nextActionBy: "A. Torres",
    actionDate: "2020-05-05",
    scheduleDate: "2020-05-06",
    orderingProvider: "Emily Chang",
    siPractice: "Toledo",
    state: "IL",
    primaryInsurance: "ATC Medicare...",
    action: "...",
  },
  {
    patientName: "Jane Cooper",
    openDate: "2020-05-06",
    type: "Eval",
    stage: "VOB Pend.",
    schedulingStatus: "Scans sent",
    aging: "1 d",
    nextActionBy: "E. Enerique",
    actionDate: "2020-05-06",
    scheduleDate: "2020-05-02",
    orderingProvider: "Rachel Lewis",
    siPractice: "Toledo",
    state: "NC",
    primaryInsurance: "BETTER HEALTH",
    action: "...",
  },
  {
    patientName: "Jenny Wilson",
    openDate: "2020-05-03",
    type: "Init. THx",
    stage: "No Ins.",
    schedulingStatus: "1st call",
    aging: "2 d",
    nextActionBy: "R. Bellow",
    actionDate: "2020-05-03",
    scheduleDate: "2020-05-05",
    orderingProvider: "David Wilson",
    siPractice: "Toledo",
    state: "UT",
    primaryInsurance: "Medicaid",
    action: "...",
  },
  {
    patientName: "Devon Lane",
    openDate: "2020-05-05",
    type: "HST",
    stage: "Miss. Docs",
    schedulingStatus: "2nd call",
    aging: "4 d",
    nextActionBy: "A. Torres",
    actionDate: "2020-05-05",
    scheduleDate: "2020-05-06",
    orderingProvider: "Emily Chang",
    siPractice: "Toledo",
    state: "IL",
    primaryInsurance: "ATC Medicare...",
    action: "...",
  },
  {
    patientName: "Jane Cooper",
    openDate: "2020-05-06",
    type: "Eval",
    stage: "VOB Pend.",
    schedulingStatus: "Scans sent",
    aging: "1 d",
    nextActionBy: "E. Enerique",
    actionDate: "2020-05-06",
    scheduleDate: "2020-05-02",
    orderingProvider: "Rachel Lewis",
    siPractice: "Toledo",
    state: "NC",
    primaryInsurance: "BETTER HEALTH",
    action: "...",
  },
  {
    patientName: "Jenny Wilson",
    openDate: "2020-05-03",
    type: "Init. THx",
    stage: "No Ins.",
    schedulingStatus: "1st call",
    aging: "2 d",
    nextActionBy: "R. Bellow",
    actionDate: "2020-05-03",
    scheduleDate: "2020-05-05",
    orderingProvider: "David Wilson",
    siPractice: "Toledo",
    state: "UT",
    primaryInsurance: "Medicaid",
    action: "...",
  },
  {
    patientName: "Devon Lane",
    openDate: "2020-05-05",
    type: "HST",
    stage: "Miss. Docs",
    schedulingStatus: "2nd call",
    aging: "4 d",
    nextActionBy: "A. Torres",
    actionDate: "2020-05-05",
    scheduleDate: "2020-05-06",
    orderingProvider: "Emily Chang",
    siPractice: "Toledo",
    state: "IL",
    primaryInsurance: "ATC Medicare...",
    action: "...",
  },
  {
    patientName: "Jane Cooper",
    openDate: "2020-05-06",
    type: "Eval",
    stage: "VOB Pend.",
    schedulingStatus: "Scans sent",
    aging: "1 d",
    nextActionBy: "E. Enerique",
    actionDate: "2020-05-06",
    scheduleDate: "2020-05-02",
    orderingProvider: "Rachel Lewis",
    siPractice: "Toledo",
    state: "NC",
    primaryInsurance: "BETTER HEALTH",
    action: "...",
  },
];
