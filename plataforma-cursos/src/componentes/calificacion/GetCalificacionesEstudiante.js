import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalificacionesPorEstudiante } from '../../redux/acciones/calificacionAccion';

const GetCalificacionesPorEstudiante = ({ estudianteId }) => {
  const dispatch = useDispatch();

  const { calificaciones, cargando, error } = useSelector(estado => estado.calificacion);

  useEffect(() => {
    if (estudianteId) {
      dispatch(getCalificacionesPorEstudiante(estudianteId));
    }
  }, [dispatch, estudianteId]);

  if (cargando) {
    return <div>Cargando calificaciones...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!calificaciones || calificaciones.length === 0) {
    return <div>No hay calificaciones disponibles.</div>;
  }

  return (
    <div>
      <h5>Calificaciones:</h5>
      <ul className="list-group">
        {calificaciones.map(calif => (
          <li key={calif._id} className="list-group-item">
            Curso ID: {calif.cursoId} — Nota: {calif.nota}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetCalificacionesPorEstudiante;
