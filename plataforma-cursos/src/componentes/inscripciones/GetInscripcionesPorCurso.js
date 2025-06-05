import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInscripcionesPorCurso } from "../../redux/acciones/inscripcionAccion";
import { getCalificacionesPorEstudiante } from "../../redux/acciones/calificacionAccion";
import CrearCalificacion from "../calificacion/CrearCalificacion";

const GetInscripcionesPorCurso = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { inscripciones, cargando, error } = useSelector(
    (estado) => estado.inscripcion
  );
  const { calificaciones } = useSelector((estado) => estado.calificacion);



  const [calificacionesMap, setCalificacionesMap] = useState({});

  useEffect(() => {
    dispatch(getInscripcionesPorCurso(id));
  }, [dispatch, id]);


  useEffect(() => {
    if (inscripciones.length > 0) {
      inscripciones.forEach((insc) => {
        dispatch(getCalificacionesPorEstudiante(insc.estudianteId._id));
      });
    }
  }, [inscripciones, dispatch]);


  useEffect(() => {
    const nuevoMapa = {};
    calificaciones.forEach((calif) => {
      const idEstudiante = typeof calif.estudianteId === 'object'
        ? calif.estudianteId._id
        : calif.estudianteId;

      nuevoMapa[idEstudiante] = calif;
    });
    setCalificacionesMap(nuevoMapa);
  }, [calificaciones]);

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-info text-white">
        <h5 className="mb-0">👥 Estudiantes Inscritos</h5>
      </div>
      <div className="card-body">
        {cargando ? (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando estudiantes inscritos...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : inscripciones.length === 0 ? (
          <p className="text-muted">No hay estudiantes inscritos aún.</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Nota</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map((insc) => {
                const estudianteId = insc.estudianteId._id;
                const calificacion = calificacionesMap[estudianteId];

                return (
                  <tr key={insc._id}>
                    <td>{insc.estudianteId.nombre}</td>
                    <td>{insc.estudianteId.email}</td>
                    <td>
                      {calificacion ? calificacion.nota : "Sin calificar"}
                    </td>
                    <td>
                      <CrearCalificacion
                        cursoId={id}
                        estudianteId={estudianteId}
                        calificacion={calificacion} 
                        nombreEstudiante={insc.estudianteId.nombre}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GetInscripcionesPorCurso;