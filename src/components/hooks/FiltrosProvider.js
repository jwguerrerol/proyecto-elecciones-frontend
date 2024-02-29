import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { urlBase } from "../../utils/utils"

const filtrosContext = createContext()

export const useFiltrosContext = () => {
  return useContext(filtrosContext)
}

function FiltrosProvider({ children }) {
  const [ departamentos, setDepartamentos ] = useState('')
  const [ municipios, setMunicipios ] = useState('')
  const [ puestosDeVotacion, setPuestosDeVotacion ] = useState('')
  const [ mesas, setMesas ] = useState('')

  useEffect(() => {
    axios.get(`${ urlBase }/departamentos`).then(response => {
      setDepartamentos(response.data)
    })
  },[])

  useEffect(() => {
    axios.get(`${ urlBase }/municipios`).then(response => {
      setMunicipios(response.data)
    })
  },[])

  useEffect(() => {
    axios.get(`${ urlBase }/puestosdevotacion`).then(response => {
      setPuestosDeVotacion(response.data)
    })
  },[])

  useEffect(() => {
    axios.get(`${ urlBase }/mesas`).then(response => {
      setMesas(response.data)
    })
  },[])


  return (
    <filtrosContext.Provider value={{ departamentos, setDepartamentos, municipios, setMunicipios, puestosDeVotacion, setPuestosDeVotacion, mesas, setMesas }}>
      { children }
    </filtrosContext.Provider>
  )
}

export default FiltrosProvider