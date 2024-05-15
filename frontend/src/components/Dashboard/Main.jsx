import React, { useState, useEffect } from "react";
import AssessmentIcon from '@mui/icons-material/Assessment';
import Barras from "./Graficas";
import Dona from "./dona";
//import { Line } from "react-chartjs-2";
import Lineas from "./Lineas";
//import Torta from "./Torta";
import DonaVentadia from "./DonaVentadia";
import DonaVentausemana from "./DonaVentausemana";
import BarrasPeriodo from "./barrasVentaperiodo";
import { NavLink } from 'react-router-dom';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Main = () => {

  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const [totalsemana, setTotalsemana] = useState(0);
  const datos = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaUltimaSemana/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir aquí el token si es necesario
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      // Clonar el array de datos para no modificar el original
      const sortedData = [...responseData];

      // Ordenar los datos por día del mes
      sortedData.sort((a, b) => a.dia_mes - b.dia_mes);

      // Calcular el total de ventas para la semana
      const total = sortedData.reduce(
        (accumulatedTotal, currentItem) =>
          accumulatedTotal + currentItem.vr_total_dia,
        0
      );
      setTotalsemana(total);

      // Establecer los datos ordenados en el estado
      setData(sortedData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  //////////FIN/////////

  ///VENTA TOTAL PERIODOSSSSSSSSS
  const [data2, setData2] = useState(null);
  const [totalPeriodo, setTotalPeriodo] = useState(0); // Estado para almacenar la suma total del período
  const token2 = localStorage.getItem("token");
  //const datos2 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData2();
  }, []);

  const fetchData2 = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaPeriodos/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir aquí el token si es necesario
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola

      // Calcula la suma total del período
      const total = responseData.reduce(
        (accumulatedTotal, currentItem) =>
          accumulatedTotal + currentItem.vr_total_periodo,
        0
      );
      setTotalPeriodo(total);

      // Establece los datos en el estado
      setData2(responseData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };
  ////////FIN/////////

  ////VENTA DIA/////////////////////

  const [data3, setData3] = useState(null);
  const [totalVentaxHora, setTotalVentaxHora] = useState(0); // Estado para almacenar la suma total del período
  const [fechaLocal, setFechaLocal] = useState(""); // Estado para almacenar la fecha local
  const token3 = localStorage.getItem("token");
  //const datos3 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData3();
    getLocalDate(); // Llama a la función para obtener la fecha local cuando el componente se monta
  }, []);

  const fetchData3 = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaxHora/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir aquí el token si es necesario
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola

      // Calcula la suma total del período
      const total = responseData.reduce(
        (accumulatedTotal, currentItem) =>
          accumulatedTotal + currentItem.venta_hora,
        0
      );
      setTotalVentaxHora(total);

      // Establece los datos en el estado
      setData3(responseData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const getLocalDate = () => {
    // Crea un nuevo objeto Date para obtener la fecha local
    const localDate = new Date();

    // Formatea la fecha local según tus necesidades
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = localDate.toLocaleDateString("es-ES", options);

    // Establece la fecha local en el estado
    setFechaLocal(formattedDate);
  };
  ////////FIN////////////



  //-------------------------------------VENTA POST DIA---------------------------------------------//
  const [data4, setData4] = useState(null);
  const [totalVentaPostxHora, setTotalVentaPostxHora] = useState(0); // Estado para almacenar la suma total del período
  const [fechaLocal1, setFechaLocal1] = useState(""); // Estado para almacenar la fecha local
  const token4 = localStorage.getItem("token");
  const datos4 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData4();
    getLocalDate4(); // Llama a la función para obtener la fecha local cuando el componente se monta
  }, []);

  const fetchData4 = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaPosxHora/${datos4.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir aquí el token si es necesario
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola

      // Calcula la suma total del período
      const total = responseData.reduce(
        (accumulatedTotal, currentItem) =>
          accumulatedTotal + currentItem.venta_hora,
        0
      );
      setTotalVentaPostxHora(total);

      // Establece los datos en el estado
      setData4(responseData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const getLocalDate4 = () => {
    // Crea un nuevo objeto Date para obtener la fecha local
    const localDate = new Date();

    // Formatea la fecha local según tus necesidades
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = localDate.toLocaleDateString("es-ES", options);

    // Establece la fecha local en el estado
    setFechaLocal1(formattedDate);
  };
  //---------------------------------------FIN-------------------------------------------//

  //--------------------------------VENTA POST ULT SEMANA--------------------------------//
  const [data5, setData5] = useState(null);
  const token5 = localStorage.getItem("token");
  const [totalPostsemana, setTotalPostsemana] = useState(0);
  const datos5 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData5();
  }, []);

  const fetchData5= async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaPosUltimaSemana/${datos5.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir aquí el token si es necesario
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      // Clonar el array de datos para no modificar el original
      const sortedData = [...responseData];

      // Ordenar los datos por día del mes
      sortedData.sort((a, b) => a.dia_mes - b.dia_mes);

      // Calcular el total de ventas para la semana
      const total = sortedData.reduce(
        (accumulatedTotal, currentItem) =>
          accumulatedTotal + currentItem.vr_total_dia,
        0
      );
      setTotalPostsemana(total);

      // Establecer los datos ordenados en el estado
      setData5(sortedData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  //-----------------------------------------FIN-----------------------------------------//

  //------------------------------------VENTA POST PERIODO-------------------------------//

  const [data6, setData6] = useState(null);
  const [totalPostPeriodo, setTotalPostPeriodo] = useState(0); // Estado para almacenar la suma total del período
  const token6 = localStorage.getItem("token");
  const datos6 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData6();
  }, []);

  const fetchData6 = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaPeriodos/${datos6.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir aquí el token si es necesario
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola

      // Calcula la suma total del período
      const total = responseData.reduce(
        (accumulatedTotal, currentItem) =>
          accumulatedTotal + currentItem.vr_total_periodo,
        0
      );
      setTotalPostPeriodo(total);

      // Establece los datos en el estado
      setData6(responseData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  //------------------------------------------FIN----------------------------------------//
  
  return (
    <>
      <main className="main users chart-page" id="skip-target">
        <div className="container">
          <h5 id="tituloCompras" className="active mb-3">
            {" "}
            <AssessmentIcon /> Reporte de Ventas
          </h5>
          <div className="row stat-cards justify-content-center gutter-0">
            <div className="col-md-6 col-xl-3 " id="cards-1">
              <article
                id="article2"
                style={{ backgroundColor: "#109bd6", color: "white" }}
                className="stat-cards-item"
              >
                <div>
                  <NavLink to="./Main">
                    <p>
                      {" "}
                      <CalendarMonthIcon />
                      Ventas de hoy
                    </p>
                  </NavLink>

                  <br />
                  <p>
                    Total venta del dia: ${totalVentaxHora.toLocaleString()}
                  </p>
                  <br />
                  <div className="stat-cards-info">
                    <p className="stat-cards-info__title"></p>
                    <p className="stat-cards-info__progress">
                      <span className="stat-cards-info__profit success">
                        <i
                          data-feather="trending-up"
                          className="fecha"
                          id="fecha"
                          aria-hidden="true"
                        >
                          {" "}
                        </i>
                        {fechaLocal}
                      </span>
                    </p>
                  </div>
                  {data3 ? (
                    data3.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        {/* Aquí iría el resto de la lógica para mostrar los datos de data3 */}
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>

            <div className="col-md-6 col-xl-3">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#109bd6", color: "white" }}
              >
                <NavLink to="./Main">
                  <p>
                    {" "}
                    <CalendarMonthIcon />
                    Ventas últ. semana


                  </p>
                </NavLink>

                <div>
                  <br />
                  <p>
                    Total venta ultima semana: ${totalsemana.toLocaleString()}
                  </p>
                  <br />
                </div>
              </article>
            </div>
            <div className="col-md-6 col-xl-3">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#109bd6", color: "white" }}
              >
                <NavLink to="./Main">
                  <p>
                    {" "}
                    <CalendarMonthIcon />
                    Venta Últ. Periodos
                  </p>
                </NavLink>
                <div>
                  <p>
                    Venta total de los períodos: $
                    {totalPeriodo.toLocaleString()}
                  </p>
                  <br />
                  {data2 ? (
                    data2.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        <span className="stat-cards-info__profit success">
                          <i data-feather="trending-up" aria-hidden="true"></i>
                          {item.NOM_PERIODO}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>
            {/*Nuevo */}
          
          </div>
          <div className="row stat-cards justify-content-center gutter-0">
            <div className="col-md-6 col-xl-3 " id="cards-1">
              <article
                id="article2"
                style={{ backgroundColor: "#109bd6", color: "white" }}
                className="stat-cards-item"
              >
                <div>
                  <NavLink to="./Main">
                    <p>
                      {" "}
                      <CalendarMonthIcon />
                      Venta POST hoy
                    </p>
                  </NavLink>

                  <br />
                  <p>
                    Total venta POST del dia: ${totalVentaPostxHora.toLocaleString()}
                  </p>
                  <br />
                  <div className="stat-cards-info">
                    <p className="stat-cards-info__title"></p>
                    <p className="stat-cards-info__progress">
                      <span className="stat-cards-info__profit success">
                        <i
                          data-feather="trending-up"
                          className="fecha"
                          id="fecha"
                          aria-hidden="true"
                        >
                          {" "}
                        </i>
                        {fechaLocal1}
                      </span>
                    </p>
                  </div>
                  {data4 ? (
                    data4.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        {/* Aquí iría el resto de la lógica para mostrar los datos de data3 */}
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>
            <div className="col-md-6 col-xl-3 " id="cards-1">
              <article
                id="article2"
                style={{ backgroundColor: "#109bd6", color: "white" }}
                className="stat-cards-item"
              >
                <div>
                  <NavLink to="./Main">
                    <p>
                      {" "}
                      <CalendarMonthIcon />
                      Venta POST últ. semana
                    </p>
                  </NavLink>

                  <br />
                  <p>
                    Total venta POST últ. semana: ${totalPostsemana.toLocaleString()}
                  </p>
                  <br />
                  <div className="stat-cards-info">
                    <p className="stat-cards-info__title"></p>
                    <p className="stat-cards-info__progress">
                      <span className="stat-cards-info__profit success">
                        <i
                          data-feather="trending-up"
                          className="fecha"
                          id="fecha"
                          aria-hidden="true"
                        >
                          {" "}
                        </i>
                        {/* {fechaLocal1} */}
                      </span>
                    </p>
                  </div>
                  {data5 ? (
                    data5.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        {/* Aquí iría el resto de la lógica para mostrar los datos de data3 */}
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>
            <div className="col-md-6 col-xl-3 " id="cards-1">
              <article
                id="article2"
                style={{ backgroundColor: "#109bd6", color: "white" }}
                className="stat-cards-item"
              >
                <div>
                  <NavLink to="./Main">
                    <p>
                      {" "}
                      <CalendarMonthIcon />
                      Venta POST últ. periodo
                    </p>
                  </NavLink>

                  <br />
                  <p>
                    Total venta POST últ. periodo: ${totalPostPeriodo.toLocaleString()}
                  </p>
                  <br />
                  <div className="stat-cards-info">
                    <p className="stat-cards-info__title"></p>
                    <p className="stat-cards-info__progress">
                      <span className="stat-cards-info__profit success">
                        <i
                          data-feather="trending-up"
                          className="fecha"
                          id="fecha"
                          aria-hidden="true"
                        >
                          {" "}
                        </i>
                        {/* {fechaLocal1} */}
                      </span>
                    </p>
                  </div>
                  {data6 ? (
                    data6.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        {/* Aquí iría el resto de la lógica para mostrar los datos de data3 */}
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>
            </div>

          <div className="row">
            <div className="col-lg-7">
              <article className="white-block">
                <Lineas />
              </article>
              <article className="white-block">
                <Barras />
              </article>
              <article className="white-block">
                <BarrasPeriodo />
              </article>
            </div>
            <div className="col-lg-5">
              <article className="white-block">
                <DonaVentadia />
              </article>

              <article className="white-block">
                <DonaVentausemana />
              </article>
              <article className="white-block">
                <Dona />
              </article>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer--flex">
          <div className="footer-start">
            <p>
              2021 © Elegant Dashboard -{" "}
              <a
                href="elegant-dashboard.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                elegant-dashboard.com
              </a>
            </p>
          </div>
          <ul className="footer-end">
            <li>
              <a href="##">About</a>
            </li>
            <li>
              <a href="##">Support</a>
            </li>
            <li>
              <a href="##">Puchase</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Main;
