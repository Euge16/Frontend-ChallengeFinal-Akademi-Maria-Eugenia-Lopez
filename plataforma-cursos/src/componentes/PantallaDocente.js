import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GetCursosDelProfesor from './cursos/GetCursosDelProfesor';
import Logout from './autenticacion/Logut';

const PantallaDocente = () => {
    const [vistaActual, setVistaActual] = useState('mis-cursos');
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
                        {usuario && (
                            <Link to={`/usuarios/editar/${usuario.usuarioId}`} className="list-group-item list-group-item-action">
                                🔄 Editar Perfil
                            </Link>
                        )}
                        <Logout />
                    </div>
                </div>

                <div className="col-md-9">
                    {vistaActual === 'mis-cursos' && (
                        <div >
                            <h4 className="mb-4">📚 Mis Cursos</h4>
                            <GetCursosDelProfesor />
                        </div>
                    )} 

                </div>
            </div>
        </div>
    );
};

export default PantallaDocente;
