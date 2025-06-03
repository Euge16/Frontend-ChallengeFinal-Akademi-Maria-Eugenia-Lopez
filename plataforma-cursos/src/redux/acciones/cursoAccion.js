import api from "../../api/api";


const API = '/cursos';

export const getCursos = (pagina = 1, limite = 3, filtros = {}) => {
    return async dispatch => {
        dispatch({ type: 'CARGANDO_CURSOS' });

        try {
            const params = new URLSearchParams({ 
                pagina, 
                limite, 
                ...filtros 
            });

            const respuesta = await api.get(`${API}?${params.toString()}`);

            dispatch({ 
                type: 'OBTENER_CURSOS_EXITO', 
                payload: {
                    paginaActual: respuesta.data.paginaActual,
                    totalPaginas: respuesta.data.totalPaginas,
                    totalRegistros: respuesta.data.totalRegistros,
                    cursos: respuesta.data.cursos
                } 
            });
        } catch (error) {
            dispatch({
                type: 'OBTENER_CURSOS_ERROR',
                payload: error.response?.data?.mensaje 
            });
            throw error;
        }
    };
};

export const editarCurso = (id, datos) => {
    return async (dispatch) => {
        try {
        const respuesta = await api.patch(`${API}/${id}`, datos);
        dispatch({ 
            type: 'EDITAR_CURSO_EXITO', 
            payload: respuesta.data 
        });
        return respuesta.data
        } catch (error) {
            dispatch({ 
                type: 'EDITAR_CURSO_ERROR', 
                payload: error.response?.data?.mensaje 
            });
            throw error;
        }
    };
};

export const getCursoPorId = (id) => {
    return async (dispatch) => {
        try {
            const respuesta = await api.get(`${API}/${id}`);
            dispatch({
                type: 'CURSO_DETALLE_EXITO',
                payload: respuesta.data,
            });
        } catch (error) {
            dispatch({
                type: 'CURSO_DETALLE_ERROR',
                payload: error.response?.data?.mensaje
            });
            throw error;
        }
    };
};

export const eliminarCurso = (id) => {
    return async (dispatch) => {
        try {
        const respuesta = await api.delete(`${API}/${id}`);
        dispatch({ 
            type: 'ELIMINAR_CURSO_EXITO', 
            payload: id 
        });
        
        return respuesta.data.mensaje;

        } catch (error) {
            dispatch({ 
                type: 'ELIMINAR_CURSO_ERROR', 
                payload: error.response?.data?.mensaje 
            });
            throw error;
        }
    };
};