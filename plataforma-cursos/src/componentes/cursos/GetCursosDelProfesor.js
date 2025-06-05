import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCursosDelProfesor } from '../../redux/acciones/cursoAccion';

const GetCursosDelProfesor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usuario = useSelector(state => state.autenticacion.usuario);
  const { cursos, cargando, paginaActual, totalPaginas, totalRegistros } = useSelector(state => state.curso);

  const [pagina, setPagina] = useState(1);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const limite = 3;

  useEffect(() => {
    if (usuario && usuario.usuarioId) {
      const filtros = {};
      if (nombreFiltro) filtros.nombre = nombreFiltro;

      dispatch(getCursosDelProfesor(usuario.usuarioId, pagina, limite, filtros));
    }
  }, [dispatch, usuario, pagina, limite, nombreFiltro]);

  const siguientePagina = () => {
    if (pagina < totalPaginas) {
      setPagina(pagina + 1);
    }
  };

  const paginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  if (!usuario) return <p>Por favor, inicia sesión para ver tus cursos.</p>;

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Mis Cursos</h2>

      {/* Filtro */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por nombre"
            value={nombreFiltro}
            onChange={e => setNombreFiltro(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla */}
      {cargando ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando cursos...</p>
        </div>
      ) : (
        <>
          <p>Total de cursos: <strong>{totalRegistros}</strong></p>

          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cupo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map(curso => (
                <tr key={curso._id}>
                  <td>{curso.nombre}</td>
                  <td>{curso.descripcion}</td>
                  <td>{curso.cupo}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => navigate(`/cursos/ver/${curso._id}`)}
                    >
                      Ver
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/cursos/editar/${curso._id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => navigate(`/cursos/eliminar/${curso._id}`)}
                    >
                      Eliminar
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="d-flex justify-content-between align-items-center mt-5 pt-3 border-top">
            <button
              className="btn btn-primary"
              onClick={paginaAnterior}
              disabled={pagina === 1}
            >
              Anterior
            </button>

            <span className="fw-bold">
              Página {paginaActual} de {totalPaginas}
            </span>

            <button
              className="btn btn-primary"
              onClick={siguientePagina}
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

export default GetCursosDelProfesor;
