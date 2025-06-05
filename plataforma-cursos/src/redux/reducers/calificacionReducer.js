const estadoInicial = {
    calificaciones: [],
    cargando: false,
    error: null
};

const calificacionReducer = (estado = estadoInicial, accion) => {
    switch(accion.type) {
        case 'CARGANDO_CALIFICACIONES':
            return {
                ...estado,
                cargando: true,
                error: null
            };

        case 'CREAR_CALIFICACION_EXITO':
            return {
                ...estado,
                cargando: false,
                calificaciones: [...estado.calificaciones, accion.payload]
            };

        case 'EDITAR_CALIFICACION_EXITO':
            return {
                ...estado,
                calificaciones: estado.calificaciones.map(calif =>
                    calif._id === accion.payload._id ? accion.payload : calif
                )
            };

        case 'OBTENER_CALIFICACIONES_EXITO':
            return {
                ...estado,
                cargando: false,
                calificaciones: accion.payload.calificaciones || [],
            };

        case 'CALIFICACION_ERROR':
            return {
                ...estado,
                cargando: false,
                error: accion.payload
            };

        default:
            return estado;
    }
};

export default calificacionReducer;