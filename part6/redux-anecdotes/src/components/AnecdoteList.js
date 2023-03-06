import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdote
    }
    return state.anecdote.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted' ${anecdote.content}'`))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
