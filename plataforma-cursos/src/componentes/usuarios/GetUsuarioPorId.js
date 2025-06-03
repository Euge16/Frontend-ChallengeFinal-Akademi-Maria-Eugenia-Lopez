import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsuarioPorId } from '../../redux/acciones/usuarioAccion';
import { useParams } from 'react-router-dom';

const GetUsuarioPorId = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { usuario, cargando, error } = useSelector(state => state.usuario);

    useEffect(() => {
        dispatch(getUsuarioPorId(id));
    }, [dispatch, id]);

    if (cargando) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando usuario...</span>
        </div>
        </div>
    );

    if (error) return <div className="alert alert-danger">Error: {error}</div>;

    if (!usuario || Object.keys(usuario).length === 0) return (
        <div className="alert alert-warning">No se encontró el usuario</div>
    );

    return (
        <div className="container mt-5">
        <h2 className="mb-4">Detalle de usuario</h2>

        <ul className="list-group" style={{ maxWidth: '400px' }}>
            <li className="list-group-item d-flex justify-content-between">
            <strong>Nombre:</strong>
            <span>{usuario.nombre}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
            <strong>Email:</strong>
            <span>{usuario.email}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
            <strong>Rol:</strong>
            <span className="text-capitalize">{usuario.rol}</span>
            </li>
        </ul>
        </div>
    );
};

export default GetUsuarioPorId;
