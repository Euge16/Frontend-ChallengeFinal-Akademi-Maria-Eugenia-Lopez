const estadoInicial = {
    usuario: {},
    token: null,
    usuarios: [],
    cargando: false,
    paginaActual: 1,
    totalPaginas: 1,
    totalRegistros: 0,
    error: null
};


const usuarioReducer = (estado = estadoInicial , accion) => {
    switch(accion.type) {
        case 'CARGANDO_USUARIOS':
            return {
                ...estado,
                cargando: true,
                error: null
            };
        case 'OBTENER_USUARIOS':
            return {
                ...estado,
                usuarios: accion.payload.usuarios,  
                paginaActual: accion.payload.paginaActual,
                totalPaginas: accion.payload.totalPaginas,
                totalRegistros: accion.payload.totalRegistros,
                cargando: false,
                error: null
            };
        case 'EDITAR_USUARIO_EXITO':
            return {
                ...estado,
                usuarios: estado.usuarios.map(u =>
                u._id === accion.payload._id ? accion.payload : u
                ),
                
                error: null
            };

        case 'EDITAR_USUARIO_ERROR':
            return {
                ...estado,
                error: accion.payload,
            };

        case 'ELIMINAR_USUARIO_EXITO':
            return {
                ...estado,
                usuarios: estado.usuarios.filter(u => u._id !== accion.payload),
                error: null
            };

        case 'ELIMINAR_USUARIO_ERROR':
            return {
                ...estado,
                error: accion.payload,
            };
        case 'USUARIO_DETALLE_EXITO':
            return { 
                ...estado, 
                cargando: false, 
                usuario: accion.payload 
            };
        case 'USUARIO_DETALLE_ERROR':
            return { ...estado, 
                cargando: false, 
                error: accion.payload 
            };
        case 'REGISTRO_DOCENTE_SUPERADMIN_EXITO':
            return {
                ...estado,
                cargando: false
            };
        default:
            return estado;
    }
};

export default usuarioReducer;