import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Message = ({ message, isError = false }) => {
  if (!message || message === "") {
    return <></>;
  }
  if (isError) {
    return <Alert severity="error">{message}</Alert>;
  }

  return <Alert severity="success">{message}</Alert>;
};

export default Message;
