import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { IconButton, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadIcon from "../../assets/image_svg/icons/file_upload.svg";
import { theme } from "../../utils/theme";

export type FilesMetaData = {
  name: string;
  type: string;
  preview: string;
  base64: string;
  file: File;
};

type MultipleFilesUploadProps = {
  // eslint-disable-next-line no-unused-vars
  onUpload: (filesMetaData: FilesMetaData[]) => void;
  Supportedformats?: string;
  disabled?: boolean;
  listOfFileTypesAllowed?: string[];
};

const MultipleFilesUpload = (props: MultipleFilesUploadProps) => {
  const { onUpload, Supportedformats, disabled, listOfFileTypesAllowed } =
    props;
  const [uploadedFiles, setUploadedFiles] = useState<FilesMetaData[]>([]);
  const [messageOfUploadFile, setMessageOfUploadFile] = useState("");

  const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const MAX_OTHER_FILE_SIZE = 16 * 1024 * 1024; // 16MB in bytes

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    let errorMessage = "";
    setMessageOfUploadFile("");

    let isFileAllowed = true;
    isFileAllowed = !!listOfFileTypesAllowed?.some((fileype) =>
      acceptedFiles.every((file) => file.type.includes(fileype)),
    );

    if (!isFileAllowed) {
      errorMessage = "Please upload supported formats";
      setMessageOfUploadFile(errorMessage);
      return;
    }

    if (
      file.type.includes("image/png") ||
      file.type.includes("image/pdf") ||
      file.type.includes("application/pdf") ||
      file.type.includes("image/jpeg") ||
      file.type.includes("image/gif")
    ) {
      if (file.size > MAX_IMAGE_FILE_SIZE) {
        errorMessage = "Image files should be less than 10MB.";
      }
    } else if (
      file.type.includes("application/pdf") ||
      file.type.includes("video/mp4") ||
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

    // Convert file to base64 and add it to the state
    const base64Data = await convertToBase64(file);
    setUploadedFiles((prev) => [
      ...prev,
      {
        name: file.name,
        type: file.type,
        preview: `data:${file.type};base64,${base64Data}`,
        base64: base64Data,
        file,
      },
    ]);
  }, []);

  useEffect(() => {
    onUpload(uploadedFiles);
  }, [uploadedFiles, onUpload]);

  const handleDelete = (index: number) => {
    setUploadedFiles((prev) => {
      const arr = structuredClone(prev);
      arr.splice(index, 1);
      return arr;
    });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = btoa(reader.result as string);
        resolve(base64Data);
      };
      reader.readAsBinaryString(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    disabled: disabled, // Disable the dropzone if disabled prop is true
  });

  return (
    <Grid container flexDirection={"column"} gap={2}>
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${theme.palette.grey[500]}`,
          width: "100%",
          padding: "3rem",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          borderRadius: "10px",
          cursor: disabled ? "not-allowed" : "pointer", // Change cursor if disabled
          flexDirection: "column",
          opacity: disabled ? 0.5 : 1, // Change opacity if disabled
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
              Drop the files here ...Only pdf, png or jpeg.
            </Typography>
          ) : (
            <Grid>
              <Typography
                variant="body1"
                textAlign={"center"}
                fontWeight={550}
                color={theme.palette.common.black}
              >
                Drag & drop files
              </Typography>
              <Typography
                variant="body1"
                textAlign={"center"}
                fontWeight={550}
                color={theme.palette.common.black}
              >
                Or
              </Typography>
              <Typography
                variant="body1"
                fontWeight={550}
                color={theme.palette.primary.main}
                textAlign={"center"}
              >
                Browse Files
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
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
      <Grid>
        <Typography variant="bodySmall" color={theme.palette.grey[600]}>
          {Supportedformats || "Supported formats: pdf, png, jpeg"}
        </Typography>
      </Grid>
      {uploadedFiles.map((item, index) => (
        <Grid
          container
          sx={{
            background: theme.palette.grey[300],
            padding: 1,
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
            {item.type.includes("image") && (
              <img height={"80px"} src={item.preview} />
            )}
            {!item.type.includes("image") &&
              !item.type.includes("text/csv") && (
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"80px"}
                  height={"80px"}
                >
                  <InsertDriveFileIcon fontSize="large" />
                </Grid>
              )}
            {item.type.includes("text/csv") && (
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                width={"80px"}
                height={"80px"}
              >
                <InsertDriveFileIcon fontSize="large" />
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
    </Grid>
  );
};

export default MultipleFilesUpload;
