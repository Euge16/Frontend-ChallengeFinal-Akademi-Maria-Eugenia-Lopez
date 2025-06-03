import { combineReducers } from "redux";
import autenticacionReducer from './autenticacionReducer';
import usuarioReducer from "./usuarioReducer";
import cursoReducer from "./cursoReducer";


export default combineReducers({
  autenticacion: autenticacionReducer,
  usuario: usuarioReducer,
  curso: cursoReducer
});