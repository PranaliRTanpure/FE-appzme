import { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Grid } from "@mui/system";

import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";
import Paginator from "@/common-components/paginator/paginator";
import Status from "@/common-components/status/status";
import { heading, tableCellCss } from "@/common-components/table/common-table-widgets";
import CustomTableRow from "@/common-components/table/custom-table-row";
import { TableHeaders } from "@/common-components/table/table-models";

import { tableDataEncounter } from "./msl-details";

export const Headers: TableHeaders[] = [
  { header: "Provider Name" },
  { header: "Email" },
  { header: "Address" },
  { header: "Phone" },
  { header: "NPI" },
  { header: "Licensed State" },
  { header: "License Number" },
  { header: "License Exp" },
  { header: "Status" },
  { header: "Action" },
];

const MSLStaffList = () => {
  const [maxHeight, setMaxHeight] = useState<number>(330);

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
              {tableDataEncounter.length > 0 ? (
                tableDataEncounter.map((list, index) => (
                  <TableRow hover key={index}>
                    <CustomTableRow
                      children={<CustomClickableLink text={list?.providerName} onClick={function (): void {}} />}
                    />
                    <CustomTableRow value={list?.email} />
                    <CustomTableRow value={list?.address} />
                    <CustomTableRow value={list?.phone} />
                    <CustomTableRow value={list?.npi} />
                    <CustomTableRow value={list?.licenedState} />
                    <CustomTableRow value={list?.licenedNumber} />
                    <CustomTableRow value={list?.licenedExp} />
                    <CustomTableRow children={<Status width="100px" status="ACTIVE" />} />
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
    </>
  );
};

export default MSLStaffList;
