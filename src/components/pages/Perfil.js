import { useMesasContext } from "../hooks/MesasProvider"

function Perfil() {
  const { id_puestodevotacion, id_role, nom_role, id_usuario, nom_usuario, correo_usuario, mesas_instaladas, id_departamento, nom_departamento, id_municipio, nom_municipio, nom_puestodevotacion, mesasEnviadas, setMesasEnviadas } = useMesasContext()
  
  return (
    <div className="text-white text-md">
      <h1 className="text-4xl font-bold leading-none tracking-tight text-white text-center dark:text-white my-10">Perfil</h1>
      <div className="flex flex-col gap-3 max-w-2xl mx-auto bg-slate-900 rounded-md p-4">
        <div className='flex flex-col'>
          <p className='text-md text-white bg-slate-800 rounded-md p-2'>Tipo de usuario: </p>  
          <p className="p-2"> {nom_role} </p>  
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-white bg-slate-800 rounded-md p-2'>Nombre completo:</p>
          <p className="p-2 capitalize"> { nom_usuario }</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-white bg-slate-800 rounded-md p-2'>Correo electrónico </p>
          <p className="p-2"> { correo_usuario }</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-white bg-slate-800 rounded-md p-2'>Puesto de votación asignado: </p>
          <p className="p-2"> {`${nom_puestodevotacion}(${id_puestodevotacion})`}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-white bg-slate-800 rounded-md p-2'>Mesas del puesto de votación asignado:</p>
          <p className="p-2"> {mesas_instaladas}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-white bg-slate-800 rounded-md p-2'>Municipio del puesto de votación:</p>
          <p className="p-2"> {nom_municipio}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-white bg-slate-800 rounded-md p-2'>Departamento del puesto de votación:</p>
          <p className="p-2"> {nom_departamento}</p>
        </div>
      </div>
    </div>
  )
}

export default Perfil