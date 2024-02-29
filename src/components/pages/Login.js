import axios from "axios"
import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { useUsuariosContext } from "../hooks/UsuariosProvider"
import { useForm } from "react-hook-form"
import logo from '../../images/logo-sisprecas-soft.png'
import Notificacion from "../ui/Notificacion"
import { urlBase } from "../../utils/utils"

const Login = () => {

  const [ errorNotification, setErrorNotification ] = useState('')

  const { register, formState: { errors }, handleSubmit } = useForm({
  defaultValues : {
    correo_usuario : '',
    clave_usuario : ''
  }
})

  const onSubmit = async(data) => {
    axios.post(`${ urlBase }/login`,data)
    .then( response => {
      const serverToken = response.data
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(serverToken)
        )
      setToken(serverToken)
      setUserLogged(token)
      /* navigate('/dashboard') */
    })
    .catch(error => {
      console.log({ error })
      console.log(error.message)
      const message = error.response.data.error
      if (message === 'Email o contraseña incorrectos') {
        setErrorNotification(message)
        setTimeout(() => {
          setErrorNotification('')
        },5000)
      }
    })
  }

  const {userLogged, setUserLogged, token, setToken} = useUsuariosContext()

  const navigate = useNavigate()

  const showForm = {
    display : !userLogged ? 'block' : 'none' 
  }

  const validationStyle = errors.correo_usuario ? { border: '2px solid red' } : { border: '2px solid green' }
  
  return (

      <div className="container" style={ showForm }>
         { 
          (userLogged && userLogged.role === 1) ? <Navigate to='/consulta-envios'/> 
          : (userLogged && userLogged.role === 3) ? <Navigate to='envios'/> 
          : (userLogged && userLogged.role === 2) && <Navigate to='/consultas'/>}
        {/* <p>{ userLogged ? userLogged?.email : '' }</p> */}
          <div className="flex flex-col gap-2 justify-center items-center m-10">
            <img src={ logo } alt='logo sisprecas soft' className=' h-20' />
             <h1 className="text-4xl font-bold leading-none tracking-tight text-white text-center dark:text-white">Sisprecas Soft</h1>          
          </div>

{/*          <h2 className="text-2xl font-bold leading-none tracking-tight text-white text-center dark:text-white my-10">Iniciar Sesión</h2>
 */}         <form onSubmit={handleSubmit(onSubmit)}  className="text-white p-5 mt-5 md:max-w-lg mx-auto rounded-md bg-slate-900">
          <div className=" border-2-blue-700 border-spacing-2 mt-2">
            <label className=" text-md text-md bg-slate-800 rounded-md py-0 px-2 my-1 capitalize">Correo electrónico</label>
            <input className="input w-full text-md mt-2 text-gray-900" type="email" placeholder="Ingrese su correo electrónico"  {...register('correo_usuario', {
              required: true
            })}
            aria-invalid={ errors.correo_usuario ? "true" : "false"}
            autoComplete="email"
            style={ validationStyle }
            />
          </div>
          { errors.correo_usuario?.type === 'required' && (
            <Notificacion message={ 'El correo electrónico es requerido' } notificationColor={'bg-red-800'} fontColor={'text-white'} />
          )}
          <div className="mt-2">
            <label className=" text-md text-md bg-slate-800 rounded-md py-0 px-2 my-1 capitalize mt-2">Contraseña</label>
            <input className="input w-full text-md text-gray-900" type="password" placeholder="Ingrese su contraseña"  autocompleted='password' 
            {...register('clave_usuario', {
              required: true
            })} 
            aria-invalid={ errors.clave_usuario ? 'true' : 'false' } 
            style={ validationStyle }
            />
          </div>
            {
              errors.clave_usuario?.type === 'required' && (
                <Notificacion message={ 'Campo obligatorio'} notificationColor={'bg-red-800'} fontColor={'text-white'} />
              )
            }
            { errorNotification !== '' ? <Notificacion message={ errorNotification } notificationColor={ 'bg-red-800' } fontColor={ 'text-white' } /> : '' }
          <div className="flex flex-col items-center">
            <button className="btn btn-accent mt-3 hover:bg-green-700" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
  )
}

export default Login
