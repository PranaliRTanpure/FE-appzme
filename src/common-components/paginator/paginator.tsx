import {
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { theme } from "../../utils/theme";
import { Grid } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
type PaginatorProps = {
  page: number;
  totalPages: number;
  totalRecord: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (event: ChangeEvent<unknown> | null, page: number) => void;
  // eslint-disable-next-line no-unused-vars
  onRecordsPerPageChange?: (recordsPerPage: number) => void;
  defaultSize?: number;
};

const Paginator = (props: PaginatorProps) => {
  const { onPageChange, onRecordsPerPageChange, defaultSize, totalRecord } =
    props;

  const [page, setPage] = useState(props.page);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(props.totalPages);

  useEffect(() => {
    defaultSize && setSize(defaultSize);
  }, [defaultSize]);

  useEffect(() => {
    setTotalPages(props.totalPages);
  }, [props.totalPages]);

  useEffect(() => {
    setPage(props.page);
  }, [props.page]);

  const startRecord = page * size + 1;
  const endRecord = Math.min((page + 1) * size, totalRecord);

  return (
    <Grid width={"100%"} p={"10px  25px"}>
      {totalPages !== 0 && (
        <Grid container justifyContent={"space-between"} width={"100%"}>
          <Grid>
            <Typography sx={{ fontSize: "14px" }}>
              {" "}
              <span style={{ fontWeight: 550 }}>
                {startRecord} - {endRecord}
              </span>
              &nbsp;out of&nbsp;
              <span style={{ fontWeight: 550 }}>{totalRecord}</span>
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Pagination
              page={page + 1}
              count={totalPages}
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  sx={{
                    border: `1px solid ${theme.palette.grey[300]}`,
                    marginBottom: "2px",
                    borderRadius: "0px",
                    padding: "8px",
                    minWidth: "40px",
                    "&.Mui-selected": {
                      background: theme.palette.secondary.light,
                      color: theme.palette.common.black,
                    },
                    margin: "0",
                    "&:hover": {
                      backgroundColor: theme.palette.grey[100],
                    },

                    ...(item.type === "previous" && {
                      boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.16)",
                      outline: "none",
                      border: `1px solid ${theme.palette.grey[200]}`,
                      margin: "0px",
                      padding: "8px 12px",
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.2rem",
                      },
                      borderRadius: "6px 0px 0px 6px",
                    }),
                    ...(item.type === "next" && {
                      boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.16)",
                      outline: "none",
                      border: `1px solid ${theme.palette.grey[200]}`,
                      margin: "0px",
                      padding: "8px 12px",
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.2rem",
                      },

                      borderRadius: "0px 6px 6px 0px",
                    }),
                  }}
                  components={{ previous: PreviousBtn, next: NextBtn }}
                  {...item}
                />
              )}
              onChange={(e, page) => onPageChange(e, +page - 1)}
            />

            {onRecordsPerPageChange && (
              <Select
                size="small"
                defaultValue={10}
                value={size}
                onChange={(e) => {
                  onRecordsPerPageChange(+e.target.value);
                  onPageChange(null, 0);
                  setSize(e.target.value as number);
                }}
                sx={{
                  width: "fit-content",
                  height: "32px",
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.common.white,
                  "&:hover": {
                    "&& fieldset": {
                      border: `1px solid ${theme.palette.grey[400]}`,
                    },
                  },
                }}
              >
                <MenuItem value={10}>10 per page</MenuItem>
                <MenuItem value={15}>15 per page</MenuItem>
                <MenuItem value={20}>20 per page</MenuItem>
                <MenuItem value={25}>25 per page</MenuItem>
              </Select>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Paginator;

const PreviousBtn = () => {
  return (
    <Grid container gap={1} bgcolor={theme.palette.common.white}>
      <ArrowBackIcon sx={{ marginRight: "8px", marginTop: "2px" }} />
      <Typography variant="body1" sx={{ color: theme.palette.common.black }}>
        Previous
      </Typography>
    </Grid>
  );
};

const NextBtn = () => {
  return (
    <Grid container gap={1} bgcolor={theme.palette.common.white}>
      <Typography variant="body1" sx={{ color: theme.palette.common.black }}>
        Next
      </Typography>
      <ArrowForwardIcon sx={{ marginLeft: "8px", marginTop: "2px" }} />
    </Grid>
  );
};
