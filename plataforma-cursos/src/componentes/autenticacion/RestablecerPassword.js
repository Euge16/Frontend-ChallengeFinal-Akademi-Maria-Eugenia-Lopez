import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { restablecerPassword } from '../../redux/acciones/autenticacionAccion';

const RestablecerPassword = () => {
  const { token } = useParams();
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [erroresValidacion, setErroresValidacion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setMensajeError('');
    setErroresValidacion([]);
    setCargando(true);

    try {
      const respuesta = await dispatch(restablecerPassword(token, nuevaPassword));
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

  useEffect(() => {
    if (mensajeExito) {
      setTimeout(() => {
        navigate('/');
      }, 3000); 
    }
  }, [mensajeExito, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Restablecer Contraseña</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Nueva Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingrese su contraseña"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
            />
          </div>

          {mensajeExito && <div className="alert alert-success"> {mensajeExito}</div>}
        
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
            {cargando ? 'Restableciendo...' : 'Restablecer'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RestablecerPassword;