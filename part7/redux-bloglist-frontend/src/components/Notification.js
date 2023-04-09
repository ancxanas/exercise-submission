import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  console.log(notification)

  if (!notification) return null

  return (
    <Alert
      sx={{ bgcolor: 'primary.main' }}
      className="notification"
      severity={notification.severity}
    >
      {notification.message}
    </Alert>
  )
}

export default Notification
