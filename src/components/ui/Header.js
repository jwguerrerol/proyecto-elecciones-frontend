import { Link, useLocation } from 'react-router-dom'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useUsuariosContext } from '../hooks/UsuariosProvider'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import ProtectRoute from '../ProtectRoute'
import logo from '../../images/logo-elecciones.png'
import userIcon from '../../images/user-icon.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  
  const {usuarios, setUsuarios, userLogged, setUserLogged, token, setToken} = useUsuariosContext()

  /* console.log(userLogged) */

  const datosUsuarioLogueado = (usuarios.filter(usuario => usuario.id_usuario === userLogged?.id))[0]
  const imagenUsuarioLogueado = datosUsuarioLogueado?.url_imagen && datosUsuarioLogueado?.url_imagen !== '' ? datosUsuarioLogueado?.url_imagen : userIcon

  /* Clases para el manejo de los items del menu */
  const stylesForMenuLinksActive = 'px-4 py-2 my-2 bg-blueLightBase text-blueBase rounded-md' 
  const stylesForMenuLinksNoActive = 'text-blueBase hover:border-solid hover:border-2 hover:border-white rounded-md px-4 py-2 my-2 text-md font-medium'
  
  const rutasLibres = [
    /* { name: 'Inicio', href: '/', current: true }, */
    { name: 'Inicio', href: '/', current: true }
  ]

  const rutasPermitidasEditor = [
    { name: 'Envíos', href: '/envios', current: true },
    { name: 'Perfil', href: '/perfil', current: true }
  ]

  const rutasPermitidasCandidato = [
    { name: 'Consultas', href: '/consultas', current: true },
    { name: 'Resultados', href: '/resultados', current: false },
    { name: 'Perfil', href: '/perfil', current: true }
  ]

  const rutasPermitidasAdministrador = [
    { name: 'Consultar envíos', href: '/consulta-envios', current: true},
    { name: 'Consultas', href: '/consultas', current: true },
    { name: 'Resultados', href: '/resultados', current: false },
    { name: 'Perfil', href: '/perfil', current: true },
    { name: 'Usuarios', href: '/usuarios', current: false }
  ]
  //Controlar la ubicación en el menú
  const location = useLocation()

  const navigate = useNavigate()

  const userLogout = () => {
    window.localStorage.clear('userLogged')
    setToken(null)
    setUserLogged(null)
    setUsuarios([])
    return navigate('/')
  }

  return (
    <>
      <Disclosure as="nav" className=" sticky top-0 border-b-4 bg-white border-b-blueBase text-blueBase">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-blueBase hover:border-solid hover:border-2 hover:border-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Abrir menú</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className=" h-7 w-auto shadow-lg bg-white rounded-full"
                      src={ logo }
                      alt="Logo SispreCas Soft"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">

                        {/* Rutas sin proteger */}
                     
                        {!userLogged && rutasLibres.map((item) => (
                            <div key={uuidv4()} className={ 'my-2' }>
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    location.pathname === item.href ? stylesForMenuLinksActive : stylesForMenuLinksNoActive
                                  )}
                                  aria-current={item.current ? 'page' : undefined}
                                >
                                  {item.name}
                                </Link>
                            </div>
                            
                        ))}
                      
                        { /* Rutas permitas al role Editor */}
                      
                        { userLogged?.role === 3 && rutasPermitidasEditor.map((item) => (
                          <div key={uuidv4()} className={ 'my-2' }>
                            <Link
                              key={uuidv4()}
                              to={item.href}
                              className={classNames(
                                location.pathname === item.href ? stylesForMenuLinksActive : stylesForMenuLinksNoActive
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          </div>
                          ))}
                      
                        
                      { /* Rutas permitas al role Candidato */}
                      
                        {userLogged?.role === 2  && rutasPermitidasCandidato.map((item) => (
                          <div key={uuidv4()} className={ 'my-2' }>
                            <Link
                              key={uuidv4()}
                              to={item.href}
                              className={classNames(
                                location.pathname === item.href ? stylesForMenuLinksActive : stylesForMenuLinksNoActive
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          </div>
                          ))}

                        { /* Rutas permitas al role Administrador */}                      
                      
                        {userLogged?.role === 1 && rutasPermitidasAdministrador.map((item) => (
                          <div key={uuidv4()} className={ 'my-2' }>
                          <Link
                            to={item.href}
                            className={classNames(
                              location.pathname === item.href ? stylesForMenuLinksActive : stylesForMenuLinksNoActive
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                          </div>
                          ))}
                      
                      
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  

                  {/* Profile dropdown */}
                  { userLogged &&
                    (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-white text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Abrir menú de usuario</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={ imagenUsuarioLogueado }
                              alt="imagen usuario"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          
                            <Menu.Items className=" right-0 z-10 mt-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <p className='block px-4 py-2 text-md text-gray-900 shadow-md'>{ userLogged?.email }</p>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/perfil"
                                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-md text-gray-700')}
                                    >
                                      perfil
                                    </Link>
                                  )}
                                </Menu.Item>
          
                                <Menu.Item>
                                  {({ active }) => (
                                      <button className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-md text-gray-700')} onClick={ userLogout }> cerrar sesión</button>
                                      )}
                              </Menu.Item>
                            </Menu.Items>
                          
                        </Transition>
                      </Menu>
                    )
                  }
                </div>
              </div>
            </div>
            { /* Menu Desktop */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">           
                  {!userLogged && rutasLibres.map((item) => (
                    <div key={uuidv4()} className={ 'my-2' }>
                    <Link
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href ? stylesForMenuLinksActive : stylesForMenuLinksNoActive
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                    </div>
                    ))}
                
                  {userLogged?.role === 3 && rutasPermitidasEditor.map((item) => (
                    <div key={uuidv4()} className={ 'my-2' }>
                      <Link
                        key={uuidv4()}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href ? stylesForMenuLinksActive : 'text-white hover:border-solid hover:border-2 hover:border-white',
                          'rounded-md px-3 py-2 text-md font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    </div>
                    ))}
                
                  {userLogged?.role === 2 && rutasPermitidasCandidato.map((item) => (
                    <div key={uuidv4()} className={ 'my-2' }>
                    <Link
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href ? stylesForMenuLinksActive : stylesForMenuLinksNoActive
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                    </div>
                    ))}

                
                  {userLogged?.role === 1 && rutasPermitidasAdministrador.map((item) => (
                    <div key={uuidv4()} className={ 'my-2' }>
                      <Link
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href ? stylesForMenuLinksActive : stylesForMenuLinksNoActive
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    </div>
                    ))}
               
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
    
  )
}

export default Header