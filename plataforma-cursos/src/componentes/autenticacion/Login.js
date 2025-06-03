import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { iniciarSesion } from '../../redux/acciones/autenticacionAccion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [erroresValidacion, setErroresValidacion] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { usuario, autenticado } = useSelector(state => state.autenticacion);

  useEffect(() => {
    if (autenticado && usuario) {
      console.log('Rol:', usuario.rol); 
      if (usuario.rol === 'superadmin') {
        navigate('/superadmin');
      } else if (usuario.rol === 'docente') {
        navigate('/docente');
      } else if (usuario.rol === 'estudiante') {
        navigate('/estudiante');
      }
    }
  }, [autenticado, usuario, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setErroresValidacion([]);

    try {
      await dispatch(iniciarSesion(email, password));
    } catch (error) {
      if (error.response?.data?.errors) {
        setErroresValidacion(error.response.data.errors);
      } else {
        setMensajeError(error.response?.data?.mensaje);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Mensaje de error general */}
          {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

          {/* Errores de validación específicos */}
          {erroresValidacion.length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {erroresValidacion.map((err, index) => (
                  <li key={index}>{err.msg}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">Ingresar</button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate('/recuperar-password')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
