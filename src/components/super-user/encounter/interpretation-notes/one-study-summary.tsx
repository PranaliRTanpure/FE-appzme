import CustomSelect from "@/common-components/custom-select/customSelect";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "@/common-components/table/common-table-widgets";
import { TableHeaders } from "@/common-components/table/table-models";
import {
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import { useState } from "react";

type Data = {
  startDate: string;
  TST: string;
  AHI: string;
  TimeSleep: string;
  averageHeartRate: string;
  highestHeartRate: string;
};

const parameterMapping: { [key: string]: string } = {
  "Start Date": "startDate",
  "TST (min)": "TST",
  "AHI (#)": "AHI",
  "Total Sleep Time Below 88% (min)": "TimeSleep",
  "Average Heart Rate During Sleep (bpm)": "averageHeartRate",
  "Highest Heart Rate During Sleep (bpm)": "highestHeartRate",
};

export const data1 = [
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-10",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "34.03",
    averageHeartRate: "87",
    highestHeartRate: "180",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "789",
  },
];

export const Headers: TableHeaders[] = [
  { header: "Parameters", minWidth: "318px" },
  ...data1.map((_, index) => ({
    header: `Night ${index + 1}`,
    minWidth: "120px",
  })),
];

const OneStudySummary = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const belowHeight768 = useMediaQuery("(max-height:768px)");
  const belowWidth1024 = useMediaQuery("(max-width:1024px)");

  const handleSelectChange = (e: SelectChangeEvent<string>): void => {
    const value = e.target.value;
    setSelectedValue(value);
  };
  return (
    <Grid
      container
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      rowGap={1.5}
    >
      {/* Grid 1 */}
      <Grid container width={"100%"} columnGap={1} alignItems={"center"}>
        <Grid>
          <Typography variant="bodySmall">
            Primary Night for Interpretation :
          </Typography>
        </Grid>
        <Grid width={belowWidth1024 ? "20%" : "12%"}>
          <CustomSelect
            enableDeselect
            placeholder={"Select Night"}
            name={"selectNight"}
            value={selectedValue}
            items={[
              { value: "NIGHT1", label: "Night 1" },
              { value: "NIGHT2", label: "Night 2" },
              { value: "OTHER", label: "Other" },
            ]}
            bgWhite={true}
            onChange={handleSelectChange}
          />
        </Grid>
        <Grid>
          <Typography variant="bodySmall">{`(2 night(s) recorded)`}</Typography>
        </Grid>
      </Grid>
      {/* Grid 2 */}
      <Grid container width={"100%"}>
        <TableContainer
          sx={{
            maxHeight: belowHeight768 ? "225px" : "500px",
            maxWidth: "100%",
            overflow: "auto",
            display: "inline-block",
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ ...tableCellCss, width: "auto", border: "1px solid #E7E7E7" }}
          >
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
                      alignContent={"flex-start"}
                    >
                      <Typography variant="bodySmall">
                        {header.header}
                      </Typography>
                    </Grid>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ background: "white" }}>
              {Object.keys(parameterMapping).map((parameter) => (
                <TableRow key={parameter}>
                  <TableCell sx={{ ...heading }} align="left">
                    <Typography variant="bodySmall" sx={typographyCss}>
                      {parameter}
                    </Typography>
                  </TableCell>
                  {data1.map((data, rowIndex) => (
                    <TableCell key={rowIndex} sx={{ ...heading }} align="left">
                      <Typography
                        variant="bodySmall"
                        sx={typographyCss}
                        fontWeight={400}
                      >
                        {data[
                          parameterMapping[
                            parameter as keyof typeof parameterMapping
                          ] as keyof Data
                        ] ?? "-"}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default OneStudySummary;
