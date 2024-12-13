import { Grid } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  IconButton,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomInput from "../../../../common-components/custom-input/custom-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FieldValues, useForm } from "react-hook-form";

interface AddDeviceProps {
  onClose: () => void;
}

export const addDeviceInventorySchema = yup.object().shape({
  deviceType: yup.string().required("Device type required"),
  pool: yup.string().required("Pool required"),
  serialNo: yup.string().required("Serial Number is required"),
  note: yup.string().required("Note is required"),
});

const AddDeviceInventory = (props: AddDeviceProps) => {
  const initialValues = {
    deviceType: "",
    pool: "",
    serialNo: "",
    note: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(addDeviceInventorySchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "100%" }}
    >
      <Grid
        container
        flexDirection={"column"}
        alignContent={"center"}
        pt={5}
        rowGap={2.5}
        m={2}
      >
        <Grid container justifyContent={"space-between"} width={"934px"}>
          <Grid container columnGap={1.5} alignItems={"center"}>
            <IconButton onClick={props.onClose}>
              <ArrowBackIcon />
            </IconButton>
            <Typography fontWeight={700} variant="bodyLarge" color="#21262B">
              Add New Device
            </Typography>
          </Grid>
          <Grid container columnGap={2}>
            <Button
              variant="outlined"
              onClick={() => {}}
              sx={{ mr: 1, borderColor: "#C9CBCC", color: "black" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {}}
              sx={{ mr: 1, background: "#106DCC" }}
            >
              Save Device
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          p={3}
          sx={{ background: "white", borderRadius: "10px" }}
          flexDirection={"column"}
          rowGap={2}
          width={"934px"}
        >
          <Grid container justifyContent={"space-between"} columnGap={1}>
            <Grid width={"290px"}>
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
                    onChange={function (e: SelectChangeEvent<string>): void {
                      setValue("deviceType", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    name={field.name}
                    value={field.value}
                  />
                )}
              ></Controller>
            </Grid>
            <Grid width={"290px"}>
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
                  />
                )}
              />
            </Grid>
            <Grid width={"290px"}>
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
                    onChange={function (e: SelectChangeEvent<string>): void {
                      setValue("pool", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    name={field.name}
                    value={field.value}
                  />
                )}
              ></Controller>
            </Grid>
          </Grid>
          <Grid container>
            <CustomLabel label="Notes" />
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <CustomInput
                  placeholder={"Write a note"}
                  hasError={!!errors.note}
                  errorMessage={errors.note?.message as string}
                  onChange={() => {}}
                  onDebounceCall={() => {}}
                  onInputEmpty={() => {}}
                  name={field.name}
                  value={field.value}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default AddDeviceInventory;
