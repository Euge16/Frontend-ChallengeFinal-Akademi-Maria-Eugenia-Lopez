import { combineReducers } from "redux";
import autenticacionReducer from './autenticacionReducer';
import usuarioReducer from "./usuarioReducer";

export default combineReducers({
  autenticacion: autenticacionReducer,
  usuario: usuarioReducer,
});