import { ReactNode } from "react";

import { TableCell, Typography } from "@mui/material";

import { typographyCss } from "./common-table-widgets";

type CustomTableRowProps = {
  value?: string;
  children?: ReactNode;
};

const CustomTableRow = (props: CustomTableRowProps) => {
  const { value, children } = props;
  return (
    <TableCell>
      {value && (
        <Typography sx={typographyCss} variant="bodySmall">
          {value}
        </Typography>
      )}
      {children && children}
    </TableCell>
  );
};

export default CustomTableRow;
