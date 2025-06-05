import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarCalificacion, getCalificacionesPorEstudiante } from "../../redux/acciones/calificacionAccion";

const EditarCalificacion = ({ calificacionId, notaInicial, estudianteId, onClose }) => {
  const [nota, setNota] = useState(notaInicial);
  const [error, setError] = useState(null);
  const cargando = useSelector((state) => state.calificacion.cargando);
  const dispatch = useDispatch();

  const enviarEdicion = async () => {
    try {
      if (nota === "" || isNaN(nota)) {
        setError("Ingrese una nota válida");
        return;
      }
      await dispatch(editarCalificacion(calificacionId, { nota: Number(nota) }));
      await dispatch(getCalificacionesPorEstudiante(estudianteId));
      onClose();
    } catch (e) {
      console.error(e);
      setError("Error al editar la calificación: " + (e.message || e.toString()));
    }
  };

  return (
    <div>
      <input
        type="number"
        step="0.1"
        min="0"
        max="10"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        className="form-control"
      />

      {error && <div className="text-danger mt-1">{error}</div>}

      {cargando && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={onClose}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={enviarEdicion} disabled={cargando}>
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default EditarCalificacion;
