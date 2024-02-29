import { useState, useEffect } from "react"
import { createContext, useContext } from "react"
import axios from "axios"
import { useUsuariosContext } from "./UsuariosProvider"
import { urlBase } from "../../utils/utils"

const mesasContext = createContext()

export const useMesasContext = () => {
  return useContext(mesasContext)
}

function MesasProvider({ children }) {
  
  const [ currentUser, setCurrentUser ] = useState({})
  const [ mesasEnviadas, setMesasEnviadas ] = useState([])

  const { userLogged } = useUsuariosContext()

  /* let idUserLogged */

  const idUserLogged = userLogged ? userLogged.id : undefined

  /* if(userLogged) {
    idUserLogged = userLogged.id
  } */

  const { id_puestodevotacion, id_role, nom_role, id_usuario, nom_usuario, correo_usuario, mesas_instaladas,id_departamento, nom_departamento, id_municipio, nom_municipio, nom_puestodevotacion} = currentUser

  useEffect(() => {
      axios.get(`${ urlBase }/consultas/mesas-por-usuario/${idUserLogged}`).then(response => {
      setCurrentUser(response.data)
    })
  },[idUserLogged])

  useEffect(() => {
    axios
      .get(`${ urlBase }/consultas/mesas-enviadas/${ currentUser.id_puestodevotacion }/${idUserLogged}`)
      .then(response => {
        let mesasResponse = response.data
        setMesasEnviadas(mesasResponse)
      })

  },[ currentUser.id_puestodevotacion, idUserLogged ])
  
  return (
    <mesasContext.Provider value={{id_puestodevotacion, id_role, nom_role, id_usuario, nom_usuario, correo_usuario, mesas_instaladas,id_departamento, nom_departamento, id_municipio, nom_municipio, nom_puestodevotacion, mesasEnviadas, setMesasEnviadas, idUserLogged}}>
      { children }
    </mesasContext.Provider>
  )
}

export default MesasProvider
