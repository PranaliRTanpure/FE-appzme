import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, IconButton, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import CustomInput from "../../../common-components/custom-input/custom-input";
import CustomLabel from "../../../common-components/custom-label/custom-label";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import MultipleFilesUpload, {
  FilesMetaData,
} from "../../../common-components/multiple-files-upload/multiple-files-upload";
import useApiFeedback from "../../../hooks/useApiFeedback";
import { setIsLoading } from "../../../redux/actions/loader-action";
import {
  useConsentFormControllerServiceCreateConsentForms,
  useConsentFormControllerServiceUpdateConsentForms,
} from "../../../sdk/queries";
import { ConsentFormTemplate } from "../../../sdk/requests";
import { errorStyle } from "../../../common-components/custom-input/widgets/custom-input-styles";
import { documentNameRequiredErrorMsg } from "../../../constants/error-messages";

type FormDocument = {
  setOpenDialogOfDocument: React.Dispatch<React.SetStateAction<boolean>>;
  openDialogOfDocument: boolean;
  refetch: () => void;
  supportedFormatsMsg: string;
  formData: ConsentFormTemplate;
  isEdit: boolean;
};

const addDocumentSchema = yup.object().shape({
  name: yup.string().required(documentNameRequiredErrorMsg),
  document: yup.string(),
  status: yup.string(),
});

function AddConsentForm(props: FormDocument) {
  const [hasErrorNoDoc, setHasErrorDoc] = useState(false);
  const {
    setOpenDialogOfDocument,
    isEdit,
    openDialogOfDocument,
    refetch,
    supportedFormatsMsg,
    formData,
  } = props;
  const [uploadedFiles, setUploadedFiles] = useState<FilesMetaData[]>([]);
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);

  const initialValues = {
    name: formData?.name || "",
    document: formData?.document || "",
    status: formData?.active ? "active" : "inactive" || "",
  };

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(addDocumentSchema),
  });

  const {
    mutateAsync,
    isError: isAddError,
    error: adderror,
    isSuccess: isAddSuccess,
    data: addData,
  } = useConsentFormControllerServiceCreateConsentForms();

  const {
    mutateAsync: mutateAsyncEdit,
    isSuccess: isSuccessEdit,
    data: dataEdit,
    error: errorEdit,
    isError: isErrorEdit,
  } = useConsentFormControllerServiceUpdateConsentForms();

  useApiFeedback(
    isAddError,
    adderror,
    isAddSuccess,
    (addData?.message || "Consent form added successfully") as string,
  );

  useApiFeedback(
    isErrorEdit,
    errorEdit,
    isSuccessEdit,
    (dataEdit?.message || "Consent form updated successfully") as string,
  );

  const onSubmit = async (data: FieldValues) => {
    const documentFile = getValues("document");
    if (!isEdit && !documentFile) {
      setHasErrorDoc(true);
    } else {
      setHasErrorDoc(false);
    }
    if (isUploading) return;

    setIsUploading(true);

    try {
      if (isEdit) {
        await mutateAsyncEdit({
          requestBody: {
            ...formData,
            name: data.name,
            active: data.status === "active" ? true : false,
          },
        });
      } else {
        if (uploadedFiles.length === 0) {
          return;
        }
        await mutateAsync({
          requestBody: {
            document: uploadedFiles[0].base64,
            name: data.name,
            active: !isEdit ? true : data.status === "active" ? true : false,
          },
        });
      }

      reset(initialValues);
      refetch();
      setUploadedFiles([]);
      setOpenDialogOfDocument(false);
      setIsUploading(false);
    } finally {
      setIsUploading(false);
    }
  };
  useEffect(() => {
    dispatch(setIsLoading(isUploading));
  }, [dispatch, isUploading]);

  // const [debouncedOnSubmit] = useDebounce(onSubmit, 1000);

  return (
    <Dialog open={openDialogOfDocument}>
      <form style={{ padding: "10px" }} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          alignItems={"center"}
          p={"0 10px"}
          justifyContent={"space-between"}
        >
          <Typography variant="bodyMedium" fontWeight={550}>
            {isEdit ? "Edit Consent Form" : "Add Consent Form"}
          </Typography>
          <IconButton onClick={() => setOpenDialogOfDocument(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid
          width={"500px"}
          height={"fit-content"}
          maxHeight={"80vh"}
          padding={1}
        >
          <Grid container>
            <CustomLabel isRequired label={"Form Name"} />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CustomInput
                  placeholder="Enter document name"
                  hasError={!!errors.name}
                  errorMessage={errors.name?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          {isEdit && (
            <Grid width={"100%"} sx={{ marginTop: "15px" }}>
              <CustomLabel label="Status" isRequired />
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CustomSelect
                    placeholder={"Select Status"}
                    items={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                    {...field}
                    value={field.value || ""}
                  />
                )}
              />
            </Grid>
          )}

          {!isEdit && (
            <>
              <Grid sx={{ marginTop: "15px" }}>
                <CustomLabel isRequired label={"Upload Form"} />
                <MultipleFilesUpload
                  onUpload={(filesMetaData: FilesMetaData[]) => {
                    filesMetaData[0] &&
                      setValue("document", filesMetaData[0].base64);
                    setUploadedFiles(filesMetaData);
                  }}
                  listOfFileTypesAllowed={["image/pdf", "application/pdf"]}
                  Supportedformats={
                    supportedFormatsMsg ||
                    "Supported formats: JPEG, PNG, GIF, MP4, PDF"
                  }
                  disabled={uploadedFiles.length === 1}
                />
              </Grid>
              <>
                {hasErrorNoDoc && (
                  <Typography
                    textAlign={"start"}
                    sx={errorStyle}
                    variant="caption"
                  >
                    {"Please upload a document"}
                  </Typography>
                )}
              </>
            </>
          )}
          <Grid
            columnGap={2}
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
              height: "60px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setOpenDialogOfDocument(false)}
              sx={{ height: "40px" }}
            >
              {"Cancel"}
            </Button>
            <Button variant="contained" type="submit" sx={{ height: "40px" }}>
              {isEdit ? "Save" : isUploading ? "Uploading" : "Upload"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

export default AddConsentForm;
