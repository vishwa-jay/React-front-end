import { AlertBoxProps } from "../components/alert/alert-box";

export const genderList = [
  { key: "male", value: "male", label: "Male" },
  { key: "female", value: "female", label: "Female" },
];

export const defaultAlertValue : AlertBoxProps= {
  message: "",
  severity: "info",
  showAlert: false,
};

export const DATE_FORMAT ='yyyy-MM-dd';

export const MIN_TEXT_LENGHT = 6;
export const MAX_TEXT_LENGHT = 10;
export const MAX_TEXTAREA_LENGHT = 256;

export const REQUIRED_MSG = "Required";
export const MIN_MAX_LENGHT_MSG = `This field should be atleast ${MIN_TEXT_LENGHT} characters and less than ${MAX_TEXT_LENGHT} characters`;
export const INVALID_EMAIL_MSG = "Invalid email address";
export const INVALID_PHONE_MSG =
  "Singapore Phone number should start with 8 or 9 and 8 characters long";
export const MAX_TEXTAREA_LENGHT_MSG = `This field should be less than ${MAX_TEXTAREA_LENGHT}`;
