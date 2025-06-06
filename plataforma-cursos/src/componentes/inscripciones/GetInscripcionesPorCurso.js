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
    <div className="container mt-5">
  <div className="mb-4 text-center">
    <h3 className="fw-bold">👥 Estudiantes Inscritos</h3>
  </div>

  {cargando ? (
    <div className="text-center my-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-2">Cargando estudiantes inscritos...</p>
    </div>
  ) : error ? (
    <div className="alert alert-danger text-center" role="alert">
      {error}
    </div>
  ) : inscripciones.length === 0 ? (
    <p className="text-muted text-center">No hay estudiantes inscritos aún.</p>
  ) : (
    <div className="table-responsive mx-auto" style={{ maxWidth: "900px" }}>
      <table className="table table-bordered table-hover align-middle shadow-sm">
        <thead className="table-dark text-center">
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
                <td className="text-center">
                  {calificacion ? calificacion.nota : "Sin calificar"}
                </td>
                <td className="text-center">
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
    </div>
  )}
</div>

  );
};

export default GetInscripcionesPorCurso;