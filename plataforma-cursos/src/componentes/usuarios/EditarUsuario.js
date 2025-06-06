import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editarUsuario, getUsuarioPorId } from '../../redux/acciones/usuarioAccion';

const EditarUsuario = () => {
  const { id } = useParams();
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [erroresValidacion, setErroresValidacion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const usuario = useSelector(estado => {
    const u = estado.usuario.usuarios.find(u => u._id === id);
    return u || estado.usuario.usuario; 
  });

  const usuarioLogueado = useSelector(estado => estado.autenticacion.usuario);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [titulo, setTitulo] = useState('');
  const [biografia, setBiografia] = useState('');

  useEffect(() => {
    if (!usuario && id) {
      dispatch(getUsuarioPorId(id));
    }
  }, [usuario, id, dispatch]);

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
      setTitulo(usuario.titulo);
      setBiografia(usuario.biografia);
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    setCargando(true);
    setErroresValidacion([]);
    setMensajeError('');
    setMensajeExito('');


    try {
      e.preventDefault();
      const respuesta = await dispatch(editarUsuario(id, {nombre, email, titulo, biografia}));
      setMensajeExito(respuesta.mensaje);
      setTimeout(() => {
        if (usuarioLogueado.rol === 'superadmin') {
          navigate('/superadmin');
        } else if (usuarioLogueado.rol === 'docente') {
          navigate('/docente');
        } else {
          navigate('/estudiante');
        }
      }, 2000);

    } catch (error) {
      if (error.response?.data?.errors) {
        setErroresValidacion(error.response.data.errors);
      } else {
        setMensajeError(error.response?.data?.mensaje);
      }
    } finally {
      setCargando(false);
    }
  
  };

  if (!usuario) return <p>Cargando usuario...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Editar Usuario</h2>


      <form onSubmit={handleSubmit} noValidate>
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

        {usuario?.rol === 'docente' && (
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
        )}

        {(usuario?.rol === 'docente' || usuario?.rol === 'estudiante') && (
          <div className="mb-3">
            <label className="form-label">Biografía</label>
            <textarea
              className="form-control"
              rows="3"
              value={biografia}
              onChange={(e) => setBiografia(e.target.value)}
            />
          </div>
        )}

        {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
      
        {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

        {erroresValidacion.length > 0 && (
            <div className="alert alert-danger">
            <ul className="mb-0">
                {erroresValidacion.map((err, index) => (
                <li key={index}>{err.msg}</li>
                ))}
            </ul>
            </div>
        )}

        <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
          {cargando ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};


export default EditarUsuario;
