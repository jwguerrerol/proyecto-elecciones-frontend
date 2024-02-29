import { createContext, useEffect, useState, useContext } from "react"
import axios from "axios"
import { authorization } from "../../services/usuarios"
import { urlBase } from "../../utils/utils"

const usuariosContext = createContext()

export function useUsuariosContext() {
  const context = useContext(usuariosContext)
  if(!context){
    throw new Error('Contexto no disponible en este componente')
  } else {
    return context
  }
}

const isLogged = window.localStorage.getItem(
  'loggedUser') ? JSON.parse(window.localStorage.getItem(
    'loggedUser')) : null

function UsuariosProvider({ children }) {
  const [ usuarios, setUsuarios ] = useState([])
  const [ userLogged, setUserLogged ] = useState(isLogged)
  const [ token, setToken ] = useState('null')

  useEffect(() => {
    axios.get(`${ urlBase }/usuarios`,authorization).then(response => {
      setUsuarios(response.data)
    })
  }, [] )

  useEffect(() => {
    const user = !JSON.parse(window.localStorage.getItem('loggedUser')) ? null : JSON.parse(window.localStorage.getItem('loggedUser'))
    setUserLogged(user ? user : null)  
  },[token])

  useEffect(() => {
    setToken(JSON.parse(window.localStorage.getItem(
      'loggedUser')))
  },[])

  return (
    <usuariosContext.Provider value={ {usuarios, setUsuarios, userLogged, setUserLogged, token, setToken } }>
      { children }
    </usuariosContext.Provider>
  )
}

export default UsuariosProvider
