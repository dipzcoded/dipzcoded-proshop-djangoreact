import { Alert } from "react-bootstrap";
function Message({ children, variant }) {
  return (
    <Alert
      style={{
        marginTop: "10px",
      }}
      variant={variant}
    >
      {children}
    </Alert>
  );
}

export default Message;
