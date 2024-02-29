import { useState } from 'react'
import { useContext, createContext } from 'react'

const resultadosContext = createContext()

export function useResultadosContext() {
  return useContext(resultadosContext)
}

function ResultadosProvider({ children }) {
  const [ infoParaPDF, setInfoParaPDF ] = useState({})
  const [ porcentajeMesasInformadas, setPorcentajeMesasInformadas ] = useState(0) 

  function agregarPuntosDeMil(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <resultadosContext.Provider value={ {infoParaPDF, setInfoParaPDF, porcentajeMesasInformadas, setPorcentajeMesasInformadas, agregarPuntosDeMil} }>
        { children }    
    </resultadosContext.Provider>
  )
}

export default ResultadosProvider