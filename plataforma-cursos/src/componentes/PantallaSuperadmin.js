import { useState } from 'react';
import { Link } from 'react-router-dom';
import GetUsuarios from "./usuarios/GetUsuarios";
import GetCursos from './cursos/GetCursos';
import EstadisticasGenerales from './EstadisticasGenerales';
import Logout from './autenticacion/Logut';
const PantallaSuperadmin = () => {
  const [vistaActual, setVistaActual] = useState('estadisticas');

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="list-group sticky-top">
            <div className="list-group-item list-group-item-action bg-light fw-bold text-dark d-flex align-items-center">
              <h4 className="m-0">Superadmin 💻</h4>
            </div>
            <button
              className={`list-group-item list-group-item-action ${vistaActual === 'estadisticas' ? 'active' : ''}`}
              onClick={() => setVistaActual('estadisticas')}
            >
              📊 Estadísticas Generales
            </button>

            <button
              className={`list-group-item list-group-item-action ${vistaActual === 'usuarios' ? 'active' : ''}`}
              onClick={() => setVistaActual('usuarios')}
            >
              👥 Lista de Usuarios
            </button>
            <button
              className={`list-group-item list-group-item-action ${vistaActual === 'cursos' ? 'active' : ''}`}
              onClick={() => setVistaActual('cursos')}
            >
              📚 Lista de Cursos
            </button>
            <Link to='/superadmin/crear-docente-superadmin' className="list-group-item list-group-item-action">
              ➕ Crear Docente/Superadmin
            </Link>
            
            <Logout />
            
          </div>
        </div>

        <div className="col-md-9">
          {vistaActual === 'estadisticas' && (
            <div >
              <h4 className="mb-4">📊 Estadísticas Generales</h4>
              <EstadisticasGenerales />
            </div>
          )}

          {vistaActual === 'usuarios' && (
            <div >
              <h4 className="mb-4">👥 Lista de Usuarios</h4>
              <GetUsuarios />
            </div>
          )}

          {vistaActual === 'cursos' && (
            <div >
              <h4 className="mb-4">📚 Lista de Cursos</h4>
              <GetCursos />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PantallaSuperadmin;