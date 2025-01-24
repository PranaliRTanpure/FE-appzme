import { CustomUploadImage } from "@/common-components/custom-image-upload/UploadImage";
import DrawerBody from "@/components/ui/DrawerBody";
import { theme } from "@/utils/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useRef } from "react";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { addStaffFormSchema } from "./settings-form-schema";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomSelect from "@/common-components/custom-select/customSelect";
import CustomInputWithPrefix from "@/common-components/custom-input-with-prefix/custom-input-with-prefix";
import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import { stateList } from "@/utils/StateList";

interface AddStaffFormProps {
  handleDrawerClose: () => void;
}

const AddStaffForm = (props: AddStaffFormProps) => {
  const { handleDrawerClose } = props;
  const footerRef = useRef<HTMLDivElement>();

  const initialValues = {
    organization: "",
    email: "",
    phone: "",
    alternatePhone: "",
    role: "",
    avatar: "",
    firstName: "",
    lastName: "",
    middleInitial: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
    },
  };

  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(addStaffFormSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = method;

  const onSubmit = (data: FieldValues) => {
    data;
    handleDrawerClose;
  };
  return (
    <DrawerBody padding={3} offset={footerRef?.current?.offsetHeight}>
      <Grid width={"100%"} height={"100%"}>
        <FormProvider {...method}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ height: "100%", width: "100%" }}
          >
            <Grid
              container
              width={"100%"}
              height={"100%"}
              flexDirection={"column"}
            >
              {/* Form */}
              <Grid
                container
                width={"100%"}
                flexDirection={"column"}
                rowGap={3}
              >
                {/* Profile Information Grid */}
                <Grid
                  container
                  width={"100%"}
                  flexBasis={"column"}
                  rowGap={1.5}
                  border={0}
                >
                  <Typography fontWeight={600} variant="bodySmall">
                    Profile Information
                  </Typography>
                  <Grid container width={"100%"}>
                    <Grid width={"13%"} border={"0px solid red"}>
                      <Grid width={"95%"} p={1}>
                        <CustomUploadImage
                          name="avatar"
                          defaultImage={""}
                          isLoading={false}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      width={"87%"}
                      flexDirection={"column"}
                      rowGap={2}
                      border={"0px solid red"}
                    >
                      <Grid
                        container
                        width={"100%"}
                        justifyContent={"space-between"}
                      >
                        <Grid width={"25%"}>
                          <CustomLabel label="First Name" isRequired />
                          <Controller
                            control={control}
                            name="firstName"
                            render={({ field }) => (
                              <CustomInput
                                placeholder={"Enter First Name"}
                                hasError={!!errors.firstName}
                                errorMessage={
                                  errors.firstName?.message as string
                                }
                                name={field.name}
                                value={field.value.trim() || ""}
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"12%"}>
                          <CustomLabel label="Middle Initial" />
                          <Controller
                            control={control}
                            name="middleInitial"
                            render={({ field }) => (
                              <CustomInput
                                placeholder={"Enter"}
                                name={field.name}
                                value={field.value || ""}
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"25%"}>
                          <CustomLabel label="Last Name" isRequired />
                          <Controller
                            control={control}
                            name="lastName"
                            render={({ field }) => (
                              <CustomInput
                                placeholder={"Enter Last Name"}
                                hasError={!!errors.lastName}
                                errorMessage={
                                  errors.lastName?.message as string
                                }
                                name={field.name}
                                value={field.value.trim() || ""}
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"35%"}>
                          <CustomLabel label="Organization" />
                          <Controller
                            control={control}
                            name="organization"
                            render={({ field }) => (
                              <CustomSelect
                                placeholder={"Select"}
                                enableDeselect
                                items={[{ value: "active", label: "Active" }]}
                                onChange={function (
                                  e: SelectChangeEvent<string>,
                                ): void {
                                  setValue("organization", e.target.value, {
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
                        justifyContent={"space-between"}
                      >
                        <Grid width={"24%"}>
                          <CustomLabel label="Role" />
                          <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                              <CustomSelect
                                placeholder={"Select"}
                                enableDeselect
                                items={[{ value: "active", label: "Active" }]}
                                onChange={function (
                                  e: SelectChangeEvent<string>,
                                ): void {
                                  setValue("role", e.target.value, {
                                    shouldValidate: true,
                                  });
                                }}
                                name={field.name}
                                value={field.value?.trim() || ""}
                              />
                            )}
                          ></Controller>
                        </Grid>
                        <Grid width={"26%"}>
                          <CustomLabel label="Email" isRequired />
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
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"23%"}>
                          <CustomLabel label="Phone" />
                          <Controller
                            control={control}
                            name="phone"
                            render={({ field }) => (
                              <CustomInputWithPrefix
                                {...field}
                                onChange={(e) =>
                                  setValue("phone", e.target.value)
                                }
                                prefix={`+1`}
                                value={field.value || ""}
                                placeholder={"Enter Phone"}
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"23%"}>
                          <CustomLabel label="Cell Phone" />
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
                                value={field.value || ""}
                                placeholder={"Enter Alt. Phone"}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Address Grid */}
                <Grid
                  container
                  width={"100%"}
                  flexDirection={"column"}
                  rowGap={1.5}
                  border={0}
                >
                  <Typography fontWeight={600} variant="bodySmall">
                    Address Information
                  </Typography>
                  <Grid
                    container
                    columnGap={0}
                    justifyContent={"space-between"}
                  >
                    <Grid width={"19.8%"}>
                      <CustomLabel label="Address Line 1" />
                      <Controller
                        control={control}
                        name="address.line1"
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            value={field.value || ""}
                            placeholder={"Enter Address Line 1"}
                            hasError={!!errors?.address?.line1}
                            errorMessage={
                              errors.address?.line1?.message as string
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"19.8%"}>
                      <CustomLabel label="Address Line 2" />
                      <Controller
                        control={control}
                        name="address.line2"
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            value={field.value || ""}
                            placeholder={"Enter Address Line 2"}
                            hasError={!!errors.address?.line2}
                            errorMessage={
                              errors.address?.line2?.message as string
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"19.8%"}>
                      <CustomLabel label="City" />
                      <Controller
                        control={control}
                        name="address.city"
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            value={field.value || ""}
                            placeholder={"Enter City"}
                            hasError={!!errors.address?.city}
                            errorMessage={
                              errors.address?.city?.message as string
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"19.8%"}>
                      <CustomLabel label="State" />
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
                            hasError={!!errors.address?.state}
                            errorMessage={
                              errors.address?.state?.message as string
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"19.8%"}>
                      <CustomLabel label="Zip Code" />
                      <Controller
                        control={control}
                        name="address.zipcode"
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            value={field.value || ""}
                            placeholder={"Enter Zip Code"}
                            hasError={!!errors.address?.zipcode}
                            errorMessage={
                              errors.address?.zipcode?.message as string
                            }
                          />
                        )}
                      />
                    </Grid>
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
                <Grid container justifyContent={"flex-end"}>
                  <Grid container columnGap={1}>
                    <Button
                      onClick={handleDrawerClose}
                      variant="outlined"
                      type="button"
                    >
                      <Typography variant="bodySmall">Cancel</Typography>
                    </Button>
                    <Button variant="contained" type="submit">
                      <Typography variant="bodySmall">{"Save User"}</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </DrawerBody>
  );
};
export default AddStaffForm;
