// import React, { useCallback, useEffect, useState } from "react";
// import { useFormContext } from "react-hook-form";

// import { Avatar, Box, Skeleton } from "@mui/material";

// import CameraIcon from "@/assets/image_svg/icons/camera-circle.svg";
// import DefaultAvatarImage from "@/assets/image_svg/icons/clockIcon.svg";

// interface UploadImageProps {
//   name: string;
//   defaultImage?: string;
//   width?: string;
//   isLoading?: boolean;
// }

// export const UploadImage: React.FC<UploadImageProps> = ({
//   name,
//   defaultImage,
//   width = "100%",
//   isLoading = false,
// }) => {
//   const { register, setValue } = useFormContext();
//   const [preview, setPreview] = useState<UploadImageProps["defaultImage"]>();

//   useEffect(() => {
//     if (!isLoading) {
//       if (defaultImage === undefined) {
//         setPreview(DefaultAvatarImage);
//       } else {
//         setPreview(defaultImage);
//       }
//     }
//   }, [isLoading, defaultImage]);

//   const handleImageChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (!file) return;

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setValue(name, reader.result, { shouldValidate: true });
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     },
//     [setValue, name]
//   );

//   return (
//     <Box position="relative">
//       <input
//         type="file"
//         accept="image/*"
//         style={{ display: "none" }}
//         id={name}
//         {...register(name)}
//         onChange={handleImageChange}
//       />

//       <label htmlFor={name}>
//         <Box
//           position="relative"
//           sx={{
//             cursor: "pointer",
//             width: width,
//             aspectRatio: "1/1",
//           }}
//         >
//           {isLoading ? (
//             <Skeleton variant="circular" width="100%" height="100%" />
//           ) : (
//             <>
//               <Avatar
//                 src={preview || ""}
//                 alt=""
//                 sx={{
//                   width: "100%",
//                   height: "100%",
//                   border: "2px solid",
//                   borderColor: "grey.200",
//                   "&:hover": {
//                     borderColor: "primary.main",
//                   },
//                 }}
//               />
//               {preview === DefaultAvatarImage && (
//                 <Box
//                   component={"img"}
//                   src={CameraIcon}
//                   style={{
//                     position: "absolute",
//                     right: 0,
//                     bottom: -5,
//                   }}
//                 ></Box>
//                 // <CameraIcon
//                 //   style={{
//                 //     position: "absolute",
//                 //     right: 0,
//                 //     bottom: -5,
//                 //   }}
//                 // />
//               )}
//             </>
//           )}
//         </Box>
//       </label>
//     </Box>
//   );
// };
