import { Alert, Snackbar } from "@mui/material";
import React from "react";

function Toast(props) {
  // const vertical = 'bottom';
  // const horizontal = 'center';
  const {
    open,
    duration,
    onClose,
    severity,
    message,
    vertical = "bottom",
    horizontal = "center",
  } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}

export default Toast;
