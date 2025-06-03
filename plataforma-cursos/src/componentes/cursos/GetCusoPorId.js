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

    if (!curso || Object.keys(curso).length === 0) return (
        <div className="alert alert-warning">No se encontró el curso</div>
    );

    return (
        <div className="container mt-5">
        <h2 className="mb-4">Detalle de curso</h2>

        <ul className="list-group" style={{ maxWidth: '400px' }}>
            <li className="list-group-item d-flex justify-content-between">
            <strong>Nombre:</strong>
            <span>{curso.nombre}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
            <strong>Descripción:</strong>
            <span>{curso.descripcion}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
            <strong>Docente:</strong>
            <span>{curso.docenteId.nombre}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
            <strong>Cupo:</strong>
            <span>{curso.cupo}</span>
            </li>
        </ul>
        </div>
    );
};

export default GetCursoPorId;