import React, { useCallback, useState } from "react";
import { Box, Grid } from "@mui/system";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { addProviderFormSchema } from "./settings-form-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import DrawerBody from "@/components/ui/DrawerBody";
import { theme } from "@/utils/theme";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { CustomUploadImage } from "@/common-components/custom-image-upload/UploadImage";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomSelect from "@/common-components/custom-select/customSelect";
import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import { stateList } from "@/utils/StateList";
import CustomCheckBox, {
  CheckedArray,
} from "@/common-components/custom-checkbox/custom-checkbox";

interface AddProviderFormProps {
  handleDrawerClose: () => void;
}

const ProviderForm = (props: AddProviderFormProps) => {
  const [height, setHeight] = useState(0);

  const footerRef = useCallback(
    (
      node: {
        getBoundingClientRect: () => {
          height: React.SetStateAction<number>;
        };
      } | null,
    ) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [],
  );

  const handleSelectionFollowUp = (updatedArray: CheckedArray[]) => {
    updatedArray;
  };

  const initialValues = {
    organization: "",
    email: "",
    phone: "",
    alternatePhone: "",
    fax: "",
    avatar: "",
    firstName: "",
    lastName: "",
    middleInitial: "",
    npi: "",
    speciality: "",
    providerType: "",
    supervisingProvider: "",
    clinicLocation: "",
    suffix: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
    },
    defaultDentalProvider: "",
    preferredDme: "",
    defaultPreferredLab: "",
    preferredHstDevice: "",
  };

  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(addProviderFormSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = method;

  const onSubmit = (data: FieldValues) => {
    data;
    props.handleDrawerClose();
  };

  return (
    <DrawerBody padding={3} offset={height}>
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
                rowGap={2}
                border={0}
                pb={1.5}
              >
                {/* Profile Information */}
                <Grid
                  container
                  width={"100%"}
                  flexDirection={"column"}
                  rowGap={1.5}
                >
                  <Typography fontWeight={600} variant="bodySmall">
                    Profile Information
                  </Typography>
                  <Grid container width={"100%"}>
                    <Grid width={"11%"}>
                      <Grid width={"96%"} p={1}>
                        <CustomUploadImage
                          name="avatar"
                          defaultImage={""}
                          isLoading={false}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      width={"89%"}
                      flexDirection={"column"}
                      rowGap={2}
                    >
                      <Grid container width={"100%"} columnGap={1}>
                        <Grid width={"20%"}>
                          <CustomLabel label="First Name" isRequired />
                          <Controller
                            control={control}
                            name="firstName"
                            render={({ field }) => (
                              <CustomInput
                                value={field.value?.trim() || ""}
                                placeholder={"Enter First Name"}
                                hasError={!!errors.firstName}
                                errorMessage={
                                  errors.firstName?.message as string
                                }
                                name={field.name}
                                onChange={(e) =>
                                  setValue("firstName", e.target.value, {
                                    shouldValidate: true,
                                  })
                                }
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
                                value={field.value?.trim() || ""}
                                placeholder={"Enter"}
                                name={field.name}
                                onChange={(e) =>
                                  setValue("middleInitial", e.target.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"20%"}>
                          <CustomLabel label="Last Name" isRequired />
                          <Controller
                            control={control}
                            name="lastName"
                            render={({ field }) => (
                              <CustomInput
                                value={field.value?.trim() || ""}
                                name={field.name}
                                placeholder={"Enter Last Name"}
                                hasError={!!errors.lastName}
                                errorMessage={
                                  errors.lastName?.message as string
                                }
                                onChange={(e) =>
                                  setValue("lastName", e.target.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"12%"}>
                          <CustomLabel label="Suffix" isRequired />
                          <Controller
                            control={control}
                            name="suffix"
                            render={({ field }) => (
                              <CustomInput
                                value={field.value?.trim() || ""}
                                placeholder={"Enter"}
                                name={field.name}
                                hasError={!!errors.suffix}
                                errorMessage={errors.suffix?.message as string}
                                onChange={(e) =>
                                  setValue("suffix", e.target.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"12%"}>
                          <CustomLabel label="Organization" isRequired />
                          <Controller
                            control={control}
                            name="organization"
                            render={({ field }) => (
                              <CustomSelect
                                value={field.value?.trim() || ""}
                                placeholder={"Select"}
                                enableDeselect
                                items={[{ value: "active", label: "Active" }]}
                                hasError={!!errors.organization}
                                errorMessage={
                                  errors.organization?.message as string
                                }
                                onChange={function (
                                  e: SelectChangeEvent<string>,
                                ): void {
                                  setValue("organization", e.target.value, {
                                    shouldValidate: true,
                                  });
                                }}
                                name={field.name}
                              />
                            )}
                          ></Controller>
                        </Grid>
                        <Grid width={"20%"}>
                          <CustomLabel label="Clinic Location" isRequired />
                          <Controller
                            control={control}
                            name="clinicLocation"
                            render={({ field }) => (
                              <CustomSelect
                                value={field.value?.trim() || ""}
                                placeholder={"Select"}
                                enableDeselect
                                items={[{ value: "active", label: "Active" }]}
                                hasError={!!errors.clinicLocation}
                                errorMessage={
                                  errors.clinicLocation?.message as string
                                }
                                onChange={function (
                                  e: SelectChangeEvent<string>,
                                ): void {
                                  setValue("clinicLocation", e.target.value, {
                                    shouldValidate: true,
                                  });
                                }}
                                name={field.name}
                              />
                            )}
                          ></Controller>
                        </Grid>
                      </Grid>
                      <Grid container width={"100%"} columnGap={1.65}>
                        <Grid width={"24%"}>
                          <CustomLabel label="Provider Type" isRequired />
                          <Controller
                            control={control}
                            name="providerType"
                            render={({ field }) => (
                              <CustomSelect
                                value={field.value?.trim() || ""}
                                placeholder={"Select"}
                                enableDeselect
                                items={[{ value: "active", label: "Active" }]}
                                hasError={!!errors.providerType}
                                errorMessage={
                                  errors.providerType?.message as string
                                }
                                onChange={function (
                                  e: SelectChangeEvent<string>,
                                ): void {
                                  setValue("providerType", e.target.value, {
                                    shouldValidate: true,
                                  });
                                }}
                                name={field.name}
                              />
                            )}
                          ></Controller>
                        </Grid>
                        <Grid width={"24%"}>
                          <CustomLabel label="Supervising Provider" />
                          <Controller
                            control={control}
                            name="supervisingProvider"
                            render={({ field }) => (
                              <CustomSelect
                                value={field.value?.trim() || ""}
                                placeholder={"Select Provider"}
                                enableDeselect
                                items={[{ value: "active", label: "Active" }]}
                                onChange={function (
                                  e: SelectChangeEvent<string>,
                                ): void {
                                  setValue(
                                    "supervisingProvider",
                                    e.target.value,
                                    {
                                      shouldValidate: true,
                                    },
                                  );
                                }}
                                name={field.name}
                              />
                            )}
                          ></Controller>
                        </Grid>
                        <Grid width={"24%"}>
                          <CustomLabel label="Email" isRequired />
                          <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                              <CustomInput
                                value={field.value?.trim() || ""}
                                placeholder={"Enter Email"}
                                hasError={!!errors.email}
                                errorMessage={errors.email?.message as string}
                                name={field.name}
                                onChange={(e) =>
                                  setValue("email", e.target.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"24%"}>
                          <CustomLabel label="NPI" isRequired />
                          <Controller
                            control={control}
                            name="npi"
                            render={({ field }) => (
                              <CustomInput
                                value={field.value?.trim() || ""}
                                placeholder={"Enter NPI"}
                                hasError={!!errors.npi}
                                errorMessage={errors.npi?.message as string}
                                name={field.name}
                                onChange={(e) =>
                                  setValue("npi", e.target.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid container width={"100%"} columnGap={1.65}>
                        <Grid width={"24%"}>
                          <CustomLabel label="Specialty" />
                          <Controller
                            control={control}
                            name="speciality"
                            render={({ field }) => (
                              <CustomSelect
                                value={field.value?.trim() || ""}
                                placeholder={"Select Specciality"}
                                enableDeselect
                                items={[{ value: "active", label: "Active" }]}
                                onChange={function (
                                  e: SelectChangeEvent<string>,
                                ): void {
                                  setValue("speciality", e.target.value, {
                                    shouldValidate: true,
                                  });
                                }}
                                name={field.name}
                              />
                            )}
                          ></Controller>
                        </Grid>
                        <Grid width={"24%"}>
                          <CustomLabel label="Fax" />
                          <Controller
                            control={control}
                            name="fax"
                            render={({ field }) => (
                              <CustomInput
                                value={field.value?.trim() || ""}
                                placeholder={"Enter Fax"}
                                name={field.name}
                                onChange={(e) =>
                                  setValue("fax", e.target.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"24%"}>
                          <CustomLabel label="Phone" isRequired />
                          <Controller
                            control={control}
                            name="phone"
                            render={({ field }) => (
                              <CustomInput
                                value={field.value?.trim() || ""}
                                placeholder={"Enter Phone"}
                                hasError={!!errors.phone}
                                errorMessage={errors.phone?.message as string}
                                name={field.name}
                                onChange={(e) =>
                                  setValue("phone", e.target.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid width={"24%"}>
                          <CustomLabel label="Alt. Phone" />
                          <Controller
                            control={control}
                            name="alternatePhone"
                            render={({ field }) => (
                              <CustomInput
                                value={field.value?.trim() || ""}
                                placeholder={"Enter Alt. Phone"}
                                name={field.name}
                                onChange={(e) =>
                                  setValue("alternatePhone", e.target.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Address Information */}
                <Grid
                  container
                  width={"100%"}
                  flexDirection={"column"}
                  rowGap={1.5}
                >
                  <Typography fontWeight={600} variant="bodySmall">
                    Address Information
                  </Typography>
                  <Grid container justifyContent={"space-between"}>
                    <Grid width={"19.2%"}>
                      <CustomLabel label="Address Line 1" isRequired />
                      <Controller
                        control={control}
                        name="address.line1"
                        render={({ field }) => (
                          <CustomInput
                            name={field.name}
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
                    <Grid width={"19.2%"}>
                      <CustomLabel label="Address Line 2" />
                      <Controller
                        control={control}
                        name="address.line2"
                        render={({ field }) => (
                          <CustomInput
                            name={field.name}
                            value={field.value || ""}
                            placeholder={"Enter Address Line 2"}
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"19.2%"}>
                      <CustomLabel label="City" isRequired />
                      <Controller
                        control={control}
                        name="address.city"
                        render={({ field }) => (
                          <CustomInput
                            name={field.name}
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
                    <Grid width={"19.2%"}>
                      <CustomLabel label="State" isRequired />
                      <Controller
                        control={control}
                        name="address.state"
                        render={({ field }) => (
                          <CustomAutoComplete
                            name={field.name}
                            placeholder={"Search the state"}
                            options={stateList}
                            maxHeightForOptionsList={300}
                            value={field.value || ""}
                            hasError={!!errors.address?.state}
                            errorMessage={
                              errors.address?.state?.message as string
                            }
                            onChange={(selectedValue: string | "") =>
                              field.onChange(selectedValue)
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid width={"19.2%"}>
                      <CustomLabel label="Zip Code" isRequired />
                      <Controller
                        control={control}
                        name="address.zipcode"
                        render={({ field }) => (
                          <CustomInput
                            name={field.name}
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
                {/* Preferred Provider Details */}
                <Grid
                  container
                  width={"100%"}
                  flexDirection={"column"}
                  rowGap={1.5}
                >
                  <Typography fontWeight={600} variant="bodySmall">
                    Preferred Provider Details
                  </Typography>
                  <Grid
                    container
                    width={"100%"}
                    justifyContent={"space-between"}
                  >
                    <Grid width={"19.2%"}>
                      <CustomLabel label="Default Dental Provider" />
                      <Controller
                        control={control}
                        name="defaultDentalProvider"
                        render={({ field }) => (
                          <CustomSelect
                            value={field.value?.trim() || ""}
                            placeholder={"Select Dental Provider"}
                            enableDeselect
                            items={[{ value: "active", label: "Active" }]}
                            onChange={function (
                              e: SelectChangeEvent<string>,
                            ): void {
                              setValue(
                                "defaultDentalProvider",
                                e.target.value,
                                {
                                  shouldValidate: true,
                                },
                              );
                            }}
                            name={field.name}
                          />
                        )}
                      ></Controller>
                    </Grid>
                    <Grid width={"19.2%"}>
                      <CustomLabel label="Preferred DME" />
                      <Controller
                        control={control}
                        name="preferredDme"
                        render={({ field }) => (
                          <CustomSelect
                            value={field.value?.trim() || ""}
                            placeholder={"Select Preferred DME"}
                            enableDeselect
                            items={[{ value: "active", label: "Active" }]}
                            onChange={function (
                              e: SelectChangeEvent<string>,
                            ): void {
                              setValue("preferredDme", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                            name={field.name}
                          />
                        )}
                      ></Controller>
                    </Grid>
                    <Grid width={"19.2%"}>
                      <CustomLabel label="Default Preferred Lab" />
                      <Controller
                        control={control}
                        name="defaultPreferredLab"
                        render={({ field }) => (
                          <CustomSelect
                            value={field.value?.trim() || ""}
                            placeholder={"Select Preferred Lab"}
                            enableDeselect
                            items={[{ value: "active", label: "Active" }]}
                            onChange={function (
                              e: SelectChangeEvent<string>,
                            ): void {
                              setValue("defaultPreferredLab", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                            name={field.name}
                          />
                        )}
                      ></Controller>
                    </Grid>
                    <Grid width={"19.2%"}>
                      <CustomLabel label="Preferred HST Device" />
                      <Controller
                        control={control}
                        name="preferredHstDevice"
                        render={({ field }) => (
                          <CustomSelect
                            value={field.value?.trim() || ""}
                            placeholder={"Select Preferred Device"}
                            enableDeselect
                            items={[{ value: "active", label: "Active" }]}
                            onChange={function (
                              e: SelectChangeEvent<string>,
                            ): void {
                              setValue("preferredHstDevice", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                            name={field.name}
                          />
                        )}
                      ></Controller>
                    </Grid>
                    <Grid
                      container
                      mt={3}
                      alignContent={"center"}
                      width={"19.2%"}
                    >
                      <CustomCheckBox
                        sx={{ fontSize: "14px" }}
                        oriantation={"horizontal"}
                        size={12}
                        options={[{ key: "F/U Telemed", checked: false }]}
                        onChange={function (
                          updatedArray: CheckedArray[],
                        ): void {
                          handleSelectionFollowUp(updatedArray);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* License Details */}
                <Grid
                  container
                  width={"100%"}
                  flexDirection={"column"}
                  rowGap={1.5}
                >
                  <Typography fontWeight={600} variant="bodySmall">
                    License Details
                  </Typography>
                  <Grid
                    container
                    flexDirection={"column"}
                    width={"62%"}
                    p={1}
                    borderRadius={3}
                    rowGap={1.5}
                    bgcolor={"#F2F4FA"}
                  >
                    <Typography>Hello America</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* Button Grid */}
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
                      onClick={props.handleDrawerClose}
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
export default ProviderForm;
