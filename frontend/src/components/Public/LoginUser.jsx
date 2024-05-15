import React, { useState, useRef } from "react";
import Logo from "../../assets/img/Azul.png";
import HelperForm from "../../helper/HelperForm";
import withReactContent from "sweetalert2-react-content";
import Swal2 from "sweetalert2";
import Cambio from "./Cambio";


const MySwal = withReactContent(Swal2);

const LoginUser = () => {
  const [signupClicked, setSignupClicked] = useState(false);

  const loginTextRef = useRef(null);
  const loginFormRef = useRef(null);

  const handleSignupClick = () => {
    if (loginTextRef.current) {
      loginTextRef.current.style.marginLeft = "-50%";
      loginFormRef.current.style.marginLeft = "-50%";
    }
    setSignupClicked(true);
  };

  const handleLoginClick = () => {
    if (loginTextRef.current) {
      loginTextRef.current.style.marginLeft = "0px";
      loginFormRef.current.style.marginLeft = "0px";
    }
    setSignupClicked(false);
  };
  const { form, cambiar } = HelperForm({});
  const Login = async (e) => {
    e.preventDefault();
    let formulario = form;
    const request = await fetch("http://localhost:3600/usuarios/login", {
      method: "POST",
      body: JSON.stringify(formulario),
      headers: { "Content-Type": "application/json" },
    });
    const data = await request.json();
    console.log(data);
    if (data.id == 200) {
      let token = data.token;
      let mensaje = data.mensaje;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.mensaje));
      MySwal.fire({
        title: <strong> {"Felicidades"} </strong>,
        html: <i>{mensaje}</i>,
        icon: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      const USU_EMAIL = document.querySelector("#USU_EMAIL");
      const USU_PASS = document.querySelector("#USU_PASS");
      USU_EMAIL.value = "";
      USU_PASS.value = "";

      let mensaje = data.mensaje;
      MySwal.fire({
        title: <strong> {"Error"}</strong>,
        html: <i>{mensaje}</i>,
        icon: "error",
      });
    }
  };
  return (
    <>
    <div className="body1">
      <div className="wrapper">
      
      <img src={Logo} alt="Logo" className="rounded mx-auto d-block img-fluid"  style={{ width: "200px", height: "auto" }} />
   
        <div className="title-text">
          <div
            className={`title login ${signupClicked ? "" : "clicked"}`}
            ref={loginTextRef}
          >
            Inicio
          </div>
          <div className={`title signup`}>Cambiar contraseña</div>
        </div>
        <div className="form-container ">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              onClick={handleLoginClick}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              onClick={handleSignupClick}
            />
            <label htmlFor="login" className={`slide login`}>
              Login
            </label>
            <label htmlFor="signup" className={`slide signup`}>
              Cambiar Contraseña?
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner ">
            <form
              action="#"
              className={`login  ${signupClicked ? "clicked" : ""}`}
              ref={loginFormRef}
              onSubmit={Login}
            >
              <div className="field d-flex justify-content-center">
                <input
                  type="text"
                  placeholder="Correo"
                  required
                  id="USU_EMAIL"
                  name="USU_EMAIL"
                  onChange={cambiar}
                />
              </div>
              <div className="field d-flex justify-content-center">
                <input
                  type="password"
                  placeholder="Contraseña"
                  required
                  id="USU_PASS"
                  name="USU_PASS"
                  onChange={cambiar}
                />
              </div>
              
              <div className="field btn d-flex justify-content-center">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>

            </form>
            <Cambio />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default LoginUser;
