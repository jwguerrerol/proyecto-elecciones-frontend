import axios from "axios"
import { Controller, useForm } from 'react-hook-form'
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useMesasContext } from "../hooks/MesasProvider"
import { useUsuariosContext } from '../hooks/UsuariosProvider'
import { authorization } from "../../services/usuarios"
import Notificacion from '../ui/Notificacion'
import Modal from '../ui/Modal'
import { modoSoloLectura, urlBase, spinner } from '../../utils/utils'

const FormularioE14 = () => {

  const [ candidatos, setCandidatos ] = useState({})
  /* const [ imagenFormularioE14, setImagenFormularioE14 ] = useState('') */
  const [ urlImagenFormularioE14, setUrlImagenFormularioE14 ] = useState('')
  /* const [ modoEdicionFormularioEnviado, setModoEdicionFormularioEnviado ] = useState(false) */
  /* const [ imagenPorDefecto, setImagenPorDefecto ] = useState('') */
  const [ mesasEnviadasActualizadas, setMesasEnviadasActualizadas ] = useState(false)

  const [ errorNotification, setErrorNotification ] = useState('')

  const { id_municipio, nom_municipio, id_departamento, nom_departamento, nom_puestodevotacion } = useMesasContext() 
  const  { userLogged }  = useUsuariosContext()

  const navigate = useNavigate();
  const { id_puestodevotacion, id_mesa } = useParams()

  const formSelected = document.querySelector('#form-formularioe14')

  let notificacionDeValidaciones = false;

  if( document.querySelector('#modal-inside')){
    notificacionDeValidaciones = false
  }

  useEffect(() => {
    axios
      .get(`${ urlBase }/candidatos`)
      .then(response => {
        setCandidatos(response.data)
      })
  },[setCandidatos])

  useEffect(() => {
    axios
      .get(`${  urlBase }/consultas/mesas-enviadas`)
      .then(response => {
        const resultado = response.data
        console.log({ resultado })
        const mesasEnviadasFiltradas = resultado.filter(mesa => mesa.id_puestodevotacion === Number(id_puestodevotacion) && mesa.id_mesa === Number(id_mesa))
        const validacionDeMesaEnviada = mesasEnviadasFiltradas.length > 0 ? true : false
        console.log({ mesasEnviadasFiltradas})
        console.log({ validacionDeMesaEnviada })
        setMesasEnviadasActualizadas(validacionDeMesaEnviada)
      })
  }, [id_mesa, id_puestodevotacion])

  /* useEffect(() => {
    axios.get(`${ urlBase }/consultas/mesas-enviadas/${ id_puestodevotacion }/${userLogged.id}`).then(response => {
      setMesasEnviadas(response.data)
    }
  )}, [setMesasEnviadas, id_puestodevotacion, userLogged.id]) */

  useEffect(() => {
    errorNotification !== '' && document.querySelector('#modal').remove()
  }, [errorNotification, setErrorNotification])

  const { register, formState:{errors}, control, handleSubmit, reset, clearErrors, getValues, watch } = useForm()

  useEffect(() => {
    axios
    .get(`${ urlBase }/formulariose14/${ id_puestodevotacion }/${ id_mesa }`)
    .then(response => {
      const imagenE14 = response.data.url_imagen_e14
      setUrlImagenFormularioE14(imagenE14)
      const result = response.data
      /* setImagenPorDefecto(result.url_imagen_e14) */
      
      if (!result.error) {
        /* imagenE14 && setImagenFormularioE14(imagenE14.slice(17)) */
        reset({
          ...result,
          id_departamento: nom_departamento,
          id_municipio : nom_municipio,
          id_puestodevotacion: nom_puestodevotacion,
          id_mesa: id_mesa,
          id_usuario: userLogged.id
          })
      } else {

        reset({
          id_departamento: nom_departamento,
          id_municipio : nom_municipio,
          id_puestodevotacion: nom_puestodevotacion,
          id_mesa: id_mesa,
          id_usuario: userLogged.id,
          votos_incinerados:0,
          total_sufragantes:0,
          total_votos_urna: 0,
          votos_candidato1: 0,
          votos_candidato2: 0,
          votos_candidato3: 0,
          votos_candidato4: 0,
          votos_candidato5: 0,
          votos_candidato6: 0,
          votos_candidato7: 0,
          votos_candidato8: 0,
          votos_candidato9: 0,
          votos_blancos: 0,
          votos_nulos: 0,
          votos_no_marcados: 0,
          total_votosmesa: 0,
          observaciones: 'Ninguna',
          url_imagen_e14: null,
          created_at: ''
          })
      }
    })
  },[id_mesa, id_puestodevotacion, nom_departamento, nom_municipio, nom_puestodevotacion, userLogged.id, reset])

  const onSubmit = async(data) => {

    spinner('.modal-box',['p', 'div'])

    console.log({ data })

    const formData = new FormData()

    formData.append('id_departamento', Number(id_departamento))
    formData.append('id_municipio' , Number(id_municipio))
    formData.append('id_puestodevotacion', Number(id_puestodevotacion))
    formData.append('id_mesa', Number(id_mesa) )
    formData.append('id_usuario', Number(userLogged.id))
    formData.append('votos_incinerados',data.votos_incinerados)
    formData.append('total_sufragantes',data.total_sufragantes)
    formData.append('total_votos_urna', data.total_votos_urna)
    formData.append('votos_candidato1', data.votos_candidato1)
    formData.append('votos_candidato2', data.votos_candidato2)
    formData.append('votos_candidato3', data.votos_candidato3)
    formData.append('votos_candidato4', data.votos_candidato4)
    formData.append('votos_candidato5', data.votos_candidato5)
    formData.append('votos_candidato6', data.votos_candidato6)
    formData.append('votos_candidato7', data.votos_candidato7)
    formData.append('votos_candidato8', data.votos_candidato8)
    formData.append('votos_candidato9', data.votos_candidato9)
    formData.append('votos_blancos', data.votos_blancos)
    formData.append('votos_nulos', data.votos_nulos)
    formData.append('votos_no_marcados', data.votos_no_marcados)
    formData.append('total_votosmesa', data.total_votosmesa)
    formData.append('observaciones', data.observaciones)
    formData.append('url_imagen_e14', data.url_imagen_e14[0])
    formData.append('estado_envio_mesa', true)
    /* if ( Array.isArray(mesasEnviadas) && !mesasEnviadas.includes(Number(id_mesa))) {
      
    } */

    
    /* data.id_usuario = idUserLogged
    data.id_departamento = id_departamento
    data.id_municipio = id_municipio
    data.id_puestodevotacion = id_puestodevotacion
    data.url_imagen_e14 = data.url_imagen_e14[0] */

    /* if (Array.isArray(mesasEnviadas) && !mesasEnviadas.includes(Number(id_mesa))) {
      axios.post(`${ urlBase }/mesas`, formData, authorization).then(response => {
        console.log(response.data)
        return navigate('/envios')
      })
    } else {
      axios.put(`${ urlBase }/mesas/${ id_mesa }`, formData, authorization).then(response => {
        console.log(response.data)
        return navigate('/envios')
      })
    }
 */
    axios.put(`${ urlBase }/mesas/${ id_mesa }`, formData, authorization).then(response => {
      console.log(response.data)
      return navigate('/envios')
    })

  }

  const crearNotificacion = (type, message) => {
    return <Notificacion alertType={ type } message={ message } width='md:w-6/12' />
  }

  let barraDeNotificaciones = ''

  if (formSelected && mesasEnviadasActualizadas ) {
    userLogged?.role !== 1 &&  modoSoloLectura(formSelected)
    barraDeNotificaciones = crearNotificacion('alert-success','La mesa ya fue enviada')
  }

  const votosCandidato1 = Number(watch('votos_candidato1'))
  const votosCandidato2 = Number(watch('votos_candidato2'))
  const votosCandidato3 = Number(watch('votos_candidato3'))
  const votosCandidato4 = Number(watch('votos_candidato4'))
  const votosCandidato5 = Number(watch('votos_candidato5'))
  const votosCandidato6 = Number(watch('votos_candidato6'))
  const votosCandidato7 = Number(watch('votos_candidato7'))
  const votosCandidato8 = Number(watch('votos_candidato8'))
  const votosCandidato9 = Number(watch('votos_candidato9'))
  const votosBlancos = Number(watch('votos_blancos'))
  const votosNulos = Number(watch('votos_nulos'))
  const votosNoMarcados = Number(watch('votos_no_marcados'))

  const cantidadDeVotos = votosCandidato1 + votosCandidato2 + votosCandidato3 + votosCandidato4 + votosCandidato5 + votosCandidato6 + votosCandidato7 + votosCandidato8 + votosCandidato9 + votosNulos + votosNoMarcados + votosBlancos

  const totalVotosUrna = Number(watch('total_votos_urna'))

  if( errors.total_votos_urna?.message === 'Los votos en urna deben coincidir con la suma de votos válidos, blancos y nulos(incluyen los no marcados)' && totalVotosUrna === cantidadDeVotos){
    clearErrors('total_votos_urna')
  }

  // Deshabilitar efecto de scroll en campos númericos
  const inputs =  document.querySelectorAll('input')
  inputs.forEach(input => {
    input.addEventListener('wheel', (e) => {
      e.preventDefault()
    })
  })
  

  return (
    <div className='container'>
      <div className="text-white flex flex-col items-center">
        <div className='mx-auto w-full'>
          <p className="p-2 rounded-md bg-gray-200 text-black my-4 text-sm font-semibold hidden">Nota: Por favor verifique la información del formato E14 antes de enviarla. Recuerda que cada envío de información es su responsabilidad.</p>
          { barraDeNotificaciones }
        </div>
        <p className="text-4xl font-bold leading-none tracking-tight text-blueBase text-center dark:text-white my-10">Formulario E14</p>
        <div className='container'>
          <form id='form-formularioe14' onSubmit={handleSubmit(onSubmit)} className='mx-auto md:mx-10 lg:w-min'>
            <div className='bg-blueBase rounded-md my-3 px-5'>
              <div className="flex lg:flex flex-col md:grid md:grid-cols-2 lg:flex-row lg:justify-around gap-3 mt-2 mb-2 px-4">
                <div className="flex flex-col md:grid md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 lg:flex-row lg:items-center">
                  <p className="mr-2 mb-1 text-sm">Departamento:</p>
                  <input className='input input-sm text-center text-black w-full' disabled type="text" {...register('id_departamento')}/>
                </div>
                <div className="flex flex-col md:grid md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 lg:flex-row lg:items-center">
                  <p className="mr-2 mb-1 text-sm">Municipio:</p>
                  <input className='input input-sm text-center text-black '  disabled type="text" {...register('id_municipio')} />
                </div>
                <div className="flex flex-col md:grid md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 lg:flex-row lg:items-center">
                  <p className="mr-2 mb-1 text-sm">Puesto:</p>
                  <input className='input input-sm text-center text-black ' disabled type="text" {...register('id_puestodevotacion')} />
                </div>
                <div className="flex flex-col md:grid md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 lg:flex-row lg:items-center">
                  <p className="mr-2 mb-1 text-sm">Mesa</p>
                  <input className='input input-sm text-center text-black ' disabled type="text" {...register('id_mesa')} />
                </div>
              </div>
              <div className='grid  md:grid-cols-3 mt-2'>
                <div className="flex flex-col items-center justify-center md:justify-end lg:justify-center my-2">
                  <label className='mb-2 text-sm text-center'>Total de sufragantes formato e11</label>
                  <Controller 
                    name='total_sufragantes'
                    control={control}
                    rules={
                      {
                        required: 'Campo requerido',
                        pattern: { 
                          value: /^[0-9]+$/, 
                          message: 'Número inválido'
                        },
                        validate: (value) => {
                          const cantidadVotosUrna = Number(watch('total_votos_urna'))

                          if( Number(value) < cantidadVotosUrna ){
                            return 'El total de votos de sufragantes debe ser mayor o igual que el total de votos en urna)'
                          }
                          if( Number(value) === 0) {
                            return 'El total de votos de sufragantes no debe ser cero'
                          }
                        }
                      }
                    }
                    render={({ field }) => (
                      <>
                        <input className='input input-sm text-center text-black text-sm' type="number" {...register('total_sufragantes')} />
                      </>
                    )}
                  />
                  { errors.total_sufragantes && (notificacionDeValidaciones = true )}
                  { errors.total_sufragantes && <p className='px-1 text-red-400'>{ errors.total_sufragantes.message }</p> }
                </div>
                <div className="flex flex-col items-center justify-center md:justify-end lg:justify-center  my-2">
                  <label className='text-sm'>Total de votos en la urna</label>
                  <Controller 
                    name='total_votos_urna'
                    control={control}
                    rules={
                      {
                        required: 'Campo requerido',
                        pattern: { 
                          value: /^[0-9]+$/, 
                          message: 'Número inválido'
                        },
                        validate: (value) => {

                          console.log(`1 tipo ${typeof(cantidadDeVotos)}: ${ cantidadDeVotos }`)
                          console.log(`2 tipo ${typeof(getValues('votos_candidato1'))}: ${getValues('votos_candidato1')}`)
                          console.log((Number(value) !== cantidadDeVotos))

                          if( Number(value) === 0) {
                            return 'El total de votos en urna no debe ser cero'
                          }
                          if( (Number(value) !== Number(cantidadDeVotos))){
                            return 'Los votos en urna deben coincidir con la suma de votos válidos, blancos y nulos(incluyen los no marcados)'
                          }
                          /* if(Number(value > Number(watch('total_sufragantes')))){
                            return 'El total de votos en urna no debe ser mayor que el total de votos de los sufragantes'
                          } */
                        }
                      }
                    }
                    render={({ field }) => (
                      <>
                        <input className='input input-sm text-center text-black text-sm' type="number" {...register('total_votos_urna')} />
                      </>
                    )}
                  />
                  { errors.total_votos_urna && (notificacionDeValidaciones = true )}
                  {errors.total_votos_urna && <p className='px-1 text-red-400'>{ errors.total_votos_urna.message }</p>}
                </div>
                <div className="flex flex-col items-center justify-center md:justify-end lg:justify-center  my-2">
                  <label className='text-sm'>Total de votos incinerados</label>
                  <Controller 
                    name='votos_incinerados'
                    control={control}
                    rules={
                      {
                        required: 'Campo requerido',
                        pattern: { 
                          value: /^[0-9]+$/, 
                          message: 'Número inválido'
                        }
                      }
                    }
                    render={({ field }) => (
                      <>
                        <input className='input input-sm text-center text-black text-sm ' type="number" {...register('votos_incinerados')} />
                      </>
                    )}
                  />
                  { errors.votos_incinerados && (notificacionDeValidaciones = true )}
                  {errors.votos_incinerados && <p className='px-1 text-red-400'>{ errors.votos_incinerados.message }</p>}
                </div>
              </div>
            </div>
            { Array.isArray(candidatos) &&  candidatos.map( (candidato, index) => {
              return (
                <div key={ candidato.id_candidato } className="grid md:grid-cols-10 border-spacing-1 my-1 md:my-1 rounded-md bg-blueBase py-1 md:py-0  px-5 text-sm gap-1 h-min">
                  <div className="flex flex-row justify-center md:justify-normal items-center md:col-start-1 md:col-end-2">
                    <p>{candidato.id_candidato}</p>
                  </div>
                  <div className="flex flex-row justify-center md:justify-normal items-center md:col-start-2 md:col-end-4">
                    <img src={ candidato?.logo_partido } alt="candidato" className=" h-7 my-2 rounded-md" />
                  </div>
                  <div className="flex flex-row justify-center md:justify-normal items-center md:col-start-4 md:col-end-9">
                    <p className='text-center'>{ candidato.nom_candidato }</p>
                  </div>
                  <div className="flex flex-row justify-center md:justify-normal items-center md:col-start-9 md:col-end-11">
                  <Controller 
                    name={ `votos_candidato${ candidato.id_candidato }` }
                    control={control}
                    rules={
                      {
                        required: 'Campo requerido',
                        pattern: { 
                          value: /^[0-9]+$/, 
                          message: 'Número inválido'
                        }
                      }
                    }
                    render={({ field }) => (
                      <>
                        <input className="input input-sm text-center text-sm text-black md:w-full" type="number" {...register(`votos_candidato${ candidato.id_candidato }`)} />
                      </>
                    )}
                  />
                  { errors[`votos_candidato${ candidato.id_candidato }`] && (notificacionDeValidaciones = true )}
                  {errors[`votos_candidato${ candidato.id_candidato }`] && <p className='px-1 text-red-400'>{ errors[`votos_candidato${ candidato.id_candidato }`].message }</p>}
                  </div>
                </div>
                
              )
            })}
            <div className=" flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row justify-center lg:justify-around items-center bg-blueBase rounded-md my-3 px-5 py-1 ">
              <div className='md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 flex flex-col items-center'>
                <p className='mb-1 text-sm text-center'>Votos en blanco</p>
                <Controller 
                    name='votos_blancos'
                    
                    control={control}
                    rules={
                      {
                        required: 'Campo requerido',
                        pattern: { 
                          value: /^[0-9]+$/, 
                          message: 'Número inválido'
                        }
                      }
                    }
                    render={({ field }) => (
                      <>
                        <input className=" input input-sm text-center text-black text-sm" type="number" {...register('votos_blancos')} />
                      </>
                    )}
                  />
                  { errors.votos_blancos && (notificacionDeValidaciones = true )}
                  {errors.votos_blancos && <p className='px-1 text-red-400'>{ errors.votos_blancos.message }</p>}
                
              </div>
              <div className='md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 flex flex-col items-center'>
                <p className='mb-1 text-sm text-center'>Votos en nulos</p>
                <Controller 
                    name='votos_nulos'
                    control={control}
                    rules={
                      {
                        required: 'Campo requerido',
                        pattern: { 
                          value: /^[0-9]+$/, 
                          message: 'Número inválido'
                        }
                      }
                    }
                    render={({ field }) => (
                      <>
                        <input className=" input input-sm text-center text-black text-sm" type="number" {...register('votos_nulos')} />
                      </>
                    )}
                  />
                  { errors.votos_nulos && (notificacionDeValidaciones = true )}
                  {errors.votos_nulos && <p className='px-1 text-red-400'>{ errors.votos_nulos.message }</p>}
                
              </div>
              <div className='md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 flex flex-col items-center'>
                <p className='mb-1 text-sm text-center'>Votos no marcados</p>
                <Controller 
                    name='votos_no_marcados'
                    control={control}
                    rules={
                      {
                        required: 'Campo requerido',
                        pattern: { 
                          value: /^[0-9]+$/, 
                          message: 'Número inválido'
                        }
                      }
                    }
                    render={({ field }) => (
                      <>
                        <input className=" input input-sm text-center text-black text-sm" type="number" {...register('votos_no_marcados')} />
                      </>
                    )}
                  />
                  { errors.votos_no_marcados && (notificacionDeValidaciones = true )}
                  {errors.votos_no_marcados && <p className='px-1 text-red-400'>{ errors.votos_no_marcados.message }</p>}
              </div>
              <div className='md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 flex flex-col items-center'>
                <p className='mb-1 text-sm text-center'>Total votos_mesa</p>
                <Controller 
                    name='total_votosmesa'
                    control={control}
                    rules={
                      {
                        required: 'Campo requerido',
                        pattern: { 
                          value: /^[0-9]+$/, 
                          message: 'Número inválido'
                        },
                        validate: (value) => { 
                          const cantidadVotosUrna = Number(watch('total_votos_urna'))

                          if( Number(value) !== cantidadVotosUrna){
                            return 'El total de votos de la mesa deben coincidir con el total de votos de la urna'
                          }
                          if( Number(value) === 0) {
                            return 'El total de votos en la mesa no debe ser cero'
                          }
                        }
                      }
                    }
                    render={({ field }) => (
                      <>
                        <input className=" input input-sm text-center text-black mx-auto" type="number" {...register('total_votosmesa')} />
                      </>
                    )}
                  />
                  { errors.total_votosmesa && (notificacionDeValidaciones = true )}
                  {errors.total_votosmesa && <p className='px-1 text-red-400'>{ errors.total_votosmesa.message }</p>}
                
              </div>
            </div>
            <div className="mt-3 px-5 py-2  bg-blueBase rounded-tr-md rounded-tl-md">
              <label className="mb-2 inline-block text-white text-sm">
                Subir foto del formato E14
              </label>
              { mesasEnviadasActualizadas  ? (
                <>
                  
                  { urlImagenFormularioE14 !== '' &&
                    <div className='my-2'>
                      <p>Archivo enviado:</p>
                      <img src={ `${ urlImagenFormularioE14 }` } alt='imagen subida formulario e14' className='h-10'/>
                    </div>
                  }  
                
                </>
              )
              :
              ''
              }
              { !mesasEnviadasActualizadas && (
                <>
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blueBase focus:border-primary focus:text-white focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary text-sm"
                    type="file"
                    id="formFile" 

                    {...register('url_imagen_e14', { 
                      required: 'Por favor, seleccione la foto a subir del formulario',
                      validate: {
                      /* maxSize: (file) =>
                        file[0]?.size <= 5242880 || 'El tamaño máximo permitido es de 5MB', */
                      acceptedTypes: (file) =>
                        ['image/jpeg', 'image/png', 'image/jpg'].includes(file[0]?.type) ||
                        'Solo se permiten archivos de imagen (JPEG o PNG)',
                    }})}
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    />
                    { errors.url_imagen_e14 && (notificacionDeValidaciones = true )}
                    {errors.url_imagen_e14 && <p className='px-1 text-red-400'>{errors.url_imagen_e14.message}</p>}
                </>
              )
              }
              { mesasEnviadasActualizadas && userLogged.role === 1 && (
                <>
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blueBase focus:border-primary focus:text-white focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary text-sm"
                    type="file"
                    id="formFile" 
                    {...register('url_imagen_e14')}
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    /* max={5242880} */
                    />
                    { errors.url_imagen_e14 && (notificacionDeValidaciones = true )}
                    {errors.url_imagen_e14 && <p className='px-1 text-red-400'>{errors.url_imagen_e14.message}</p>}
                </>
              )
              }
              
            </div>
            <div className='bg-blueBase rounded-br-md rounded-bl-md mb-3 px-5 py-2 '>
              <label className="mb-2 inline-block text-white dark:text-white text-sm">
                Observaciones
              </label>
              <textarea className='textarea mb-2 p-1 w-full text-black text-sm' {...register('observaciones')}></textarea>
            </div>
            { errorNotification !== '' && (
              <>
                <Notificacion message={ errorNotification } notificationColor='bg-red-600' fontColor='text-white' />
              </>
            )}
            <div className="flex flex-row justify-center my-5">
              { !mesasEnviadasActualizadas  &&
              <Modal
              textButtonOpen={'Enviar'} textButtonClose={notificacionDeValidaciones ? 'Solucionar' : 'Cancelar'} textTitle={ notificacionDeValidaciones ? 'Validación del formulario' : 'Enviar formulario'} textParagraph={ notificacionDeValidaciones ? 'Solucionar errores antes de enviar el formulario' : 'Nota: Por favor verifique la información del formato E14 antes de enviarla. Recuerda que cada envío de información es responsabilidad de usted.'}>
                { !notificacionDeValidaciones && (
                  <input htmlFor="my_modal_6" id='enviarFormularioE14' type="submit" value={ 'enviar' } className="input btn btn-success"/>
                ) }
              </Modal>
              }
              { mesasEnviadasActualizadas && userLogged?.role === 1 &&
              <Modal
              textButtonOpen={'Editar'} textButtonClose={notificacionDeValidaciones ? 'Solucionar' : 'Cancelar'} textTitle={ notificacionDeValidaciones ? 'Validación del formulario' : 'Enviar formulario'} textParagraph={ notificacionDeValidaciones ? 'Solucionar errores antes de enviar el formulario' : 'Nota: Por favor verifique la información del formato E14 antes de enviarla. Recuerda que cada envío de información es responsabilidad de usted.'}>
                { !notificacionDeValidaciones && (
                  <input htmlFor="my_modal_6" id='enviarFormularioE14' type="submit" value={ 'Actualizar formulario' } className="input btn btn-success"/>
                ) }
              </Modal>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormularioE14