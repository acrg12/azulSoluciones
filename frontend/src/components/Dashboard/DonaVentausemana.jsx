import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonaVentausemana = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const datos = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    
      const response = await fetch(`http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaUltimaSemana/${datos.EMP_TERCERO}`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          }
      });
      
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola
      const jsonData = responseData;

      // Transformar los datos para que se ajusten al formato requerido por el gráfico
      const labels = jsonData.map(item => `${item.fecha_dia}, ${item.dia_semana}`);
      const valores = jsonData.map(item => item.vr_total_dia);

      setData({
        labels: labels,
        datasets: [
          {
            label: "# de Ventas",
            data: valores,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const options = {
    //SI ES RESPONSIVE
    responsive: true,
    plugins: {
      legend: {
        //POSICION
        position: "right", // Coloca los labels a la derecha de la gráfica
        labels: {
          // Personaliza los labels
          padding: 20, // Ajusta el espaciado entre los labels
          boxWidth: 10, // Ajusta el ancho de la caja que contiene el color del dataset
        },
      },
      title: {
        display: true,
        //TITULO
        text: "VENTAS ULTIMA SEMANA",
      },
    },
  };

  return <div  className="chart-container">{data && <Doughnut options={options} data={data} height={10}/>}</div>;
};

export default DonaVentausemana;
