import { useState } from 'react';
import { Link } from 'react-router-dom';
import GetUsuarios from "./usuarios/GetUsuarios";
import GetCursos from './cursos/GetCursos';

const PantallaSuperadmin = () => {
  const [vistaActual, setVistaActual] = useState('usuarios');

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="list-group">
            <div className="list-group-item list-group-item-action bg-light fw-bold text-dark d-flex align-items-center">
              <h4 className="m-0">Superadmin 💻</h4>
            </div>
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
          </div>
        </div>

        <div className="col-md-9">
          {vistaActual === 'usuarios' && (
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">Usuarios</div>
              <div className="card-body">
                <GetUsuarios />
              </div>
            </div>
          )}

          {vistaActual === 'cursos' && (
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">Cursos</div>
              <div className="card-body">
                <GetCursos />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PantallaSuperadmin;
