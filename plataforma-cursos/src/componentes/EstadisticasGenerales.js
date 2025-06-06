import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsuarios, getTotalesPorRol } from '../redux/acciones/usuarioAccion';
import { getCursos } from '../redux/acciones/cursoAccion';

const EstadisticasGenerales = () => {
  const dispatch = useDispatch();
  const { totalRegistros, totalEstudiantes, totalDocentes, totalSuperadmins } = useSelector(state => state.usuario);
  const { totalRegistros: totalCursos } = useSelector(state => state.curso);

  useEffect(() => {
    dispatch(getTotalesPorRol());
    dispatch(getUsuarios());
    dispatch(getCursos());
  }, [dispatch]);

  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
      <div className="col">
        <div className="card h-100 border-primary shadow-sm">
          <div className="card-body text-primary d-flex flex-column">
            <h5 className="card-title">Total Usuarios</h5>
            <p className="card-text fs-4 mt-auto">{totalRegistros}</p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 border-success shadow-sm">
          <div className="card-body text-success d-flex flex-column">
            <h5 className="card-title">Estudiantes</h5>
            <p className="card-text fs-4 mt-auto">{totalEstudiantes}</p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 border-info shadow-sm">
          <div className="card-body text-info d-flex flex-column">
            <h5 className="card-title">Docentes</h5>
            <p className="card-text fs-4 mt-auto">{totalDocentes}</p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 border-warning shadow-sm">
          <div className="card-body text-warning d-flex flex-column">
            <h5 className="card-title">Superadmins</h5>
            <p className="card-text fs-4 mt-auto">{totalSuperadmins}</p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 border-secondary shadow-sm">
          <div className="card-body text-secondary d-flex flex-column">
            <h5 className="card-title">Cursos</h5>
            <p className="card-text fs-4 mt-auto">{totalCursos}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasGenerales;
