import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearCalificacion } from '../../redux/acciones/calificacionAccion';
import { getCalificacionesPorEstudiante } from '../../redux/acciones/calificacionAccion';

import EditarCalificacion from './EditarCalificacion';

const CrearCalificacion = ({ cursoId, estudianteId, calificacion, nombreEstudiante }) => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [newNota, setNewNota] = useState(calificacion?.nota || '');
    const [alerta, setAlerta] = useState({ type: '', mensaje: '' });
    const cargando = useSelector((state) => state.calificacion.cargando);


    const handleOpenModal = () => {
        setModal(true);
        setAlerta({ type: '', mensaje: '' });
    };

    const handleCloseModal = () => {
        setModal(false);
        setAlerta({ type: '', mensaje: '' });
    };

    const handleSubmitNueva = async () => {
        try {
            await dispatch(crearCalificacion({ cursoId, estudianteId, nota: Number(newNota) }));
            setAlerta({ type: 'success', mensaje: 'Calificación asignada correctamente.' });
            setTimeout(handleCloseModal, 2000);
            await dispatch(getCalificacionesPorEstudiante(estudianteId));
        } catch (error) {
            setAlerta({ type: 'danger', mensaje: `Error: ${error.mensaje}` });
        }
    };

    return (
        
        <>
            <button className="btn btn-sm btn-primary" onClick={handleOpenModal}>
                {calificacion ? 'Editar Calificación' : 'Asignar Calificación'}
            </button>

            {modal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {calificacion ? `Editar - ${nombreEstudiante}` : `Asignar a ${nombreEstudiante}`}
                                </h5>
                                <button className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                {alerta.mensaje && (
                                    <div className={`alert alert-${alerta.type}`}>
                                        {alerta.mensaje}
                                    </div>
                                )}

                                {cargando && (
                                    <div className="text-center my-3">
                                        <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                        </div>
                                    </div>
                                )}

                                {calificacion ? (
                                    <EditarCalificacion
                                        calificacionId={calificacion._id}
                                        notaInicial={calificacion.nota}
                                        estudianteId={estudianteId}
                                        onClose={handleCloseModal}
                                    />
                                ) : (
                                    <>
                                        <p><strong>Estudiante:</strong> {nombreEstudiante}</p>
                                        <div className="mb-3">
                                            <label>Nota</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                className="form-control"
                                                value={newNota}
                                                onChange={(e) => setNewNota(e.target.value)}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-secondary me-2" onClick={handleCloseModal}>
                                                Cancelar
                                            </button>
                                            <button className="btn btn-primary" onClick={handleSubmitNueva}>
                                                Guardar
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </>
    );
};

export default CrearCalificacion;
