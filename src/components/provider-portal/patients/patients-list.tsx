import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Button,
  IconButton,
  Link,
  SelectChangeEvent,
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
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import Paginator from "../../../common-components/paginator/paginator";
import Status from "../../../common-components/status/status";

import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import ConfirmationPopUp from "../../../common-components/confirmation-pop-up/confirmation-pop-up";
import CustomDialog from "../../../common-components/custom-dialog/custom-dialog";
import CustomDrawer from "../../../common-components/custom-drawer/custom-drawer";
import {
  heading,
  iconStyles,
  tableCellCss,
  typographyCss,
} from "../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../common-components/table/table-models";
import useApiFeedback from "../../../hooks/useApiFeedback";
import { ContentObject } from "../../../models/response/response-content-entity";
import { setIsLoading } from "../../../redux/actions/loader-action";
import { usePatientControllerServiceUpdatePatientArchiveStatus } from "../../../sdk/queries";
import { Patient, PatientControllerService } from "../../../sdk/requests";
import { GetTenantId } from "../../../services/common/get-tenant-id";
import { theme } from "../../../utils/theme";
import InvitePatientForm from "./invite-patient-form";
import UploadCSVFile from "./upload-csv-dialog";

import { format, isValid, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
// import { format } from "date-fns";

export const mockHeaders: TableHeaders[] = [
  { header: "Sr No", minWidth: "100px" },
  { header: "Name" },
  { header: "MRN" },
  { header: "Date of Birth" },
  { header: "Phone Number" },
  { header: "Email" },
  { header: "Address" },
  { header: "Status" },
  { header: "Action" },
];

const PatientsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openInviteDrawer, setInviteDrawer] = useState(false);
  const [selectPatient, setSelectedPatient] = useState<Patient | null>();
  const [openConfirmRestorePopUp, setOpenConfirmRestorePopUp] = useState(false);
  const [openConfirmDeletePopUp, setOpenConfirmDeletePopUp] = useState(false);
  const [action, setAction] = useState("Add");
  const [invitePatientData, setInvitePatientData] = useState<Patient | null>();
  const [openCSVDialog, setOpenCSVDialog] = useState(false);

  const [searchByName, setSearchByName] = useState("");
  const [searchByMRN, setSearchByMRN] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const xtenantId = GetTenantId();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [sortBy, setSortBy] = useState("modified");
  const [sortDirection, setSortDirection] = useState("desc");
  const [rows, setRows] = React.useState<Patient[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  totalElements;

  const { data, isLoading, isSuccess, refetch } = useQuery({
    enabled: !!xtenantId,
    queryKey: [
      "list-of-patients",
      page,
      size,
      xtenantId,
      searchByMRN,
      searchByName,
      selectedStatus,
      sortBy,
      sortDirection,
    ],
    queryFn: () =>
      PatientControllerService.getAllPatient({
        page,
        size,
        sortBy,
        sortDirection,
        status:
          selectedStatus === "active"
            ? true
            : selectedStatus === "inactive"
              ? false
              : undefined,
        archive: selectedStatus === "archived" ? true : undefined,
        xTenantId: xtenantId,
        mrn: searchByMRN,
        name: searchByName,
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      const response = (data as unknown as AxiosResponse).data as ContentObject<
        Patient[]
      >;

      const patientData = response?.content;
      setTotalPages(response?.page?.totalPages as number);
      setTotalElements(response?.page?.totalElements as number);

      const tablePayload = patientData?.map((patient) => {
        return {
          uuid: patient?.uuid,
          firstName: `${patient.firstName} ` || "",
          lastName: `${patient.lastName}` || "",
          mrn: patient.mrn || "",
          birthDate: patient.birthDate || "-",
          mobileNumber: patient.mobileNumber,
          address: {
            line1: patient?.address?.line1,
            line2: patient?.address?.line2,
            city: patient?.address?.city,
            state: patient?.address?.state,
            country: patient?.address?.country,
            zipcode: patient?.address?.zipcode,
          },
          active: patient?.active,
          email: patient?.email,
          archive: patient.archive,
          schemaType: patient.schemaType,
          nurseId: patient.nurseId,
          providerId: patient.providerId,
        } as Patient;
      });

      setRows(tablePayload);
    }
  }, [data, isSuccess]);

  const handleOnClickViewLink = (link: string) => {
    link;
  };

  handleOnClickViewLink("");

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  const handleRecordsPerPageChange = (recordsPerPage: number) => {
    setPage(0);
    setSize(recordsPerPage);
  };

  const handlePageChange = (
    event: ChangeEvent<unknown> | null,
    page: number,
  ) => {
    event;
    setPage(page);
  };

  // Archive
  const xTenantId = GetTenantId();
  const {
    mutateAsync: mutateAsyncArchive,
    isError: isErrorArchivePatient,
    error: errorArchivePatient,
    isSuccess: successPatient,
    data: dataArchivePatient,
    // isPending: isPendingPatient
  } = usePatientControllerServiceUpdatePatientArchiveStatus();

  useApiFeedback(
    isErrorArchivePatient,
    errorArchivePatient,
    successPatient,
    (dataArchivePatient?.message || "User archive status updated!") as string,
  );

  const handlePatientArchive = async () => {
    await mutateAsyncArchive({
      patientId: selectPatient?.uuid || "",
      status: true,
      xTenantId: xTenantId,
    });
    setOpenConfirmDeletePopUp(false);
    refetch();
  };

  const handlePatientRestore = async () => {
    await mutateAsyncArchive({
      patientId: selectPatient?.uuid || "",
      status: false,
      xTenantId: xTenantId,
    });
    setOpenConfirmRestorePopUp(false);
    refetch();
  };

  const handleSorting = (header: string) => {
    if (header == "Name") {
      setSortBy("firstName");
    } else if (header === "Email") {
      setSortBy("email");
    } else if (header === "Status") {
      setSortBy("active");
    }

    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <Grid
      height={"100%"}
      p={2}
      width={"100%"}
      maxWidth={"100%"}
      overflow={"auto"}
    >
      <Grid
        border={`1px solid ${theme.palette.grey[300]}`}
        boxShadow={`0px 0px 16px 0px #021D2614`}
        height={"100%"}
        borderRadius={"8px"}
        container
        flexDirection={"column"}
      >
        <Grid container p={2} justifyContent={"space-between"} rowGap={2}>
          <Grid container alignItems={"center"} columnGap={2} rowGap={2}>
            <Typography variant="bodyMedium" fontWeight={550} mr={2}>
              Patients
            </Typography>
            {/* <Grid
              borderRadius={"16px"}
              bgcolor={theme.palette.secondary.light}
              p={"5px 8px"}
            >
              <Typography
                variant="bodySmall"
                color={theme.palette.primary.light}
                fontWeight={550}
              >
                {totalElements} Patients
              </Typography>
            </Grid> */}
            <Grid>
              {/* <CustomLabel label="Search by Name" /> */}
              <CustomInput
                placeholder={"Serach by name"}
                name={"searchByName"}
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
                onDebounceCall={(searchbyname) => {
                  setSearchByName(searchbyname);
                }}
                onInputEmpty={() => setSearchByName("")}
              />
            </Grid>
            <Grid>
              {/* <CustomLabel label="Search by MRN" /> */}
              <CustomInput
                placeholder={"Serach by MRN"}
                name={"searchByName"}
                value={searchByMRN}
                onChange={(e) => setSearchByMRN(e.target.value)}
                onDebounceCall={(searchbymrn) => {
                  setSearchByMRN(searchbymrn);
                }}
                onInputEmpty={() => setSearchByMRN("")}
              />
            </Grid>
            <Grid container width={"200px"}>
              {/* <CustomLabel label="Select status" /> */}
              <CustomSelect
                placeholder={"Select status"}
                name={"searchByMRN"}
                value={selectedStatus}
                enableDeselect
                items={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "archived", label: "Archived" },
                ]}
                onChange={function (e: SelectChangeEvent<string>): void {
                  setSelectedStatus(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnGap={2} rowGap={2} alignItems={"flex-end"}>
            <Button variant="outlined">
              <Typography variant="bodySmall">Enroll from EHR</Typography>
            </Button>
            <Button variant="outlined" onClick={() => setOpenCSVDialog(true)}>
              <Typography variant="bodySmall">Import CSV</Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setInviteDrawer(true), setAction("Add");
              }}
            >
              <Typography variant="bodySmall">Invite patient</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid width={"100%"}>
          <TableContainer sx={{ maxHeight: "78vh", overflow: "auto" }}>
            <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
              <TableHead>
                <TableRow>
                  {mockHeaders.map((header, index) => (
                    <TableCell
                      sx={{
                        ...heading,
                        minWidth: header.minWidth ? header.minWidth : "inherit",
                        maxWidth: header.maxWidth ? header.maxWidth : "inherit",
                      }}
                      align="left"
                      key={index}
                    >
                      {header.header === "Name" ? (
                        <Link
                          style={{
                            color: "#667085",
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSorting(header.header)}
                        >
                          <Typography
                            fontWeight={550}
                            variant="bodySmall"
                            display={"flex"}
                            gap={0.5}
                          >
                            {header.header}
                            <Typography mt={0.3}>
                              {sortDirection == "asc" ? (
                                <ArrowUpwardIcon fontSize="small" />
                              ) : (
                                <ArrowDownwardIcon fontSize="small" />
                              )}
                            </Typography>
                          </Typography>
                        </Link>
                      ) : header.header === "Status" ? (
                        <Link
                          style={{
                            color: "#667085",
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSorting(header.header)}
                        >
                          <Typography
                            fontWeight={550}
                            variant="bodySmall"
                            display={"flex"}
                            gap={0.5}
                          >
                            {header.header}
                            <Typography mt={0.3}>
                              {sortDirection == "asc" ? (
                                <ArrowUpwardIcon fontSize="small" />
                              ) : (
                                <ArrowDownwardIcon fontSize="small" />
                              )}
                            </Typography>
                          </Typography>
                        </Link>
                      ) : header.header === "Email" ? (
                        <Link
                          style={{
                            color: "#667085",
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSorting(header.header)}
                        >
                          <Typography
                            fontWeight={550}
                            variant="bodySmall"
                            display={"flex"}
                            gap={0.5}
                          >
                            {header.header}
                            <Typography mt={0.3}>
                              {sortDirection == "asc" ? (
                                <ArrowUpwardIcon fontSize="small" />
                              ) : (
                                <ArrowDownwardIcon fontSize="small" />
                              )}
                            </Typography>
                          </Typography>
                        </Link>
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
                          <Typography variant="bodySmall">
                            {header.header}
                          </Typography>
                        </Grid>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((patient, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography sx={typographyCss} variant="bodySmall">
                              {page * size + index + 1}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Grid
                              container
                              flexDirection={"column"}
                              sx={{ cursor: "pointer" }}
                            >
                              <Typography
                                fontWeight={550}
                                color="primary"
                                variant="bodySmall"
                                onClick={() => navigate(`${patient.uuid}`)}
                              >
                                {patient.firstName
                                  ? `${patient.firstName} ${patient.lastName} `
                                  : ""}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography sx={typographyCss} variant="bodySmall">
                              {patient.mrn || "-"}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography sx={typographyCss} variant="bodySmall">
                              {patient.birthDate
                                ? (() => {
                                    const parsedDate = parseISO(
                                      patient.birthDate,
                                    );
                                    return isValid(parsedDate)
                                      ? format(parsedDate, "MM/dd/yyyy")
                                      : "-";
                                  })()
                                : "-"}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography sx={typographyCss} variant="bodySmall">
                              {patient.mobileNumber || "-"}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography sx={typographyCss} variant="bodySmall">
                              {patient.email || "-"}
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Typography sx={typographyCss} variant="bodySmall">
                              {patient?.address?.line1
                                ? `${patient?.address?.line1},${patient?.address?.city}, ${patient?.address?.state}, ${patient?.address?.zipcode}`
                                : "-"}
                            </Typography>
                          </Grid>
                        </TableCell>

                        <TableCell sx={{ ...heading }} align="left">
                          <Grid container flexDirection={"column"}>
                            <Status
                              status={`${patient.active ? "ACTIVE" : "INACTIVE"}`}
                              width="74px"
                            />
                          </Grid>
                        </TableCell>
                        <TableCell sx={{ ...heading }} align="center">
                          <Grid
                            container
                            justifyContent={"flex-start"}
                            columnGap={1.2}
                            flexWrap={"nowrap"}
                          >
                            <IconButton
                              sx={{ padding: "0px 5px" }}
                              aria-label="edit"
                              onClick={() => {
                                setInviteDrawer(true);
                                setAction("Edit");
                                setInvitePatientData(patient);
                              }}
                            >
                              <EditOutlinedIcon sx={iconStyles} />
                            </IconButton>

                            {!patient.archive ? (
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  setSelectedPatient(patient);
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
                                  setSelectedPatient(patient);
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
        <Grid container>
          <Paginator
            page={page}
            totalPages={totalPages}
            totalRecord={totalElements}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            onPageChange={handlePageChange}
          />
        </Grid>
        <CustomDrawer
          anchor="right"
          open={openInviteDrawer}
          onClose={() => setInviteDrawer(false)}
          title={action === "Edit" ? "Edit Patient" : "Invite Patient"}
          drawerWidth="1000px"
        >
          <InvitePatientForm
            CloseDrawer={() => setInviteDrawer(false)}
            refetch={refetch}
            action={action}
            patientUuid={
              action === "Edit" ? invitePatientData?.uuid || "" : null
            }
            xTenantId={xTenantId}
          />
        </CustomDrawer>

        <ConfirmationPopUp
          title={`Restore Item`}
          confirmButtonName="Restore"
          subtitle={"Are you sure you want to restore the following Patient?"}
          open={openConfirmRestorePopUp}
          onClose={() => setOpenConfirmRestorePopUp(false)}
          onConfirm={() => handlePatientRestore()}
          message={`Do you really want to restore `}
          rowData={[
            `${selectPatient?.firstName} ${selectPatient?.lastName}`,
            `${selectPatient?.email}`,
          ]}
          header={[{ header: "Name" }, { header: "Email" }]}
        />

        <ConfirmationPopUp
          open={openConfirmDeletePopUp}
          confirmButtonName="Archive"
          rowData={[
            `${selectPatient?.firstName} ${selectPatient?.lastName}`,
            `${selectPatient?.email}`,
          ]}
          header={[{ header: "Name" }, { header: "Email" }]}
          title={`Archive Item`}
          subtitle={"Are you sure you want to archive the following Patient?"}
          onClose={() => setOpenConfirmDeletePopUp(false)}
          onConfirm={() => handlePatientArchive()}
          message={`Do you really want to archive this user`}
        />
      </Grid>

      <CustomDialog
        buttonName={["Invite"]}
        onClose={() => setOpenCSVDialog(false)}
        open={openCSVDialog}
        title="Import Patient"
      >
        <UploadCSVFile
          onClose={() => setOpenCSVDialog(false)}
          refetch={refetch}
        />
      </CustomDialog>
    </Grid>
  );
};

export default PatientsList;
