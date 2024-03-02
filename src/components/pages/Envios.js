import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useMesasContext } from "../hooks/MesasProvider"
import { useEffect } from 'react';
import axios from 'axios';
import { urlBase } from '../../utils/utils';
import { v4 as uuidv4 } from 'uuid'

function Envios() {

  const [ mesasPorPuestoDeVotacion, setMesasPorPuestoDeVotacion ] = useState([])

  const { id_puestodevotacion, id_usuario, nom_departamento, nom_municipio, nom_puestodevotacion  } = useMesasContext()

  useEffect(() => {
    if( id_puestodevotacion && id_usuario ) {
      axios
      .get(`${ urlBase }/consultas/mesas-enviadas/${id_puestodevotacion}/${id_usuario}`)
      .then(response => {
        console.log('respuesta servidor en envios')
        console.log(response.data)
        setMesasPorPuestoDeVotacion(response.data)
      })
      .catch(error => console.log(error))
    }
  }, [setMesasPorPuestoDeVotacion, id_puestodevotacion, id_usuario])

  console.log({mesasPorPuestoDeVotacion})
  
  const estilo ={backgroundColor : '#36d399', color : '#2b3440'}

  return (
    <div>
      <h1 className='text-4xl font-bold leading-none tracking-tight text-blueBase text-center dark:text-white my-10'>Mesas</h1>
      <div className="container grid md:grid-cols-10 my-10">
        <div className="text-white md:col-start-1 md:col-end-4 ">
          <div className="mx-2 p-4 bg-blueBase rounded-md flex flex-col gap-2">
            <p className="capitalize">departamento: { nom_departamento }</p>
            <p className="capitalize">municipio: { nom_municipio }</p>
            <p className="capitalize">puesto de votación: { id_puestodevotacion }</p>
            <p className="capitalize">Lugar: { nom_puestodevotacion }</p>
          </div>
        </div>
        <div className="text-white md:col-start-4 md:col-end-11">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-2 p-2 md:p-0">
          { (Array.isArray(mesasPorPuestoDeVotacion) && mesasPorPuestoDeVotacion.length > 0) &&  mesasPorPuestoDeVotacion.map(item => {

            return (
              <div key={ uuidv4() } >
                <Link to={`/formularioe14/${ id_puestodevotacion }/${ item.id_mesa }`}>
                  { item.estado_envio_mesa === true
                  ?
                  <div className="p-4 hover:bg-green-600 transition-all cursor-pointer text-2xl rounded-md" style={ estilo } >
                    <p className="text-center capitalize">{item.id_mesa}</p>
                  </div>
                  :
                  <div className="p-4 bg-blueBase hover:bg-slate-800 transition-all cursor-pointer text-2xl rounded-md"  >
                    <p className="text-center capitalize">{item.id_mesa}</p>
                  </div>
          }
                </Link>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Envios
