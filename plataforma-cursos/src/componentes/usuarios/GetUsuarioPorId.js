import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsuarioPorId } from '../../redux/acciones/usuarioAccion';
import { useParams } from 'react-router-dom';

const GetUsuarioPorId = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { usuario, cargando, error } = useSelector(estado => estado.usuario);

  useEffect(() => {
    if (id) {
      dispatch(getUsuarioPorId(id));
    }
  }, [dispatch, id]);

  if (cargando) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando usuario...</span>
      </div>
    </div>
  );

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  if (!usuario || Object.keys(usuario).length === 0) {
    return <div className="alert alert-warning">No se encontró el usuario</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
        <div
          className="card-header text-white"
          style={{
            background: 'linear-gradient(90deg, #0d6efd, #00bcd4)',
            fontWeight: '600',
          }}
        >
          <h4 className="mb-0">👤 Detalle del Usuario</h4>
        </div>

        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
              <strong>Nombre:</strong>
              <span>{usuario.nombre}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <strong>Email:</strong>
              <span>{usuario.email}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Rol:</strong>
              <span className="text-capitalize badge bg-info text-dark">{usuario.rol}</span>
            </li>

            {usuario.rol === 'docente' && (
              <>
                <li className="list-group-item">
                  <strong>Título:</strong>
                  <p className="mb-0 text-break">{usuario.titulo || 'No disponible'}</p>
                </li>
                <li className="list-group-item">
                  <strong>Biografía:</strong>
                  <p
                    className="mb-0 text-break"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {usuario.biografia || 'No disponible'}
                  </p>
                </li>
              </>
            )}

            {usuario.rol === 'estudiante' && (
              <li className="list-group-item">
                <strong>Biografía:</strong>
                <p
                  className="mb-0 text-break"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {usuario.biografia || 'No disponible'}
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GetUsuarioPorId;
