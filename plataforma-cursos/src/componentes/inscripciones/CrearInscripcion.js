import React from 'react';
import { useDispatch } from 'react-redux';
import { crearInscripcion } from '../../redux/acciones/inscripcionAccion';

const CrearInscripcion = ({ cursoId }) => {
    const dispatch = useDispatch();

    const handleInscribirse = async () => {
        try {
            await dispatch(crearInscripcion({ cursoId }));
            alert('Te has inscrito correctamente.');
            window.location.reload(); 
        } catch (error) {
            console.error('Error al inscribirse:', error);
            alert(`Error: ${error.response?.data?.mensaje || 'No se pudo inscribir.'}`);
        }
    };

    return (
        <button className="btn btn-success btn-sm" onClick={handleInscribirse}>
            Inscribirse
        </button>
    );
};

export default CrearInscripcion;