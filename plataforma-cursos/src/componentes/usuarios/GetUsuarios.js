import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsuarios } from '../../redux/acciones/usuarioAccion';

const GetUsuarios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    usuarios,
    cargando,
    paginaActual,
    totalPaginas,
    totalRegistros
  } = useSelector(state => state.usuario);

  const [pagina, setPagina] = useState(1);
  const [rolFiltro, setRolFiltro] = useState('');
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [emailFiltro, setEmailFiltro] = useState('');
  const limite = 3;

  
  useEffect(() => {
    const filtros = {};
    if (rolFiltro) filtros.rol = rolFiltro;
    if (nombreFiltro) filtros.nombre = nombreFiltro;
    if (emailFiltro) filtros.email = emailFiltro;
    
    dispatch(getUsuarios(pagina, limite, filtros));
  }, [dispatch, pagina, limite, rolFiltro, nombreFiltro, emailFiltro]);


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

  

  return (
    <div className="container mt-4 mb-5">
      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por nombre"
            value={nombreFiltro}
            onChange={(e) => setNombreFiltro(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por email"
            value={emailFiltro}
            onChange={(e) => setEmailFiltro(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={rolFiltro}
            onChange={(e) => {
              setRolFiltro(e.target.value);
              setPagina(1);
            }}
          >
            <option value="">Todos los roles</option>
            <option value="superadmin">Superadmin</option>
            <option value="docente">Docente</option>
            <option value="estudiante">Estudiante</option>
          </select>
        </div>
        
      </div>

      {/* Tabla */}
      {cargando  ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando usuarios...</p>
        </div>
      ) : (
        <>
          <p>Total de usuarios: <strong>{totalRegistros}</strong></p>

          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario._id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => navigate(`/usuarios/ver/${usuario._id}`)}
                    >
                      Ver
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/usuarios/editar/${usuario._id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => navigate(`/usuarios/eliminar/${usuario._id}`)}
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

export default GetUsuarios;