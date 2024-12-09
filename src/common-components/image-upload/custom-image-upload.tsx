import { Box, Typography } from "@mui/material";
import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from "react";
import Logo from "../../assets/image_svg/icons/upload-logo.svg";
import { errorStyle } from "../custom-input/widgets/custom-input-styles";
interface UploadFileProps {
  customStyle: CSSProperties;
  imageUrl?: string | null;
  // eslint-disable-next-line no-unused-vars
  handleSetImage?: (image: string | ArrayBuffer | null) => void;
}

const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024;

const UploadLogo = (props: UploadFileProps) => {
  const { imageUrl } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    imageUrl as string,
  );

  useEffect(() => {
    imageUrl && setImage(imageUrl);
  }, [imageUrl]);

  const [errorMessage, setErrorMessage] = useState("");

  const style = {
    ...props.customStyle,
    objectFit: "fill",
    backgroundRepeat: "no-repeat",
    borderRadius: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid red",
    // boxShadow: "1px 1px 10px 0px #cacaca",
    cursor: "pointer",
  };

  // const iconStyle = {
  // 	width: "50%",
  // 	height: "50%",
  // 	color: "#707070",
  // };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (
        !(
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png" ||
          file.type === "image/heic"
        )
      ) {
        setErrorMessage("Unsupported file format");
        setImage(null);
        return;
      }

      if (file.size > MAX_IMAGE_FILE_SIZE) {
        setErrorMessage("Upload a file smaller than 10 MB");
        setImage(null);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            setImage(e.target.result);
            props.handleSetImage && props.handleSetImage(e.target.result);
          }
        };
        reader.readAsDataURL(file);
        setErrorMessage("");
      }
    }
  };

  const parentStyle = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    borderRadius: "100%",
  };

  return (
    <div style={parentStyle} onClick={handleBrowseClick}>
      <Box sx={style}>
        {!image && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box width={"fit-content"} component={"img"} src={Logo}></Box>
          </Box>
        )}
        <input
          style={{ display: "none" }}
          type="file"
          id="file-input"
          className="file-input"
          onChange={handleFileChange}
          ref={fileInputRef}
          accept="image/*"
        />
      </Box>
      {errorMessage && (
        <Typography sx={errorStyle} variant="caption">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default UploadLogo;
