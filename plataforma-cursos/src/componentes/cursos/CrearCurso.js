import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { crearCurso } from '../../redux/acciones/cursoAccion'; 

const CrearCurso = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cupo, setCupo] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [erroresValidacion, setErroresValidacion] = useState([]);
  const [cargando, setCargando] = useState(false);

  const dispatch = useDispatch();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setMensajeError('');
    setErroresValidacion([]);
    setCargando(true);

    try {
        const respuesta = await dispatch(crearCurso({nombre, descripcion, cupo}));
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
            <h2 className="text-center mb-4">Crear Curso 🛠️</h2>

            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre del Curso</label>
                <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Nombre del curso"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción del Curso</label>
                    <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    placeholder="Descripción del curso"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cupo" className="form-label">Cupo</label>
                    <input
                    type="number"
                    className="form-control"
                    id="cupo"
                    placeholder="Ingrese cupo disponible del curso"
                    value={cupo}
                    onChange={(e) => setCupo(e.target.value)}
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
                    {cargando ? 'Creando...' : 'Crear Curso'}
                </button>

            </form>
        </div>
    </div>
  );
};

export default CrearCurso;
