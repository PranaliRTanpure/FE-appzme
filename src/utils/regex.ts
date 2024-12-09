export const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegx =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
export const emailRegExp2 =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|gov|edu|mil|in)$/;

export const alphabeticOnly = /^[A-Za-z\s]+$/;
export const cityStateRgex = /^[a-zA-Z0-9 .-]+$/;
export const zipCodeRegex = /^\d{5}(-\d{4})?$/;
export const phoneRegex = /^\d{10}$/;
export const npiRegExp = /^\d{10}$/;
export const otpRegex = /^\d{6}$/;
export const mrnNumberRegex = /^([a-zA-Z0-9]{6,12})?$/;
export const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-.]+$/;

// 1. Phone Number:
//     Country Code: Accept 1 to 4 digits.
//     Phone/Mobile Number: 10 digits, excluding the country code.
// 2. Address:
//     City/State: Contain alphanumeric characters.
//     Country: Only alphabetic characters are used.
//     Zip Code:
//         Ranges from 3 to 10 characters.
//         Can be numeric or alphanumeric.
//         Can include special characters like hyphens and spaces.
// 3. NPI (National Provider Identifier):
//     Country-Specific: Can contain numeric or alphanumeric characters.
//     Common length: 7 to 16 digits.
//6 to 12 character with alphanumeric value
