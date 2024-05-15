import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../../helper/UseAuth";

const Layaout = () => {
  const { Autenticado } = UseAuth();
  return !Autenticado.USUARIO_ID ? <Outlet /> : <Navigate to={"/Dashboard"} />;
};

export default Layaout;
