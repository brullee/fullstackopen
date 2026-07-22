const ErrorMessage = ({ message, color='green' }) => {

  if (message === null) {
    return null;
  }

  return <div className="error" style={{color}}>{message}</div>;
};

export default ErrorMessage;
