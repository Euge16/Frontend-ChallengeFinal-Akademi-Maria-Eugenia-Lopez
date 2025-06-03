import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { crearDocenteOSuperadmin } from '../../redux/acciones/usuarioAccion';

const CrearDocenteOSuperadmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'docente', 
    titulo: '',
    biografia: ''
  });

  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [erroresValidacion, setErroresValidacion] = useState([]);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setMensajeError('');
    setErroresValidacion([]);
    setCargando(true);

    try {
      const data = await dispatch(crearDocenteOSuperadmin(form));
      setMensajeExito(data.mensaje);
      setForm({
        nombre: '',
        email: '',
        password: '',
        rol: 'docente',
        titulo: '',
        biografia: ''
      });

      setTimeout(() => {
        navigate('/superadmin');
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

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h3>Crear nuevo Docente o Superadmin</h3>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rol" className="form-label">Rol</label>
          <select
            className="form-select"
            id="rol"
            name="rol"
            value={form.rol}
            onChange={handleChange}
          >
            <option value="docente">Docente</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        {form.rol === 'docente' && (
          <>
            <div className="mb-3">
              <label className="form-label">Título (opcional)</label>
              <input type="text" className="form-control" name="titulo" value={form.titulo} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Biografía (opcional)</label>
              <textarea className="form-control" name="biografia" value={form.biografia} onChange={handleChange}></textarea>
            </div>
          </>
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
        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? 'Creando...' : 'Crear'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/superadmin')}>
            Cancelar
        </button>
      </form>
    </div>
  );
};

export default CrearDocenteOSuperadmin;