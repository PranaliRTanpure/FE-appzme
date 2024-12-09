import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { theme } from "../../utils/theme";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "../table/common-table-widgets";
import { TableHeaders } from "../table/table-models";

export const headingTable = {
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    // color: "#667085",
    cursor: "pointer",
    padding: "8px",
    height: "40px",
    fontWeight: "bold",
  },
};

export const customDialogStyles = {
  dialog: {
    "& .MuiDialogContent-root": {
      padding: 10,
      backgroundColor: theme.palette.common.white,
    },
    "& .MuiDialogActions-root": {
      padding: 10,
      backgroundColor: theme.palette.common.white,
    },
  },
  dialogTitle: {
    color: theme.palette.common.black,
    "& .MuiTypography-root": {},
  },

  closeIcon: {
    color: theme.palette.common.black,
  },
};

type ConfirmationPopUpProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  message: string;
  title: string;
  subtitle?: string;
  rowData: string[];
  header: TableHeaders[];
  confirmButtonName?: string;
};

const ConfirmationPopUp = (props: ConfirmationPopUpProps) => {
  const {
    open,
    onClose,
    onConfirm,
    title,
    subtitle,
    confirmButtonName,
    header,
    rowData,
  } = props;

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      sx={{ paper: customDialogStyles.dialog }}
      title={"Confirm"}
      open={open}
      onClose={() => onClose()}
      PaperProps={{
        sx: {
          //   maxWidth: "200px" || "auto",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
        <Typography sx={{ fontSize: "20px", fontWeight: 550 }}>
          {title}
        </Typography>
        <Typography variant="bodyMedium">{subtitle}</Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon sx={{ mr: "5px" }} />
      </IconButton>
      <DialogContent dividers>
        <Typography variant="bodyMedium" fontWeight={500}>
          {"Selected Items"}
        </Typography>
        <Grid mt={2}>
          <TableContainer
            sx={{
              border: "1px solid #EAECF0",
              borderRadius: "4px",
              maxHeight: "60vh",
              overflow: "auto",
            }}
          >
            <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
              <TableHead>
                <TableRow>
                  {header?.map((header, index) => (
                    <TableCell
                      sx={{
                        ...headingTable,
                      }}
                      align="left"
                      key={index}
                    >
                      {header.header === "Name" ? (
                        <Grid container flexDirection={"column"}>
                          <Typography variant="bodySmall" color="primary">
                            {header.header}
                          </Typography>
                        </Grid>
                      ) : (
                        <Grid
                          container
                          flexDirection={"column"}
                          alignContent={
                            header.header === "Actions"
                              ? `flex-end`
                              : "flex-start"
                          }
                        >
                          <Typography variant="bodySmall" color="primary">
                            {header.header}
                          </Typography>
                        </Grid>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {rowData?.map((item: string, index: number) => (
                    <>
                      <TableCell key={index} sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Typography sx={typographyCss} variant="bodySmall">
                            {item}
                          </Typography>
                        </Grid>
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: "8px 16px" }}>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button autoFocus onClick={onConfirm}>
          {confirmButtonName || "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopUp;
