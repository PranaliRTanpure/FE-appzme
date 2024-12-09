import AddIcon from "@mui/icons-material/Add";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmationPopUp from "../../../common-components/confirmation-pop-up/confirmation-pop-up";
import CustomDrawer from "../../../common-components/custom-drawer/custom-drawer";
import CustomInput from "../../../common-components/custom-input/custom-input";
import Paginator from "../../../common-components/paginator/paginator";
import { AlertSeverity } from "../../../common-components/snackbar-alert/snackbar-alert";
import Status from "../../../common-components/status/status";
import {
  heading,
  iconStyles,
  tableCellCss,
  typographyCss,
} from "../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../common-components/table/table-models";
import useApiFeedback from "../../../hooks/useApiFeedback";
import { ErrorResponseEntity } from "../../../models/response/error-response";
import { ContentObject } from "../../../models/response/response-content-entity";
import { setIsLoading } from "../../../redux/actions/loader-action";
import { setSnackbarOn } from "../../../redux/actions/snackbar-action";
import { useLocationControllerServiceUpdateLocationArchiveStatus } from "../../../sdk/queries";
import { Location, LocationControllerService } from "../../../sdk/requests";
import { GetTenantId } from "../../../services/common/get-tenant-id";
import { theme } from "../../../utils/theme";
import LocationForm from "./location-form";
export const headers: TableHeaders[] = [
  { header: "Name" },
  { header: "Address" },
  { header: "Phone Number" },
  { header: "Email" },
  { header: "Status" },
  { header: "Actions" },
];

const LocationList = () => {
  const [openWarningPopUp, setOpenWarningPopUp] = useState(false);
  const xTenantIdVal = GetTenantId() || "";

  const [openAddLocationDialog, setOpenAddLocationDialog] = useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [selectedLocation, setSelectedlocation] = useState<Location>();
  const [selectedAction, setSelectedAction] = useState("");
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(10);
  const [searchString, setSearchstring] = useState<string>("");
  const [sortBy] = useState("");
  const [sortDirection] = useState("desc");
  const [rows, setRows] = React.useState<Location[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const dispatch = useDispatch();
  const [openConfirmDeletePopUp, setOpenConfirmDeletePopUp] = useState(false);
  const [openConfirmRestorePopUp, setOpenConfirmRestorePopUp] = useState(false);

  const { data, isSuccess, refetch, error, isError } = useQuery({
    enabled: !!xTenantIdVal,
    queryKey: ["list-of-locations", page, size, searchString, xTenantIdVal],
    queryFn: () =>
      LocationControllerService.getAllLocations({
        page,
        size,
        sortBy,
        sortDirection,
        searchString,
        xTenantId: xTenantIdVal,
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      const response = (data as unknown as AxiosResponse).data as ContentObject<
        Location[]
      >;

      const locData = response?.content;
      setTotalPages(response?.page?.totalPages as number);
      setTotalElements(response?.page?.totalElements as number);

      const tablePayload = locData?.map((location) => {
        return {
          uuid: location?.uuid,
          name: location.name || "",
          address: {
            line1: location.address.line1,
            line2: location.address.line2,
            city: location.address.city,
            state: location.address.state,
            country: location.address.country,
            zipcode: location.address.zipcode,
          },

          phone: location?.phone,
          active: location?.active,
          email: location?.email,
          archive: location.archive,
        } as Location;
      });

      setRows(tablePayload);
    }
  }, [data, isSuccess]);

  const handlePageChange = (
    event: ChangeEvent<unknown> | null,
    page: number,
  ) => {
    event;
    setPage(page);
  };

  useEffect(() => {
    const message =
      (error && (error as unknown as ErrorResponseEntity)?.body?.message) ||
      "Error occurred while logging in";
    if (isError) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: message as string,
        }),
      );
    }
  }, [dispatch, isError, error]);

  const {
    mutateAsync: mutateAsyncArchive,
    isError: isErrorArchive,
    error: errorArchive,
    isPending: isPendingArchive,
    isSuccess: isSuccessArchive,
    data: dataArchive,
  } = useLocationControllerServiceUpdateLocationArchiveStatus();

  const confirmDelete = async () => {
    await mutateAsyncArchive({
      locationId: selectedLocation?.uuid || "",
      status: true,
      xTenantId: xTenantIdVal,
    });
    await refetch();
    setOpenConfirmDeletePopUp(false);
  };

  const confirmRestore = async () => {
    await mutateAsyncArchive({
      locationId: selectedLocation?.uuid || "",
      status: false,
      xTenantId: xTenantIdVal,
    });
    await refetch();
    setOpenConfirmRestorePopUp(false);
  };

  useApiFeedback(
    isErrorArchive,
    errorArchive,
    isSuccessArchive,
    (dataArchive?.message || "Location archive status updated!") as string,
  );

  useEffect(() => {
    dispatch(setIsLoading(isPendingArchive));
  }, [dispatch, isPendingArchive]);

  const handleRecordsPerPageChange = (recordsPerPage: number) => {
    setPage(0);
    setSize(recordsPerPage);
  };
  return (
    <Grid height={"100%"}>
      <Grid
        border={`1px solid ${theme.palette.grey[300]}`}
        boxShadow={`0px 0px 16px 0px #021D2614`}
        height={"100%"}
        borderRadius={"8px"}
        container
        flexDirection={"column"}
      >
        <Grid container p={2} justifyContent={"space-between"}>
          <Grid container alignItems={"center"} columnGap={2}>
            <Typography variant="bodyMedium" fontWeight={550}>
              All Locations
            </Typography>
            <Grid
              borderRadius={"16px"}
              bgcolor={theme.palette.secondary.light}
              p={"5px 8px"}
            >
              <Typography
                variant="bodySmall"
                color={theme.palette.primary.light}
                fontWeight={550}
              >
                {totalElements + " " + "Locations"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container columnGap={2}>
            <Grid>
              <CustomInput
                hasStartSearchIcon
                placeholder={"Search By Name"}
                name={"searchString"}
                value={searchString}
                onDebounceCall={(debouncedValue) =>
                  setSearchstring(debouncedValue)
                }
                onInputEmpty={() => setSearchstring("")}
              />
            </Grid>
            <Grid>
              <Button
                startIcon={<AddIcon />}
                onClick={() => {
                  setOpenAddLocationDialog(true);
                  setSelectedlocation({} as Location);
                  setSelectedAction("Add");
                }}
                variant="contained"
                type="submit"
              >
                <Typography variant="bodySmall">Add Locations</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Table */}
        <Grid>
          <TableContainer sx={{ maxHeight: "60vh", overflow: "auto" }}>
            <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
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
                        container
                        flexDirection={"column"}
                        alignContent={
                          header.header === "Actions"
                            ? `flex-end`
                            : "flex-start"
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
                {rows.length > 0 ? (
                  rows?.map((location: Location, index: number) => (
                    <>
                      <TableRow key={index}>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography fontWeight={550} variant="bodySmall">
                              {location.name}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography sx={typographyCss} variant="bodySmall">
                              {`${location?.address?.line1},${location?.address?.city}, ${location?.address?.state}, ${location?.address?.zipcode}`}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography sx={typographyCss} variant="bodySmall">
                              {location.phone}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography sx={typographyCss} variant="bodySmall">
                              {location.email}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            {!location.active ? (
                              <Status status={"INACTIVE"} width="74px" />
                            ) : (
                              <Status status={"ACTIVE"} width="74px" />
                            )}
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="right">
                          <Grid
                            container
                            justifyContent={"flex-end"}
                            columnGap={1.2}
                            flexWrap={"nowrap"}
                          >
                            <IconButton
                              // disabled={!isPGActive}
                              sx={{ padding: "0px 5px" }}
                              aria-label="edit"
                              onClick={() => {
                                setSelectedAction("Edit");
                                setSelectedlocation(location);
                                setOpenAddLocationDialog(true);
                              }}
                            >
                              <EditOutlinedIcon sx={iconStyles} />
                            </IconButton>
                            {!location.archive ? (
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  setSelectedlocation(location);
                                  setOpenConfirmDeletePopUp(true);
                                }}
                                sx={{ padding: "0px" }}
                              >
                                <ArchiveOutlinedIcon sx={iconStyles} />
                              </IconButton>
                            ) : (
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  setSelectedlocation(location);
                                  setOpenConfirmRestorePopUp(true);
                                }}
                                sx={{ padding: "0px" }}
                              >
                                <RestoreIcon sx={iconStyles} />
                              </IconButton>
                            )}
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="bodySmall" fontWeight={550}>
                        No records found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container>
            <Paginator
              page={page}
              totalPages={totalPages}
              totalRecord={totalElements}
              onRecordsPerPageChange={handleRecordsPerPageChange}
              onPageChange={handlePageChange}
            />
          </Grid>
        </Grid>
        <CustomDrawer
          drawerWidth="750px"
          anchor={"right"}
          open={openAddLocationDialog}
          title={selectedAction === "Edit" ? "Edit Location" : "Add Locations"}
          onClose={() => setOpenAddLocationDialog(false)}
        >
          <LocationForm
            refetchList={() => refetch()}
            locationData={selectedLocation || null}
            isEdit={selectedAction === "Edit" ? true : false}
            handleDrawerClose={() => setOpenAddLocationDialog(false)}
            statesToIgnore={[]}
            xTenantId={xTenantIdVal}
          />
        </CustomDrawer>
        <ConfirmationPopUp
          open={openConfirmDeletePopUp}
          confirmButtonName="Archive"
          onClose={() => setOpenConfirmDeletePopUp(false)}
          onConfirm={() => confirmDelete()}
          message={`Do you really want to archive ${selectedLocation?.name || "this location"} ?`}
          title={`Archive Item`}
          subtitle={"Are you sure you want to archive the following item?"}
          rowData={[
            selectedLocation?.name || "",
            `${selectedLocation?.address?.line1}, ${selectedLocation?.address?.line2}, ${selectedLocation?.address?.city}, ${selectedLocation?.address?.state}, ${selectedLocation?.address?.country}, ${selectedLocation?.address?.zipcode}`,
          ]}
          header={[{ header: "Name" }, { header: "Address" }]}
        />
        <ConfirmationPopUp
          open={openConfirmRestorePopUp}
          onClose={() => setOpenConfirmRestorePopUp(false)}
          onConfirm={() => confirmRestore()}
          message={`Do you really want to restore ${selectedLocation?.name || "this location"} ?`}
          title={`Restore Item`}
          subtitle={"Are you sure you want to restore the following item?"}
          confirmButtonName="Restore"
          rowData={[
            selectedLocation?.name || "",
            `${selectedLocation?.address?.line1}, ${selectedLocation?.address?.line2 || "-"}, ${selectedLocation?.address?.city}, ${selectedLocation?.address?.state}, ${selectedLocation?.address?.country}, ${selectedLocation?.address?.zipcode}`,
          ]}
          header={[{ header: "Name" }, { header: "Address" }]}
        />
        <ConfirmationPopUp
          open={openWarningPopUp}
          onClose={() => setOpenWarningPopUp(false)}
          message={`This provider group is inactive, you can not add location for it.`}
          title={""}
          rowData={[]}
          header={[]}
        />
      </Grid>
    </Grid>
  );
};

export default LocationList;
