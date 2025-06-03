import { Link } from 'react-router-dom';
import GetUsuarios from "./usuarios/GetUsuarios";


const PantallaSuperadmin = () => {

  return (
    <div className="container mt-4">
      <h1>Panel del Superadmin</h1>

      <Link to='/superadmin/crear-docente-superadmin' className="btn btn-success mb-4">Crear Docente/Superadmin</Link>

      <GetUsuarios />
    </div>
  );
};

export default PantallaSuperadmin;
