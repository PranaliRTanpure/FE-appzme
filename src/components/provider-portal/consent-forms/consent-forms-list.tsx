import AddIcon from "@mui/icons-material/Add";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Button,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmationPopUp from "../../../common-components/confirmation-pop-up/confirmation-pop-up";
import CustomDrawer from "../../../common-components/custom-drawer/custom-drawer";
import CustomInput from "../../../common-components/custom-input/custom-input";
import Paginator from "../../../common-components/paginator/paginator";
import Status from "../../../common-components/status/status";
import {
  heading,
  iconStyles,
  linkCss,
  tableCellCss,
} from "../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../common-components/table/table-models";
import useApiFeedback from "../../../hooks/useApiFeedback";
import { ContentObject } from "../../../models/response/response-content-entity";
import { setIsLoading } from "../../../redux/actions/loader-action";
import { useConsentFormControllerServiceUpdateConsentFormArchiveStatus } from "../../../sdk/queries";
import {
  ConsentFormControllerService,
  ConsentFormTemplate,
} from "../../../sdk/requests";
import { GetTenantId } from "../../../services/common/get-tenant-id";
import { theme } from "../../../utils/theme";
import AddConsentForm from "./add-consent-form";
import useAuthority from "../../../hooks/use-authority";

export const headers: TableHeaders[] = [
  { header: "Form Name" },
  { header: "Status" },
  { header: "Actions", maxWidth: "250px" },
];

const ConsentForm = () => {
  const { isProvider } = useAuthority();
  const xTenantIdVal = GetTenantId();
  const [selectedAction, setSelectedAction] = useState("");
  const [openConfirmDeletePopUp, setOpenConfirmDeletePopUp] = useState(false);
  const [openConfirmRestorePopUp, setOpenConfirmRestorePopUp] = useState(false);
  const [selectedForm, setSelectedForm] = useState<ConsentFormTemplate>();
  const [totalPages, setTotalPages] = useState(0);
  const [openDialogOfDocument, setOpenDialogOfDocument] = useState(false);
  const [open, setOpen] = useState(false);
  const [formUrl, setFormUrl] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [searchString, setSearchstring] = useState<string>("");
  const [sortBy] = useState("");
  const [sortDirection] = useState("desc");
  const [rows, setRows] = useState<ConsentFormTemplate[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const dispatch = useDispatch();
  const [status] = useState<boolean | undefined>(undefined);
  const [archive] = useState<boolean | undefined>(undefined);

  const {
    data,
    isLoading,
    isSuccess,
    refetch,
    isRefetching: isRefetchingList,
  } = useQuery({
    queryKey: ["list-of-forms", page, size, searchString],
    queryFn: () =>
      ConsentFormControllerService.getAllConsentFormTemplate({
        page,
        size,
        sortBy,
        sortDirection,
        archive,
        searchString,
        status,
        xTenantId: xTenantIdVal || "",
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      const response = (data as unknown as AxiosResponse).data as ContentObject<
        ConsentFormTemplate[]
      >;

      const formData = response?.content;
      setTotalPages(response?.page?.totalPages as number);
      setTotalElements(response?.page?.totalElements as number);

      const tablePayload = formData?.map((form: ConsentFormTemplate) => {
        return {
          document: form.document,
          name: form.name,
          uuid: form.uuid,
          active: form.active,
          archive: form.archive,
          changeConsent: form.changeConsent,
        } as ConsentFormTemplate;
      });

      setRows(tablePayload);
    }
  }, [data, isSuccess]);

  const handlePageChange = (
    _event: ChangeEvent<unknown> | null,
    page: number,
  ) => {
    setPage(page);
  };

  const handleRecordsPerPageChange = (recordsPerPage: number) => {
    setPage(0);
    setSize(recordsPerPage);
  };

  const handleSorting = (header: string) => {
    header;
  };

  const {
    data: dataFormById,
    isLoading: isLoadingFormById,
    isSuccess: isSuccessFormById,
    refetch: refetchFormById,
    isRefetching,
  } = useQuery({
    enabled: !!selectedForm?.uuid,
    queryKey: ["forms-by-id"],
    queryFn: () =>
      ConsentFormControllerService.getConsentFormId({
        consentFormId: selectedForm?.uuid || "",
        xTenantId: xTenantIdVal || "",
      }),
  });

  const handleOnClickForm = async (form: ConsentFormTemplate) => {
    await setSelectedForm(form);
    await refetchFormById();
    setOpen(true);
  };

  useEffect(() => {
    if (isSuccessFormById) {
      const res = (
        (dataFormById as unknown as AxiosResponse).data as ConsentFormTemplate
      ).document;
      setFormUrl(res);
    }
  }, [isSuccessFormById, dataFormById, selectedForm]);

  const {
    mutateAsync: mutateAsyncArchive,
    isError: isErrorArchive,
    error: errorArchive,
    isPending: isPendingArchive,
    isSuccess: isSuccessArchive,
    data: dataArchive,
  } = useConsentFormControllerServiceUpdateConsentFormArchiveStatus();

  const confirmDelete = async () => {
    await mutateAsyncArchive({
      consentFormId: selectedForm?.uuid || "",
      status: true,
      xTenantId: xTenantIdVal,
    });
    await refetch();
    setOpenConfirmDeletePopUp(false);
  };

  const confirmRestore = async () => {
    await mutateAsyncArchive({
      consentFormId: selectedForm?.uuid || "",
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
    (dataArchive?.message || "User archive status updated!") as string,
  );

  useEffect(() => {
    dispatch(
      setIsLoading(
        isLoading ||
          isLoadingFormById ||
          isPendingArchive ||
          isRefetching ||
          isRefetchingList,
      ),
    );
  }, [
    dispatch,
    isLoading,
    isLoadingFormById,
    isPendingArchive,
    isRefetching,
    isRefetchingList,
  ]);

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
              Consent Forms
            </Typography>
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
            {!isProvider && (
              <Grid>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setOpenDialogOfDocument(true);
                    setSelectedAction("Add");
                  }}
                  variant="contained"
                  type="submit"
                >
                  <Typography variant="bodySmall">Add Consent</Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Table */}
        <Grid>
          <TableContainer sx={{ maxHeight: "60vh", overflow: "auto" }}>
            <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
              <TableHead>
                <TableRow>
                  {headers
                    .filter(
                      (header) => !(isProvider && header.header === "Actions"),
                    )
                    .map((header, index) => (
                      <TableCell
                        sx={{
                          ...heading,
                          width: header.maxWidth ? header.maxWidth : "inherit",
                          minWidth: header.minWidth
                            ? header.minWidth
                            : "inherit",
                          maxWidth: header.maxWidth
                            ? header.maxWidth
                            : "inherit",
                        }}
                        align="left"
                        key={index}
                      >
                        {header.header === "Form Name" ? (
                          <Link
                            style={{
                              color: "#667085",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleSorting(header.header)}
                          >
                            <Typography fontWeight={550} variant="bodySmall">
                              {header.header}
                            </Typography>
                          </Link>
                        ) : (
                          <Grid
                            container
                            flexDirection={"column"}
                            alignContent={
                              header.header === "Actions" ||
                              header.header === "Status"
                                ? isProvider
                                  ? "center"
                                  : `flex-end`
                                : "flex-start"
                            }
                          >
                            <Typography
                              variant="bodySmall"
                              mr={header.header === "Status" ? "20px" : 0}
                            >
                              {header.header}
                            </Typography>
                          </Grid>
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  {rows.length > 0 ? (
                    rows.map((item: ConsentFormTemplate, index: number) => (
                      <>
                        <TableRow key={index}>
                          <TableCell sx={{ ...heading }} align="left">
                            <Grid container flexDirection={"column"}>
                              <Link
                                style={{
                                  ...linkCss,
                                }}
                                onClick={() => handleOnClickForm(item)}
                              >
                                <Typography
                                  fontWeight={550}
                                  variant="bodySmall"
                                >
                                  {item.name}
                                </Typography>
                              </Link>
                            </Grid>
                          </TableCell>
                          <TableCell sx={{ ...heading }} align="left">
                            <Grid
                              container
                              flexDirection={"column"}
                              alignContent={isProvider ? "center" : `flex-end`}
                              mr={isProvider ? 2 : 0}
                            >
                              <Status
                                status={`${item.active ? "ACTIVE" : "INACTIVE"}`}
                                width="74px"
                              />
                            </Grid>
                          </TableCell>
                          {!isProvider && (
                            <TableCell sx={{ ...heading }} align="right">
                              <Grid
                                container
                                justifyContent={"flex-end"}
                                columnGap={1.2}
                                flexWrap={"nowrap"}
                              >
                                <IconButton
                                  sx={{ padding: "0px 5px" }}
                                  aria-label="edit"
                                  onClick={() => {
                                    setSelectedAction("Edit");
                                    setSelectedForm(item);
                                    setOpenDialogOfDocument(true);
                                  }}
                                >
                                  <EditOutlinedIcon sx={iconStyles} />
                                </IconButton>
                                {!item.archive ? (
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                      setSelectedForm(item);
                                      setOpenConfirmDeletePopUp(true);
                                    }}
                                    sx={{ padding: "0px" }}
                                  >
                                    <ArchiveOutlinedIcon sx={iconStyles} />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    // disabled={!isPGActive}
                                    aria-label="delete"
                                    onClick={() => {
                                      setSelectedForm(item);
                                      setOpenConfirmRestorePopUp(true);
                                    }}
                                    sx={{ padding: "0px" }}
                                  >
                                    <RestoreIcon sx={iconStyles} />
                                  </IconButton>
                                )}
                              </Grid>
                            </TableCell>
                          )}
                        </TableRow>
                      </>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="bodySmall" fontWeight={550}>
                          No records found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </>
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
          {openDialogOfDocument && (
            <AddConsentForm
              setOpenDialogOfDocument={setOpenDialogOfDocument}
              openDialogOfDocument={openDialogOfDocument}
              refetch={refetch}
              formData={
                selectedForm && selectedAction === "Edit"
                  ? { ...selectedForm, document: formUrl || "" }
                  : ({} as ConsentFormTemplate)
              }
              isEdit={selectedAction === "Edit" ? true : false}
              supportedFormatsMsg={"Supported formats: PDF    "}
            />
          )}
          <CustomDrawer
            drawerWidth={"750px"}
            drawerPadding={"5px"}
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            anchor={"right"}
            title={selectedForm?.name || ""}
          >
            <Box
              sx={{
                background: "white",
                height: "100%",
                width: "100%",
                borderRadius: "20px",
              }}
            >
              <Grid
                container
                flexDirection={"column"}
                width={"100%"}
                height={"100%"}
              >
                <Grid width={"100%"} height={"97%"}>
                  {formUrl && (
                    <iframe
                      style={{ width: "100%", height: "100%", border: "none" }}
                      src={formUrl}
                    ></iframe>
                  )}
                </Grid>
              </Grid>
            </Box>
          </CustomDrawer>
          <ConfirmationPopUp
            open={openConfirmDeletePopUp}
            confirmButtonName="Archive"
            onClose={() => setOpenConfirmDeletePopUp(false)}
            onConfirm={() => confirmDelete()}
            message={`Do you really want to archive ${selectedForm?.name || "this location"} ?`}
            title={`Archive Item`}
            subtitle={"Are you sure you want to archive the following item?"}
            rowData={[selectedForm?.name || ""]}
            header={[{ header: "Name" }]}
          />
          <ConfirmationPopUp
            open={openConfirmRestorePopUp}
            onClose={() => setOpenConfirmRestorePopUp(false)}
            onConfirm={() => confirmRestore()}
            message={`Do you really want to restore ${selectedForm?.name || "this location"} ?`}
            title={`Restore Item`}
            subtitle={"Are you sure you want to restore the following item?"}
            confirmButtonName="Restore"
            rowData={[selectedForm?.name || ""]}
            header={[{ header: "Name" }]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ConsentForm;
