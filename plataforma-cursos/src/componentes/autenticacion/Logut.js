import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cerrarSesion } from "../../redux/acciones/autenticacionAccion";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (window.confirm('¿Está seguro que desea cerrar sesión?')) {
      dispatch(cerrarSesion());
      navigate("/", { replace: true });
    }
  };

  return (
    <button
      className="list-group-item list-group-item-action text-dark"
      onClick={handleLogout}
    >
      🚪 Cerrar Sesión
    </button>
  );

};

export default Logout;