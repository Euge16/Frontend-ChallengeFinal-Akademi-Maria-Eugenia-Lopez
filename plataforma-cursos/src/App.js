import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { cargarUsuarioDesdeStorage } from './redux/acciones/autenticacionAccion';
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
import EditarCurso from './componentes/cursos/EditarCurso';
import GetCursoPorId from './componentes/cursos/GetCusoPorId';
import EliminarCurso from './componentes/cursos/EliminarCurso';
import PantallaDocente from './componentes/PantallaDocente';
import CrearCurso from './componentes/cursos/CrearCurso';
import PantallaEstudiante from './componentes/PantallaEstudiante';
import CancelarInscripcion from './componentes/inscripciones/CancelarInscripcion';
import GetInscripcionesPorCurso from './componentes/inscripciones/GetInscripcionesPorCurso';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cargarUsuarioDesdeStorage());
  }, [dispatch]);

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* AUTENTICACION */}
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<RegistroEstudiante />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/restablecer-password/:token" element={<RestablecerPassword />} />


        {/* SUPERADMIN */}
        <Route path="/superadmin" element={<PantallaSuperadmin/>} />

        {/* DOCENTE */}
        <Route path="/docente" element={<PantallaDocente/>} />
        <Route path="/docente/inscripciones/curso/:id" element={<GetInscripcionesPorCurso />} />

        {/* ESTUDIANTE */}
        <Route path="/estudiante" element={<PantallaEstudiante/>} />
        <Route path="/inscripciones/cancelar/:id" element={<CancelarInscripcion />} />


        {/* USUARIOS */}
        <Route path="/superadmin/crear-docente-superadmin" element={<CrearDocenteOSuperadmin/>} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
        <Route path="/usuarios/eliminar/:id" element={<EliminarUsuario/>} />
        <Route path="/usuarios/ver/:id" element={<GetUsuarioPorId/>} />
        
        {/* CURSOS */}
        <Route path="/cursos/editar/:id" element={<EditarCurso />} />
        <Route path="/cursos/ver/:id" element={<GetCursoPorId />} />
        <Route path="/cursos/eliminar/:id" element={<EliminarCurso/>} />
        <Route path="/crear-curso" element={<CrearCurso/>} />
        

        
        


        


      </Routes>
    </BrowserRouter>
  );
};

export default App;


