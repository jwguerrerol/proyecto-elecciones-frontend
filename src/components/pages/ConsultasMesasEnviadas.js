import { Suspense } from 'react';
import { useFiltrosContext } from '../hooks/FiltrosProvider'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getAllMesas, getAllMesasEnviadas } from '../../services/mesas';

function ConsultasMesasEnviadas() {
  const [ mesasEnviadas, setMesasEnviadas ] = useState([])  
  const [ estadoMesasSeleccionado, setEstadoDeMesasSeleccionado ] = useState('todas')
  const [ departamentoSeleccionado, setDepartamentoSeleccionado ] = useState(1)
  const [ municipioSeleccionado, setMunicipioSeleccionado ] = useState('')
  const [ puestoDeVotacionSeleccionado, setPuestoDeVotacionSeleccionado ] = useState('')
  const [ mesas, setMesas ] = useState([])
  const [ departamentosFiltrados, setDepartamentosFiltrados ] = useState([])
  const [ municipiosFiltrados, setMunicipiosFiltrados ] = useState([])
  const [ puestosDeVotacionFiltrados, setPuestosDeVotacionFiltrados ] = useState([])

  const { departamentos, municipios, puestosDeVotacion } = useFiltrosContext()

  useEffect(() => {
    getAllMesas
      .then(response => {
        setMesas(response)
      })
  },[])

  useEffect(() => {
      getAllMesasEnviadas.then(response => {
        return setMesasEnviadas(response)
      })        
  }, [])

  const handleEstadoMesa = (event) => {
    setEstadoDeMesasSeleccionado(event.target.value)
    if(event.target.value === 'enviadas') {
      setMesas(mesasEnviadas)
    } else {
      getAllMesas
      .then(response => {
        setMesas(response)
      })
    }
  }

  const handleDepartamento = (event) => {
    getAllMesas
      .then(response => {
        setMesas(response)
      })
    return setDepartamentoSeleccionado(event.target.value)
  }

  const handleMunicipio = (event) => {
    setPuestoDeVotacionSeleccionado('')
    setPuestoDeVotacionSeleccionado('')
    const id = Number(event.target.value)
    setMunicipioSeleccionado(id)    
  }

  const handlePuestoDeVotacion = (event) => {
    const id = Number(event.target.value)
    setPuestoDeVotacionSeleccionado(id)
  }

  const handleResetButton = (event) => {
    event.preventDefault()
    
    getAllMesas
      .then(response => {
        setPuestoDeVotacionSeleccionado('')
        setMunicipioSeleccionado('')
        setEstadoDeMesasSeleccionado('todas')
        setMesas(response)
      })
  }

  useEffect(() => {
    setDepartamentosFiltrados(departamentos.length > 0 && departamentos.filter( departamento => departamento.id_departamento === Number(departamentoSeleccionado)))
    setMunicipiosFiltrados(municipios.length > 0 && municipios.filter( municipio => municipio.id_departamento === Number(departamentoSeleccionado) &&  municipio.id_municipio === Number(municipioSeleccionado)))
    setPuestosDeVotacionFiltrados(puestosDeVotacion.length > 0 && puestosDeVotacion.filter( puestodevotacion => (puestodevotacion.id_departamento === Number(departamentoSeleccionado) && puestodevotacion.id_municipio === Number(municipioSeleccionado)) && puestodevotacion.id_puestodevotacion === Number(puestoDeVotacionSeleccionado)))
  },[departamentos, departamentoSeleccionado, municipios, municipioSeleccionado, puestosDeVotacion, puestoDeVotacionSeleccionado])


  /* console.log({ mesas })
  console.log({ mesasEnviadas })
  console.log({ departamentos })
  console.log({ municipios })
  console.log({ puestosDeVotacion })
  console.log({ departamentosFiltrados })
  console.log({ municipiosFiltrados })
  console.log({ puestosDeVotacionFiltrados }) */

  

  return (
    <div className='container md:w-11/12 max-w-7xl'>
      <h1 className='text-4xl font-bold leading-none tracking-tight text-blueBase text-center dark:text-white my-10'>Consultas Mesas Enviadas</h1>
      <div className='text-md'>
        <div className='text-md mb-4'>
          { ((Array.isArray(departamentos) && Array.isArray(municipios))  && Array.isArray(puestosDeVotacion)) &&
            <div>
              <h2 className='capitalize text-xl text-center my-2 text-blueBase'>filtros</h2>
              <form className='bg-blueBase p-4 rounded-md md:grid md:grid-cols-3 lg:flex  lg:flex-row lg:justify-center lg:items-center gap-1'>
                <div className='flex flex-col mx-auto justify-center'>
                  <label className='text-white'>Departamento</label>
                  <select onChange={ handleDepartamento } value={ departamentoSeleccionado } className='select select-bordered select-sm  lg:select-sm 2xl:select-sm w-full'>
                    <option value={''} disabled>Seleccionar departamento</option>
                    {departamentos.map(departamento => {
                      return (
                        <option key={`departamento${departamento.id_departamento}`} value={departamento.id_departamento} > { departamento.nom_departamento } </option>
                      )
                    })}
                  </select>
                </div>
                <div className='flex flex-col mx-auto justify-center'>
                  <label className='text-white'>Municipio</label>
                  <select onChange={ handleMunicipio } value={ municipioSeleccionado }  className='select select-bordered select-sm  lg:select-sm 2xl:select-sm w-full'>
                    <option value={''} disabled>Seleccionar municipio</option>
                    {municipios?.map(municipio => {
                      return (
                        <option key={`municipio${municipio.id_municipio}`} value={municipio.id_municipio} > { municipio.nom_municipio } </option>
                      )
                    })}
                  </select>
                </div>
                <div className='flex flex-col mx-auto justify-center md:col-start-1 md:col-end-3 lg:flex lg:flex-col lg:mx-auto lg:justify-center'>
                  <label className='text-white'>Puestos de votación</label>
                  <select onChange={ handlePuestoDeVotacion } value={ puestoDeVotacionSeleccionado }  className='select select-bordered select-sm md:w-max lg:w-auto lg:select-sm 2xl:select-sm w-full'>
                    <option value={''} disabled>Seleccionar puesto de votación</option>
                    
                    {(puestosDeVotacion.filter(puestodevotacion => (puestodevotacion.id_departamento === Number(departamentoSeleccionado) && puestodevotacion.id_municipio === Number(municipioSeleccionado)) )).map(puestodevotacion => {
                      return (
                        <option className={ !municipioSeleccionado ? 'hidden' : '' } key={`puestodevotacion${puestodevotacion.id_puestodevotacion}`} value={puestodevotacion.id_puestodevotacion} > { puestodevotacion?.nom_puestodevotacion } </option>
                      )
                    })}
                  </select>
                </div>
                <div className='flex flex-col mx-auto justify-center'>
                  <label className='text-white'>Mesas</label>
                  <select onChange={ handleEstadoMesa } value={ estadoMesasSeleccionado }  className='select select-bordered select-sm  lg:select-sm 2xl:select-sm w-full'>
                      <option key={ uuidv4() } value={'todas'} >Todas las mesas</option>
                      <option key={ uuidv4() } value={'enviadas'} >Mesas enviadas</option>
                      <option key={ uuidv4() } value={'no-enviadas'} >Mesas no enviadas</option>
                  </select>
                </div>
              
                <div className='flex justify-center gap-3 mt-2 div-btn-limpiar'>
                  <button onClick={ handleResetButton} className='btn btn-info my-2 btn-limpiar hover:btn-success' > Limpiar </button>
                </div>
              </form>
            </div>
            }
        </div>
        <div className="text-white">
          <div className="">
            <div id='soloDepartamento'>
              <Suspense fallback={ 'cargando...' }>
              {(Array.isArray(mesas) && Array.isArray(departamentosFiltrados)) && ((Array.isArray(puestosDeVotacion) && Array.isArray(municipios) ) && Array.isArray(mesasEnviadas)) && (
                <>

                  <>
                    { ( municipioSeleccionado === '' && puestoDeVotacionSeleccionado === '') && departamentosFiltrados.map((dep, index) => {
                      return(
                        <div key={'dep'.concat(index)}>  
                          <p className='text-2xl text-blueBase uppercase font-bold'>{ dep.nom_departamento } ({ dep.id_departamento }) </p>
                          { Array.isArray(municipios) && (municipios.filter(municipio => municipio.id_departamento === dep.id_departamento)).map((mun, index) => {
                            return (
                              <div key={ 'mun'.concat(index) }>
                                { estadoMesasSeleccionado === 'enviadas' && (mesasEnviadas.filter( mesa => mesa.id_municipio === mun.id_municipio)).length > 0 &&
                                <>
                                  <p className='text-xl first-letter:font-bold text-blueBase'>{ mun.nom_municipio }</p>
                                  { (Array.isArray(puestosDeVotacion) && puestosDeVotacion.filter(puestoDeVotacion => puestoDeVotacion.id_municipio === mun.id_municipio)).map( (puesto, index) => {
                                    return (
                                      <div key={ 'pue'.concat(index) } className='my-4'>
                                        { estadoMesasSeleccionado === 'enviadas' && (mesasEnviadas.filter( mesa => mesa.id_puestodevotacion === puesto.id_puestodevotacion)).length > 0 &&
                                        <>
                                          <p className='lowercase first-letter:uppercase pb-2 text-blueBase'>{ puesto.nom_puestodevotacion } ({ puesto.id_puestodevotacion })</p>
                                          <div className='grid grid-cols-5 md:grid-cols-10 gap-1'>
                                          { Array.isArray(mesas) && (mesas.filter(mesa => mesa.id_puestodevotacion === puesto.id_puestodevotacion)).map( (m, index) => {
                                            return (
                                              <div key={ 'mes'.concat(index)}>
                                                { mesasEnviadas.filter(mesa =>(mesa.id_municipio === mun.id_municipio && mesa.id_puestodevotacion === puesto.id_puestodevotacion) && mesa.id_mesa === m.id_mesa).length > 0 
                                                  ? 
                                                    <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueLightBase  text-black rounded-md'>
                                                        <p>{ m.id_mesa }</p>
                                                    </Link>
                                                  :
                                                  <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueBase rounded-md'>
                                                      <p>{ m.id_mesa }</p>
                                                  </Link>
                                                      }
                                              </div>
                                            )
                                          })}
                                          </div>
                                        </> 
                                        }
                                      </div>
                                    )
                                  }) }
                                </>
                                }
                                { estadoMesasSeleccionado === 'todas' && 
                                <>
                                  <p className='text-xl first-letter:font-bold text-blueBase'>{ mun.nom_municipio }</p>
                                  { (Array.isArray(puestosDeVotacion) && puestosDeVotacion.filter(puestoDeVotacion => puestoDeVotacion.id_municipio === mun.id_municipio)).map( (puesto, index) => {
                                    return (
                                      <div key={ 'pue'.concat(index) } className='my-4'>
                                        { estadoMesasSeleccionado === 'todas' &&
                                        <>
                                          <p className='lowercase first-letter:uppercase pb-2 text-blueBase'>{ puesto.nom_puestodevotacion } ({ puesto.id_puestodevotacion })</p>
                                          <div className='grid grid-cols-5 md:grid-cols-10 gap-1'>
                                          { Array.isArray(mesas) && (mesas.filter(mesa => mesa.id_puestodevotacion === puesto.id_puestodevotacion)).map( (m, index) => {
                                            return (
                                              <div key={ 'mes'.concat(index)}>
                                                { mesasEnviadas.filter(mesa =>(mesa.id_municipio === mun.id_municipio && mesa.id_puestodevotacion === puesto.id_puestodevotacion) && mesa.id_mesa === m.id_mesa).length > 0 
                                                  ? 
                                                    <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueLightBase  text-black rounded-md'>
                                                        <p>{ m.id_mesa }</p>
                                                    </Link>
                                                  :
                                                  <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueBase rounded-md'>
                                                      <p>{ m.id_mesa }</p>
                                                  </Link>
                                                      }
                                              </div>
                                            )
                                          })}
                                          </div>
                                        </> 
                                        }
                                      </div>
                                    )
                                  }) }
                                </>
                                }
                              </div>
                            )
                          }) }
                        </div>
                      )
                    }) }
                  </>

                  <>
                    { ((municipioSeleccionado !== '')  && puestoDeVotacionSeleccionado === '') && departamentosFiltrados.map((dep, index) => {
                      return(
                        <div key={'dep'.concat(index)}>  
                          <p className='text-2xl uppercase font-bold text-blueBase'>{ dep.nom_departamento } ({ dep.id_departamento }) </p>
                          { Array.isArray(municipios) && municipiosFiltrados.map((mun, index) => {
                            return (
                              <div key={ 'mun'.concat(index) }>
                              { estadoMesasSeleccionado === 'enviadas' && (mesasEnviadas.filter( mesa => mesa.id_municipio === mun.id_municipio)).length > 0 &&
                                <>
                                  <p className='text-xl first-letter:font-bold text-blueBase'>{ mun.nom_municipio }</p>
                                  { (Array.isArray(puestosDeVotacion) && Array.isArray(puestosDeVotacionFiltrados))  && (puestosDeVotacion.filter(puestodevotacion => puestodevotacion.id_departamento === dep.id_departamento && puestodevotacion.id_municipio === mun.id_municipio )).map( (puesto, index) => {
                                    return (
                                      <div key={ 'pue'.concat(index) } className='my-4'>
                                        { estadoMesasSeleccionado === 'enviadas' && (mesasEnviadas.filter( mesa => mesa.id_puestodevotacion === puesto.id_puestodevotacion)).length > 0 &&
                                        <>
                                          <p className='lowercase first-letter:uppercase pb-2 text-blueBase'>{ puesto.nom_puestodevotacion } ({ puesto.id_puestodevotacion })</p>
                                          <div className='grid grid-cols-5 md:grid-cols-10 gap-1'>
                                          { Array.isArray(mesas) && (mesas.filter(mesa => mesa.id_puestodevotacion === puesto.id_puestodevotacion)).map( (m, index) => {
                                            return (
                                              <div key={ 'mes'.concat(index)}>
                                                { mesasEnviadas.filter(mesa =>(mesa.id_municipio === mun.id_municipio && mesa.id_puestodevotacion === puesto.id_puestodevotacion) && mesa.id_mesa === m.id_mesa).length > 0 
                                                  ? 
                                                    <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueLightBase  text-black rounded-md'>
                                                        <p>{ m.id_mesa }</p>
                                                    </Link>
                                                  :
                                                  <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueBase rounded-md'>
                                                      <p>{ m.id_mesa }</p>
                                                  </Link>
                                                      }
                                              </div>
                                            )
                                          })}
                                          </div>
                                        </>
                                        } 
                                      </div>
                                    )
                                  }) }
                                </>
                              }
                              { estadoMesasSeleccionado === 'todas' && 
                                <>
                                  <p className='text-xl first-letter:font-bold text-blueBase'>{ mun.nom_municipio }</p>
                                  { (Array.isArray(puestosDeVotacion) && puestosDeVotacion.filter(puestoDeVotacion => puestoDeVotacion.id_municipio === mun.id_municipio)).map( (puesto, index) => {
                                    return (
                                      <div key={ 'pue'.concat(index) } className='my-4'>
                                        { estadoMesasSeleccionado === 'todas' &&
                                        <>
                                          <p className='lowercase first-letter:uppercase pb-2 text-blueBase'>{ puesto.nom_puestodevotacion } ({ puesto.id_puestodevotacion })</p>
                                          <div className='grid grid-cols-5 md:grid-cols-10 gap-1'>
                                          { Array.isArray(mesas) && (mesas.filter(mesa => mesa.id_puestodevotacion === puesto.id_puestodevotacion)).map( (m, index) => {
                                            return (
                                              <div key={ 'mes'.concat(index)}>
                                                { mesasEnviadas.filter(mesa =>(mesa.id_municipio === mun.id_municipio && mesa.id_puestodevotacion === puesto.id_puestodevotacion) && mesa.id_mesa === m.id_mesa).length > 0 
                                                  ? 
                                                    <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueLightBase  text-black rounded-md'>
                                                        <p>{ m.id_mesa }</p>
                                                    </Link>
                                                  :
                                                  <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueBase rounded-md'>
                                                      <p>{ m.id_mesa }</p>
                                                  </Link>
                                                      }
                                              </div>
                                            )
                                          })}
                                          </div>
                                        </> 
                                        }
                                      </div>
                                    )
                                  }) }
                                </>
                              }
                              </div>
                            )
                          }) }
                        </div>
                      )
                    }) }
                  </>

                  <>
                    { (puestoDeVotacionSeleccionado !== '') && departamentosFiltrados.map((dep, index) => {
                      return(
                        <div key={'dep'.concat(index)}>  
                          <p className='text-2xl uppercase font-bold text-blueBase'>{ dep.nom_departamento } ({ dep.id_departamento }) </p>
                          { Array.isArray(municipios) && municipiosFiltrados.map((mun, index) => {
                            return (
                              <div key={ 'mun'.concat(index) }>
                                { estadoMesasSeleccionado === 'enviadas' && (mesasEnviadas.filter( mesa => mesa.id_municipio === mun.id_municipio)).length > 0 &&
                                <>
                                  <p className='text-xl first-letter:font-bold text-blueBase'>{ mun.nom_municipio }</p>
                                  { (Array.isArray(puestosDeVotacion) && Array.isArray(puestosDeVotacionFiltrados))  &&puestosDeVotacionFiltrados.map( (puesto, index) => {
                                    return (
                                      <div key={ 'pue'.concat(index) } className='my-4'>
                                        { estadoMesasSeleccionado === 'enviadas' && (mesasEnviadas.filter( mesa => mesa.id_puestodevotacion === puesto.id_puestodevotacion)).length > 0 &&
                                        <>
                                          <p className='lowercase first-letter:uppercase pb-2 text-blueBase'>{ puesto.nom_puestodevotacion } ({ puesto.id_puestodevotacion })</p>
                                          <div className='grid grid-cols-5 md:grid-cols-10 gap-1'>
                                          { Array.isArray(mesas) && (mesas.filter(mesa => mesa.id_puestodevotacion === puesto.id_puestodevotacion)).map( (m, index) => {
                                            return (
                                              <div key={ 'mes'.concat(index)}>
                                                { mesasEnviadas.filter(mesa =>(mesa.id_municipio === mun.id_municipio && mesa.id_puestodevotacion === puesto.id_puestodevotacion) && mesa.id_mesa === m.id_mesa).length > 0 
                                                  ? 
                                                    <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueLightBase  text-black rounded-md'>
                                                        <p>{ m.id_mesa }</p>
                                                    </Link>
                                                  :
                                                  <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueBase rounded-md'>
                                                      <p>{ m.id_mesa }</p>
                                                  </Link>
                                                      }
                                              </div>
                                            )
                                          })}
                                          </div>
                                        </> 
                                        }
                                      </div>
                                    )
                                  }) }
                                </>
                              }
                              { estadoMesasSeleccionado === 'todas' && 
                                <>
                                  <p className='text-xl first-letter:font-bold text-blueBase'>{ mun.nom_municipio }</p>
                                  { (Array.isArray(puestosDeVotacion) && puestosDeVotacion.filter(puestoDeVotacion => puestoDeVotacion.id_puestodevotacion === Number(puestoDeVotacionSeleccionado))).map( (puesto, index) => {
                                    return (
                                      <div key={ 'pue'.concat(index) } className='my-4'>
                                        
                                        <>
                                          <p className='lowercase first-letter:uppercase pb-2 text-blueBase'>{ puesto.nom_puestodevotacion } ({ puesto.id_puestodevotacion })</p>
                                          <div className='grid grid-cols-5 md:grid-cols-10 gap-1'>
                                          { Array.isArray(mesas) && (mesas.filter(mesa => mesa.id_puestodevotacion === puesto.id_puestodevotacion)).map( (m, index) => {
                                            return (
                                              <div key={ 'mes'.concat(index)}>
                                                { mesasEnviadas.filter(mesa =>(mesa.id_municipio === mun.id_municipio && mesa.id_puestodevotacion === puesto.id_puestodevotacion) && mesa.id_mesa === m.id_mesa).length > 0 
                                                  ? 
                                                    <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueLightBase  text-black rounded-md'>
                                                        <p>{ m.id_mesa }</p>
                                                    </Link>
                                                  :
                                                  <Link to={`/formularioe14/${ puesto.id_puestodevotacion }/${ m.id_mesa }`}className='flex flex-col justify-center items-center p-2 border-spacing-1 border-slate-400 bg-blueBase rounded-md'>
                                                      <p>{ m.id_mesa }</p>
                                                  </Link>
                                                      }
                                              </div>
                                            )
                                          })}
                                          </div>
                                        </> 
                                        
                                      </div>
                                    )
                                  }) }
                                </>
                              }
                              </div>
                            )
                          }) }
                        </div>
                      )
                    }) }
                  </>
                  
                </>
              ) }
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultasMesasEnviadas