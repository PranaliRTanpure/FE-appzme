import DrawerBody from "@/components/ui/DrawerBody";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/system";

import CustomButtonOutlined from "@/common-components/button-outlined/custom-button";
import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import CheckBox from "@/common-components/custom-checkbox/checkbox";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomLabel from "@/common-components/custom-label/custom-label";
import UploadLogo from "@/common-components/image-upload/custom-image-upload";
import CustomRadioButton from "@/common-components/radio-button/radio-button";
import { theme } from "@/utils/theme";
import { Divider } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { OrderngProviderSchema } from "./orderng-provider-schema";

export const customStyle = {
  height: "8rem",
  width: "8rem",
};
interface AddOrderingProviderFormProps {
  handleDrawerClose: () => void;
  isEdit: boolean;
}

const AddOrderingProviderForm = (props: AddOrderingProviderFormProps) => {
  const { handleDrawerClose, isEdit } = props;
  const [physicianPortalAccess, setPhysicianPortalAccess] = useState("");
  const [fUTelemedValue, setFUTelemedValue] = useState<boolean>(false);

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

  const initialValues = {
    avatar: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    supervisingProvider: "",
    email: "",
    npi: "",
    speciality: "",
    fax: "",
    phone: "",
    alternatePhone: "",
    physicianPortalAccess: false,
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
    },
    defaultDentalProvider: "",
    preferredDME: "",
    defaultPreferredLab: "",
    preferredHSTDevice: "",
    fUTelemed: false,
    preferredPGName: "",
    preferredPGOfficeContact: "",
    preferredPGMarketer: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(OrderngProviderSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
    props.handleDrawerClose;
  };

  return (
    <DrawerBody padding={3} offset={height}>
      <Grid container width={"100%"} height={"100%"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Main Grid */}
          <Grid width={"100%"}>
            {/* Grid One */}
            <Grid container width={"100%"} rowGap={2}>
              {/* Profile Image */}
              <Grid width={"100%"}>
                <CustomLabel
                  variant={"bodySmall"}
                  label={"Profile Information"}
                />
              </Grid>
              <Grid width={"100%"} container>
                <Grid mr={0.5} mt={0.5}>
                  <UploadLogo customStyle={customStyle} />
                </Grid>
                <Grid flex={1} container flexDirection={"column"} rowGap={1}>
                  <Grid container justifyContent={"space-between"}>
                    <Grid width={"18%"}>
                      <CustomLabel isRequired label="First Name" />
                      <Controller
                        control={control}
                        name="firstName"
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter First Name"}
                            hasError={!!errors.firstName}
                            errorMessage={errors.firstName?.message as string}
                            name={field.name}
                            onChange={(e) =>
                              setValue("firstName", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"14%"}>
                      <CustomLabel label="Middle Initial" />
                      <Controller
                        control={control}
                        name="middleName"
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter "}
                            hasError={!!errors.middleName}
                            errorMessage={errors.middleName?.message as string}
                            name={field.name}
                            onChange={(e) =>
                              setValue("middleName", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"18%"}>
                      <CustomLabel isRequired label="Last Name" />
                      <Controller
                        control={control}
                        name="lastName"
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter Last Name"}
                            hasError={!!errors.lastName}
                            errorMessage={errors.lastName?.message as string}
                            name={field.name}
                            onChange={(e) =>
                              setValue("lastName", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"24%"}>
                      <CustomLabel isRequired label="Suffix" />
                      <Controller
                        control={control}
                        name="suffix"
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter Suffix"}
                            hasError={!!errors.suffix}
                            errorMessage={errors.suffix?.message as string}
                            name={field.name}
                            onChange={(e) => setValue("suffix", e.target.value)}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"24%"}>
                      <CustomLabel label="Supervising Provider" />
                      <Controller
                        control={control}
                        name="supervisingProvider"
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter Supervising Provider"}
                            hasError={!!errors.supervisingProvider}
                            errorMessage={
                              errors.supervisingProvider?.message as string
                            }
                            name={field.name}
                            onChange={(e) =>
                              setValue("supervisingProvider", e.target.value)
                            }
                          />
                        )}
                      />
                    </Grid>{" "}
                  </Grid>
                  <Grid container justifyContent={"space-between"}>
                    <Grid width={"48%"}>
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
                    </Grid>{" "}
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
                    </Grid>{" "}
                    <Grid width={"24%"}>
                      <CustomLabel label="Speciality" />
                      <Controller
                        control={control}
                        name="speciality"
                        render={({ field }) => (
                          <CustomAutoComplete
                            options={[]}
                            value={field.value}
                            placeholder="Select Speciality"
                            onChange={function (
                              selectedValue: string | "",
                            ): void {
                              setValue("speciality", selectedValue);
                            }}
                          />
                        )}
                      />
                    </Grid>{" "}
                  </Grid>
                  <Grid container justifyContent={"space-between"}>
                    <Grid width={"33%"}>
                      <CustomLabel label="Fax" isRequired />
                      <Controller
                        control={control}
                        name="fax"
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter Fax"}
                            hasError={!!errors.fax}
                            errorMessage={errors.fax?.message as string}
                            name={field.name}
                            onChange={(e) =>
                              setValue("fax", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"33%"}>
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
                    </Grid>{" "}
                    <Grid width={"33%"}>
                      <CustomLabel label="Alternate Phone" />
                      <Controller
                        control={control}
                        name="alternatePhone"
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter Alt. Phone"}
                            hasError={!!errors.alternatePhone}
                            errorMessage={
                              errors.alternatePhone?.message as string
                            }
                            name={field.name}
                            onChange={(e) =>
                              setValue("alternatePhone", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                        )}
                      />
                    </Grid>{" "}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container width={"100%"}>
                <CustomLabel
                  variant={"bodySmall"}
                  label="Physician Portal Access"
                />
                <Grid width={"100%"}>
                  <CustomRadioButton
                    optionsArray={["Yes", "No"]}
                    selectedvalue={physicianPortalAccess}
                    onChange={function (opt: string): void {
                      setPhysicianPortalAccess(opt);
                    }}
                  />
                </Grid>
              </Grid>
              <Divider
                sx={{
                  margin: "2px",
                  background: theme.palette.common.white,
                  width: "100%",
                }}
                orientation="horizontal"
                variant="middle"
              />
              <Grid container width={"100%"}>
                <CustomLabel
                  variant={"bodySmall"}
                  label="Address Information"
                />
                <Grid container justifyContent={"space-between"}>
                  <Grid width={"24%"}>
                    <CustomLabel label="Address Line 1" />
                    <Controller
                      control={control}
                      name="suffix"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Enter Address Line 1"}
                          hasError={!!errors.address?.line1}
                          errorMessage={
                            errors.address?.line1?.message as string
                          }
                          name={field.name}
                          onChange={(e) =>
                            setValue("address.line1", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid width={"24%"}>
                    <CustomLabel label="Address Line 2" />
                    <Controller
                      control={control}
                      name="address.line2"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Enter Address Line 2"}
                          hasError={!!errors.address?.line1}
                          errorMessage={
                            errors.address?.line1?.message as string
                          }
                          name={field.name}
                          onChange={(e) =>
                            setValue("address.line1", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid width={"18%"}>
                    <CustomLabel label="City" />
                    <Controller
                      control={control}
                      name="address.city"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Enter City"}
                          hasError={!!errors.address?.city}
                          errorMessage={errors.address?.city?.message as string}
                          name={field.name}
                          onChange={(e) =>
                            setValue("address.city", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid width={"14%"}>
                    <CustomLabel label="State" />
                    <Controller
                      control={control}
                      name="address.state"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Enter  "}
                          hasError={!!errors.middleName}
                          errorMessage={errors.middleName?.message as string}
                          name={field.name}
                          onChange={(e) =>
                            setValue("middleName", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid width={"18%"}>
                    <CustomLabel label="Lats Name" />
                    <Controller
                      control={control}
                      name="lastName"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Enter Last Name"}
                          hasError={!!errors.lastName}
                          errorMessage={errors.lastName?.message as string}
                          name={field.name}
                          onChange={(e) =>
                            setValue("lastName", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                      )}
                    />
                  </Grid>{" "}
                </Grid>
              </Grid>
              <Divider
                sx={{
                  margin: "2px",
                  background: theme.palette.common.white,
                  width: "100%",
                }}
                orientation="horizontal"
                variant="middle"
              />
              <Grid container width={"100%"}>
                <Grid width={"100%"}>
                  <CustomLabel
                    variant={"bodySmall"}
                    label="Preferred Provider Details"
                  />
                </Grid>
                <Grid container justifyContent={"space-between"} width={"100%"}>
                  <Grid width={"24.5%"}>
                    <CustomLabel label="Default Dental Provider" />
                    <Controller
                      control={control}
                      name="defaultPreferredLab"
                      render={({ field }) => (
                        <CustomAutoComplete
                          options={[]}
                          value={field.value}
                          placeholder="Select Dental Provider"
                          onChange={function (
                            selectedValue: string | "",
                          ): void {
                            setValue("defaultPreferredLab", selectedValue, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid width={"24.5%"}>
                    <CustomLabel label="Preferred DME" />
                    <Controller
                      control={control}
                      name="preferredDME"
                      render={({ field }) => (
                        <CustomAutoComplete
                          options={[]}
                          value={field.value}
                          placeholder="Select Preferred DME"
                          onChange={function (
                            selectedValue: string | "",
                          ): void {
                            setValue("preferredDME", selectedValue, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid width={"24.5%"}>
                    <CustomLabel label="Default Preferred Lab" />
                    <Controller
                      control={control}
                      name="defaultPreferredLab"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Select Preferred lab"}
                          hasError={!!errors.defaultPreferredLab}
                          errorMessage={
                            errors.defaultPreferredLab?.message as string
                          }
                          name={field.name}
                          onChange={(e) =>
                            setValue("defaultPreferredLab", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid width={"24.5%"}>
                    <CustomLabel label="State" />
                    <Controller
                      control={control}
                      name="address.state"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Enter  "}
                          hasError={!!errors.middleName}
                          errorMessage={errors.middleName?.message as string}
                          name={field.name}
                          onChange={(e) =>
                            setValue("middleName", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                      )}
                    />
                  </Grid>{" "}
                </Grid>
              </Grid>
              <Divider
                sx={{
                  margin: "2px",
                  background: theme.palette.common.white,
                  width: "100%",
                }}
                orientation="horizontal"
                variant="middle"
              />
              <Grid>
                <CheckBox
                  label="F/U Telemed"
                  checked={fUTelemedValue}
                  handleChange={function (
                    e: React.ChangeEvent<HTMLInputElement>,
                  ): void {
                    setFUTelemedValue(e.target.checked);
                  }}
                />
              </Grid>
              <Divider
                sx={{
                  margin: "2px",
                  background: theme.palette.common.white,
                  width: "100%",
                }}
                orientation="horizontal"
                variant="middle"
              />
              <Grid container width={"100%"}>
                <Grid width={"100%"}>
                  <CustomLabel
                    variant={"bodySmall"}
                    label="Provider Group Details"
                  />
                </Grid>
                <Grid container justifyContent={"space-between"} width={"100%"}>
                  <Grid width={"24.5%"}>
                    <CustomLabel label="Provider Group Name" />
                    <Controller
                      control={control}
                      name="preferredPGName"
                      render={({ field }) => (
                        <CustomAutoComplete
                          options={[]}
                          value={field.value}
                          placeholder="Provider Group Name"
                          onChange={function (
                            selectedValue: string | "",
                          ): void {
                            setValue("preferredPGName", selectedValue, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid width={"24.5%"}>
                    <CustomLabel label="Office Contact" />
                    <Controller
                      control={control}
                      name="preferredPGOfficeContact"
                      render={({ field }) => (
                        <CustomInput
                          value={field.value?.trim() || ""}
                          placeholder={"Enter Office Contact"}
                          hasError={!!errors.preferredPGOfficeContact}
                          errorMessage={
                            errors.preferredPGOfficeContact?.message as string
                          }
                          name={field.name}
                          onChange={(e) =>
                            setValue(
                              "preferredPGOfficeContact",
                              e.target.value,
                              {
                                shouldValidate: true,
                              },
                            )
                          }
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid width={"24.5%"}>
                    <CustomLabel label="Marketer" />
                    <Controller
                      control={control}
                      name="preferredPGMarketer"
                      render={({ field }) => (
                        <CustomAutoComplete
                          options={[]}
                          value={field.value}
                          placeholder="Select Marketer"
                          onChange={function (
                            selectedValue: string | "",
                          ): void {
                            setValue("preferredPGMarketer", selectedValue, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      )}
                    />
                  </Grid>{" "}
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
            <Grid
              container
              justifyContent={isEdit ? "space-between" : "flex-end"}
            >
              <Grid container columnGap={1}>
                <CustomButtonOutlined
                  startIcon={undefined}
                  variant={"outlined"}
                  text={"Cancel"}
                  onClick={handleDrawerClose}
                />

                <CustomButtonOutlined
                  startIcon={undefined}
                  variant={"contained"}
                  text={isEdit ? "Save Changes" : "Create Ordering Provider"}
                  onClick={handleDrawerClose}
                  isDisabled={isValid}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
    </DrawerBody>
  );
};

export default AddOrderingProviderForm;
