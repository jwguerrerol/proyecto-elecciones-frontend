import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { urlBase } from '../../utils/utils'

const candidatosContext = createContext()

export const useCandidatosContext = () => {
  return useContext(candidatosContext)
}

function CandidatosProvider({ children }) {

  const [candidatos, setCandidatos] = useState([])
  const [votosPorOtrasOpciones, setVotosPorOtrasOpciones] = useState({})
  const [votosPorDefectoCandidatos, setVotosPorDefectoCandidatos ] = useState({})
  const [votosPorDefectoOtrasOpciones, setVotosPorDefectoOtrasOpciones ] = useState({})

  useEffect(() => {
    axios
      .get(`${ urlBase }/candidatos`)
      .then(response => {
        setCandidatos(response.data)
      })
  },[])

  useEffect(() => {
    axios
      .get(`${ urlBase }/consultas/votos/otras-opciones`)
      .then(response => {
      setVotosPorOtrasOpciones(response.data)
    })
  }, [] )

  useEffect(() => {
    const votosPorDefecto =  candidatos.map(candidato => {
      return { ...candidato, votos : '' }
    })
    setVotosPorDefectoCandidatos(votosPorDefecto) 
    setVotosPorDefectoOtrasOpciones({
      votos_blancos: '',
      votos_nulos: '',
      votos_no_marcados: ''
    })
  },[ candidatos ])

  return (
    <candidatosContext.Provider value={{ candidatos, setCandidatos, votosPorOtrasOpciones, setVotosPorOtrasOpciones, votosPorDefectoCandidatos, setVotosPorDefectoCandidatos, votosPorDefectoOtrasOpciones, setVotosPorDefectoOtrasOpciones }}>
      { children }
    </candidatosContext.Provider>
  )
}

export default CandidatosProvider