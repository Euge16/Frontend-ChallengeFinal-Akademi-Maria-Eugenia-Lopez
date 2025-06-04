import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCursoPorId } from '../../redux/acciones/cursoAccion';

const GetCursoPorId = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { curso, cargando, error } = useSelector(estado => estado.curso);

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
        return (
            <div className="alert alert-warning">No se encontró el curso</div>);
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="mb-4 text-primary">📘 Detalle del Curso</h2>

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

                
            </div>
        </div>
    );
};

export default GetCursoPorId;
