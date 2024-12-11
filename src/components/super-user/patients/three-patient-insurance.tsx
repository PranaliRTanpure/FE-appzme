import { Grid } from "@mui/system";
import { theme } from "../../../utils/theme";
import Switcher from "../../../common-components/switcher/switcher";
import { useState } from "react";
import addIcon from "../../../assets/image_svg/icons/add-icon.svg";
import { Button, ButtonBase, Link, Typography } from "@mui/material";
import Status from "../../../common-components/status/status";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Status as StatusEnum } from "../../../constants/status";
import InsuranceForm from "../Insurance/insurance-form";

enum InsuranceType {
  // eslint-disable-next-line no-unused-vars
  PRIMARY = "Primary Insurance",
  // eslint-disable-next-line no-unused-vars
  SECONDAY = "Secondary Insurance",
}

const ThreePatientInsurance = () => {
  const [, setInsuranceType] = useState(InsuranceType.PRIMARY);
  const [isAddForm, setIsAddForm] = useState(false);
  const handleOnclickInsuranceName = () => {};
  return (
    <Grid
      width={"100%"}
      container
      // p={2}
      rowGap={2}
      flexDirection={"column"}
      border={`1px solid ${theme.palette.grey[300]}`}
      mt={1}
      borderRadius={"16px"}
    >
      {!isAddForm && (
        <>
          <Grid
            container
            height={"85px"}
            pl={1}
            alignItems={"center"}
            borderBottom={`1px solid ${theme.palette.grey[300]}`}
          >
            <Grid>
              <Switcher
                option1={
                  "Primary Insurance                                                                                     "
                }
                option2={"Secondary Insurance"}
                buttonWidth={"200px"}
                variant={"light"}
                onChange={function (option: string): void {
                  setInsuranceType(option as InsuranceType);
                }}
              />
            </Grid>
          </Grid>
          <Grid p={2}>
            <Grid container p={1} rowGap={2} columnGap={2}>
              <ButtonBase onClick={() => setIsAddForm(true)}>
                <Grid
                  border={"2px dashed #6AB0F8"}
                  p={2}
                  width={"334px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"206px"}
                  container
                  borderRadius={"12px"}
                >
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <img src={addIcon} />
                    <Typography
                      variant="bodyMedium"
                      color="secondary"
                      fontWeight={"bold"}
                    >
                      Add Insurance
                    </Typography>
                  </Grid>
                </Grid>
              </ButtonBase>
              {[{ insuranceName: "InsuranceOne" }].map((insuranceDetails) => (
                <Grid
                  boxShadow={"0px 0px 4px 0px #0000000A"}
                  border={"2px solid #E7E7E7"}
                  width={"334px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"206px"}
                  container
                  borderRadius={"12px"}
                >
                  <Grid
                    width={"100%"}
                    container
                    justifyContent={"space-between"}
                    p={1}
                  >
                    <Grid>
                      {/* background: #74797B; */}
                      <Typography variant="bodySmall" color="#74797B">
                        Name :
                      </Typography>
                      &nbsp;
                      <Link
                        style={{
                          color: theme.palette.secondary.main,

                          cursor: "pointer",
                        }}
                        onClick={() => handleOnclickInsuranceName()}
                      >
                        <Typography fontWeight={"bold"} variant="bodySmall">
                          {insuranceDetails.insuranceName}
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid>
                      <Status status={StatusEnum.ACTIVE} width="70px" />
                    </Grid>
                  </Grid>
                  <Grid p={1} width={"100%"} container>
                    {/* background: #74797B; */}
                    <Typography variant="bodySmall" color="#74797B">
                      ID Number :
                    </Typography>
                    &nbsp;
                    <Typography fontWeight={"bold"} variant="bodySmall">
                      {"S583690159"}
                    </Typography>
                  </Grid>
                  <Grid p={1} width={"100%"} container>
                    {/* background: #74797B; */}
                    <Typography variant="bodySmall" color="#74797B">
                      Plan Name : :
                    </Typography>
                    &nbsp;
                    <Typography fontWeight={"bold"} variant="bodySmall">
                      {"Humana Choice PPO"}
                    </Typography>
                  </Grid>{" "}
                  <Grid p={1} width={"100%"} container>
                    {/* background: #74797B; */}
                    <Typography variant="bodySmall" color="#74797B">
                      Subscriber :
                    </Typography>
                    &nbsp;
                    <Typography fontWeight={"bold"} variant="bodySmall">
                      {"Self"}
                    </Typography>
                  </Grid>
                  <Grid
                    width={"100%"}
                    container
                    p={"5px"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    borderTop={`1px solid ${theme.palette.grey[300]}`}
                  >
                    <Status
                      bgColor="#FFF2D2"
                      textColor="#943C00"
                      status={StatusEnum.PRIMARY}
                      width="80px"
                    />
                    <ButtonBase>
                      <DeleteOutlineOutlinedIcon />
                      <Typography variant="bodySmall">Remove</Typography>
                    </ButtonBase>
                    <Button
                      variant="outlined"
                      startIcon={<EditOutlinedIcon />}
                      sx={{
                        height: "35px",
                      }}
                    >
                      <Typography variant="bodySmall">Edit</Typography>
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
      {isAddForm && <InsuranceForm />}
    </Grid>
  );
};

export default ThreePatientInsurance;
