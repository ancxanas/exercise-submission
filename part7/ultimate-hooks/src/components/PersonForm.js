import { useField } from '../hooks'

const PersonForm = ({ createPerson }) => {
  const name = useField('text')
  const number = useField('text')

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    createPerson({ name: name.value, number: number.value })
    name.reset()
    number.reset()
  }

  return (
    <form onSubmit={handlePersonSubmit}>
      name{' '}
      <input type={name.type} value={name.value} onChange={name.onChange} />{' '}
      <br />
      number{' '}
      <input
        type={number.type}
        value={number.value}
        onChange={number.onChange}
      />
      <button>create</button>
    </form>
  )
}

export default PersonForm
