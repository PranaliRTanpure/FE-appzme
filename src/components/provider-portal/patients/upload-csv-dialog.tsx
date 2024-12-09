import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, LinearProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Grid } from "@mui/system";
import uploadIcon from "../././../../assets/image_svg/icons/Featured icon.svg";
import { theme } from "../../../utils/theme";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "../../../assets/image_svg/icons/description.svg";
import {
  DownloadTemplateData,
  PatientControllerService,
  Response,
  UploadFileData,
} from "../../../sdk/requests";
import { GetTenantId } from "../../../services/common/get-tenant-id";
import { useDispatch } from "react-redux";
import { setSnackbarOn } from "../../../redux/actions/snackbar-action";
import { AlertSeverity } from "../../../common-components/snackbar-alert/snackbar-alert";
import { ErrorResponseEntity } from "../../../models/response/error-response";
import { setIsLoading } from "../../../redux/actions/loader-action";
import { usePatientControllerServiceUploadFile } from "../../../sdk/queries";
import useApiFeedback from "../../../hooks/useApiFeedback";

export type FilesMetaData = {
  name: string;
  type: string;
  preview: string;
  file: File;
};
interface UploadCsvProps {
  onClose: () => void;
  refetch: () => void;
}

const UploadCSVFile = (props: UploadCsvProps) => {
  const { onClose, refetch } = props;
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState<FilesMetaData[]>([]);
  const [messageOfUploadFile, setMessageOfUploadFile] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const xtenantID = GetTenantId();
  const [loaderCsv, setLoaderCsv] = useState(false);
  // const [loading]

  //Download csv getapi
  const DownloadCSVTemplate = async () => {
    setLoaderCsv(true);
    try {
      const data: DownloadTemplateData = {
        xTenantId: xtenantID,
      };

      const response = await PatientControllerService.downloadTemplate(data);

      const blob = new Blob([response], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Patient_data.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Revoke the object URL to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: (error as ErrorResponseEntity).body.message,
        }),
      );
    } finally {
      setLoaderCsv(false);
    }
  };

  useEffect(() => {
    dispatch(setIsLoading(loaderCsv));
  }, [loaderCsv]);

  //Post api for upload csv file

  const {
    mutateAsync: mutateAsyncUploadCSV,
    isError: isErrorUpload,
    error: errorUpload,
    isSuccess: isSuccessUpload,
    data: dataUpload,
  } = usePatientControllerServiceUploadFile();

  const extractErrorMessage = (response: Response | undefined) => {
    if (response?.data) {
      // Convert the data object to a string of error messages
      const messages = Object.entries(response.data)

        .map(([, value]) => `${value}`)
        .join("; ");
      return messages || "Something went wrong";
    }
    return response?.message || "Something went wrong";
  };

  useApiFeedback(
    isErrorUpload,
    errorUpload,
    isSuccessUpload,
    extractErrorMessage(dataUpload) as string,
  );

  const onSubmit = async () => {
    setLoaderCsv(true);
    try {
      for (let FileMeta of uploadedFiles) {
        const payload: UploadFileData = {
          formData: {
            file: FileMeta.file,
          },
          xTenantId: xtenantID,
        };

        await mutateAsyncUploadCSV({ ...payload });
      }
      onClose();
    } finally {
      refetch();
      setLoaderCsv(false);
    }
  };

  const MAX_OTHER_FILE_SIZE = 16 * 1024 * 1024; // 16MB in bytes

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    let errorMessage = "";

    if (
      file.type.includes("text/csv")
      // file.type.includes("text/csv") ||
      // file.type.includes("application/msword") || // Word .doc
      // file.type.includes(
      //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // ) || // Word .docx
      // file.type.includes("application/vnd.ms-powerpoint") || // PowerPoint .ppt
      // file.type.includes(
      // "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      // ) || // PowerPoint .pptx
      // file.type.includes("image/vnd.adobe.photoshop") || // PSD
      // file.type.includes("application/postscript") // AI
    ) {
      if (file.size > MAX_OTHER_FILE_SIZE) {
        errorMessage = "Files other than images should be less than 16MB.";
      }
    } else {
      errorMessage = "Unsupported file type.";
    }

    if (errorMessage) {
      setMessageOfUploadFile(errorMessage);
      return;
    }
    if (!errorMessage) {
      setMessageOfUploadFile("");
    }

    setProgress(0); // Reset progress
    const uploadSimulation = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadSimulation);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Convert file to base64 and add it to the state
    // const base64Data = await convertToBase64(file);
    setUploadedFiles((prev) => [
      ...prev,
      {
        name: file.name,
        type: file.type,
        preview: `data:${file.type}`,
        file,
      },
    ]);
  }, []);

  const handleDelete = (index: number) => {
    setUploadedFiles((prev) => {
      const arr = structuredClone(prev);
      arr.splice(index, 1);
      return arr;
    });
  };

  // const convertToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64Data = btoa(reader.result as string);
  //       resolve(base64Data);
  //     };
  //     reader.readAsBinaryString(file);
  //   });
  // };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    // disabled: uploadedFilesData?.length < 0,
  });

  return (
    <Grid container flexDirection={"column"} gap={2} width={"500px"}>
      {uploadedFiles.length < 1 && (
        <div
          {...getRootProps()}
          style={{
            border: `2px solid #CDD7DA`,
            width: "100%",
            padding: "3rem",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: "10px",
            // cursor: uploadedFilesData?.length > 0 ? "not-allowed" : "pointer", // Change cursor if disabled
            flexDirection: "column",
            height: "160px",
            // opacity: uploadedFilesData?.length > 0 ? 0.5 : 1, // Change opacity if disabled
          }}
        >
          <Grid container justifyContent={"center"} rowGap={2}>
            <input {...getInputProps()} />
            <Grid width={"100%"} container justifyContent={"center"}>
              <img
                src={uploadIcon}
                style={{
                  width: "100px",
                  height: "50px",
                  color: theme.palette.grey[500],
                }}
              />
            </Grid>
            {isDragActive ? (
              <Typography variant="body1">
                Drop the files here ...Only CSV.
              </Typography>
            ) : (
              <Grid display={"flex"} flexDirection={"column"} gap={1}>
                <Grid container justifyContent={"center"}>
                  <Grid display={"flex"} flexDirection={"row"} gap={1.2}>
                    <Typography
                      variant="body1"
                      textAlign={"center"}
                      fontWeight={550}
                      color={theme.palette.primary.main}
                    >
                      Click to upload
                    </Typography>
                    <Typography
                      variant="body1"
                      textAlign={"center"}
                      // fontWeight={550}
                      color={"#717C7E"}
                    >
                      or drag and drop
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  variant="body1"
                  fontSize={"15px"}
                  color={"#717C7E"}
                  textAlign={"center"}
                >
                  CSV (max. 16 MB)
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
      )}

      {messageOfUploadFile ? (
        <span
          style={{
            color: theme.palette.warning.dark,
            fontSize: "14px",
          }}
        >
          {messageOfUploadFile}
        </span>
      ) : (
        ""
      )}
      {uploadedFiles.length < 1 && (
        <Grid>
          <Typography
            onClick={DownloadCSVTemplate}
            sx={{ cursor: "pointer" }}
            variant="bodySmall"
            color={theme.palette.primary.main}
            fontWeight={550}
          >
            <IconButton>
              <DownloadIcon />
            </IconButton>

            {"Download CSV Template"}
          </Typography>
        </Grid>
      )}
      {uploadedFiles.map((item, index) => (
        <Grid
          key={index}
          container
          sx={{
            background: theme.palette.grey[300],
            padding: 1,
            borderRadius: "20px",
            fontStyle: "initial",
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid
            container
            alignItems={"center"}
            width={"fit-content"}
            gap={2}
            sx={{ width: "auto", flex: 1 }}
          >
            {item.type.includes("text/csv") && (
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                width={"80px"}
                height={"80px"}
              >
                <img src={DescriptionIcon} style={{ fontSize: "50px" }} />
              </Grid>
            )}
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "normal",
                wordBreak: "break-word",
                width: "50%",
              }}
            >
              {item.name}
            </Typography>
          </Grid>
          <Grid>
            <IconButton onClick={() => handleDelete(index)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      {progress > 0 && progress < 100 && (
        <LinearProgress
          variant="buffer"
          value={progress}
          color="primary"
          sx={{ height: "8px", borderRadius: "20px" }}
        />
      )}

      {uploadedFiles.length > 0 && (
        <Grid container justifyContent={"flex-end"} gap={2} marginTop={"20px"}>
          <Button variant="outlined" onClick={onClose} size="small">
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            type="submit"
            onClick={onSubmit}
          >
            Upload
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default UploadCSVFile;
