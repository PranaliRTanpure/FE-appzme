// import { styled, TextareaAutosize, Typography } from "@mui/material";
// import { ChangeEvent } from "react";
// import { errorStyle } from "../custom-input/widgets/custom-input-styles";
// import { editTextAreaStyle } from "./widgets/custom-textarea-widgets";

// interface CustomTextAreaProps {
//   placeholder: string;
//   name: string;
//   value: string | number | undefined;
//   minRow: number;
//   maxRow?: number;
//   onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
//   onBlur?: () => void;
//   isDisabled?: boolean;
//   hasError?: boolean;
//   errorMessage?: string;
//   defaultValue?: string;
// }

// const StyledTextarea = styled(TextareaAutosize)({
//   ...editTextAreaStyle.textArea,
//   fontFamily: "sans-serif",
//   fontSize: "15px",
//   "&:focus": {
//     borderRadius: "8px",
//     // border: "0.5px solid black",
//     height: "40px",
//     padding: "10px 12px",
//     outline: "none",
//     fontSize: "15px",
//     fontFamily: "sans-serif",
//   },
//   resize: "none",
// });

// const ErrorTypography = styled(Typography)({
//   ...errorStyle,
// });

// function CustomTextArea(props: CustomTextAreaProps) {
//   return (
//     <>
//       <StyledTextarea
//         disabled={props.isDisabled && props.isDisabled}
//         minRows={props.minRow}
//         maxRows={props.maxRow || 10}
//         draggable={false}
//         name={props.name}
//         placeholder={props.placeholder}
//         defaultValue={props.defaultValue}
//         value={props.value ? props.value : ""}
//         onChange={props.onChange}
//         // className={`${editTextAreaStyle.textArea} ${props.hasError ? editTextAreaStyle.errorMessage : ""}`}
//         className={props.hasError ? `${editTextAreaStyle.errorMessage}` : ""}
//       />
//       <ErrorTypography sx={{ ...errorStyle }} variant="caption">
//         {props.hasError ? props.errorMessage : ""}
//       </ErrorTypography>
//     </>
//   );
// }

// export default CustomTextArea;

import { styled, TextareaAutosize, Typography } from "@mui/material";
import { ChangeEvent, FocusEvent } from "react";
import { errorStyle } from "../custom-input/widgets/custom-input-styles";
import { editTextAreaStyle } from "./widgets/custom-textarea-widgets";

interface CustomTextAreaProps {
  placeholder: string;
  name: string;
  value: string | number | undefined;
  minRow: number;
  maxRow?: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void; // Updated
  isDisabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  defaultValue?: string;
}

const StyledTextarea = styled(TextareaAutosize)({
  ...editTextAreaStyle.textArea,
  fontFamily: "sans-serif",
  fontSize: "15px",
  "&:focus": {
    borderRadius: "8px",
    height: "40px",
    padding: "10px 12px",
    outline: "none",
    fontSize: "15px",
    fontFamily: "sans-serif",
  },
  resize: "none",
});

const ErrorTypography = styled(Typography)({
  ...errorStyle,
});

function CustomTextArea(props: CustomTextAreaProps) {
  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    const trimmedValue = e.target.value.trim(); // Trim the value
    props.onChange({ ...e, target: { ...e.target, value: trimmedValue } }); // Update the value
    if (props.onBlur) {
      props.onBlur(e); // Call the onBlur function if provided
    }
  };

  return (
    <>
      <StyledTextarea
        disabled={props.isDisabled}
        minRows={props.minRow}
        maxRows={props.maxRow || 10}
        draggable={false}
        maxLength={255}
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        value={props.value ? props.value : ""}
        onChange={props.onChange}
        onBlur={handleBlur} // Use the handleBlur function
        className={props.hasError ? `${editTextAreaStyle.errorMessage}` : ""}
      />
      <ErrorTypography sx={{ ...errorStyle }} variant="caption">
        {props.hasError ? props.errorMessage : ""}
      </ErrorTypography>
    </>
  );
}

export default CustomTextArea;
