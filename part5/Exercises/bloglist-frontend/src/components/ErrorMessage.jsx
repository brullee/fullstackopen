const ErrorMessage = ({ message, color='green' }) => {
  const Style = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };


  if (message === null) {
    return null;
  }

  return <div style={{...Style, color}}className="error">{message}</div>;
};

export default ErrorMessage;
