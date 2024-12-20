import { PropsWithChildren } from "react";

import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

interface DrawerBodyProps extends BoxProps {
  offset?: number;
}

const DrawerBody = ({
  offset = 0,
  children,
  ...props
}: PropsWithChildren<DrawerBodyProps>) => (
  <Box
    sx={{
      flexGrow: 1,
      maxHeight: `calc(100% - ${offset ?? 0}px)`,
      overflow: "auto",
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

export default DrawerBody;
