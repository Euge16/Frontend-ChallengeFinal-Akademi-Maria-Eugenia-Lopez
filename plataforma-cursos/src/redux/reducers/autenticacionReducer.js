const estadoInicial = {
  token: null,
  usuario: null, 
  autenticado: false,
  cargando: false,
  error: null
};

const autenticacionReducer = (estado = estadoInicial , accion) => {
    switch(accion.type) {
        case 'INICIO_SESION_SOLICITUD':
            return { 
                ...estado, 
                cargando: true, 
                error: null 
            };
        case 'INICIO_SESION_EXITO':
            return { 
                ...estado, 
                token: accion.payload.token, 
                usuario: accion.payload.usuario, 
                autenticado: true,
                cargando: false,
                error: null
            };
        case 'CERRAR_SESION':
            return { 
                ...estado, 
                usuario: null 
            };
        case 'SOLICITAR_RECUPERACION_EXITO':
            return {
                ...estado,
                error: null,
            };

        case 'RESTABLECER_PASSWORD_EXITO':
            return {
                ...estado,
                error: null,
            };
        case 'REGISTRO_EXITO':
            return {
                ...estado,
                cargando: false
            };
        default:
            return estado;
    }
};

export default autenticacionReducer;