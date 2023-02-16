const Notification = ({ message, successMessage }) => {
  if (message === null) {
    return null;
  }

  return <div className={successMessage ? 'success' : 'error'}>{message}</div>;
};

export default Notification;
