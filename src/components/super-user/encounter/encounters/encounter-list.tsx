import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";

import ColoredCustomSelect from "@/common-components/colored-custom-select/colored-custom-select";
import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";
import { heading, tableCellCss } from "@/common-components/table/common-table-widgets";
import CustomTableRow from "@/common-components/table/custom-table-row";
import { TableHeaders } from "@/common-components/table/table-models";

import CustomInput from "../../../../common-components/custom-input/custom-input";
import Paginator from "../../../../common-components/paginator/paginator";

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
      <Grid height={"100%"} borderRadius={"8px"} container flexDirection={"column"}>
        <Grid container p={"16px 0px"} justifyContent={"space-between"} rowGap={2}>
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
            >
              <FilterAltOutlinedIcon sx={{ height: "19px", width: "19px" }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid width={"100%"}>
          <TableContainer
            sx={{
              maxHeight: belowHeight768 ? "63vh" : "72vh",
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
                      <Grid
                        pr={4}
                        container
                        flexDirection={"column"}
                        alignContent={header.header === "Status" ? "flex-end" : "flex-start"}
                      >
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
                        children={<CustomClickableLink text={list?.patientName} onClick={function (): void {}} />}
                      />
                      <CustomTableRow value={list?.openDate} />
                      <CustomTableRow value={list?.type} />
                      <CustomTableRow value={list?.stage} />
                      <CustomTableRow
                        children={
                          <ColoredCustomSelect
                            value={list.schedulingStatus}
                            onChange={function (val: string): void {
                              val;
                            }}
                            options={[
                              { label: "1st call", value: "1st call" },
                              { label: "2nd call", value: "2nd call" },
                              { label: "Scans sent", value: "Scans sent" },
                            ]}
                          />
                        }
                      />
                      <CustomTableRow value={list?.aging} />
                      <CustomTableRow
                        children={
                          <ColoredCustomSelect
                            value={list.nextActionBy}
                            onChange={function (val: string): void {
                              val;
                            }}
                            options={[
                              { label: "R. Bellow", value: "R. Bellow" },
                              { label: "A. Torres", value: "A. Torres" },
                              { label: "E. Enerique", value: "E. Enerique" },
                            ]}
                          />
                        }
                      />
                      <CustomTableRow value={list?.actionDate} />
                      <CustomTableRow value={list?.scheduleDate} />
                      <CustomTableRow value={list?.orderingProvider} />
                      <CustomTableRow value={list?.siPractice} />
                      <CustomTableRow value={list?.stage} />
                      <CustomTableRow value={list?.primaryInsurance} />
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
