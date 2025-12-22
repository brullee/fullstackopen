const Notification = ({ message, color = "green" }) => {
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

  return <div style={{ ...Style, color }}>{message}</div>;
};

export default Notification;
