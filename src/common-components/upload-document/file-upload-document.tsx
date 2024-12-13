import { Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Grid } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react";
import uploadDocLogo from "../../assets/image_svg/icons/upload-doc.svg";
import { DocumentStyles } from "./document-widget";

type UploadDocumentProps = {
  // eslint-disable-next-line no-unused-vars
  onBase64Data: (data: string) => void;
  cardFrontSideUrl?: string;
  cardBackSideUrl?: string;
  width?: number;
};

const UploadDocument = (props: UploadDocumentProps) => {
  const { onBase64Data, cardFrontSideUrl, cardBackSideUrl } = props;
  const classes = DocumentStyles;

  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [filePreview1, setFilePreview1] = useState("");
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [filePreview2, setFilePreview2] = useState("");
  const allowedFileTypes = ["image/jpeg", "image/png"];
  const maxFileSize = 10 * 1024 * 1024;
  filePreview1;

  useEffect(() => {
    if (cardFrontSideUrl) {
      setFilePreview1(cardFrontSideUrl);
    }
    if (cardBackSideUrl) {
      setFilePreview2(cardBackSideUrl);
    }
  }, [cardFrontSideUrl, cardBackSideUrl]);

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

  const handleFileChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event, setSelectedFile2, setFilePreview2, 2);
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

  // const renderCloseButton = (
  //   selectedFile: File | null,
  //   setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  //   fileNumber: number
  // ) => {
  //   return (
  //     selectedFile && (
  //       <CloseOutlinedIcon
  //         // onClick={() => {
  //         //   setSelectedFile(null);
  //         // }}
  //         onClick={() => {
  //           setSelectedFile(null);
  //           if (fileNumber === 1) {
  //             setFilePreview1("");
  //           } else if (fileNumber === 2) {
  //             setFilePreview2("");
  //           }
  //         }}
  //       />
  //     )
  //   );
  // };

  const renderCloseButton = (
    selectedFile: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    cardUrl: string | undefined,
    fileNumber: number,
  ) => {
    return (
      (selectedFile || cardUrl) && (
        <div>
          {/* <img src={uploadDocLogo} /> */}
          <CloseOutlinedIcon
            onClick={() => {
              setSelectedFile(null);
              if (fileNumber === 1) {
                setFilePreview1("");
              } else if (fileNumber === 2) {
                setFilePreview2("");
              }
            }}
          />
        </div>
      )
    );
  };

  return (
    <Grid container sx={{ ...classes.container }} columnGap={2}>
      {/* File Input 1 */}
      <Grid sx={{ ...classes.documentupload }}>
        <Grid container>
          {selectedFile1 && (
            <Grid style={{ display: "flex", justifyContent: "end" }}>
              {renderCloseButton(
                selectedFile1,
                setSelectedFile1,
                cardFrontSideUrl,
                1,
              )}
            </Grid>
          )}
          <Grid>
            <Grid
              p={1}
              component="label"
              sx={{ ...classes.container }}
              htmlFor="fileInput1"
            >
              <input
                type="file"
                id="fileInput1"
                style={{ ...classes.none }}
                onChange={(event) => {
                  handleFileChange1(event);
                }}
                onClick={(event) => handleClick(event)}
              />
              {/* {!selectedFile1 ? (
                <CloudUploadOutlinedIcon
                  className={classes.cloudicon}
                  sx={{ width: "50px", height: "50px" }}
                />
              ) : (
                <img src={filePreview1} alt="File Preview" className={classes.filepreview} />
              )} */}
              {!selectedFile1 ? (
                cardFrontSideUrl ? (
                  <img
                    src={cardFrontSideUrl}
                    alt="File Preview"
                    style={{ ...classes.filepreview }}
                  />
                ) : (
                  <img src={uploadDocLogo} />
                  // <CloudUploadOutlinedIcon
                  //   sx={{ ...classes.cloudicon, width: "50px", height: "50px" }}
                  // />
                )
              ) : (
                <img src={uploadDocLogo} />

                // <img
                //   src={filePreview1}
                //   alt="File Preview"
                //   style={{ ...classes.filepreview }}
                // />
              )}
            </Grid>

            <Grid>
              <Grid container columnSpacing={2}>
                <Grid sx={{ ...classes.previewName }}>
                  {/* <Typography variant="title2" noWrap m={2} fontWeight={500}>
                    {selectedFile1
                      ? `${selectedFile1.name}`
                      : "Select a file or drag and drop here"}
                  </Typography> */}
                  {selectedFile1 ? (
                    <Typography
                      variant="bodySmall"
                      noWrap
                      m={2}
                      fontWeight={500}
                    >
                      {selectedFile1.name}
                    </Typography>
                  ) : (
                    !cardFrontSideUrl && (
                      <Typography
                        variant="bodySmall"
                        noWrap
                        m={2}
                        fontWeight={500}
                      >
                        Click to upload or drag and drop
                      </Typography>
                    )
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
              {/* {!selectedFile1 && (
                <Grid item xs={12} mt={1} className={classes.gridItem}>
                  <Typography variant="caption" className={classes.captionheading}>
                    JPG and PNG, file size no more than 10MB
                  </Typography>
                </Grid>
              )} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* File Input 2 */}
      <Grid sx={classes.documentupload}>
        <Grid container>
          {selectedFile2 && (
            <Grid style={{ display: "flex", justifyContent: "end" }}>
              {renderCloseButton(
                selectedFile2,
                setSelectedFile2,
                cardBackSideUrl,
                2,
              )}
            </Grid>
          )}
          <Grid>
            <Grid
              p={1}
              sx={classes.container}
              component="label"
              htmlFor="fileInput2"
            >
              <input
                type="file"
                id="fileInput2"
                style={classes.none}
                onChange={handleFileChange2}
                onClick={(event) => handleClick(event)}
              />
              {!selectedFile2 ? (
                cardBackSideUrl ? (
                  <img
                    src={cardBackSideUrl}
                    alt="File Preview"
                    style={classes.filepreview}
                  />
                ) : (
                  <img src={uploadDocLogo} />

                  // <CloudUploadOutlinedIcon
                  //   style={classes.cloudicon}
                  //   sx={{ width: "50px", height: "50px" }}
                  // />
                )
              ) : (
                <img
                  src={filePreview2}
                  alt="File Preview"
                  style={classes.filepreview}
                />
              )}
              {/* {!selectedFile2 ? (
                <CloudUploadOutlinedIcon
                  className={classes.cloudicon}
                  sx={{ width: "50px", height: "50px" }}
                />
              ) : (
                <img src={filePreview2} alt="File Preview" className={classes.filepreview} />
              )} */}
            </Grid>
            <Grid>
              <Grid container columnSpacing={2}>
                <Grid sx={classes.previewName}>
                  {/* <Typography variant="title2" noWrap m={2} fontWeight={500}>
                    {selectedFile2
                      ? `${selectedFile2.name} `
                      : "Select a file or drag and drop here"}
                  </Typography> */}
                  {selectedFile2 ? (
                    <Typography
                      variant="bodySmall"
                      noWrap
                      m={2}
                      fontWeight={500}
                    >
                      {selectedFile2.name}
                    </Typography>
                  ) : (
                    !cardBackSideUrl && (
                      <Typography
                        variant="bodySmall"
                        noWrap
                        m={2}
                        fontWeight={500}
                      >
                        Click to upload or drag and dropddd
                      </Typography>
                    )
                  )}
                </Grid>
              </Grid>
              {/* {!selectedFile2 && (
                <Grid item xs={12} mt={1} className={classes.gridItem}>
                  <Typography variant="caption" className={classes.captionheading}>
                    JPG and PNG, file size no more than 10MB
                  </Typography>
                </Grid>
              )} */}
              {!selectedFile2 && !cardBackSideUrl && (
                <Grid mt={1} sx={classes.gridItem}>
                  <Typography variant="caption" sx={classes.captionheading}>
                    JPG or PNG
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UploadDocument;
