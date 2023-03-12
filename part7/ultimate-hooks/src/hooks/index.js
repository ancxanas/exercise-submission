import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data)
    })
  }, [baseUrl])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return setResources(response.data)
  }

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    return response.data
  }

  const service = {
    create,
    getAll,
  }

  return [resources, service]
}
