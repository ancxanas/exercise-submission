import { useAppSelector } from "../hooks";

const Notification = () => {
  const notification = useAppSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  return <div>{notification}</div>;
};

export default Notification;
