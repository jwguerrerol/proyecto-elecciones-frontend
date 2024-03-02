import { useMatch, Link, useNavigate } from 'react-router-dom';
import userIcon from '../../images/user-icon.png'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { urlBase } from '../../utils/utils';

const DetalleUsuario = () => {

  const [ usuario, setUsuario ] = useState(null)
  const match = useMatch('/usuarios/:id')
  const id = match.params.id

  useEffect(() => {
    axios.get(`${urlBase}/usuarios/${id}`).then(response => {
      /* console.log(response.data[0]) */
      setUsuario(response.data[0])
  })}, [id] )

  const style = {
    fontFamily: 'Lobster',
    color: 'white',
    fontSize: '2rem'
  }

  const navigate = useNavigate()

  const volverAtras = () => {
    navigate(-1)
  }

  return (
    <div className=' container text-white'>
      <div className='flex flex-row justify-end'>
        <button onClick={ volverAtras } className='btn bt-sm bg-neutral text-white mt-4 hover:bg-blueBase transition-all'>Atrás</button>
      </div>
      <div>
        <div className='center'>
          <h1 className="text-4xl font-bold leading-none tracking-tight text-blueBase text-center dark:text-white my-10 capitalize"> { usuario?.nom_usuario } </h1>
        </div>
        <div className='flex flex-col justify-center items-center mx-auto bg-white md:w-8/12 lg:w-4/12 px-5 py-4 rounded-md text-md shadow-custom-card'>
          <div className='flex justify-center items-center'>
            <img src={ usuario?.url_imagen  && usuario?.url_imagen !== '' ? `${ usuario.url_imagen }` : userIcon } className='h-32 rounded-md w-auto' alt={'user-icon'} />
          </div>
          <div className='w-full px-5 mt-5 mb-2 flex flex-col gap-2 '>
            <div className='flex flex-col'>
              <p className='text-md text-grayLightBase rounded-md'>Correo electrónico: </p>  
              <p className='text-blueBase'> { usuario?.correo_usuario } </p>  
            </div>
            <div className='flex flex-col'>
              <p className='text-md text-grayLightBase rounded-md'>Role: </p>
              <p className='text-blueBase'> { usuario?.nom_role }</p>
            </div>
            <div className='flex flex-col'>
              <span className='text-md text-grayLightBase rounded-md'>Puesto de votación asignado: </span>
              <p className='text-blueBase'> { usuario?.nom_puestodevotacion} ({ usuario?.id_puestodevotacion})</p>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center mt-3'>
            <Link to={`/usuarios/${ id }/edit`} className='btn btn-md btn-warning capitalize hover:text-white w-48 md:w-72'>Editar</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleUsuario
