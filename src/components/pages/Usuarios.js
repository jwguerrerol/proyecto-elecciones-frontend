import { Link } from 'react-router-dom'
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { deleteUsuario } from "../../services/usuarios"
import { useUsuariosContext } from "../hooks/UsuariosProvider"
import { useEffect } from 'react'
import { useState } from 'react'
import { urlBase } from '../../utils/utils'

const Usuarios = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { usuarios, setUsuarios } = useUsuariosContext()

  useEffect(() => {
    axios.get(`${ urlBase }/usuarios`).then(response => {
      setUsuarios(response.data)
    }) 
  }, [setUsuarios])

  const handleDeleteUsuario = (id, clave) => {
    const userToDelete = {
      id_usuario : id,
      clave_usuario: clave
    }

    deleteUsuario(id, userToDelete).then(response => {
      console.log('usuario eliminado')
    })

    axios.get(`${ urlBase }/usuarios`).then(response => {
      const newUsuarios = response.data
      setUsuarios(newUsuarios)
    }) 
  }
  
  return (
    <div className='container mx-auto max-w-7xl'>
      <div className="text-white">
        <h1 className="text-4xl font-bold leading-none tracking-tight text-blueBase text-center dark:text-white my-10">Usuarios {  text && text } </h1>
        <div>
          <Link to={'/usuarios/add'} className="btn btn-info hover:btn-success capitalize text-md"> nuevo usuario</Link>
        </div>
        <div className="hidden md:grid md:grid-cols-10 md:grid-rows-1 bg-blueBase rounded-md mb-0 my-2 md:pl-2 md:py-2">
          <p className="text-md capitalize p-2 md:col-start-1 md:col-end-2">id</p>
          <p className="text-md capitalize p-2 md:col-start-2 md:col-end-4">nombre completo</p>
          <p className="text-md capitalize p-2 md:col-start-4 md:col-end-7">correo electronico</p>
          <p className="text-md capitalize p-2 md:col-start-7 2xl:col-end-8">role</p>
          <p className="text-md capitalize p-2 md:col-start-9 md:col-end-11 2xl:col-end-11 md:text-center 2xl:text-center">accciones</p>
        </div>
        <div className="my-2 md:my-0">
          { usuarios.map( usuario => (
            <div key={uuidv4()} className="text-md md:mt-3 md:my-1 bg-white rounded-md text-blueBase shadow-custom-card transition-all">
              <div className='grid grid-cols-1 grid-rows-5 py-2 px-4 md:grid-rows-1 md:grid-cols-10'>
                <div className="md:flex md:items-center md:col-start-1 md:col-end-2 bg-white">
                  <div className='block w-full md:col-start-1 md:col-end-2 py-2'> 
                    <p className="block md:hidden text-1xl font-bold capitalize">ID:</p>
                    <p >{ usuario.id_usuario}</p>
                  </div>
                </div>
                <div className="md:flex md:items-center md:col-start-2 md:col-end-4">
                  <Link to={`/usuarios/${usuario.id_usuario}`} className='block w-full'>
                    <div>
                      <p className="block md:hidden text-1xl font-bold capitalize">nombre:</p>
                      <p className="capitalize">{ usuario.nom_usuario }</p>
                    </div>
                  </Link>
                </div>
                <div className="md:flex md:items-center md:col-start-4 md:col-end-7">
                  <div className='block w-full'> 
                    <p className="block md:hidden text-1xl font-bold capitalize">email:</p>
                    <p >{ usuario.correo_usuario}</p>
                  </div>
                </div>
                <div className="md:flex md:items-center md:col-start-7 md:col-end-8 2xl:col-start-7 2xl:col-end-8">
                  <p className="block md:hidden text-1xl font-bold capitalize">role:</p>
                  <p className="capitalize" >{ usuario.id_role === 1 ? 'administrador' : usuario.id_role === 2 ? 'candidato' : usuario.id_role === 3 ? 'editor' : 'desconocido'  }</p>
                </div>
                <div className="md:flex md:items-center md:justify-center md:col-start-9 md:col-end-11 2xl:col-start-9 2xl:col-end-11">
                  <div className="flex flex-row justify-center gap-2 items-center md:grid lg:flex lg:flex-row lg:gap-2"> 
                    <Link to={`/usuarios/${usuario.id_usuario}`} className='btn md:btn-sm  capitalize btn-info flex items-center'>Detalle</Link>
                    <Link to={`/usuarios/${usuario.id_usuario}/edit`} className='btn md:btn-sm capitalize btn-warning flex items-center hover:text-white'>Editar</Link>
                   
                    {/* <div>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Eliminar
                      </button>
                      <DeleteUserModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onDelete={() => handleDeleteUsuario(usuario.id_usuario, usuario.clave_usuario)}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            )
          ) }
        </div>
      </div>
    </div>
  )
}

export default Usuarios
