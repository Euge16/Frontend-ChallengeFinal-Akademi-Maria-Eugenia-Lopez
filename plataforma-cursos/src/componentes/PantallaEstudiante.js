import { useState } from 'react';
import { useSelector } from 'react-redux';
import GetCursos from './cursos/GetCursos';
import GetInscripcionesEstudiante from './inscripciones/GetInscripcionesEstudiante';
import GetCalificacionesPorEstudiante from './calificacion/GetCalificacionesEstudiante';

const PantallaEstudiante = () => {
    const [vistaActual, setVistaActual] = useState('catalogo');
    const { usuario } = useSelector(estado => estado.autenticacion);
    const idDelEstudiante = usuario?._id; 

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 mb-4">
                    <div className="list-group">
                        <div className="list-group-item list-group-item-action bg-light fw-bold text-dark d-flex align-items-center">
                            <h4 className="m-0">Alumno 🎒</h4>
                        </div>
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
                    </div>
                </div>

                {/* Contenido */}
                <div className="col-md-9">
                    {vistaActual === 'catalogo' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-success text-white">Catálogo de Cursos</div>
                            <div className="card-body">
                                <GetCursos />
                            </div>
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
                            <GetCalificacionesPorEstudiante estudianteId={idDelEstudiante}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PantallaEstudiante;
