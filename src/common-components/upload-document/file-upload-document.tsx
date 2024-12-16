import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react";
import uploadDocLogo from "../../assets/image_svg/icons/upload-doc.svg";
import { theme } from "../../utils/theme";
import { DocumentStyles } from "./document-widget";

type UploadDocumentProps = {
  // eslint-disable-next-line no-unused-vars
  onBase64Data: (data: string) => void;
  cardFrontSideUrl?: string;
  width?: number;
  title: string;
  inputId: string;
};

const UploadDocument = (props: UploadDocumentProps) => {
  const { onBase64Data, cardFrontSideUrl, title, inputId } = props;
  const classes = DocumentStyles;

  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [filePreview1, setFilePreview1] = useState("");
  const allowedFileTypes = ["image/jpeg", "image/png"];
  const maxFileSize = 10 * 1024 * 1024;
  filePreview1;

  useEffect(() => {
    if (cardFrontSideUrl) {
      setFilePreview1(cardFrontSideUrl);
    }
  }, [cardFrontSideUrl]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    setFilePreview: React.Dispatch<React.SetStateAction<string>>,
    // eslint-disable-next-line no-unused-vars
    _fileNumber: number,
  ) => {
    const file = (event.target.files && event.target.files[0]) || null;
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        alert("Invalid file type. Please select a JPG or PNG.");
        event.target.value = "";
        return;
      }

      if (file.size > maxFileSize) {
        alert(
          "File size exceeds the limit. Please select a file no larger than 10MB.",
        );
        event.target.value = "";
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = await convertToBase64(file);
        setFilePreview(`data:${file.type};base64,${base64Data}`);
      };

      reader.readAsBinaryString(file);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    const { target = {} } = event || {};
    target.value = "";
  };

  const handleFileChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event, setSelectedFile1, setFilePreview1, 1);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = btoa(reader.result as string);
        resolve(base64Data);
        onBase64Data(base64Data);
      };
      reader.readAsBinaryString(file);
    });
  };

  const renderCloseButton = (
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    fileNumber: number,
  ) => {
    setSelectedFile(null);
    if (fileNumber === 1) {
      setFilePreview1("");
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  return (
    <Grid container sx={{ ...classes.container }} columnGap={2}>
      <Grid container flexDirection={"column"} rowGap={1}>
        <Typography color="#595F63" variant="bodySmall">
          {title || "Document"}
        </Typography>
        <Grid
          border={selectedFile1 ? "none" : "1px dashed #C9CBCC"}
          container
          justifyContent={"center"}
          width={"300px"}
          borderRadius={"12px"}
          height={"180px"}
        >
          <Grid container justifyContent={"center"}>
            <Grid
              container
              justifyContent={"center "}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Grid
                component="label"
                htmlFor={inputId}
                sx={{ cursor: "pointer" }}
              >
                <input
                  type="file"
                  id={inputId}
                  style={{ ...classes.none }}
                  onChange={(event) => {
                    handleFileChange1(event);
                  }}
                  onClick={(event) => handleClick(event)}
                />

                {!selectedFile1 ? (
                  cardFrontSideUrl ? (
                    <img
                      src={cardFrontSideUrl}
                      alt="File Preview"
                      style={{ ...classes.filepreview }}
                    />
                  ) : (
                    <img src={uploadDocLogo} />
                  )
                ) : (
                  <img
                    src={filePreview1}
                    alt="File Preview"
                    style={{ height: "180px", width: "300px" }}
                  />
                )}
              </Grid>

              <Grid>
                <Grid container>
                  <Grid>
                    {!selectedFile1 && !cardFrontSideUrl && (
                      <Grid container width={"100%"} justifyContent={"center"}>
                        <Typography
                          variant="bodySmall"
                          noWrap
                          color={theme.palette.secondary.main}
                        >
                          Click to upload
                        </Typography>
                        &nbsp;
                        <Typography
                          sx={{ color: "#74797B" }}
                          variant="bodySmall"
                        >
                          or drag and drop
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {!selectedFile1 && !cardFrontSideUrl && (
                  <Grid mt={1} sx={{ ...classes.gridItem }}>
                    <Typography
                      variant="caption"
                      sx={{ ...classes.captionheading }}
                    >
                      JPG or PNG{" "}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {selectedFile1 && (
          <Typography
            sx={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              width: "300px",
            }}
            color="#595F63"
            variant="bodySmall"
          >
            File Name : {selectedFile1?.name}
          </Typography>
        )}
        {selectedFile1 && (
          <Grid width={"100%"} columnGap={2} container>
            <Button
              startIcon={<EditOutlinedIcon />}
              variant="outlined"
              onClick={triggerFileInput}
            >
              <Typography variant="bodySmall">Change</Typography>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange1}
              onClick={(event) => event.stopPropagation()}
            />

            <Button
              onClick={() => renderCloseButton(setSelectedFile1, 1)}
              startIcon={<DeleteOutlineOutlinedIcon />}
              variant="outlined"
            >
              <Typography variant="bodySmall">Remove</Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default UploadDocument;
