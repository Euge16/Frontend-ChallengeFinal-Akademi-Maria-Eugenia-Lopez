import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editarUsuario } from '../../redux/acciones/usuarioAccion';

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const usuario = useSelector(state =>
    state.usuario.usuarios.find(u => u._id === id)
  );
  const error = useSelector(state => state.usuario.error);


  const usuarioLogueado = useSelector(state => state.autenticacion.usuario);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
      setRol(usuario.rol);
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let datosEditar = { nombre, email };
    if (usuarioLogueado?.rol === 'superadmin') {
      datosEditar.rol = rol;
    }

    await dispatch(editarUsuario(id, datosEditar));


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

  if (!usuario) return <p>Cargando usuario...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Editar Usuario</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {usuarioLogueado?.rol === 'superadmin' && (
          <div className="mb-4">
            <label className="form-label">Rol</label>
            <select
              className="form-select"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="">Seleccionar rol</option>
              <option value="superadmin">Superadmin</option>
              <option value="docente">Docente</option>
              <option value="estudiante">Estudiante</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};


export default EditarUsuario;
