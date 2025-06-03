import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  const manejarRedireccion = (ruta) => {
    navigate(ruta);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div className="container-fluid">
          <span className="navbar-brand">Vortex-Cursos</span>
          <div className="dropdown ms-auto">
            
            <div className="position-relative">
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownAcceder" data-bs-toggle="dropdown" aria-expanded="false">
                    Acceder
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownAcceder" style={{ position: 'absolute', right: 0, top: '100%', zIndex: 1000 }}>
                <li>
                    <button className="dropdown-item" onClick={() => manejarRedireccion('/login')}>
                        Iniciar sesión
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={() => manejarRedireccion('/registrarse')}>
                        Registrarse
                    </button>
                </li>
                
                </ul>
            </div>
            </div>

          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="text-center">
          <h1>Bienvenido a Vortex-Cursos</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
