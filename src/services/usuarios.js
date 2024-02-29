import axios from "axios";
import { urlBase } from "../utils/utils";

const baseUrl = `${ urlBase }/usuarios`

const token = window.localStorage.getItem('loggedUser') ? 'Bearer '.concat(JSON.parse(window.localStorage.getItem('loggedUser')).token) : ''

const authorization = { 
  headers: {
    'Authorization': token
  }
}

const getAllUsuarios = axios.get(baseUrl, authorization)
  .then(response => {
      const users = response.data
      return users
})

const getUsuario = (id) => {
  const request = axios.get(`${baseUrl}/${id}`, authorization)
  return request.then(response => response.data)
}

const createUsuario = (newUser) => {
  const request = axios.post(baseUrl, newUser, authorization)
  return request.then(response => response.data)
}

const updateUsuario = (id, newObject) =>{
  const request = axios.put(`${baseUrl}/${id}`, newObject, authorization)
  return request.then(response => response.data)
}

const deleteUsuario = (id, userToDelete) => {
  const request = axios.delete(`${baseUrl}/${id}`,userToDelete)
  return request.then(response => response)
}

export {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  authorization,
  updateUsuario,
  deleteUsuario
}