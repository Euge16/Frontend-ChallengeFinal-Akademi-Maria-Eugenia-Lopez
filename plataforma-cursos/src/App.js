import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './componentes/Home';
import Login from './componentes/autenticacion/Login';
import RegistroEstudiante from './componentes/autenticacion/RegistrarEstudiante';
import RecuperarPassword from './componentes/autenticacion/RecuperarPassword';
import RestablecerPassword from './componentes/autenticacion/RestablecerPassword';
import PantallaSuperadmin from './componentes/PantallaSuperadmin';
import EditarUsuario from './componentes/usuarios/EditarUsuario';
import EliminarUsuario from './componentes/usuarios/EliminarUsuario';
import GetUsuarioPorId from './componentes/usuarios/GetUsuarioPorId';
import CrearDocenteOSuperadmin from './componentes/usuarios/CrearDocenteOSuperadmin';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<RegistroEstudiante />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/restablecer-password/:token" element={<RestablecerPassword />} />


        {/* SUPERADMIN */}
        <Route path="/superadmin" element={<PantallaSuperadmin/>} />
        <Route path="/superadmin/crear-docente-superadmin" element={<CrearDocenteOSuperadmin/>} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
        <Route path="/usuarios/eliminar/:id" element={<EliminarUsuario/>} />
        <Route path="/usuarios/ver/:id" element={<GetUsuarioPorId/>} />
        


      </Routes>
    </BrowserRouter>
  );
};

export default App;


