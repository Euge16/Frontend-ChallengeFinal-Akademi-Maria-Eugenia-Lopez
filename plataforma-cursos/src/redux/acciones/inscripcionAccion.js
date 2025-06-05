import api from "../../api/api";


const API = '/inscripciones';

export const crearInscripcion = (datos) => {
  return async (dispatch) => {
      try {
        const respuesta = await api.post(`${API}`, datos);

        dispatch({
          type: 'CREAR_INSCRIPCION_EXITO',
          payload: respuesta.data
        });
        return respuesta.data
      } catch (error) {
          throw error;
      }
    };
};

export const getInscripcionesEstudiante = (id, pagina = 1, limite = 3) => {
    return async (dispatch) =>{
        try {
            const respuesta = await api.get(`${API}/estudiante/${id}?pagina=${pagina}&limite=${limite}`);
            dispatch({
                type: 'OBTENER_INSCRIPCIONES_EXITO',
                payload: {
                    inscripciones: respuesta.data.inscripciones,
                    paginaActual: respuesta.data.paginaActual,
                    totalPaginas: respuesta.data.totalPaginas,
                    totalRegistros: respuesta.data.totalRegistros,
                    error: null
                },
            });
            return respuesta.data
        } catch (error) {
            dispatch({
                type: 'OBTENER_INSCRIPCIONES_ERROR',
                payload: error.response?.data?.mensaje 
            });
            throw error;
        }
    }
}

export const cancelarInscripcion = (id) => {
    return async (dispatch, getState) => {
        try {
            const respuesta = await api.delete(`${API}/${id}`);
            dispatch({ 
                type: 'CANCELAR_INSCRIPCION_EXITO', 
                payload: id 
            });

            const { usuario } = getState().autenticacion;
            dispatch(getInscripcionesEstudiante(usuario.usuarioId));
            
            return respuesta.data.mensaje;

        } catch (error) {
            dispatch({ 
                type: 'CANCELAR_INSCRIPCION_ERROR', 
                payload: error.response?.data?.mensaje 
            });
            throw error;
        }
    };
};

export const getInscripcionesPorCurso = ( id ) => {
    return async (dispatch) => {
        try {
            const respuesta = await api.get(`${API}/curso/${id}`);
            dispatch({
                type: 'OBTENER_INSCRIPCIONES_POR_CURSO_EXITO',
                payload: {
                    inscripciones: respuesta.data.inscripciones
                }
            });
        } catch (error) {
            dispatch({
                type: 'OBTENER_INSCRIPCIONES_POR_CURSO_ERROR',
                payload: error.response?.data?.mensaje 
            });
        }
    };
};