import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import img from "../../assets/img/Azul.png";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

function Aside() {
  const datos = JSON.parse(localStorage.getItem("user"));
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Función para alternar la visibilidad de la barra lateral
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <aside className={isSidebarVisible ? "sidebar" : "sidebar hidden"}>
      <div className="sidebar-start">
        <div className="sidebar-head">
          <a href="/" className="logo-wrapper" title="Home">
            <span className="sr-only">Home</span>
            <span className="sidebar-user-img">
              <img src={img} alt="" />
            </span>
            <div className="logo-text">
              <span className="logo-title">Azul</span>
              <span className="logo-subtitle">Soluciones</span>
            </div>
          </a>
          <button
            className="sidebar-toggle transparent-btn rotated"
            title="Menu"
            type="button"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Toggle menu</span>
            <span className="icon menu-toggle" aria-hidden="true"></span>
          </button>
        </div>
        <div className="sidebar-body">
          <ul className="sidebar-body-menu">
            <li>
              <NavLink to="/Dashboard">
                <span className="icon home" aria-hidden="true"></span>General
              </NavLink>
            </li>
            <li>
              <NavLink to="Main">
                <span className="icon" aria-hidden="true">
                  <MonetizationOnIcon />
                </span>
                Ventas
              </NavLink>
            </li>
            <li>
              <NavLink to="compras">
                <span className="icon" aria-hidden="true">
                  <ShoppingCartIcon />
                </span>
                Compras
              </NavLink>
            </li>
            <li>
              <NavLink to="d">
                <span className="icon" aria-hidden="true">
                  <TrendingDownIcon />
                </span>
                Egresos
              </NavLink>
            </li>
            <hr style={{color:"white"}} />
            <li>
              <NavLink to="/Dashboard">
                <span className="icon user-3" aria-hidden="true"></span>Administrador
              </NavLink>
            </li>
          </ul>
         
          
        </div>
      </div>
      <div className="sidebar-footer">
        <a href="##" className="sidebar-user">
          <span className="sidebar-user-img">
            <picture>
              <source srcset={img} type="image/webp" />
              <img src={img} alt="User name" />
            </picture>
          </span>
          <div className="sidebar-user-info">
            <span className="sidebar-user__title">
              {" "}
              {datos.EMP_RAZON_SOCIAL}
            </span>
            <span className="sidebar-user__subtitle">
              Nit: {datos.EMP_TERCERO}
            </span>
          </div>
        </a>
      </div>
    </aside>
  );
}

export default Aside;
