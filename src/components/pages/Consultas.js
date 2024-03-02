import { Suspense } from 'react'
import { useCandidatosContext } from '../hooks/CandidatosProvider'
import { useFiltrosContext } from '../hooks/FiltrosProvider'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import CardsResultados from '../common/CardsResultados'
import Notificacion from '../ui/Notificacion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DocPdf from '../common/DocPdf';
import { urlBase } from '../../utils/utils';
import Spinner from '../ui/Spinner'

function Consultas() {
  const [ departamentoSeleccionado, setDepartamentoSeleccionado ] = useState('')
  const [ municipioSeleccionado, setMunicipioSeleccionado ] = useState('')
  const [ puestoDeVotacionSeleccionado, setPuestoDeVotacionSeleccionado ] = useState('')
  const [ mesaSeleccionada, setMesaSeleccionada ] = useState('')

  const [ mesasPorPuestoDeVotacion, setMesasPorPuestoDeVotacion ] = useState([])
  const [ mesasEnviadas, setMesasEnviadas ] = useState(0)
  const [ porcentajeMesasInformadas, setPorcentajeMesasInformadas ] = useState(0)

  
  const [ errorNotification, setErrorNotification ] = useState('')
  
  const { votosPorOtrasOpciones, setVotosPorOtrasOpciones, votosPorDefectoCandidatos, votosPorDefectoOtrasOpciones} = useCandidatosContext()
  
  const [ votosPorCandidatos, setVotosPorCandidatos ] = useState([])

  const { departamentos, municipios, puestosDeVotacion, setPuestosDeVotacion } = useFiltrosContext()


  useEffect(() => {
      const datosConsulta = {
        departamentoSeleccionado: !departamentoSeleccionado  ? 1 : departamentoSeleccionado,
        municipioSeleccionado: !municipioSeleccionado  ? null : Number(municipioSeleccionado),
        puestoDeVotacionSeleccionado : !puestoDeVotacionSeleccionado  ? null : Number(puestoDeVotacionSeleccionado),
        mesaSeleccionada : !mesaSeleccionada  ? null : Number(mesaSeleccionada) 
      }
  
      console.log({ datosConsulta })
  
      axios.get(`${ urlBase }/consultas/votos/candidatos/${ datosConsulta.departamentoSeleccionado }/${ datosConsulta.municipioSeleccionado }/${  datosConsulta.puestoDeVotacionSeleccionado }/${ datosConsulta.mesaSeleccionada }`,{ datosConsulta }).then(response => {
        try {
          console.log('server response')
          console.log(response.data)
          const responseVotosCandidatos = response.data
          if( response.data.error) {
            const message = response.data.error
            console.log(message)
            if (message === 'No se han recibido datos de la mesa seleccionada' || message === 'No se han recibido datos del puesto de votación seleccionado' || message === 'No se han recibido datos del municipio seleccionado') {
              setVotosPorCandidatos(votosPorDefectoCandidatos) 
              setVotosPorOtrasOpciones(votosPorDefectoOtrasOpciones)
              setErrorNotification(message)
            } 
          } else {
            axios.get(`${ urlBase }/consultas/votos/otras-opciones/${ datosConsulta.departamentoSeleccionado }/${ datosConsulta.municipioSeleccionado }/${  datosConsulta.puestoDeVotacionSeleccionado }/${ datosConsulta.mesaSeleccionada }`,{ datosConsulta }).then(response => {
              console.log(response.data)
              setErrorNotification('')
              setVotosPorOtrasOpciones(response.data)
              return setVotosPorCandidatos(responseVotosCandidatos)
            })
          }
        } catch (error) {
          return response.status(500)
        }
      })
  
      

  },[departamentoSeleccionado, municipioSeleccionado, puestoDeVotacionSeleccionado, mesaSeleccionada, setVotosPorCandidatos, setVotosPorOtrasOpciones, votosPorDefectoCandidatos, votosPorDefectoOtrasOpciones])

  useEffect(() => {
    axios
      .get(`${ urlBase }/mesas`)
      .then(response => {
        const results = response.data
        const cantidadMesasEnviadas = (results.filter(result => result.estado_envio_mesa === true)).length  
        setMesasEnviadas(cantidadMesasEnviadas)
        const cantidadDeMesas = results.length
        const porcentaje = ((mesasEnviadas * 100) / cantidadDeMesas).toFixed(2)
        setPorcentajeMesasInformadas( porcentaje)
      })
  },[ mesasEnviadas ])

  const handleDepartamento = (event) => {
    return setDepartamentoSeleccionado(event.target.value)
  }

  const handleMunicipio = (event) => {
    const id = Number(event.target.value)
    setMunicipioSeleccionado(id)
    axios.get(`${ urlBase }/puestosdevotacion`).then(response => {
      const puestosDeVotacionAll = response.data
      const puestosDeVotacionPorMunicipio = puestosDeVotacionAll.filter(puestodevotacion => puestodevotacion.id_municipio === id)
      setMesaSeleccionada('')
      setMesasPorPuestoDeVotacion([])
      setPuestosDeVotacion(puestosDeVotacionPorMunicipio)
      setPuestoDeVotacionSeleccionado('')
    })
  }

  const handlePuestoDeVotacion = (event) => {
    const id = Number(event.target.value)
    setMesaSeleccionada('')
    axios.get(`${ urlBase }/consultas/mesas`).then(response => {
      const mesasFiltradas = (response.data).filter(mesa => mesa.id_puestodevotacion === id)
      setMesasPorPuestoDeVotacion(mesasFiltradas)
      setMesaSeleccionada('')
      setPuestoDeVotacionSeleccionado(id)
      console.log('From handlePuestoDeVotacion')
      console.log({ votosPorCandidatos })
    })
  }

  const handleMesa = (event) => {
    setMesaSeleccionada(event.target.value)
  }

  const handleResetButton = (event) => {
    setMesaSeleccionada('')
    setPuestoDeVotacionSeleccionado('')
    setMunicipioSeleccionado('')
  }

  return (
    <div className='container'>
      <h1 className='text-4xl font-bold leading-none tracking-tight text-blueDarkBase text-center dark:text-white my-10'>Consultas</h1>
      <div className='grid grid-cols-1 md:flex md:flex-col lg:grid lg:grid-cols-12 md:gap-3 text-md'>
        <div className='text-md lg:col-start-1 lg:col-end-4 mb-4'>
          { (Array.isArray(departamentos) && Array.isArray(municipios))  && (Array.isArray(puestosDeVotacion) && votosPorCandidatos.length > 0) ?
            <div className='bg-blueBase p-4 rounded-md'>
              <form className='rounded-md'>
                <h2 className='capitalize text-md text-center my-2 text-white'>filtros</h2>
                <div className='flex flex-col mx-auto justify-center'>
                  <label className='mt-2 text-white'>Departamento</label>
                  <select onChange={ handleDepartamento } value={ departamentoSeleccionado !== '' ? departamentoSeleccionado : '' } className='select select-bordered select-sm 2xl:select-md w-full'>
                    <option value={''} disabled>Seleccionar departamento</option>
                    {Array.isArray(departamentos) && departamentos.map(departamento => {
                      return (
                        <option key={`departamento${ departamento?.id_departamento }`} value={ departamento?.id_departamento } > { departamento?.nom_departamento } </option>
                      )
                    })}
                  </select>
                </div>
                <div className='flex flex-col mx-auto justify-center'>
                  <label className='mt-2 text-white'>Municipio</label>
                  <select onChange={ handleMunicipio } value={ municipioSeleccionado !== '' ? municipioSeleccionado : '' }  className='select select-bordered select-sm 2xl:select-md w-full'>
                    <option value={''} disabled>Seleccionar municipio</option>
                    { departamentoSeleccionado === '' ? '' : municipios?.map(municipio => {
                      return (
                        <option key={`municipio${ municipio?.id_municipio }`} value={ municipio?.id_municipio } > { municipio?.nom_municipio } </option>
                      )
                    })}
                  </select>
                </div>
                <div className='flex flex-col mx-auto justify-center'>
                  <label className='mt-2 text-white'>Puestos de votación</label>
                  <select onChange={ handlePuestoDeVotacion } value={ puestoDeVotacionSeleccionado !== '' ? puestoDeVotacionSeleccionado : '' }  className='select select-bordered select-sm 2xl:select-md w-full'>
                    <option value={''} disabled>Seleccionar puesto de votación</option>
                    { municipioSeleccionado === '' ? '' :  puestosDeVotacion?.map(puestodevotacion => {
                      return (
                        <option key={`puestodevotacion${ puestodevotacion?.id_puestodevotacion}`} value={ puestodevotacion?.id_puestodevotacion} > { puestodevotacion?.nom_puestodevotacion } </option>
                      )
                    })}
                  </select>
                </div>
                <div className='flex flex-col mx-auto justify-center'>
                  <label className='mt-2 text-white'>Mesas</label>
                  <select onChange={ handleMesa } value={ mesaSeleccionada !== '' ? mesaSeleccionada : '' }  className='select select-bordered select-sm 2xl:select-md w-full'>
                    <option value={''} disabled>Seleccionar mesa</option>
                    { mesasPorPuestoDeVotacion.map(mesa => {
                      return (
                        <option key={ uuidv4() }>{ mesa.id_mesa }</option>
                      )
                    }) }
                  </select>
                </div>
                <div className='flex flex-col justify-center gap-2 mt-2'>
                  { errorNotification !== '' ? <Notificacion message={ errorNotification } notificationColor={'bg-red-600'} fontColor={ 'text-white' }  /> : '' }
                  {/* <input type='submit' placeholder='Filtrar' className='btn btn-md btn-accent hover:bg-green-600 my-2 capitalize' />  */}
                </div>
              </form>
              { errorNotification === '' && (
                <div className='flex flex-row gap-2 justify-center'>
                  
                  <PDFDownloadLink document={<DocPdf  departamento={ departamentoSeleccionado } municipio={ municipioSeleccionado } puestodevotacion={ puestoDeVotacionSeleccionado } mesa={ mesaSeleccionada } candidatos={ votosPorCandidatos } votosPorOtrasOpciones={ votosPorOtrasOpciones } porcentajeMesasEnviadas={ porcentajeMesasInformadas } />} fileName='informe-elecciones-gobernacion.pdf' className='flex flex-row justify-center'>
                    {({ blob, url, loading, error }) =>
                      (
                        <button className='btn btn-md btn-info my-2 capitalize' >{loading ? 'Cargando...' : 'Descargar informe'}</button>
                      )
                    }
                  </PDFDownloadLink>
                  <button onClick={ handleResetButton} className='btn btn-md btn-warning my-2 capitalize w-auto' > Limpiar </button>
                </div>
              )}
            </div>
              :
              ''
            }
        </div>
        { votosPorCandidatos.length > 0 && (
          <>
            <Suspense fallback={ <Spinner /> } >
              <CardsResultados votosCandidatos={ votosPorCandidatos } votosPorOtrasOpciones={ votosPorOtrasOpciones } setVotosCandidatos={ setVotosPorCandidatos } />
            </Suspense>
          </>
        )}
      </div>
    </div>
  )
}

export default Consultas