import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarUsuario } from '../../redux/acciones/usuarioAccion';

const EliminarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usuario = useSelector(state =>
    state.usuario.usuarios.find(u => u._id === id)
  );

  const error = useSelector(state => state.usuario.error);

  const usuarioLogueado = useSelector(state => state.autenticacion.usuario);

  const handleEliminar = async () => {
    await dispatch(eliminarUsuario(id));

    if (usuarioLogueado?.rol === 'superadmin') {
        navigate('/superadmin');
    } else if (usuarioLogueado?.rol === 'docente') {
        navigate('/docente');
    } else if (usuarioLogueado?.rol === 'estudiante') {
        navigate('/estudiante');
    } else {
        navigate('/');
    }
  };

  if (!usuario) return <p>Usuario no encontrado o no cargado.</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">¿Estás seguro de eliminar este usuario?</h2>
      <div className="mb-3">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-danger me-2" onClick={handleEliminar}>
        Sí, Eliminar
      </button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Cancelar
      </button>
    </div>
  );
};

export default EliminarUsuario;
