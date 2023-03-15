import notificationReducer from './notificationReducer'

describe('notificationReducer', () => {
  test('returns a new state with action notification/showNotification', () => {
    const state = null
    const action = {
      type: 'notification/showNotification',
      payload: 'This is a notification',
    }

    const newState = notificationReducer(state, action)

    expect(newState).toHaveLength(22)
    expect(newState).toContain('This is a notification')
  })

  test('returns null with action notification/clearNotification', () => {
    const state = null
    const action = {
      type: 'notification/clearNotification',
    }

    const newState = notificationReducer(state, action)

    expect(newState).toBe(null)
  })
})
