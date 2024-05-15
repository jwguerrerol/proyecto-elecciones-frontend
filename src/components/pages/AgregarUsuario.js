import { authorization } from '../../services/usuarios'
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsuariosContext } from '../hooks/UsuariosProvider';
import { urlBase } from '../../utils/utils';
import { spinner } from '../../utils/utils';


function AgregarUsuario() {
  const [ idUsuario, setIdUsuario ] = useState('')
  const [ nombreUsuario, setNombreUsuario] = useState('')
  const [ claveUsuario, setClaveUsuario] =  useState('')
  const [ correoUsuario, setCorreoUsuario] = useState('')
  const [ idRole, setIdRole] = useState('')
  const [ idPuestoDeVotacion, setIdPuestoDeVotacion] = useState('')
  const [ urlImagen, setUrlImagen] = useState('')
  const [ puestosDeVotacion, setPuestosDeVotacion ] = useState([])
  const [ roles, setRoles ] = useState([])
  
  const {usuarios, setUsuarios, userLogged, setUserLogged, token, setToken} = useUsuariosContext()

  const id = Array.isArray(usuarios) && usuarios.length + 1
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${ urlBase }/puestosdevotacion`).then(response => {  
      setPuestosDeVotacion(response.data)
    }) 
  },[])

  useEffect(() => {
    axios.get(`${ urlBase }/roles`).then(response => {  
      setRoles(response.data)
    })
  },[])

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      nom_usuario: '',
      clave_usuario: '',
      correo_usuario: '',
      role_usuario: '',
      id_puestodevotacion: '',
      url_imagen: ''
    }
  })

/*   useEffect(() => {
    axios
    .get(`${ urlBase }/usuarios/${id}`)
    .then(response => {
      console.log({ response })
      setIdUsuario(response.data[0].id_usuario)
      setNombreUsuario(response.data[0].nom_usuario)
      setCorreoUsuario(response.data[0].correo_usuario)
      setIdRole(response.data[0].id_role)
      setIdPuestoDeVotacion(response.data[0].id_puestodevotacion)
      setUrlImagen(response.data[0].url_imagen)
      const urlImagen = response.data[0].url_imagen
      console.log({ urlImagen })
      setUrlImagen(urlImagen)
      const result = response.data
      if (!result.error) {
        
        console.log({ result})
        reset({
          nom_usuario: nombreUsuario,
          clave_usuario: '',
          correo_usuario: correoUsuario,
          role_usuario: idRole,
          id_puestodevotacion: idPuestoDeVotacion,
          url_imagen: urlImagen
        })
      } else {
        reset({
            nom_usuario: '',
            clave_usuario: '',
            correo_usuario: '',
            role_usuario: '',
            id_puestodevotacion: '',
            url_imagen: ''
          })
      }
    })
  },[reset, id, correoUsuario, nombreUsuario, idRole, idPuestoDeVotacion, urlImagen])
 */
  const onSubmit = async(data) => {

    spinner('.contenedor-boton-enviar',['.boton-enviar'])

    console.log({ data })

    const formData = new FormData()

    formData.append('id_usuario', id)
    formData.append('nom_usuario' , data.nom_usuario)
    formData.append('clave_usuario', data.clave_usuario)
    formData.append('correo_usuario', data.correo_usuario)
    formData.append('id_role', data.id_role )
    formData.append('id_puestodevotacion', data.id_puestodevotacion)
    formData.append('url_imagen', data.url_imagen ? data.url_imagen[0] : '')

    console.log({ formData})

    axios.post(`${ urlBase }/usuarios`, formData, authorization).then(response => {
      console.log(response.data)
      navigate('/usuarios')
    })
  }

  const volverAtras = () => {
    navigate(-1)
  }

  return (
    <div className='container'>
      <div className='flex flex-row justify-end'>
        <button onClick={ volverAtras } className='btn bt-sm bg-neutral text-white mt-4 hover:bg-blueBase transition-all'>Atrás</button>
      </div>
      <h1 className="text-4xl font-bold leading-none tracking-tight text-blueBase text-center dark:text-white my-10">Agregar Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form container md:px-20 p-8 text-white md:max-w-lg bg-white shadow-custom-card rounded-md">
      {/* <img src={ `${ urlBase }/uploads/images/users/user-icon.png` } alt='foto usuario' className='h-20 w-auto mx-auto my-4 rounded-sm' /> */}

        <div className="mb-4">
          <label className="label text-md text-blueBase rounded-md py-0 px-2 my-1 capitalize">nombre completo:</label>
          <Controller 
            name = 'nom_usuario'
            control = {control}
            value={nombreUsuario}
            rules={{
              required: { message: 'El nombre es requerido'},
              minLength: {value: 3, message: 'El nombre debe tener al menos 3 caracteres'},
              maxLength: {value: 20, message: 'El nombre debe tener máximo 100 caracteres'}
            }}
            render={({field}) => (
              <input type="text" id="nom_usuario" name="nom_usuario" className="input input-bordered w-full text-black form-control capitalize" {...register('nom_usuario')} required/>
            )}
          />
          {errors.nom_usuario && <span className="text-red-500 text-xs italic">{errors.nom_usuario.message}</span>}
        </div>
        
        
        <div className="mb-4">
          <label className="label text-md text-blueBase rounded-md py-0 px-2 my-1 capitalize">Contraseña:</label>

          <Controller 
            name = 'clave_usuario'
            control = {control}
            rules={{
              required: {value: true, message: 'La contraseña es requerida'},
              minLength: {value: 3, message: 'La contraseña debe tener al menos 3 caracteres'},
              maxLength: {value: 20, message: 'La contraseña debe tener máximo 20 caracteres'}
            }}
            render={({field}) => (
              <input id="clave_usuario" type='password' name="clave_usuario" className="input input-bordered w-full text-black form-control" {...register('clave_usuario')} required/>
            )}
          />
          {errors.clave_usuario && <span className="text-red-500 text-xs italic">{errors.clave_usuario.message}</span>}
        </div>
        
        <div className="mb-4">
          <label className="label text-md text-blueBase rounded-md py-0 px-2 my-1 capitalize">Correo:</label>

          <Controller 
            name = 'correo_usuario'
            control = {control}
            value={correoUsuario}
            rules={{
              required: {value: true, message: 'El correo es requerido'},
              minLength: {value: 3, message: 'El correo debe tener al menos 3 caracteres'},
              maxLength: {value: 20, message: 'El correo debe tener máximo 20 caracteres'}
            }}
            render={({field}) => (
              <input type="email" id="correo_usuario" name="correo_usuario" className="input input-bordered w-full text-black form-control" {...register('correo_usuario')} required/>
            )}
          />
          {errors.correo_usuario && <span className="text-red-500 text-xs italic">{errors.correo_usuario.message}</span>}

        </div>
        
        <div className="mb-4">
          <label className="label text-md text-blueBase rounded-md py-0 px-2 my-1 capitalize">Role:</label>

          <Controller 
            name = 'id_role'
            control = {control}
            value={ idRole }
            rules={{
              required: {value: true, message: 'El role es requerido'}
            }}
            render={({field}) => (
              <select className="input input-bordered w-full text-black form-control" {...register('id_role')} required>
                { roles.map( role => {
                  return <option key={ role?.id_role } value={ role?.id_role }>{ role?.nom_role } ({ role?.id_role})</option>
                })}
              </select>
            )}
          />
          {errors.id_role && <span className="text-red-500 text-xs italic">{errors.id_role.message}</span>}
        </div>

        <div className="mb-4">
          <label className="label text-md text-blueBase rounded-md py-0 px-2 my-1 capitalize">Puesto de votación asignado:</label>
             <Controller 
              name = 'id_puestodevotacion'
              control = {control}
              value={idPuestoDeVotacion}
              rules={{
                required: {value: true, message: 'El puesto de votación es requerido'}
              }}
              render={({field}) => (
                <select className="input input-bordered w-full text-black form-control uppercase" {...register('id_puestodevotacion')} required>
                { puestosDeVotacion.map( puestodevotacion => {
                  return <option key={ puestodevotacion.id_puestodevotacion } value={ puestodevotacion.id_puestodevotacion }>{ puestodevotacion.nom_puestodevotacion } - {puestodevotacion.nom_municipio}</option>
                })}
              </select>
              )}
            />
            {errors.id_puestodevotacion && <span className="text-red-500 text-xs italic">{errors.id_puestodevotacion.message}</span>}
        </div>

        <div className="mb-4">
          <label className="label text-md text-blueBase rounded-md py-0 px-2 my-1 capitalize">Subir imagen (opcional):</label>
          <Controller
            name = 'url_imagen'
            control = {control}
            render={({field}) => (
              <>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-slate-900 focus:border-primary focus:text-white focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary text-sm"
                  type="file"
                  id="formFile" 
                  {...register('url_imagen')}
                  accept="image/jpeg, image/jpg, image/png, image/gif"
                  />
                {errors.url_imagen && <p className='px-1 text-red-400'>{errors.url_imagen.message}</p>}
              </>
            )}
          />
        </div>

        <div className="flex justify-center contenedor-boton-enviar">
          <button type="submit" className="btn btn-success boton-enviar md:w-72">Agregar usuario</button>
        </div>
      </form>
    </div>
  )
}

export default AgregarUsuario
