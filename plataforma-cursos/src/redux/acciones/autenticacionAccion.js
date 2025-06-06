import api from "../../api/api";


const API = '/autenticacion';

export const iniciarSesion = (email, password) => {
  return async dispatch => {
    try {
      const respuesta = await api.post(`${API}/iniciar-sesion`, { email, password });
      const { token, usuarioId, nombre, email: emailUsuario, rol } = respuesta.data;
      const usuario = {
        usuarioId,
        nombre,
        email: emailUsuario,
        rol
      };
      
      dispatch({
        type: 'INICIO_SESION_EXITO',
        payload: {
          usuario,
          token
        }
      });

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

    } catch (error) {
        throw error; 
    }
  };
};

export const cargarUsuarioDesdeStorage = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const usuarioJSON = localStorage.getItem('usuario');

    if (token && usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);

      dispatch({
        type: 'INICIO_SESION_EXITO',
        payload: {
          usuario,
          token
        }
      });
    }
  };
};


export const cerrarSesion = () => {
  return dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    dispatch({ type: 'CERRAR_SESION' });
  };
};

export const solicitarRecuperacionPassword = (email) => {
  return async (dispatch) => {
    try {
      const respuesta = await api.post(`${API}/recuperar-password`, { email });
      dispatch({
        type: 'SOLICITAR_RECUPERACION_EXITO',
        payload: respuesta.data
      });
      return respuesta.data;
    } catch (error) {
        throw error;
    }
  };
};


export const restablecerPassword = (token, nuevaPassword) => {
  return async (dispatch) => {
    try {
      const respuesta = await api.post(`${API}/restablecer-password/${token}`, { nuevaPassword });
      dispatch({
        type: 'RESTABLECER_PASSWORD_EXITO',
        payload: respuesta.data
      });
      return respuesta.data
    } catch (error) {
        throw error;
    }
  };
};

export const registrarEstudiante = (datos) => {
  return async (dispatch) => {
      try {
        const respuesta = await api.post(`${API}/registrarse`, datos);

        dispatch({
          type: 'REGISTRO_EXITO',
          payload: respuesta.data
        });
        return respuesta.data
      } catch (error) {
          throw error;
      }
    };
};
