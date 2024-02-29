import Layout from './Layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Perfil from "./pages/Perfil"
import Usuarios from "./pages/Usuarios"
import Login from './pages/Login'
import AgregarUsuario from './pages/AgregarUsuario'
import DetalleUsuario from './pages/DetalleUsuario'
import EditarUsuario from './pages/EditarUsuario'
import Error404 from './pages/Error404'
import ProtectRoute from './ProtectRoute'
import Envios from './pages/Envios'
import FormularioE14 from './pages/FormularioE14'
import { useUsuariosContext } from './hooks/UsuariosProvider'
import Consultas from './pages/Consultas'
import Resultados from './pages/Resultados'
import ConsultasMesasEnviadas from './pages/ConsultasMesasEnviadas'
import VistaPdf from './common/VistaPdf'

const App = () => {

  const { userLogged } = useUsuariosContext()

  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<Login />} />
          {/* <Route path='/login' element={ <Login /> } /> */}
          <Route path='/vista-pdf' element={<VistaPdf />} />
          <Route element={<ProtectRoute isAllowed={!!userLogged} redirectTo={'/'} />}>
            <Route element={<ProtectRoute isAllowed={userLogged?.role !== 2 ? userLogged : null} redirectTo={'consultas'} />}>
              <Route path='/envios' element={ userLogged?.role === 1  ? <ConsultasMesasEnviadas /> : <Envios /> } />
            </Route>
            <Route element={<ProtectRoute isAllowed={userLogged?.role !== 2 ? userLogged : null} redirectTo={'consultas'} />}>
              <Route path='/formularioe14/:id_puestodevotacion/:id_mesa' element={<FormularioE14 />} />
            </Route>
            <Route path='/perfil' element={<Perfil />} />
          </Route>
          {/* <Route element={<ProtectRoute isAllowed={!!userLogged && (userLogged?.role === 1 || userLogged?.role === 3)} redirectTo={'/'} />}>
          </Route> */}
          <Route element={<ProtectRoute isAllowed={userLogged?.role === 1 || userLogged?.role === 2 ? userLogged : null} redirectTo={'/'} />}>
            <Route path='/consultas' element={<Consultas />} />
            <Route path='/resultados' element={<Resultados />} />
          </Route>
          <Route element={<ProtectRoute isAllowed={userLogged?.role === 1 ? userLogged : null} redirectTo={'/'} />}>
            <Route path='/consulta-envios' element={<ConsultasMesasEnviadas />} />
            <Route path='/usuarios' element={<Usuarios />} />
            <Route path='/usuarios/:id' element={<DetalleUsuario />} />
            <Route path='/usuarios/add' element={<AgregarUsuario />} />
            <Route path='/usuarios/:id/edit' element={<EditarUsuario />} />
          </Route>
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App


