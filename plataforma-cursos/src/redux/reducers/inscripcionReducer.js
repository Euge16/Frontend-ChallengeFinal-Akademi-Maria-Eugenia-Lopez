const estadoInicial = {
    inscripcion: {},
    inscripciones: [],
    cargando: false,
    paginaActual: 1,
    totalPaginas: 1,
    totalRegistros: 0,
    error: null,
};

const inscripcionReducer = (estado = estadoInicial, accion) => {
    switch (accion.type) {
        case 'CARGANDO_INSCRIPCIONES':
            return {
                ...estado,
                cargando: true,
                error: null,
            };
        case 'CREAR_INSCRIPCION_EXITO':
            return {
                ...estado,
                cargando: false,
                error: null,
            }
        case 'CREAR_INSCRIPCION_ERROR':
            return {
                ...estado,
                cargando: false,
                error: accion.payload,
            };

        case 'OBTENER_INSCRIPCIONES_EXITO':
            return {
                ...estado,
                inscripciones: accion.payload.inscripciones,
                paginaActual: accion.payload.paginaActual,
                totalPaginas: accion.payload.totalPaginas,
                totalRegistros: accion.payload.totalRegistros,
                cargando: false,
                error: null,
            };
        case 'OBTENER_INSCRIPCIONES_ERROR':
            return { 
                ...estado,
                inscripciones: [],
                error: accion.payload, 
            };

        case 'CANCELAR_INSCRIPCION_EXITO':
            return {
                ...estado,
                inscripciones: estado.inscripciones.filter(i => i._id !== accion.payload),
                error: null,
            };

        case 'CANCELAR_INSCRIPCION_ERROR':
            return {
                ...estado,
                error: accion.payload,
            };

        case 'CARGANDO_INSCRIPCIONES_POR_CURSO': // Nuevo
            return {
                ...estado,
                cargando: true,
                error: null,
            };

        case 'OBTENER_INSCRIPCIONES_POR_CURSO_EXITO':
            return {
                ...estado,
                inscripciones: accion.payload.inscripciones,
                cargando: false,
                error: null,
            };

        case 'OBTENER_INSCRIPCIONES_POR_CURSO_ERROR':
            return {
                ...estado,
                inscripciones: [],
                error: accion.payload,
                cargando: false,
            };
        
        default:
            return estado;
        
    }
};

export default inscripcionReducer;
