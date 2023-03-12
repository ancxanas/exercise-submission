import { useField } from '../hooks'

const NoteForm = ({ createNote }) => {
  const content = useField('text')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    createNote({ content: content.value })
    content.reset()
  }

  return (
    <form onSubmit={handleNoteSubmit}>
      <input
        type={content.type}
        value={content.value}
        onChange={content.onChange}
      />
      <button>create</button>
    </form>
  )
}

export default NoteForm
