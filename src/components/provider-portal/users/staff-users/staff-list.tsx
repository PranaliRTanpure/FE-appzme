import AddIcon from "@mui/icons-material/Add";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
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
import { format } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmationPopUp from "../../../../common-components/confirmation-pop-up/confirmation-pop-up";
import CustomDrawer from "../../../../common-components/custom-drawer/custom-drawer";
import CustomInput from "../../../../common-components/custom-input/custom-input";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import CustomSelectorSq from "../../../../common-components/custom-selector-sq/custom-selector-sq";
import Paginator from "../../../../common-components/paginator/paginator";
import Status from "../../../../common-components/status/status";
import {
  heading,
  iconStyles,
  linkCss,
  tableCellCss,
  typographyCss,
} from "../../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../../common-components/table/table-models";
import {
  Roles,
  RolesOfAdminUsers,
  RolesOfPGUsers,
} from "../../../../constants/roles";
import useApiFeedback from "../../../../hooks/useApiFeedback";
import { ContentObject } from "../../../../models/response/response-content-entity";
import { setIsLoading } from "../../../../redux/actions/loader-action";
import {
  useProviderControllerServiceUpdateProviderArchiveStatus,
  useUserControllerServiceUpdateUserArchiveStatus,
} from "../../../../sdk/queries";
import {
  Provider,
  ProviderControllerService,
  User,
  UserControllerService,
} from "../../../../sdk/requests";
import { GetTenantId } from "../../../../services/common/get-tenant-id";
import { theme } from "../../../../utils/theme";
import NurseForm from "../nurse/nurse-form";
import StaffDetails from "./staff-details";
import StaffForm from "./staff-form";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const headers: TableHeaders[] = [
  { header: "Name" },
  { header: "Email" },
  { header: "Address" },
  { header: "Phone Number" },
  { header: "Status" },
  { header: "Actions" },
];

export const headersNurse: TableHeaders[] = [
  { header: "Name" },
  { header: "Email" },
  { header: "Address" },
  { header: "Phone Number" },
  { header: "NPI" },
  { header: "Licensed State" },
  { header: "License Number" },
  { header: "License Exp." },
  { header: "Status" },
  { header: "Actions" },
];
type StaffListProps = {
  roleType: string;
  listType: string;
  // eslint-disable-next-line no-unused-vars
  onChangeFilter?: (option: string) => void;
};

const StaffList = (props: StaffListProps) => {
  const { roleType, listType, onChangeFilter } = props;
  const [headersArr, setHeaderArr] = useState(headers);
  const xTenantId = GetTenantId();
  const [totalPages, setTotalPages] = useState(0);
  const [selectedStaff, setSelectedStaff] = useState<User>();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [openWarningPopUp, setOpenWarningPopUp] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [searchString, setSearchstring] = useState<string>("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [rows, setRows] = useState<User[]>([]);
  const [rowsNurse, setRowsNurse] = useState<Provider[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const dispatch = useDispatch();
  const [openConfirmDeletePopUp, setOpenConfirmDeletePopUp] = useState(false);
  const [openConfirmRestorePopUp, setOpenConfirmRestorePopUp] = useState(false);
  const [status] = useState<boolean | undefined>(undefined);
  const [archive] = useState<boolean | undefined>(undefined);
  const [selectedFilterOpt, setSelectedFilterOpt] = useState(
    listType === "Staff" ? "Provider Group Admin" : "Nurse"
  );
  const [nurseType, setNurseType] = useState("INTERNAL");
  const [openAddStaffDialog, setOpenAddStaffDialog] = useState(false);
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [openAddNurseForm, setOpenAddNurseForm] = useState(false);

  useEffect(() => {
    if (selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider") {
      setHeaderArr(headersNurse);
    } else {
      setHeaderArr(headers);
    }

    onChangeFilter && onChangeFilter(selectedFilterOpt);
  }, [selectedFilterOpt]);

  const handleOnClickLink = (user: User) => {
    setSelectedStaff(user);
    setOpenViewDetails(true);
  };

  const getRole = (role: string) => {
    if (role === "Front Desk") {
      return Roles.FRONTDESK;
    } else if (role === "Biller") {
      return Roles.BILLER;
    } else if (role === "Provider Group Admin") {
      return Roles.PROVIDER_GROUP_ADMIN;
    } else if (role === "Site Admin") {
      return Roles.SITE_ADMIN;
    } else if (role === "Staff") {
      return Roles.NURSE;
    } else if (role === "All") {
      return Roles.PROVIDER;
    } else if (role === "Nurse") {
      return Roles.NURSE;
    } else if (role === "Provider") {
      return Roles.PROVIDER;
    }
    return Roles.BILLER;
  };

  const { data, isLoading, isSuccess, refetch, isRefetching } = useQuery({
    queryKey: [
      "list-of-staff",
      page,
      size,
      searchString,
      selectedFilterOpt,
      sortDirection,
      sortBy,
    ],
    enabled: listType === "Staff",

    queryFn: () =>
      UserControllerService.getAllUsers({
        page,
        size,
        sortBy,
        sortDirection,
        status,
        archive,
        role: getRole(selectedFilterOpt),
        roleType:
          selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider"
            ? "PROVIDER"
            : (roleType as "PATIENT" | "STAFF" | "PROVIDER") || "STAFF",
        searchString,
        xTenantId,
      }),
  });

  const {
    data: dataGetProvider,
    isSuccess: isSuccessGetProvider,
    refetch: refetchGetProvider,
    isLoading: isLoadingProviderList,
  } = useQuery({
    queryKey: [
      "list-of-provider",
      page,
      size,
      searchString,
      selectedFilterOpt,
      nurseType,
      sortBy,
      sortDirection,
    ],
    enabled: !!(listType === "Providers"),
    queryFn: () =>
      ProviderControllerService.getAllProviders({
        page,
        size,
        sortBy,
        sortDirection,
        status,
        archive,
        role: getRole(selectedFilterOpt) as
          | "SUPER_ADMIN"
          | "FRONTDESK"
          | "BILLER"
          | "NURSE"
          | "PATIENT"
          | "ANONYMOUS"
          | "PROVIDER_GROUP_ADMIN"
          | "SITE_ADMIN"
          | "PROVIDER",
        searchString,
        xTenantId:
          getRole(selectedFilterOpt) === Roles.PROVIDER
            ? xTenantId
            : getRole(selectedFilterOpt) === Roles.NURSE &&
                nurseType === "EXTERNAL"
              ? "apZme"
              : xTenantId,
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      const response = (data as unknown as AxiosResponse).data as ContentObject<
        User[]
      >;

      const userData = response?.content;
      setTotalPages(response?.page?.totalPages as number);
      setTotalElements(response?.page?.totalElements as number);

      const tablePayload = userData?.map((user) => {
        return {
          uuid: user?.uuid,
          firstName: user.firstName,
          lastName: user.lastName,
          address: {
            line1: user.address?.line1,
            line2: user.address?.line2,
            city: user.address?.city,
            state: user.address?.state,
            country: user.address?.country,
            zipcode: user.address?.zipcode,
          },

          phone: user?.phone,
          active: user?.active,
          email: user?.email,
          archive: user.archive,
          role: user?.role,
          gender: user?.gender,
          locationId: user?.locationId,
          locationName: user?.locationName,
        } as User;
      });

      setRows(tablePayload);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isSuccessGetProvider) {
      const response = (dataGetProvider as unknown as AxiosResponse)
        .data as ContentObject<Provider[]>;

      const userData = response?.content;
      setTotalPages(response?.page?.totalPages as number);
      setTotalElements(response?.page?.totalElements as number);

      const tablePayload = userData?.map((user) => {
        return {
          uuid: user?.uuid,
          firstName: user.firstName,
          lastName: user.lastName,
          address: {
            line1: user.address?.line1,
            line2: user.address?.line2,
            city: user.address?.city,
            state: user.address?.state,
            country: user.address?.country,
            zipcode: user.address?.zipcode,
          },
          phone: user?.phone,
          active: user?.active,
          email: user?.email,
          archive: user.archive,
          role: user?.role,
          gender: user.gender,
          npi: user.npi,
          providerLicenseDetails: user.providerLicenseDetails,
          introduction: user.introduction,
          chatbotTone: user.chatbotTone,
        } as Provider;
      });

      setRowsNurse(tablePayload);
    }
  }, [dataGetProvider, isSuccessGetProvider]);

  const {
    mutateAsync: mutateAsyncArchive,
    isError: isErrorArchive,
    error: errorArchive,
    isSuccess: isSuccessArchive,
    data: dataArchive,
    isPending: isPendingArchive,
  } = useUserControllerServiceUpdateUserArchiveStatus();

  const {
    mutateAsync: mutateAsyncArchiveProvider,

    isError: isErrorArchiveProvider,
    error: errorArchiveProvider,
    isSuccess: isSuccessArchiveProvider,
    data: dataArchiveProvider,
    isPending: isPendingArchiveProvider,
  } = useProviderControllerServiceUpdateProviderArchiveStatus();

  const confirmDelete = async () => {
    if (selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider") {
      await mutateAsyncArchiveProvider({
        providerId: selectedProvider?.uuid || "",
        status: true,
        xTenantId: xTenantId,
      });
      refetchGetProvider();
    } else {
      await mutateAsyncArchive({
        userId: selectedStaff?.uuid || "",
        status: true,
        xTenantId: xTenantId,
      });
      refetch();
    }

    setOpenConfirmDeletePopUp(false);
  };

  const confirmRestore = async () => {
    if (selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider") {
      await mutateAsyncArchiveProvider({
        providerId: selectedProvider?.uuid || "",
        status: false,
        xTenantId: xTenantId,
      });
      refetchGetProvider();
    } else {
      await mutateAsyncArchive({
        userId: selectedStaff?.uuid || "",
        status: false,
        xTenantId: xTenantId,
      });
      refetch();
    }

    setOpenConfirmRestorePopUp(false);
  };

  useApiFeedback(
    isErrorArchive,
    errorArchive,
    isSuccessArchive,
    (dataArchive?.message || "User archive status updated!") as string
  );
  useApiFeedback(
    isErrorArchiveProvider,
    errorArchiveProvider,
    isSuccessArchiveProvider,
    (dataArchiveProvider?.message || "User archive status updated!") as string
  );

  const handlePageChange = (
    event: ChangeEvent<unknown> | null,
    page: number
  ) => {
    event;
    setPage(page);
  };

  const handleOnClickProvider = (user: Provider) => {
    setSelectedProvider(user);
    setOpenViewDetails(true);
  };

  const handleRecordsPerPageChange = (recordsPerPage: number) => {
    setPage(0);
    setSize(recordsPerPage);
  };

  const handleSorting = (header: string) => {
    if (header == "Name") {
      setSortBy("firstName");
    } else if (header === "Status") {
      setSortBy("active");
    } else {
      setSortBy("");
    }
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  useEffect(() => {
    dispatch(
      setIsLoading(
        isLoading ||
          isPendingArchive ||
          isLoadingProviderList ||
          isRefetching ||
          isPendingArchiveProvider
      )
    );
  }, [
    dispatch,
    isLoading,
    isPendingArchive,
    isLoadingProviderList,
    isRefetching,
    isPendingArchiveProvider,
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
        <Grid container p={2} justifyContent={"space-between"} rowGap={2}>
          <Grid container alignItems={"center"} columnGap={2}>
            <CustomSelectorSq
              widthOfBtn={"200px"}
              options={
                listType === "Staff"
                  ? [
                      "Provider Group Admin",
                      "Site Admin",
                      "Front Desk",
                      "Biller",
                    ]
                  : ["Nurse", "Provider"]
              }
              onSelect={(selectedOption) => {
                setPage(0);
                setSize(10);
                setSelectedFilterOpt(selectedOption);
              }}
              selectedValue={selectedFilterOpt}
            />
          </Grid>
          <Grid
            container
            columnGap={2}
            width={"600px"}
            justifyContent={"flex-end"}
          >
            {selectedFilterOpt === "Nurse" && (
              <Grid width={"150px"}>
                <CustomSelect
                  placeholder={"Select Nurse"}
                  items={[
                    { value: "EXTERNAL", label: "apZme" },
                    { value: "INTERNAL", label: "Provider Group" },
                  ]}
                  name={"nurseType"}
                  value={nurseType}
                  onChange={function (e: SelectChangeEvent<string>): void {
                    setNurseType(e.target.value);
                  }}
                />
              </Grid>
            )}
            <Grid>
              <CustomInput
                hasStartSearchIcon
                placeholder={"Search by Name and NPI"}
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
                sx={{ minWidth: "150px" }}
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedAction("Add");
                  selectedFilterOpt === "Nurse"
                    ? setOpenAddNurseForm(true)
                    : selectedFilterOpt === "Provider"
                      ? setOpenAddNurseForm(true)
                      : selectedFilterOpt === "All"
                        ? setOpenAddNurseForm(true)
                        : setOpenAddStaffDialog(true);
                  // : setOpenAddNurseForm(true);
                }}
                variant="contained"
                type="submit"
              >
                <Typography variant="bodySmall">
                  {selectedFilterOpt === "Nurse"
                    ? "Add Nurse	"
                    : selectedFilterOpt === "Provider"
                      ? "Add Provider"
                      : selectedFilterOpt === "All"
                        ? "Add Provider"
                        : "Add Staff"}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Table */}
        <Grid width={"100%"}>
          <TableContainer sx={{ maxHeight: "60vh", overflow: "auto" }}>
            <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
              <TableHead>
                <TableRow>
                  {headersArr.map((header, index) => (
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
                            alignItems={"center"}
                          >
                            {header.header}
                            <Typography display={"flex"} alignItems={"center"}>
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
                            alignItems={"center"}
                          >
                            {header.header}
                            <Typography display={"flex"} alignItems={"center"}>
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
                {selectedFilterOpt !== "Nurse" &&
                  selectedFilterOpt !== "Provider" && (
                    <>
                      {rows.length > 0 ? (
                        rows.map((user: User, index: number) => (
                          <>
                            <TableRow key={index}>
                              <TableCell sx={{ ...heading }} align="left">
                                <Grid container flexDirection={"column"}>
                                  <Link
                                    style={{
                                      ...linkCss,
                                    }}
                                    onClick={() => handleOnClickLink(user)}
                                  >
                                    <Typography
                                      fontWeight={550}
                                      variant="bodySmall"
                                    >
                                      {user.firstName + " " + user.lastName}
                                    </Typography>
                                  </Link>
                                </Grid>
                              </TableCell>
                              <TableCell sx={{ ...heading }} align="left">
                                <Grid container flexDirection={"column"}>
                                  <Typography
                                    sx={typographyCss}
                                    variant="bodySmall"
                                  >
                                    {user.email || "-"}
                                  </Typography>
                                </Grid>
                              </TableCell>
                              <TableCell sx={{ ...heading }} align="left">
                                <Grid container flexDirection={"column"}>
                                  <Typography
                                    sx={typographyCss}
                                    variant="bodySmall"
                                  >
                                    {user?.address?.line1
                                      ? `${user?.address?.line1 || "-"},  ${
                                          user?.address?.line2 || "-"
                                        },
								 ${user?.address?.city || "-"}, ${user?.address?.state || "-"},
								  ${user?.address?.country || "-"}, ${user?.address?.zipcode || "-"}`
                                      : "-" || "-"}
                                  </Typography>
                                </Grid>
                              </TableCell>
                              <TableCell sx={{ ...heading }} align="left">
                                <Grid container flexDirection={"column"}>
                                  <Typography
                                    sx={typographyCss}
                                    variant="bodySmall"
                                  >
                                    {user.phone}
                                  </Typography>
                                </Grid>
                              </TableCell>

                              <TableCell sx={{ ...heading }} align="left">
                                <Grid container flexDirection={"column"}>
                                  <Status
                                    status={`${
                                      user.active ? "ACTIVE" : "INACTIVE"
                                    }`}
                                    width="74px"
                                  />
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
                                    sx={{ padding: "0px 5px" }}
                                    aria-label="edit"
                                    onClick={() => {
                                      setSelectedAction("Edit");
                                      setSelectedStaff(user);
                                      setOpenAddStaffDialog(true);
                                    }}
                                  >
                                    <EditOutlinedIcon sx={iconStyles} />
                                  </IconButton>
                                  {!user.archive ? (
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() => {
                                        setSelectedStaff(user);
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
                                        setSelectedStaff(user);
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
                          <TableCell
                            colSpan={
                              selectedFilterOpt === "Nurse" ||
                              selectedFilterOpt === "Provider"
                                ? 9
                                : 6
                            }
                            align="center"
                          >
                            <Typography variant="bodySmall" fontWeight={550}>
                              No records found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )}
                {(selectedFilterOpt === "Nurse" ||
                  selectedFilterOpt === "Provider") && (
                  <>
                    {rowsNurse.length > 0 ? (
                      rowsNurse.map((user: Provider, index: number) => (
                        <>
                          <TableRow key={index}>
                            <TableCell sx={{ ...heading }} align="left">
                              <Grid container flexDirection={"column"}>
                                <Link
                                  style={{
                                    ...linkCss,
                                  }}
                                  onClick={() => handleOnClickProvider(user)}
                                >
                                  <Typography
                                    fontWeight={550}
                                    variant="bodySmall"
                                  >
                                    {user.firstName + " " + user.lastName}
                                  </Typography>
                                </Link>
                              </Grid>
                            </TableCell>
                            <TableCell sx={{ ...heading }} align="left">
                              <Grid container flexDirection={"column"}>
                                <Typography
                                  sx={typographyCss}
                                  variant="bodySmall"
                                >
                                  {user.email || "-"}
                                </Typography>
                              </Grid>
                            </TableCell>
                            <TableCell sx={{ ...heading }} align="left">
                              <Grid container flexDirection={"column"}>
                                <Typography
                                  sx={typographyCss}
                                  variant="bodySmall"
                                >
                                  {user?.address?.line1
                                    ? `${user?.address?.line1 || "-"},  ${
                                        user?.address?.line2 || "-"
                                      },
								 ${user?.address?.city || "-"}, ${user?.address?.state || "-"},
								  ${user?.address?.country || "-"}, ${user?.address?.zipcode || "-"}`
                                    : "-" || "-"}
                                </Typography>
                              </Grid>
                            </TableCell>
                            <TableCell sx={{ ...heading }} align="left">
                              <Grid container flexDirection={"column"}>
                                <Typography
                                  sx={typographyCss}
                                  variant="bodySmall"
                                >
                                  {user.phone}
                                </Typography>
                              </Grid>
                            </TableCell>
                            <TableCell sx={{ ...heading }} align="left">
                              <Grid container flexDirection={"column"}>
                                <Typography
                                  sx={typographyCss}
                                  variant="bodySmall"
                                >
                                  {user.npi}
                                </Typography>
                              </Grid>
                            </TableCell>
                            <TableCell sx={{ ...heading }} align="left">
                              <Grid container flexDirection={"column"}>
                                {user.providerLicenseDetails?.map((val) => (
                                  <>
                                    {val.licensedStates?.map((v) => (
                                      <>
                                        {v.state}
                                        <br />
                                      </>
                                    ))}
                                  </>
                                ))}
                              </Grid>
                            </TableCell>
                            <TableCell sx={{ ...heading }} align="left">
                              <Grid container flexDirection={"column"}>
                                {user.providerLicenseDetails?.map((item) => (
                                  <>
                                    <Typography
                                      sx={typographyCss}
                                      variant="bodySmall"
                                    >
                                      {item.licenseNumber || "-"}{" "}
                                    </Typography>
                                  </>
                                ))}
                              </Grid>
                            </TableCell>
                            <TableCell sx={{ ...heading }} align="left">
                              <Grid container flexDirection={"column"}>
                                {user.providerLicenseDetails?.map((item) => (
                                  <>
                                    <Typography
                                      sx={typographyCss}
                                      variant="bodySmall"
                                    >
                                      {item.expiryDate
                                        ? format(
                                            new Date(item.expiryDate || ""),
                                            "MM-dd-yyyy"
                                          )
                                        : "-"}{" "}
                                    </Typography>
                                  </>
                                ))}
                              </Grid>
                            </TableCell>

                            <TableCell sx={{ ...heading }} align="left">
                              <Grid container flexDirection={"column"}>
                                <Status
                                  status={`${
                                    user.active ? "ACTIVE" : "INACTIVE"
                                  }`}
                                  width="74px"
                                />
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
                                  sx={{ padding: "0px 5px" }}
                                  aria-label="edit"
                                  onClick={() => {
                                    setSelectedAction("Edit");
                                    setSelectedProvider(user);
                                    if (listType === "Staff") {
                                      setOpenAddStaffDialog(true);
                                    } else {
                                      setOpenAddNurseForm(true);
                                    }
                                  }}
                                >
                                  <EditOutlinedIcon sx={iconStyles} />
                                </IconButton>
                                {!user.archive ? (
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                      setSelectedProvider(user);
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
                                      setSelectedProvider(user);
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
                        <TableCell
                          colSpan={
                            selectedFilterOpt === "Nurse" ||
                            selectedFilterOpt === "Provider"
                              ? 10
                              : 6
                          }
                          align="center"
                        >
                          <Typography variant="bodySmall" fontWeight={550}>
                            No records found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
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
              defaultSize={size}
            />
          </Grid>
        </Grid>
        <CustomDrawer
          anchor={"right"}
          drawerWidth="750px"
          open={openAddStaffDialog}
          title={selectedAction === "Edit" ? "Edit Staff" : "Add Staff"}
          onClose={() => setOpenAddStaffDialog(false)}
        >
          <StaffForm
            isEdit={selectedAction === "Edit" ? true : false}
            staffData={selectedAction === "Edit" ? selectedStaff || null : null}
            handleDrawerClose={() => setOpenAddStaffDialog(false)}
            xTenantId={xTenantId}
            refetchList={() => refetch()}
            rolesOptions={
              listType === "Staff" ? RolesOfPGUsers : RolesOfAdminUsers
            }
            selectedFilterOpt={selectedFilterOpt}
          />
        </CustomDrawer>

        {/* Edit Nurse */}
        {/* {selectedProvider && ( */}
        <CustomDrawer
          anchor={"right"}
          open={openAddNurseForm}
          drawerWidth="750px"
          title={
            selectedAction === "Edit" && selectedFilterOpt === "Nurse"
              ? "Edit Nurse"
              : selectedAction !== "Edit" && selectedFilterOpt === "Nurse"
                ? "Add Nurse"
                : selectedAction !== "Edit" &&
                    (selectedFilterOpt === "Provider" ||
                      selectedFilterOpt === "All")
                  ? "Add Provider"
                  : "Edit Provider"
          }
          onClose={() => setOpenAddNurseForm(false)}
        >
          <NurseForm
            nurse={selectedAction === "Edit" ? selectedProvider : null}
            handleDrawerClose={() => setOpenAddNurseForm(false)}
            isEdit={selectedAction === "Edit" ? true : false}
            refetchList={refetchGetProvider}
            isNurse={selectedFilterOpt === "Nurse"}
          />
        </CustomDrawer>
        {/* )} */}

        <ConfirmationPopUp
          open={openConfirmDeletePopUp}
          confirmButtonName="Archive"
          rowData={[
            selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider"
              ? `${selectedProvider?.firstName} ${selectedProvider?.lastName}` ||
                ""
              : `${selectedStaff?.firstName} ${selectedStaff?.lastName}` || "",
            selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider"
              ? selectedProvider?.email || ""
              : selectedStaff?.email || "",
          ]}
          header={[{ header: "Name" }, { header: "Email" }]}
          title={`Archive Item`}
          subtitle={"Are you sure you want to archive the following item?"}
          onClose={() => setOpenConfirmDeletePopUp(false)}
          onConfirm={() => confirmDelete()}
          message={`Do you really want to archive ${
            selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider"
              ? `${selectedProvider?.firstName} ${selectedProvider?.lastName}`
              : `${selectedStaff?.firstName} ${selectedStaff?.lastName}` ||
                "this user"
          } ?`}
        />
        <ConfirmationPopUp
          title={`Restore Item`}
          confirmButtonName="Restore"
          subtitle={"Are you sure you want to restore the following items?"}
          open={openConfirmRestorePopUp}
          onClose={() => setOpenConfirmRestorePopUp(false)}
          onConfirm={() => confirmRestore()}
          message={`Do you really want to restore ${
            selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider"
              ? `${selectedProvider?.firstName} ${selectedProvider?.lastName}`
              : `${selectedStaff?.firstName} ${selectedStaff?.lastName}` ||
                "this user"
          } ?`}
          rowData={[
            selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider"
              ? `${selectedProvider?.firstName} ${selectedProvider?.lastName}` ||
                ""
              : `${selectedStaff?.firstName} ${selectedStaff?.lastName}` || "",
            selectedFilterOpt === "Nurse" || selectedFilterOpt === "Provider"
              ? selectedProvider?.email || ""
              : selectedStaff?.email || "",
          ]}
          header={[{ header: "Name" }, { header: "Email" }]}
        />
        <CustomDrawer
          anchor={"right"}
          open={openViewDetails}
          drawerWidth="750px"
          title={
            selectedFilterOpt === "Nurse"
              ? "View Nurse"
              : selectedFilterOpt === "Provider"
                ? "View Provider"
                : "View Staff"
          }
          onClose={() => setOpenViewDetails(false)}
        >
          <StaffDetails
            role={selectedFilterOpt}
            staffDetails={selectedStaff || ({} as User)}
            nurseDetails={selectedProvider as Provider}
            nurseType={nurseType}
          />
        </CustomDrawer>
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

export default StaffList;
