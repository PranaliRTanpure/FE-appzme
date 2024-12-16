import { theme } from "../../utils/theme";

export const DocumentStyles = {
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  none: {
    display: "none",
  },
  cloudicon: {
    color: theme.palette.primary.main,
    display: "flex",
  },
  captionheading: {
    color: "#727272",
  },
  documentupload: {
    border: "2px dashed #727272",
    borderRadius: "8px",
    height: "275px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center !important",
    cursor: "pointer",
  },
  filepreview: {
    height: "170px",
    width: "170px",
    borderRadius: "8px",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
  },
  previewName: {
    display: "flex",
    justifyContent: "center",
  },
};
