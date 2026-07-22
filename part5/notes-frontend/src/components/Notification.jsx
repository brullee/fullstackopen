const Notification = ({ message, color='red' }) => {
  if (message === null) {
    return null;
  }

  return <div className="error" style={{color}}>{message}</div>;
};

export default Notification;
