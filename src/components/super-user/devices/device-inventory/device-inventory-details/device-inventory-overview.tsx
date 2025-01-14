import {
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
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
import { Grid, useMediaQuery } from "@mui/system";
import { theme } from "../../../../../utils/theme";
import CustomLabel from "../../../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../../../common-components/custom-select/customSelect";
import CustomInput from "../../../../../common-components/custom-input/custom-input";
import * as yup from "yup";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TableHeaders } from "../../../../../common-components/table/table-models";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "../../../../../common-components/table/common-table-widgets";
import deviceInventoryOverviewList from "../../../../../mock-data/device-inventory-overview-list.json";
import CustomTextArea from "../../../../../common-components/custom-text-area/custom-textarea";

export const deviceInventoryOverviewSchema = yup.object().shape({
  deviceType: yup.string().required("Device type required"),
  pool: yup.string().required("Pool required"),
  serialNo: yup.string().required("Serial Number is required"),
  note: yup.string().required("Note is required"),
  isBroken: yup.boolean(),
  isPhysicallyBroken: yup.boolean(),
  isLost: yup.boolean(),
  isRetired: yup.boolean(),
  brokenInput: yup.string().required("Input required"),
  PhysicallyBrokenInput: yup.string().required("Input required"),
  lostInput: yup.string().required("Input required"),
  retiredInput: yup.string().required("Input required"),
});

export const mockHeaders: TableHeaders[] = [
  { header: "Current Device Status" },
  { header: "Patient" },
  { header: "Action" },
  { header: "Resulting Device Status" },
];

interface DeviceInventoryOverviewProps {
  isEditMode: boolean;
}

const DeviceInventoryOverview = ({
  isEditMode,
}: DeviceInventoryOverviewProps) => {
  const belowHeight768 = useMediaQuery("(max-height:768px)");
  const belowHeight900 = useMediaQuery("(max-height:900px)");
  const belowWidth1440 = useMediaQuery("(max-width:1440px)");
  const belowWidth1366 = useMediaQuery("(max-width:1366px)");
  const belowWidth1024 = useMediaQuery("(max-width:1024px)");

  const initialValues = {
    deviceType: "",
    pool: "",
    serialNo: "",
    note: "",
    isBroken: false,
    isPhysicallyBroken: false,
    isLost: false,
    isRetired: false,
    brokenInput: "",
    PhysicallyBrokenInput: "",
    retiredInput: "",
    lostInput: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(deviceInventoryOverviewSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
  };

  return (
    <Grid
      container
      width={"100%"}
      height={belowHeight768 ? "490px" : belowHeight900 ? "600px" : "100%"}
      sx={{
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", height: "100%" }}
      >
        <Grid
          container
          sx={{ background: "#F9FAFB" }}
          width={"100%"}
          height={"100%"}
        >
          <Grid
            container
            justifyContent={"space-between"}
            borderBottom={"1px solid #E7E7E7"}
            p={2}
            width={"100%"}
          >
            {/* Grid 1 */}
            <Grid
              container
              border={"1px solid #E7E7E7"}
              borderRadius={2}
              width={"49.5%"}
              flexDirection={"column"}
            >
              <Grid p={2}>
                <Typography variant="bodyMedium">Basic Details</Typography>
              </Grid>
              <Divider
                sx={{
                  margin: "2px",
                  background: theme.palette.common.white,
                }}
                orientation="horizontal"
                variant="middle"
              />
              <Grid p={2}>
                <Grid container justifyContent={"space-between"} width={"100%"}>
                  <Grid width={"32.5%"}>
                    <CustomLabel label="Device Type" />
                    <Controller
                      control={control}
                      name="deviceType"
                      render={({ field }) => (
                        <CustomSelect
                          placeholder={"Select Device"}
                          enableDeselect
                          items={[{ value: "active", label: "Active" }]}
                          hasError={!!errors.deviceType}
                          errorMessage={errors.deviceType?.message as string}
                          onChange={function (
                            e: SelectChangeEvent<string>,
                          ): void {
                            setValue("deviceType", e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                          name={field.name}
                          value={field.value}
                          isDisabled={!isEditMode}
                        />
                      )}
                    ></Controller>
                  </Grid>
                  <Grid width={"32.5%"}>
                    <CustomLabel label="Serial Number" />
                    <Controller
                      control={control}
                      name="serialNo"
                      render={({ field }) => (
                        <CustomInput
                          placeholder={"Enter Serial Number"}
                          hasError={!!errors.serialNo}
                          errorMessage={errors.serialNo?.message as string}
                          onChange={() => {}}
                          onDebounceCall={() => {}}
                          onInputEmpty={() => {}}
                          name={field.name}
                          value={field.value}
                          disableField={!isEditMode}
                        />
                      )}
                    />
                  </Grid>
                  <Grid width={"32.5%"}>
                    <CustomLabel label="Pool" />
                    <Controller
                      control={control}
                      name="pool"
                      render={({ field }) => (
                        <CustomSelect
                          placeholder={"Select Pool"}
                          enableDeselect
                          items={[{ value: "active", label: "Active" }]}
                          hasError={!!errors.pool}
                          errorMessage={errors.pool?.message as string}
                          onChange={function (
                            e: SelectChangeEvent<string>,
                          ): void {
                            setValue("pool", e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                          name={field.name}
                          value={field.value}
                          isDisabled={!isEditMode}
                        />
                      )}
                    ></Controller>
                  </Grid>
                </Grid>
                <Grid pt={3}>
                  <CustomLabel label="Notes" />
                  <Controller
                    control={control}
                    name="note"
                    render={({ field }) => (
                      <CustomTextArea
                        placeholder={"Add Note"}
                        minRow={4}
                        {...field}
                        hasError={!!errors.note}
                        errorMessage={errors.note?.message || ""}
                        isDisabled={!isEditMode}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Grid 2 */}
            <Grid
              container
              border={"1px solid #E7E7E7"}
              borderRadius={2}
              width={"49.5%"}
              flexDirection={"column"}
            >
              <Grid p={2}>
                <Typography variant="bodyMedium" fontWeight={500}>
                  Device Status
                </Typography>
              </Grid>
              <Divider
                sx={{
                  margin: "2px",
                  background: theme.palette.common.white,
                }}
                orientation="horizontal"
                variant="middle"
                flexItem
              />
              <Grid
                container
                p={2}
                flexDirection={"column"}
                justifyContent={"space-between"}
                rowGap={1}
              >
                <Grid container width={"100%"}>
                  <Grid
                    container
                    width={
                      belowWidth1024
                        ? "44%"
                        : belowWidth1366
                          ? "32%"
                          : belowWidth1440
                            ? "28%"
                            : "22%"
                    }
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Broken"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "14px",
                          },
                        }}
                        disabled={!isEditMode}
                      />
                    </Grid>
                    <Grid pr={1.2}>:</Grid>
                  </Grid>
                  <Grid
                    flex={1}
                    width={
                      belowWidth1024
                        ? "55%"
                        : belowWidth1366
                          ? "67%"
                          : belowWidth1440
                            ? "71%"
                            : "77%"
                    }
                    pl={1}
                  >
                    <Controller
                      control={control}
                      name="brokenInput"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={field.value.trim() || ""}
                          placeholder={"Add note"}
                          hasError={!!errors.PhysicallyBrokenInput}
                          errorMessage={
                            errors.PhysicallyBrokenInput?.message as string
                          }
                          disableField={!isEditMode}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container width={"100%"}>
                  <Grid
                    container
                    width={
                      belowWidth1024
                        ? "44%"
                        : belowWidth1366
                          ? "32%"
                          : belowWidth1440
                            ? "28%"
                            : "22%"
                    }
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Possibly Broken"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "14px",
                          },
                        }}
                        disabled={!isEditMode}
                      />
                    </Grid>
                    <Grid pr={1.2}>:</Grid>
                  </Grid>
                  <Grid
                    flex={1}
                    width={
                      belowWidth1024
                        ? "55%"
                        : belowWidth1366
                          ? "67%"
                          : belowWidth1440
                            ? "71%"
                            : "77%"
                    }
                    pl={1}
                  >
                    <Controller
                      control={control}
                      name="PhysicallyBrokenInput"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={field.value.trim() || ""}
                          placeholder={"Add note"}
                          hasError={!!errors.PhysicallyBrokenInput}
                          errorMessage={
                            errors.PhysicallyBrokenInput?.message as string
                          }
                          disableField={!isEditMode}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container width={"100%"}>
                  <Grid
                    container
                    width={
                      belowWidth1024
                        ? "44%"
                        : belowWidth1366
                          ? "32%"
                          : belowWidth1440
                            ? "28%"
                            : "22%"
                    }
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lost"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "14px",
                          },
                        }}
                        disabled={!isEditMode}
                      />
                    </Grid>
                    <Grid pr={1.2}>:</Grid>
                  </Grid>
                  <Grid
                    flex={1}
                    width={
                      belowWidth1024
                        ? "55%"
                        : belowWidth1366
                          ? "67%"
                          : belowWidth1440
                            ? "71%"
                            : "77%"
                    }
                    pl={1}
                  >
                    <Controller
                      control={control}
                      name="lostInput"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={field.value.trim() || ""}
                          placeholder={"Add note"}
                          hasError={!!errors.PhysicallyBrokenInput}
                          errorMessage={
                            errors.PhysicallyBrokenInput?.message as string
                          }
                          disableField={!isEditMode}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container width={"100%"}>
                  <Grid
                    container
                    width={
                      belowWidth1024
                        ? "44%"
                        : belowWidth1366
                          ? "32%"
                          : belowWidth1440
                            ? "28%"
                            : "22%"
                    }
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Retired"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "14px",
                          },
                        }}
                        disabled={!isEditMode}
                      />
                    </Grid>
                    <Grid pr={1.2}>:</Grid>
                  </Grid>
                  <Grid
                    flex={1}
                    width={
                      belowWidth1024
                        ? "55%"
                        : belowWidth1366
                          ? "67%"
                          : belowWidth1440
                            ? "71%"
                            : "77%"
                    }
                    pl={1}
                  >
                    <Controller
                      control={control}
                      name="retiredInput"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={field.value.trim() || ""}
                          placeholder={"Add note"}
                          hasError={!!errors.PhysicallyBrokenInput}
                          errorMessage={
                            errors.PhysicallyBrokenInput?.message as string
                          }
                          disableField={!isEditMode}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Table */}
          <Grid width={"100%"} container flexDirection={"column"} pb={3}>
            <Grid pl={2} pr={2} pt={2.5}>
              <Typography
                fontWeight={500}
                variant="bodyMedium"
                sx={{ color: "#21262B" }}
              >
                Device Appointment Status
              </Typography>
            </Grid>
            <Grid width={"100%"} pl={2} pr={2} pt={2}>
              <TableContainer
                sx={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: "1px solid #E7E7E7",
                  borderRadius: "12px",
                }}
              >
                <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
                  <TableHead>
                    <TableRow>
                      {mockHeaders.map((header, index) => (
                        <TableCell
                          sx={{
                            ...heading,
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
                          <Grid
                            pr={4}
                            container
                            flexDirection={"column"}
                            alignContent={
                              header.header === "Status"
                                ? "flex-end"
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
                    {deviceInventoryOverviewList.length > 0 ? (
                      deviceInventoryOverviewList.map((list, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ ...heading }} align="left">
                            <Grid container flexDirection={"column"}>
                              <Grid container flexDirection={"column"}>
                                <Typography
                                  fontWeight={500}
                                  color="#21262B"
                                  variant="bodySmall"
                                >
                                  {list?.deviceStatus}
                                </Typography>
                              </Grid>
                            </Grid>
                          </TableCell>
                          <TableCell sx={{ ...heading }} align="left">
                            <Grid container flexDirection={"column"}>
                              <Link
                                underline="always"
                                sx={{
                                  color: "#106DCC",
                                  cursor: "pointer",
                                }}
                              >
                                <Typography
                                  fontWeight={500}
                                  color="#106DCC"
                                  variant="bodySmall"
                                >
                                  {list?.patient}
                                </Typography>
                              </Link>
                            </Grid>
                          </TableCell>
                          <TableCell sx={{ ...heading }} align="left">
                            <Grid container flexDirection={"column"}>
                              <Typography
                                sx={typographyCss}
                                variant="bodySmall"
                                color="#21262B"
                                fontWeight={400}
                              >
                                <Chip label={list?.action} variant="outlined" />
                              </Typography>
                            </Grid>
                          </TableCell>
                          <TableCell sx={{ ...heading }} align="left">
                            <Grid container flexDirection={"column"}>
                              <Typography
                                sx={typographyCss}
                                variant="bodySmall"
                                color="#21262B"
                                fontWeight={400}
                              >
                                {list?.resultingDeviceStatus}
                              </Typography>
                            </Grid>
                          </TableCell>
                        </TableRow>
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
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
export default DeviceInventoryOverview;
