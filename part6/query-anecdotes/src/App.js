import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import {
  useNotificationDispatch,
  voteAnecdoteNotification,
  clearNotification,
} from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map((anecdote) =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
      )
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(voteAnecdoteNotification(anecdote))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes)

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
