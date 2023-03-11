const Anecdote = ({ anecdote }) => {
  const style = { paddingBottom: 10 }

  return (
    <div style={style}>
      <h2>{anecdote.content}</h2>
      <div style={style}>has {anecdote.votes} votes</div>
      <div>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  )
}

export default Anecdote
