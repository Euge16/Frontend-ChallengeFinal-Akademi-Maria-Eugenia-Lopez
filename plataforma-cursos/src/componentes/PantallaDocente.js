import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GetCursosDelProfesor from './cursos/GetCursosDelProfesor';

const PantallaDocente = () => {
    const [vistaActual, setVistaActual] = useState('mis-cursos');
    const usuario = useSelector((state) => state.autenticacion.usuario); 

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 mb-4">
                    <div className="list-group">
                        <div className="list-group-item list-group-item-action bg-light fw-bold text-dark d-flex align-items-center">
                            <h4 className="m-0">Profesor 🎓</h4>
                        </div>
                        <button
                            className={`list-group-item list-group-item-action ${vistaActual === 'mis-cursos' ? 'active' : ''}`}
                            onClick={() => setVistaActual('mis-cursos')}
                        >
                            📚 Mis Cursos
                        </button>

                        {usuario && (
                            <Link to={`/usuarios/ver/${usuario.usuarioId}`} className="list-group-item list-group-item-action">
                                👤 Mi Perfil
                            </Link>
                        )}

                        <Link to="/crear-curso" className="list-group-item list-group-item-action">
                            ➕ Crear Curso
                        </Link>
                    </div>
                </div>

                {/* Contenido dinámico */}
                <div className="col-md-9">
                    {vistaActual === 'mis-cursos' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">Mis Cursos</div>
                            <div className="card-body">
                                <GetCursosDelProfesor />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PantallaDocente;
