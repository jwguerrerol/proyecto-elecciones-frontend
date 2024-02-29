import { useState, createContext, useContext } from "react"

const formularioContext = createContext()

export const useFormularioContext = () => {
  return useContext(formularioContext)
} 

function FormularioProvider( { children }) {
  const [ datosFormulario, setDatosFormulario ] = useState({
    'id_puestodevotacion': 1,
    'id_mesa': 1,
    'id_usuario': '1',
    'votos_incinerados':0,
    'total_sufragantes':0,
    'total_votos_urna': 0,
    'votos_candidato1': 0,
    'votos_candidato2': 0,
    'votos_candidato3': 0,
    'votos_candidato4': 0,
    'votos_candidato5': 0,
    'votos_candidato6': 0,
    'votos_candidato7': 0,
    'votos_candidato8': 0,
    'votos_candidato9': 0,
    'votos_blancos': 0,
    'votos_nulos': 0,
    'votos_no_marcados': 0,
    'total_votosmesa': 0,
    'observaciones': 'Ninguna',
    'url_imagen_e14': null,
    'created_at': ''
  })

  return (
    <formularioContext.Provider value={{datosFormulario, setDatosFormulario }}>
      { children }
    </formularioContext.Provider>
  )
}

export default FormularioProvider
