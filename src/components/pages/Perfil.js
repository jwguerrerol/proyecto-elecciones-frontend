import { useMesasContext } from "../hooks/MesasProvider"

function Perfil() {
  const { id_puestodevotacion, id_role, nom_role, id_usuario, nom_usuario, correo_usuario, mesas_instaladas, id_departamento, nom_departamento, id_municipio, nom_municipio, nom_puestodevotacion, mesasEnviadas, setMesasEnviadas } = useMesasContext()
  
  return (
    <div className="text-blueBase bg-white text-md">
      <h1 className="text-4xl font-bold leading-none tracking-tight text-blueBase text-center dark:text-white my-10">Perfil</h1>
      <div className="flex flex-col gap-2 max-w-2xl mx-auto bg-white rounded-md px-5 py-4 shadow-custom-card">
        <div className='flex flex-col'>
          <p className='text-md text-grayLightBase  bg-white rounded-md '>Tipo de usuario: </p>  
          <p className=""> {nom_role} </p>  
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-grayLightBase  bg-white rounded-md '>Nombre completo:</p>
          <p className=" capitalize"> { nom_usuario }</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-grayLightBase  bg-white rounded-md '>Correo electrónico </p>
          <p className=""> { correo_usuario }</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-grayLightBase  bg-white rounded-md '>Puesto de votación asignado: </p>
          <p className=""> {`${nom_puestodevotacion}(${id_puestodevotacion})`}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-grayLightBase  bg-white rounded-md '>Mesas del puesto de votación asignado:</p>
          <p className=""> {mesas_instaladas}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-grayLightBase  bg-white rounded-md '>Municipio del puesto de votación:</p>
          <p className=""> {nom_municipio}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-md text-grayLightBase  bg-white rounded-md '>Departamento del puesto de votación:</p>
          <p className=""> {nom_departamento}</p>
        </div>
      </div>
    </div>
  )
}

export default Perfil