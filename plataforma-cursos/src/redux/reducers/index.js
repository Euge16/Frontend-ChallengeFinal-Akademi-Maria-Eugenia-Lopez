import { combineReducers } from "redux";
import autenticacionReducer from './autenticacionReducer';
import usuarioReducer from "./usuarioReducer";
import cursoReducer from "./cursoReducer";
import inscripcionReducer from "./inscripcionReducer";
import calificacionReducer from "./calificacionReducer";

export default combineReducers({
  autenticacion: autenticacionReducer,
  usuario: usuarioReducer,
  curso: cursoReducer,
  inscripcion: inscripcionReducer,
  calificacion: calificacionReducer
});