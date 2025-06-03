import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarCurso } from '../../redux/acciones/cursoAccion';

const EliminarCurso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const curso = useSelector(state =>
    state.curso.cursos.find(c => c._id === id)
  );

  const error = useSelector(state => state.curso.error);
  const usuarioLogueado = useSelector(state => state.autenticacion.usuario);

  const handleEliminar = async () => {
    try {
      await dispatch(eliminarCurso(id));
      if (usuarioLogueado?.rol === 'superadmin') {
        navigate('/superadmin');
      } else if (usuarioLogueado?.rol === 'docente') {
        navigate('/docente');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error al eliminar curso:', error);
    }
  };

  if (!curso) return <p>Curso no encontrado o no cargado.</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">¿Estás seguro de eliminar este curso?</h2>
      <div className="mb-3">
        <p><strong>Nombre:</strong> {curso.nombre}</p>
        <p><strong>Descripción:</strong> {curso.descripcion}</p>
        <p><strong>Docente:</strong> {curso.docenteId.nombre}</p>
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

export default EliminarCurso;
