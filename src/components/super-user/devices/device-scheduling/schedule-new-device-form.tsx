import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  IconButton,
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
import { Controller, FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Status from "../../../../common-components/status/status";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import CustomInput from "../../../../common-components/custom-input/custom-input";
import DatePicker from "@/common-components/date-picker-field/date-picker-field";
import scheduleNewDeviceList from "../../../../mock-data/schedule-new-device.json";
import { TableHeaders } from "@/common-components/table/table-models";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "@/common-components/table/common-table-widgets";
import { useDrawer } from "@/hooks/useDrawer";
import ShippingLabel from "./shipping-form";
import MainDrawer from "@/components/ui/MainDrawer";

export const scheduleNewDeviceFormSchema = yup.object().shape({
  appointmentType: yup.string(),
  devicePool: yup.string(),
  selectDevice: yup.string(),
  preferredDevice: yup.string(),
  beltNumber: yup.string(),
  deviceOut: yup.string(),
  studyFirstNight: yup.string(),
  returnDevice: yup.string(),
  receive: yup.string(),
});

interface ScheduleNewDeviceFormProps {
  onClose: () => void;
}

export const mockHeaders: TableHeaders[] = [
  { header: "Tracking Number" },
  { header: "Label Generation Date" },
  { header: "Shipping Label" },
];

const ScheduleNewDeviceForm = (props: ScheduleNewDeviceFormProps) => {
  const { open: openDrawer, content: contentDrawer } = useDrawer();

  const handleDrawer = {
    deviceShippingForm: (action: string) => {
      openDrawer({
        title: `${action} Patient`,
        identifier: "drawer-shipping-form",
      });
    },
  };

  const DrawerContent = () => {
    switch (contentDrawer.identifier) {
      case "drawer-shipping-form":
        return <ShippingLabel />;
      default:
        return <div />;
    }
  };

  const initialValues = {
    appointmentType: "",
    devicePool: "",
    selectDevice: "",
    preferredDevice: "",
    beltNumber: "",
    deviceOut: "",
    studyFirstNight: "",
    returnDevice: "",
    receive: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(scheduleNewDeviceFormSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
  };
  return (
    <>
      <MainDrawer
        content={<DrawerContent />}
        drawerWidth={"950px"}
        anchor="right"
        showMandatoryIndicator={true}
      />
      <form
        style={{ width: "100%", height: "100%", display: "flex" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Main Grid */}
        <Grid
          container
          flexDirection={"column"}
          alignContent={"center"}
          rowGap={1}
          width={"100%"}
          height={"100%"}
        >
          <Grid
            container
            width={"100%"}
            pt={2}
            pb={2}
            pl={8}
            pr={8}
            maxHeight={"84vh"}
            overflow={"auto"}
          >
            {/* Header Grid */}
            <Grid container justifyContent={"flex-start"} width={"100%"} m={2}>
              <Grid container columnGap={1.5} alignItems={"center"} pt={3}>
                <IconButton onClick={props.onClose}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography
                  fontWeight={700}
                  variant="bodyLarge"
                  color="#21262B"
                >
                  Schedule New Device
                </Typography>
                <Status bgColor="#E0EDFF" status={"NEW_ORDER"} width="100px" />
              </Grid>
            </Grid>

            <Grid
              container
              width={"100%"}
              flexDirection={"column"}
              rowGap={2}
              p={2}
            >
              {/* Form Grid */}
              <Grid
                container
                width={"100%"}
                bgcolor={"white"}
                rowGap={2}
                p={2}
                borderRadius={3.5}
              >
                <Typography variant="bodyMedium">
                  Appointment Details
                </Typography>
                <Grid container columnGap={2} width={"100%"}>
                  <Grid width={"20%"}>
                    <CustomLabel label="Appointment Type" />
                    <Controller
                      control={control}
                      name="appointmentType"
                      render={({ field }) => (
                        <CustomSelect
                          placeholder={"Select Appointment Type"}
                          enableDeselect
                          items={[{ value: "active", label: "Active" }]}
                          onChange={function (
                            e: SelectChangeEvent<string>,
                          ): void {
                            setValue("appointmentType", e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                          name={field.name}
                          value={field.value?.trim() || ""}
                        />
                      )}
                    ></Controller>
                  </Grid>
                  <Grid width={"20%"}>
                    <CustomLabel label="Device Pool" />
                    <Controller
                      control={control}
                      name="devicePool"
                      render={({ field }) => (
                        <CustomSelect
                          placeholder={"Select Device Pool"}
                          enableDeselect
                          items={[{ value: "active", label: "Active" }]}
                          onChange={function (
                            e: SelectChangeEvent<string>,
                          ): void {
                            setValue("devicePool", e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                          name={field.name}
                          value={field.value?.trim() || ""}
                        />
                      )}
                    ></Controller>
                  </Grid>
                </Grid>

                <Grid
                  container
                  width={"100%"}
                  bgcolor={"#F2F4FA"}
                  borderRadius={3.5}
                >
                  <Grid
                    container
                    columnGap={1}
                    p={2}
                    alignItems={"center"}
                    borderBottom={"1px solid #D1DAF5"}
                    width={"100%"}
                  >
                    <Typography variant="bodyMedium" fontWeight={"900px"}>
                      Device Details
                    </Typography>
                    <Typography
                      variant="bodySmall"
                      fontSize={"12px"}
                      color="#595F63"
                    >
                      (Referrer Prefers - AliceknightOne)
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    p={2}
                    width={"100%"}
                    columnGap={3}
                    justifyContent={"flex-start"}
                  >
                    <Grid width={"24%"}>
                      <CustomLabel label="Select Device" />
                      <Controller
                        control={control}
                        name="selectDevice"
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={"Select Device"}
                            enableDeselect
                            items={[{ value: "active", label: "Active" }]}
                            onChange={function (
                              e: SelectChangeEvent<string>,
                            ): void {
                              setValue("selectDevice", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                            name={field.name}
                            value={field.value?.trim() || ""}
                          />
                        )}
                      ></Controller>
                    </Grid>
                    <Grid width={"24%"}>
                      <CustomLabel label="Preferred Device" />
                      <Controller
                        control={control}
                        name="preferredDevice"
                        render={({ field }) => (
                          <CustomSelect
                            isDisabled={true}
                            placeholder={"AliceknightOne"}
                            enableDeselect
                            items={[{ value: "active", label: "Active" }]}
                            onChange={function (
                              e: SelectChangeEvent<string>,
                            ): void {
                              setValue("preferredDevice", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                            name={field.name}
                            value={field.value?.trim() || ""}
                          />
                        )}
                      ></Controller>
                    </Grid>
                    <Grid width={"24%"}>
                      <CustomLabel label="Belt Number" />
                      <Controller
                        control={control}
                        name="beltNumber"
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter Belt Number"}
                            name={field.name}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    p={2}
                    width={"100%"}
                    columnGap={0}
                    justifyContent={"space-between"}
                  >
                    <Grid width={"24%"}>
                      <CustomLabel label="Device Out" />
                      <Controller
                        control={control}
                        name={`deviceOut`}
                        render={({ field }) => (
                          <DatePicker
                            bgWhite={false}
                            {...field}
                            disableFuture
                            value={field.value}
                            onDateChange={function (
                              selectedDate: string,
                            ): void {
                              setValue(`deviceOut`, selectedDate, {
                                shouldValidate: true,
                              });
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"24%"}>
                      <CustomLabel label="Study First Night" />
                      <Controller
                        control={control}
                        name={`studyFirstNight`}
                        render={({ field }) => (
                          <DatePicker
                            bgWhite={false}
                            {...field}
                            disableFuture
                            value={field.value}
                            onDateChange={function (
                              selectedDate: string,
                            ): void {
                              setValue(`studyFirstNight`, selectedDate, {
                                shouldValidate: true,
                              });
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"24%"}>
                      <CustomLabel label="Return Device" />
                      <Controller
                        control={control}
                        name={`returnDevice`}
                        render={({ field }) => (
                          <DatePicker
                            bgWhite={false}
                            {...field}
                            disableFuture
                            value={field.value}
                            onDateChange={function (
                              selectedDate: string,
                            ): void {
                              setValue(`returnDevice`, selectedDate, {
                                shouldValidate: true,
                              });
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"24%"}>
                      <CustomLabel label="Receive" />
                      <Controller
                        control={control}
                        name={`receive`}
                        render={({ field }) => (
                          <DatePicker
                            bgWhite={false}
                            {...field}
                            disableFuture
                            value={field.value}
                            onDateChange={function (
                              selectedDate: string,
                            ): void {
                              setValue(`receive`, selectedDate, {
                                shouldValidate: true,
                              });
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* FedX Grid */}
              <Grid
                container
                overflow={"auto"}
                width={"100%"}
                bgcolor={"white"}
                rowGap={2}
                p={2}
                borderRadius={3.5}
                flexDirection={"column"}
              >
                <Grid
                  container
                  justifyContent={"space-between"}
                  width={"100%"}
                  borderBottom={"1px solid #E7E7E7"}
                  p={2}
                >
                  <Grid>
                    <Typography variant="bodyMedium">FedEX Label</Typography>
                  </Grid>
                  <Grid container columnGap={2} alignItems={"center"}>
                    <Typography variant="bodySmall">Generate :</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleDrawer.deviceShippingForm(
                          "Generate Shipping Label - To",
                        );
                      }}
                      sx={{ mr: 1, borderColor: "#C9CBCC", color: "black" }}
                    >
                      Shipping label To Patient
                    </Button>
                    <Button
                      variant="outlined"
                      type="submit"
                      onClick={() => {
                        handleDrawer.deviceShippingForm(
                          "Generate Shipping Label - From",
                        );
                      }}
                      sx={{ mr: 1 }}
                    >
                      Shipping label From Patient
                    </Button>
                  </Grid>
                </Grid>
                <Typography
                  variant="bodySmall"
                  fontWeight={"bold"}
                  color="#373D41"
                  pl={2}
                >
                  Generated Labels
                </Typography>
                <Grid width={"100%"}>
                  <TableContainer
                    sx={{
                      maxHeight: "25vh",
                      overflowY: "auto",
                      width: "100%",
                    }}
                  >
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      sx={tableCellCss}
                    >
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
                                  header.header === "Shipping Label"
                                    ? "flex=start"
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
                        {scheduleNewDeviceList.length > 0 ? (
                          scheduleNewDeviceList.map((list, index) => (
                            <TableRow hover key={index}>
                              <TableCell>
                                <Grid container flexDirection={"column"}>
                                  <Grid container flexDirection={"column"}>
                                    <Typography
                                      sx={typographyCss}
                                      variant="bodySmall"
                                    >
                                      {list?.["tracking Number"]}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </TableCell>
                              <TableCell>
                                <Grid container flexDirection={"column"}>
                                  <Typography
                                    sx={typographyCss}
                                    variant="bodySmall"
                                  >
                                    {list?.labelGenerationDate}
                                  </Typography>
                                </Grid>
                              </TableCell>
                              <TableCell>
                                <Grid container flexDirection={"column"}>
                                  <Typography
                                    sx={typographyCss}
                                    variant="bodySmall"
                                  >
                                    {list?.shippingLabel}
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
          </Grid>
          {/* Button Grid */}
          <Grid
            container
            flex={1}
            alignContent={"flex-end"}
            width={"100%"}
            position={"sticky"}
            bottom={0}
            zIndex={1}
          >
            <Grid textAlign={"end"} width={"100%"} p={2} bgcolor={"white"}>
              <Button
                variant="contained"
                type="submit"
                onClick={() => {}}
                sx={{ mr: 1 }}
                disabled
              >
                Schedule Device
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default ScheduleNewDeviceForm;
