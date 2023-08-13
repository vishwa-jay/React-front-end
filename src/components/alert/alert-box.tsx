import { Alert } from "@mui/material";

export interface AlertBoxProps {
  message: string;
  severity: "success" | "warning" | "info" | "error";
  showAlert?: boolean;
}

const AlertBox = (props: AlertBoxProps) => {
  if (!props.showAlert) {
    return <></>;
  }
  return <Alert severity={props.severity}>{props.message}</Alert>;
};

export default AlertBox;
