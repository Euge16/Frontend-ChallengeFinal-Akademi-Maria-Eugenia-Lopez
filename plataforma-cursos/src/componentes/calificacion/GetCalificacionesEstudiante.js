import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalificacionesPorEstudiante } from '../../redux/acciones/calificacionAccion';
import { getCursos } from '../../redux/acciones/cursoAccion';

const GetCalificacionesPorEstudiante = () => {
  const dispatch = useDispatch();
  const { usuario } = useSelector(estado => estado.autenticacion);
  const estudianteId = usuario?.usuarioId;

  const { calificaciones, cargando, error } = useSelector(estado => estado.calificacion);
  const { cursos } = useSelector(estado => estado.curso);

  useEffect(() => {
    if (estudianteId) {
      dispatch(getCalificacionesPorEstudiante(estudianteId));
      dispatch(getCursos());
    }
  }, [dispatch, estudianteId]);

  const obtenerNombreCurso = (cursoId) => {
    const curso = cursos?.find(c => c._id === cursoId);
    return curso ? curso.nombre : `Curso (ID: ${cursoId})`;
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-2">Cargando calificaciones...</span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-3">Error: {error}</div>;
  }

  if (!calificaciones || calificaciones.length === 0) {
    return <div className="alert alert-warning mt-3">No hay calificaciones disponibles.</div>;
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Calificaciones de {usuario?.nombre}</h4>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Curso</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {calificaciones.map((calif, index) => (
              <tr key={calif._id}>
                <td>{index + 1}</td>
                <td>{obtenerNombreCurso(calif.cursoId)}</td>
                <td>
                  <span className={`badge bg-${calif.nota >= 6 ? 'success' : 'danger'}`}>
                    {calif.nota}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetCalificacionesPorEstudiante;
