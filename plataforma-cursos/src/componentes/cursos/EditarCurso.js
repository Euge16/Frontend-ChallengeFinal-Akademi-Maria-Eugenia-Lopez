import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editarCurso } from '../../redux/acciones/cursoAccion'; 

const EditarCurso = () => {
  const { id } = useParams();
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [erroresValidacion, setErroresValidacion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const dispatch = useDispatch();


  const curso = useSelector(estado => estado.curso.cursos.find(c => c._id === id)
  );
  const error = useSelector(estado => estado.curso.error);


  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cupo, setCupo] = useState('');

  useEffect(() => {
    if (curso) {
      setNombre(curso.nombre);
      setDescripcion(curso.descripcion);
      setCupo(curso.cupo);
    }
  }, [curso]);

  const handleSubmit = async (e) => {
    setCargando(true);
    setErroresValidacion([]);
    setMensajeError('');
    setMensajeExito('');

    try {
      e.preventDefault();
      const respuesta = await dispatch(editarCurso(id, {nombre, descripcion, cupo}));
      setMensajeExito(respuesta.mensaje);
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

  if (!curso) return <p>Cargando curso...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Editar curso</h2>

      {error && <div className="alert alert-danger">{error}</div>}

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
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cupo</label>
          <input
            type="number"
            className="form-control"
            value={cupo}
            onChange={(e) => setCupo(e.target.value)}
            required
          />
        </div>
        
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


export default EditarCurso;