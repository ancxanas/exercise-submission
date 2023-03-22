import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notificationReducer', () => {
  test('returns new state with notification/showNotification', () => {
    const state = []

    const action = {
      type: 'notification/showNotification',
      payload: {
        message: 'wrong password or username',
        severity: 'error',
      },
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toBe(action.payload)
  })
})
