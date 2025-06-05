import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelarInscripcion } from '../../redux/acciones/inscripcionAccion';

const CancelarInscripcion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usuario = useSelector(state => state.autenticacion.usuario);
  const { cargando, error } = useSelector(state => state.inscripcion);

  const inscripcion = useSelector(state =>
    state.inscripcion.inscripciones.find(i => i._id === id)
  );

  if (!usuario) return <p>Por favor, inicia sesión para continuar.</p>;

  if (cargando) return <p>Cargando datos de la inscripción...</p>;

  if (!inscripcion) return <p>No se encontró la inscripción a cancelar.</p>;

  const handleCancelar = async () => {
    try {
      await dispatch(cancelarInscripcion(id));
      setTimeout(() => navigate('/estudiante'), 300);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">¿Seguro querés cancelar esta inscripción?</h2>

      <div className="mb-3">
        <p><strong>Curso:</strong> {inscripcion.cursoId.nombre}</p>
        <p><strong>Descripción:</strong> {inscripcion.cursoId.descripcion}</p>
        <p><strong>Docente:</strong> {inscripcion.cursoId.docenteId?.nombre }</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div>
        <button className="btn btn-danger me-3" onClick={handleCancelar}>
          Confirmar cancelación
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default CancelarInscripcion;
