import CustomButton from "@/common-components/button-outlined/custom-button";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Button,
  Divider,
  IconButton,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useRef } from "react";
import {
  Controller,
  FieldValues,
  useFieldArray,
  useForm,
} from "react-hook-form";
import CustomAutoComplete from "../../../../common-components/custom-auto-complete/custom-auto-complete";
import CustomInputWithPrefix from "../../../../common-components/custom-input-with-prefix/custom-input-with-prefix";
import CustomInput from "../../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import DrawerBody from "../../../../components/ui/DrawerBody";
import { stateList } from "../../../../utils/StateList";
import { theme } from "../../../../utils/theme";
import { manufacturerFormSchema } from "./device-manufacturers-schema";

interface DeviceManufacturersFormProps {
  handleDrawerClose: () => void;
  isEdit: boolean;
}

const DeviceManufacturersForm = (props: DeviceManufacturersFormProps) => {
  const { handleDrawerClose, isEdit } = props;
  const footerRef = useRef<HTMLDivElement>();

  const initialValues = {
    company: "",
    contact: "",
    email: "",
    phone: "",
    alternatePhone: "",
    fax: "",
    office: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
    },
    modleDetails: [
      {
        modelName: "",
        modelType: "",
      },
    ],
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(manufacturerFormSchema),
  });

  const {
    fields: modleDetailsArray,
    append: appendmodleDetails,
    remove: removemodleDetails,
  } = useFieldArray({ name: "modleDetails", control });

  const onSubmit = (data: FieldValues) => {
    data;
    props.handleDrawerClose;
  };
  return (
    <DrawerBody padding={3} offset={footerRef?.current?.offsetHeight}>
      <Grid container width={"100%"} height={"100%"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Main Grid */}
          <Grid
            container
            width={"100%"}
            height={"100%"}
            flexDirection={"column"}
          >
            <Grid
              container
              width={"100%"}
              sx={{ overflowY: "auto" }}
              mt={2}
              rowGap={3}
            >
              {/* Form */}
              <Grid
                container
                width={"100%"}
                flexDirection={"column"}
                rowGap={3}
              >
                <Grid container width={"100%"} justifyContent={"space-between"}>
                  <Grid width={"32%"}>
                    <CustomLabel label="Company" isRequired />
                    <Controller
                      control={control}
                      name="company"
                      render={({ field }) => (
                        <CustomInput
                          placeholder={"Enter Company"}
                          hasError={!!errors.company}
                          errorMessage={errors.company?.message as string}
                          name={field.name}
                          value={field.value.trim() || ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid width={"32%"}>
                    <CustomLabel label="Contact" isRequired />
                    <Controller
                      control={control}
                      name="contact"
                      render={({ field }) => (
                        <CustomInput
                          placeholder={"Enter Contact"}
                          hasError={!!errors.contact}
                          errorMessage={errors.contact?.message as string}
                          name={field.name}
                          value={field.value.trim() || ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid width={"32%"}>
                    <CustomLabel label="Email" />
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value.trim() || ""}
                          placeholder={"Enter Email"}
                          hasError={!!errors.email}
                          errorMessage={errors.email?.message as string}
                          name={field.name}
                          onChange={(e) => setValue("email", e.target.value)}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid container width={"100%"} justifyContent={"space-between"}>
                  <Grid width={"32%"}>
                    <CustomLabel label="Phone" />
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <CustomInputWithPrefix
                          {...field}
                          onChange={(e) => setValue("phone", e.target.value)}
                          prefix={`+1`}
                          value={field.value.trim() || ""}
                          placeholder={"Enter Phone"}
                          hasError={!!errors.phone}
                          errorMessage={errors.phone?.message as string}
                        />
                      )}
                    />
                  </Grid>
                  <Grid width={"32%"}>
                    <CustomLabel label="Alternate Phone" />
                    <Controller
                      control={control}
                      name="alternatePhone"
                      render={({ field }) => (
                        <CustomInputWithPrefix
                          {...field}
                          onChange={(e) =>
                            setValue("alternatePhone", e.target.value)
                          }
                          prefix={`+1`}
                          value={field.value.trim() || ""}
                          placeholder={"Enter Alt. Phone"}
                          hasError={!!errors.alternatePhone}
                          errorMessage={
                            errors.alternatePhone?.message as string
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid width={"32%"}>
                    <CustomLabel label="Fax" />
                    <Controller
                      control={control}
                      name="fax"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Enter Fax"}
                          name={field.name}
                          onChange={(e) => setValue("fax", e.target.value)}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid container width={"100%"} justifyContent={"space-between"}>
                  <Grid width={"32%"}>
                    <CustomLabel label="Office" />
                    <Controller
                      control={control}
                      name="office"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Enter Office Name"}
                          name={field.name}
                          hasError={!!errors.office}
                          errorMessage={errors.office?.message as string}
                        />
                      )}
                    />
                  </Grid>
                  <Grid width={"32%"}>
                    <CustomLabel label="Address Line 1" isRequired />
                    <Controller
                      control={control}
                      name="address.line1"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={field.value.trim() || ""}
                          placeholder={"Enter Address Line 1"}
                          hasError={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            !!(errors?.address as unknown as any).line1
                          }
                          errorMessage={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (errors?.address as unknown as any).line1.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid width={"32%"}>
                    <CustomLabel label="Address Line 2" />
                    <Controller
                      control={control}
                      name="address.line2"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={field.value || ""}
                          placeholder={"Enter Address Line 2"}
                          hasError={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            !!(errors?.address as unknown as any).line2
                          }
                          errorMessage={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (errors?.address as unknown as any).line2?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container width={"100%"} justifyContent={"space-between"}>
                  <Grid width={"32%"}>
                    <CustomLabel label="City" isRequired />
                    <Controller
                      control={control}
                      name="address.city"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={field.value || ""}
                          placeholder={"Enter City"}
                          hasError={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            !!(errors?.address as unknown as any).city
                          }
                          errorMessage={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (errors?.address as unknown as any).city.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid width={"32%"}>
                    <CustomLabel isRequired label="State" />
                    <Controller
                      control={control}
                      name="address.state"
                      render={({ field }) => (
                        <CustomAutoComplete
                          {...field}
                          placeholder={"Search the state"}
                          options={stateList}
                          maxHeightForOptionsList={300}
                          value={field.value || ""}
                          hasError={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            !!(errors?.address as unknown as any).state
                          }
                          errorMessage={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (errors?.address as unknown as any).state.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid width={"32%"}>
                    <CustomLabel label="Zip Code" isRequired />
                    <Controller
                      control={control}
                      name="address.zipcode"
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          value={field.value || ""}
                          placeholder={"Enter Zip Code"}
                          hasError={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            !!(errors?.address as unknown as any).zipcode
                          }
                          errorMessage={
                            errors?.address &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (errors?.address as unknown as any).zipcode.message
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Model Details */}
              <Grid
                container
                width={"100%"}
                sx={{ background: "#F2F4FA" }}
                rowGap={1.5}
                p={1.5}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Typography fontWeight={"900px"} variant="bodyMedium">
                  Model Details
                </Typography>
                {modleDetailsArray.map((model, index) => (
                  <Grid
                    container
                    key={model.modelName}
                    justifyContent={"space-between"}
                  >
                    <Grid width={"44%"}>
                      <CustomLabel label="Name" />
                      <Controller
                        control={control}
                        name={`modleDetails.${index}.modelName`}
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter Name"}
                            name={field.name}
                            onChange={(e) => {
                              setValue(
                                `modleDetails.${index}.modelName`,
                                e.target.value,
                                { shouldTouch: true },
                              );
                            }}
                            bgWhite
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"44%"}>
                      <CustomLabel label="Type" />
                      <Controller
                        control={control}
                        name={`modleDetails.${index}.modelType`}
                        render={({ field }) => (
                          <CustomSelect
                            placeholder={"Select"}
                            name={setValue.name}
                            onChange={function (
                              e: SelectChangeEvent<string>,
                            ): void {
                              setValue(
                                `modleDetails.${index}.modelType`,
                                e.target.value,
                                {
                                  shouldValidate: true,
                                },
                              );
                            }}
                            value={field.value || ""}
                            bgWhite={true}
                            items={[{ value: "active", label: "Active" }]}
                          />
                        )}
                      />
                    </Grid>
                    <Grid>
                      <Divider orientation="vertical" variant="middle" />
                    </Grid>
                    <Grid
                      container
                      sx={{
                        border: "1px solid #C9CBCC",
                        background: "white",
                        borderRadius: "12px",
                        height: "38px",
                        width: "38px",
                      }}
                      justifyContent={"center"}
                      mt={4}
                    >
                      <IconButton
                        sx={{ pt: "3px" }}
                        onClick={() => removemodleDetails(index)}
                        disabled={modleDetailsArray.length <= 1}
                      >
                        <DeleteOutlineOutlinedIcon sx={{ color: "black" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid mt={1}>
                  <CustomButton
                    variant={"outlined"}
                    text={"Add New Model"}
                    startIcon={<AddIcon />}
                    onClick={() =>
                      appendmodleDetails({
                        modelType: "",
                        modelName: "",
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box
              ref={footerRef}
              sx={{
                width: "100%",
                backgroundColor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`,
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "20px 24px",
              }}
            >
              <Grid
                container
                justifyContent={isEdit ? "space-between" : "flex-end"}
              >
                {isEdit && (
                  <Grid container alignItems="center" columnGap={1}>
                    <ArchiveOutlinedIcon />
                    <Typography variant="bodySmall">
                      Archive Manufacturer
                    </Typography>
                  </Grid>
                )}
                <Grid container columnGap={1}>
                  <Button
                    // startIcon={isEdit ? <> </> : <DoneOutlinedIcon />}
                    onClick={handleDrawerClose}
                    variant="outlined"
                    type="button"
                  >
                    <Typography variant="bodySmall">Cancel</Typography>
                  </Button>
                  <Button
                    onClick={handleDrawerClose}
                    variant="contained"
                    type="submit"
                  >
                    <Typography variant="bodySmall">
                      {isEdit ? "Save Changes" : "Create Manufacturers"}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </form>
      </Grid>
    </DrawerBody>
  );
};
export default DeviceManufacturersForm;
