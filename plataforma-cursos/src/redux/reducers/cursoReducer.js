const estadoInicial = {
    curso: {},
    cursos: [],
    cargando: false,
    paginaActual: 1,
    totalPaginas: 1,
    totalRegistros: 0,
    error: null,
};

const cursoReducer = (estado = estadoInicial, accion) => {
    switch (accion.type) {
        case 'CARGANDO_CURSOS':
            return {
                ...estado,
                cargando: true,
                error: null
            };
        case 'OBTENER_CURSOS_EXITO':
            return {
                ...estado,
                cursos: accion.payload.cursos,
                paginaActual: accion.payload.paginaActual,
                totalPaginas: accion.payload.totalPaginas,
                totalRegistros: accion.payload.totalRegistros,
                cargando: false,
                error: null
            };
        case 'OBTENER_CURSOS_ERROR':
            return { 
                ...estado, 
                error: accion.payload 
            };
        case 'EDITAR_CURSO_EXITO':
            return {
                ...estado,
                cursos: estado.cursos.map(u =>
                u._id === accion.payload._id ? accion.payload : u
                ),
                
                error: null
            };

        case 'EDITAR_CURSO_ERROR':
            return {
                ...estado,
                error: accion.payload,
            };

        case 'ELIMINAR_CURSO_EXITO':
            return {
                ...estado,
                cursos: estado.cursos.filter(u => u._id !== accion.payload),
                error: null
            };

        case 'ELIMINAR_CURSO_ERROR':
            return {
                ...estado,
                error: accion.payload,
            };
        case 'CURSO_DETALLE_EXITO':
            return { 
                ...estado, 
                cargando: false, 
                curso: accion.payload 
            };
        case 'CURSO_DETALLE_ERROR':
            return { ...estado, 
                cargando: false, 
                error: accion.payload 
            };
        case 'REGISTRO_CURSO_EXITO':
            return {
                ...estado,
                cargando: false
            };
        default:
            return estado;
        
    }
};

export default cursoReducer;
