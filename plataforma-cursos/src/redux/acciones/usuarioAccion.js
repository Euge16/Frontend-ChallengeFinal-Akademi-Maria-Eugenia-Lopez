import api from "../../api/api";


const API = '/usuarios';


export const getUsuarios = (pagina = 1, limite = 3, filtros = {}) => {
    return async dispatch => {
        dispatch({ type: 'CARGANDO_USUARIOS' });

        try {
            const params = new URLSearchParams({ 
                pagina, 
                limite, 
                ...filtros 
            });

            const respuesta = await api.get(`${API}?${params.toString()}`);

            dispatch({ 
                type: 'OBTENER_USUARIOS', 
                payload: {
                    paginaActual: respuesta.data.paginaActual,
                    totalPaginas: respuesta.data.totalPaginas,
                    totalRegistros: respuesta.data.totalRegistros,
                    usuarios: respuesta.data.usuarios
                } 
            });
        } catch (error) {
            throw error;
        }
    };
};

export const editarUsuario = (id, datos) => {
    return async (dispatch) => {
        try {
        const respuesta = await api.patch(`${API}/${id}`, datos);
        dispatch({ 
            type: 'EDITAR_USUARIO_EXITO', 
            payload: respuesta.data 
        });
        } catch (error) {
        dispatch({ 
            type: 'EDITAR_USUARIO_ERROR', 
            payload: error.response?.data?.message 
        });
        }
    };
};

export const eliminarUsuario = (id) => {
    return async (dispatch) => {
        try {
        await api.delete(`${API}/${id}`);
        dispatch({ 
            type: 'ELIMINAR_USUARIO_EXITO', 
            payload: id 
        });
        } catch (error) {
        dispatch({ 
            type: 'ELIMINAR_USUARIO_ERROR', 
            payload: error.response?.data?.message 
        });
        }
    };
};

export const getUsuarioPorId = (id) => {
    return async (dispatch) => {
        try {
            const respuesta = await api.get(`${API}/${id}`);
            dispatch({
                type: 'USUARIO_DETALLE_EXITO',
                payload: respuesta.data,
            });
        } catch (error) {
            dispatch({
                type: 'USUARIO_DETALLE_ERROR',
                payload: error.response?.data?.message
            });
        }
    };
};

export const crearDocenteOSuperadmin = (datos) => {
    return async (dispatch) => {
        try {
            const respuesta = await api.post(`${API}`, datos);
            dispatch({
                type: 'REGISTRO_DOCENTE_SUPERADMIN_EXITO',
                payload: respuesta.data
            });
            return respuesta.data

        } catch (error) {
            throw error;
        }
    };
};
