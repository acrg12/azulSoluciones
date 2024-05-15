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
import CompraUltimaSemana from "./BarraCompraUS";
import DonacomprasUltimaS from "./DonaCompraUS";
import BarrasCompraPeriodo from "./BarraCompraUP";
import DonaCompraPeriodo from "./DonaCompraP";
import BarraCompraxDia from "./BarraCompraxdia";
import DonaCompraxdia from "./DonaCompraxdia";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";



const compras = () => {

  //////COMPRA DIA///////////
  const [data4, setData4] = useState(null);
  const [Totalcompraxhora, setTotalCompraxHora] = useState(0); // Estado para almacenar la suma total del período
  //const [fechaLocal, setFechaLocal] = useState(""); // Estado para almacenar la fecha local
  const token4 = localStorage.getItem("token");
  const datos4 = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    fetchData4();
   
  }, []);
  
  const fetchData4 = async () => {
    try {
      const response = await fetch(`http://5.189.133.32:9060/datasnap/rest/TServerMethods/CompraxHora/${datos4.EMP_TERCERO}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Puedes incluir aquí el token si es necesario
          // "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola
  
      // Calcula la suma total del período
      const total = responseData.reduce((accumulatedTotal, currentItem) => accumulatedTotal + currentItem.venta_hora, 0);
      setTotalCompraxHora(total);
  
      // Establece los datos en el estado
      setData4(responseData);
    } catch (error) {
      console.error('Fetch error:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };
//--------------------------------FIN-------------------------------------------//

///////////////////////////COMPRA POR ULTIMA SEMANA//////////////////////////////
  const [data5, setData5] = useState(null);
  const [TotalCompraUltimaSemana, setTotalCompraUltimaSemana] = useState(0); // Estado para almacenar la suma total del período
  //const [fechaLocal, setFechaLocal] = useState(""); // Estado para almacenar la fecha local
  const token5 = localStorage.getItem("token");
  const datos5 = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    fetchData5();
   
  }, []);
  
  const fetchData5= async () => {
    try {
      const response = await fetch(`http://5.189.133.32:9060/datasnap/rest/TServerMethods/CompraUltimaSemana/${datos5.EMP_TERCERO}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Puedes incluir aquí el token si es necesario
          // "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola
  
      // Calcula la suma total del período
      const total = responseData.reduce((accumulatedTotal, currentItem) => accumulatedTotal + currentItem.vr_total_dia, 0);
      setTotalCompraUltimaSemana(total);
  
      // Establece los datos en el estado
      setData5(responseData);
    } catch (error) {
      console.error('Fetch error:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };
  //-------------------------------FIN-------------------------------------------//

  const [data6, setData6] = useState(null);
  const [totalCompraPeriodo, setTotalCompraPeriodo] = useState(0); // Estado para almacenar la suma total del período
  const token6 = localStorage.getItem("token");
  const datos6 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData6();
  }, []);

  const fetchData6 = async () => {
    try {
      const response = await fetch(`http://5.189.133.32:9060/datasnap/rest/TServerMethods/CompraPeriodos/${datos6.EMP_TERCERO}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Puedes incluir aquí el token si es necesario
          // "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola

      // Calcula la suma total del período
      const total = responseData.reduce((accumulatedTotal, currentItem) => accumulatedTotal + currentItem.vr_total_periodo, 0);
      setTotalCompraPeriodo(total);

      // Establece los datos en el estado
      setData6(responseData);
    } catch (error) {
      console.error('Fetch error:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };
 
  //----------------------------------------------------------------------------------//
  return (
    <>
      <main className="main users chart-page" id="skip-target">
        <div className="container">
        <h5 id="tituloCompras" className="active mb-3"> <AssessmentIcon/> Reporte de Compras</h5>
          <br />
          <div className="row stat-cards justify-content-center gutter-0">
          <div className="col-md-6 col-xl-3 " id="cards-1">
              <article
                id="article2"
                style={{ backgroundColor: "#64a57a", color: "white" }}
                className="stat-cards-item"
              >
              <p>
                  {""}
                  <CalendarMonthIcon />
                  Compras de hoy
                  {" "}
                </p>
                <div>
                  <br />
                  <p>
                    Total venta del dia: ${Totalcompraxhora.toLocaleString()}
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
                        {}
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

            <div className="col-md-6 col-xl-3 ">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#64a57a", color: "white" }}
              >
          
                <p>
                  {""}
                  <CalendarMonthIcon />
                  Compras Últ. semana{" "}
                </p>

                <div>
                  <br />
                  <p>
                    Total venta ultima semana: ${TotalCompraUltimaSemana.toLocaleString()}
                  </p>
                  <br />
                   {data5 ? (
                    data5.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        <p className="stat-cards-info__progress">
                          <span className="stat-cards-info__profit success">
                            <i
                              data-feather="trending-up"
                              aria-hidden="true"
                            ></i>
                           
                          </span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )} 
                </div>
              </article>
            </div>
            <div className="col-md-6 col-xl-3 ">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#64a57a", color: "white" }}
              >
                <p>
                  {" "}
                  <CalendarMonthIcon />
                  Compras Últ. Periodos
                </p>
                <div>
                  <p>
                    Venta total de los períodos: $
                    {totalCompraPeriodo.toLocaleString()}
                  </p>
                  <br />
                  {data6 ? (
                    data6.map((item, index) => (
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

          {/* <div className="col-md-6 col-xl-3">
              <article className="stat-cards-item ">
               
                <div>
      <p>TOTAL COMPRA ULTIMA SEMANA : ${vr_total_dia.toLocaleString()}</p>
      <br/>
      {data ? (
        data.map((item, index) => (
          <div key={index} className="stat-cards-info">
           
        
            <p className="stat-cards-info__progress">
              <span className="stat-cards-info__profit success">
                <i data-feather="trending-up" aria-hidden="true"></i>{item.fecha_dia},Facturas: {item.facturas}
              </span>
       
            </p>
          </div>
        ))
      ) : (
        <p>Cargando...</p>
      )}
    </div>
              </article>
            </div>
           <div className="col-md-6 col-xl-3">
              <article className="stat-cards-item">
               
                <div>
      <p>compra total de los períodos: ${totalPeriodo.toLocaleString()}</p>
      <br/>
      {data ? (
        data.map((item, index) => (
          <div key={index} className="stat-cards-info">
              <span className="stat-cards-info__profit success">
                <i data-feather="trending-up" aria-hidden="true"></i>{item.NOM_PERIODO}, {item.facturas}
              </span>
       
          </div>
        ))
      ) : (
        <p>Cargando...</p>
      )}
    </div> 
               </article>                        
            </div>   */}
          
          </div> 
          <div className="row">
         
            <div className="col-lg-7">
            <article className="white-block">
                
                <BarraCompraxDia />
                </article>
              <article className="white-block">
                <CompraUltimaSemana /> 
              
              </article>
              <article className="white-block">
                < BarrasCompraPeriodo/>
              </article>
            </div>
            <div className="col-lg-5">
            <article className="white-block">
                
                <DonaCompraxdia/>
                </article>
            
              <article className="white-block">

                < DonacomprasUltimaS/>
              </article>
              <article className="white-block">
                <DonaCompraPeriodo />
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

export default compras;
