import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return `anecdote '${action.payload}' added`
    case 'VOTE_ANECDOTE':
      return `anecdote '${action.payload}' voted`
    case 'CREATE_ANECDOTE_ERROR':
      return action.payload
    case 'NULL':
      return null
    default:
      return state
  }
}

export const createAnecdoteError = (error) => {
  return {
    type: 'CREATE_ANECDOTE_ERROR',
    payload: error,
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
    type: 'VOTE_ANECDOTE',
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
