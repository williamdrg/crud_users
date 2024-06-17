import axios from "axios"
import { useState } from "react"
const urlBase = 'https://users-crud.academlo.tech/'

const userCRUD = () => {

  const [dataApi, setDataApi] = useState()
  
  const getUserApi = (patch) => {
    const url = `${urlBase}${patch}/`
    axios.get(url)
      .then(res => setDataApi(res.data))
      .catch(err => console.error(err))
  }

  const createUserApi = (patch, data) => {
    const url = `${urlBase}${patch}/`
    console.log('url', url)
    console.log('datos aaa', data)
    axios.post(url, data)
      .then(res => setDataApi([...dataApi, res.data]))
      .catch(err => console.error(err))
  }

  const updateUserApi = (patch, data, id) => {
    const url = `${urlBase}/${patch}/${id}/`
    axios.patch(url, data)
      .then(res => {
        setDataApi(dataApi.map(user => user.id === id ? res.data : user))
      })
      .catch(err => console.error(err))
  }

  const deleteUserApi = (patch, id) => {
    const url = `${urlBase}/${patch}/${id}/`
    axios.delete(url)
      .then(()=> {
        setDataApi(dataApi.filter(user => user.id !== id))
      })
      .catch(error => console.error(error))
  }

  return [ dataApi, getUserApi, createUserApi, updateUserApi, deleteUserApi ]
}

export default userCRUD