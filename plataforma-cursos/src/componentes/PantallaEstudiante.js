import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GetCursos from './cursos/GetCursos';
import GetInscripcionesEstudiante from './inscripciones/GetInscripcionesEstudiante';
import GetCalificacionesPorEstudiante from './calificacion/GetCalificacionesEstudiante';
import Logout from './autenticacion/Logut';

const PantallaEstudiante = () => {
    const [vistaActual, setVistaActual] = useState('catalogo');
    const usuario = useSelector((state) => state.autenticacion.usuario); 
    if (!usuario) {
        return <p>Cargando usuario...</p>; 
    }

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 mb-4">
                    <div className="list-group">
                        <div className="list-group-item list-group-item-action bg-light fw-bold text-dark d-flex align-items-center">
                            <h4 className="m-0">Alumno 🎒</h4>
                        </div>
                        {usuario && (
                            <Link to={`/usuarios/ver/${usuario.usuarioId}`} className="list-group-item list-group-item-action">
                                👤 Mi Perfil
                            </Link>
                        )}

                        <button
                            className={`list-group-item list-group-item-action ${vistaActual === 'catalogo' ? 'active' : ''}`}
                            onClick={() => setVistaActual('catalogo')}
                        >
                            📚 Catálogo de Cursos
                        </button>
                        <button
                            className={`list-group-item list-group-item-action ${vistaActual === 'mis-cursos' ? 'active' : ''}`}
                            onClick={() => setVistaActual('mis-cursos')}
                        >
                            🎓 Mis Cursos Inscritos
                        </button>
                        <button
                            className={`list-group-item list-group-item-action ${vistaActual === 'mis-calificaciones' ? 'active' : ''}`}
                            onClick={() => setVistaActual('mis-calificaciones')}
                            >
                            📝 Mis Calificaciones
                        </button>
                        {usuario && (
                            <Link to={`/usuarios/editar/${usuario.usuarioId}`} className="list-group-item list-group-item-action">
                                🔄 Editar Perfil
                            </Link>
                        )}
                        <Logout />
                    </div>
                </div>

                {/* Contenido */}
                <div className="col-md-9">
                    {vistaActual === 'catalogo' && (
                        <div >
                            <h4 className="mb-4">📚 Catálogo de Cursos</h4>
                            <GetCursos />
                        </div>
                    )}

                    {vistaActual === 'mis-cursos' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">Mis Cursos Inscritos</div>
                            <div className="card-body">
                                <GetInscripcionesEstudiante />
                            </div>
                        </div>
                    )}

                    {vistaActual === 'mis-calificaciones' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-info text-white">Mis Calificaciones</div>
                            <div className="card-body">
                            <GetCalificacionesPorEstudiante/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PantallaEstudiante;
