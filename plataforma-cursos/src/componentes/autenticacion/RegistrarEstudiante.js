import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registrarEstudiante } from '../../redux/acciones/autenticacionAccion';

const RegistroEstudiante = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        const respuesta = await dispatch(registrarEstudiante({nombre, email, password}));
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

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center mb-4">Registrarse</h2>

            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre completo</label>
                <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
                </div>
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
                    {cargando ? 'Registrandose...' : 'Registrarse'}
                </button>

                <div className="text-center mt-3">
                    <p className="mb-0">
                    ¿Ya tienes cuenta?{' '}
                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => navigate('/login')}
                    >
                        Inicia sesión aquí
                    </button>
                    </p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default RegistroEstudiante;
