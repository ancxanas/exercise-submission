import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return `anecdote '${action.payload}' added`
    case 'VOTE':
      return `anecdote '${action.payload}' voted`
    case 'NULL':
      return null
    default:
      return state
  }
}

export const newAnecdoteNotification = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: anecdote,
  }
}

export const voteAnecdoteNotification = (anecdote) => {
  return {
    type: 'VOTE',
    payload: anecdote.content,
  }
}

export const clearNotification = () => {
  return {
    type: 'NULL',
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
