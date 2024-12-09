import { Grid } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import CustomInput from "../../../../common-components/custom-input/custom-input";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomTextArea from "../../../../common-components/custom-text-area/custom-textarea";
import { Button, Typography } from "@mui/material";
import { theme } from "../../../../utils/theme";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  messageRequiredErrorMsg,
  subjectRequiredErrorMsg,
} from "../../../../constants/error-messages";

interface Formvalue {
  subject: string;
  message: string;
}

function PatientEmailDrawer() {
  const schemaForComposeEmail = yup.object().shape({
    subject: yup.string().required(subjectRequiredErrorMsg),
    message: yup.string().required(messageRequiredErrorMsg),
  });

  const initialValue = {
    subject: "",
    message: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schemaForComposeEmail),
  });

  const onSubmit = (value: Formvalue) => {
    value;
  };
  return (
    <form style={{ height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        height={"100%"}
        container
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Grid>
          <Grid mb={2}>
            <CustomLabel label={"Subject"} isRequired />
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <CustomInput
                  placeholder={"Enter Subject"}
                  {...field}
                  hasError={!!errors.subject}
                  errorMessage={errors.subject?.message}
                />
              )}
            />
          </Grid>
          <Grid>
            <CustomLabel label={"Message"} isRequired />
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <CustomTextArea
                  placeholder={"Enter Your Message"}
                  minRow={4}
                  {...field}
                  hasError={!!errors.message}
                  errorMessage={errors.message?.message || ""}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid height={"8%"} borderTop={`1px solid ${theme.palette.grey[300]}`}>
          <Grid container p={1} justifyContent={"flex-end"}>
            <Button variant="contained">
              <Typography marginRight={"8px"}>Send</Typography>
              <SendOutlinedIcon fontSize="small" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default PatientEmailDrawer;
