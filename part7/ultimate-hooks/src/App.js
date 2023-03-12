import { useResource } from './hooks'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const addNote = (createNote) => {
    noteService.create(createNote).then(() => noteService.getAll())
  }

  const addPerson = (createPerson) => {
    personService.create(createPerson).then(() => personService.getAll())
  }

  return (
    <div>
      <h2>notes</h2>
      <NoteForm createNote={addNote} />
      <NoteList notes={notes} />

      <h2>persons</h2>
      <PersonForm createPerson={addPerson} />
      <PersonList persons={persons} />
    </div>
  )
}

export default App
