export function splitPhoneNumber(phoneNumber: string) {
  // const regex = /^(?:\+1|\+91)(\d+)$/;

  const regex = /^'?(?:\+1|\+91)?(\d+)$/;

  const match = phoneNumber.match(regex);
  if (match) {
    return {
      countryCode: phoneNumber.startsWith("+1") ? "+1" : "+91",
      number: match[1],
    };
  } else {
    return {
      countryCode: "",
      number: "",
    };
  }
}
