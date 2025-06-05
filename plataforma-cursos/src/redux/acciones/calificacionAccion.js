import api from "../../api/api";


const API = '/calificaciones';


export const crearCalificacion = (datos) => async (dispatch) => {
    try {
        const respuesta = await api.post(`${API}`, datos);
        dispatch({
            type: 'CREAR_CALIFICACION_EXITO',
            payload: respuesta.data
        });
        return respuesta.data;
    } catch (error) {
        dispatch({
            type: 'CALIFICACION_ERROR',
            payload: error.response?.data?.mensaje 
        });
        throw error;
    }
};

export const getCalificacionesPorEstudiante = (id) => async (dispatch) => {
    dispatch({ type: 'CARGANDO_CALIFICACIONES' });

    try {
        const respuesta = await api.get(`${API}/estudiante/${id}`);
        dispatch({
            type: 'OBTENER_CALIFICACIONES_EXITO',
            payload: respuesta.data.calificaciones,
        });
    } catch (error) {
        dispatch({
            type: 'CALIFICACION_ERROR',
            payload: error.response?.data?.mensaje
        });
    }
};

export const editarCalificacion = (id, datos) => async (dispatch) => {
    try {
        const respuesta = await api.patch(`${API}/${id}`, datos);
        dispatch({
            type: 'EDITAR_CALIFICACION_EXITO',
            payload: respuesta.data
        });
        return respuesta.data.mensaje;
    } catch (error) {
        dispatch({
            type: 'CALIFICACION_ERROR',
            payload: error.response?.data?.mensaje 
        });
        throw error;
    }
};