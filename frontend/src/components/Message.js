import { Alert } from "react-bootstrap";
function Message({ message, variant }) {
  return (
    <Alert
      style={{
        marginTop: "10px",
      }}
      variant={variant}
    >
      {message}
    </Alert>
  );
}

export default Message;
