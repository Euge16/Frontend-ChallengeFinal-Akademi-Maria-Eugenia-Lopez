import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInscripcionesEstudiante } from "../../redux/acciones/inscripcionAccion";

const GetInscripcionesEstudiante = () => {
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.autenticacion.usuario);
  const {
    inscripciones,
    cargando,
    error,
    paginaActual,
    totalPaginas,
    totalRegistros,
  } = useSelector((state) => state.inscripcion);

  const [pagina, setPagina] = useState(1);
  const limite = 3;

  useEffect(() => {
    if (usuario?.usuarioId) {
      dispatch(getInscripcionesEstudiante(usuario.usuarioId, pagina, limite));
    }
  }, [dispatch, usuario, pagina, limite]);

  if (!usuario)
    return <p>Por favor, inicia sesión para ver tus inscripciones.</p>;

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Mis Inscripciones</h2>

      {cargando ? (
        <p>Cargando inscripciones...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          {inscripciones.length === 0 ? (
            <p>No hay inscripciones para mostrar.</p>
          ) : (
            <>
              <p>
                Total de inscripciones: <strong>{inscripciones.length}</strong>
              </p>

              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Nombre del curso</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {inscripciones.map((inscripcion) => (
                    <tr key={inscripcion._id}>
                      <td>{inscripcion.cursoId.nombre}</td>
                      <td>{inscripcion.cursoId.descripcion}</td>
                      <td>
                        <Link
                          className="btn btn-sm btn-danger"
                          to={`/inscripciones/cancelar/${inscripcion._id}`}
                        >
                          Cancelar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Paginación */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-primary"
              onClick={() => setPagina((p) => Math.max(p - 1, 1))}
              disabled={pagina === 1}
            >
              Anterior
            </button>
            <span>
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              className="btn btn-primary"
              onClick={() => setPagina((p) => p + 1)}
              disabled={pagina === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GetInscripcionesEstudiante;
