import axios from 'axios'
const baseUrl = '/api/blogs'

const createNew = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

export default { createNew }
