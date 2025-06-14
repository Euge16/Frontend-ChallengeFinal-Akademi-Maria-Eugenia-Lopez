import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getCursoPorId } from '../../redux/acciones/cursoAccion';

const GetCursoPorId = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { curso, cargando, error } = useSelector(estado => estado.curso);
    const usuarioAutenticado = useSelector(estado => estado.autenticacion.usuario);

    useEffect(() => {
        dispatch(getCursoPorId(id));
    }, [dispatch, id]);

    if (cargando) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando curso...</span>
            </div>
        </div>
    );

    if (error) return <div className="alert alert-danger">Error: {error}</div>;

    if (!curso || Object.keys(curso).length === 0) {
        return <div className="alert alert-warning">No se encontró el curso</div>;
    }

    const esDocente = usuarioAutenticado && (
        curso.docenteId?._id === usuarioAutenticado.usuarioId ||
        usuarioAutenticado.rol === 'superadmin'
    );

    return (
        <div className="container mt-5">
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-black d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">📘 Detalle del Curso</h2>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label"><strong>Nombre</strong></label>
                        <input type="text" className="form-control" value={curso.nombre} disabled />
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Descripción</strong></label>
                        <textarea className="form-control" rows="4" value={curso.descripcion} disabled />
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Docente</strong></label>
                        <input type="text" className="form-control" value={curso.docenteId?.nombre} disabled />
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><strong>Cupo</strong></label>
                        <input type="number" className="form-control" value={curso.cupo} disabled />
                    </div>

                    {esDocente && (
                        <button
                            className="btn btn-outline-info mt-3"
                            onClick={() => navigate(`/docente/inscripciones/curso/${id}`)}
                            >
                            Ver estudiantes inscritos
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetCursoPorId;