import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonaCompraxdia = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const token = localStorage.getItem("token");
  const datos = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/CompraxHora/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola

      if (responseData && responseData.length > 0) {
        const jsonData = responseData;

        // Transformar los datos para que se ajusten al formato requerido por el gráfico
        const labels = jsonData.map((item) => `Hora ${item.hora_dia}`);
        const valores = jsonData.map((item) => item.venta_hora);

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
      } else {
        setOpenSnackbar(true); // Mostrar Snackbar si no hay datos
        setData(null); // Reinicia los datos si no hay datos para graficar
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 20,
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: "VENTAS DEL DIA",
      },
    },
  };

  return (
    <>
      {!loading && data ? (
        <div style={{ position: "relative", width: "304px", height: "304px" }}>
          <Doughnut options={options} data={data} />
        </div>
      ) : (
        <Alert severity="warning">No hay ventas registradas el dia de hoy</Alert>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning">
          No hay datos disponibles para mostrar
        </Alert>
      </Snackbar>
    </>
  );
};

export default DonaCompraxdia;
