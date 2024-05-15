import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarraCompraxDia = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const datos = JSON.parse(localStorage.getItem("user"));
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchData();
    // Establecer un intervalo para que fetchData se llame cada 5 minutos (300000 milisegundos)
    const intervalId = setInterval(fetchData, 300000);
    // Limpiar el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
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
      console.log(responseData);

      if (responseData && responseData.length > 0) {
        const ventas = responseData.map((item) => item.venta_hora);
        const labels = responseData.map((item) => item.hora_dia);

        setData({
          labels: labels,
          datasets: [
            {
              label: "",
              data: ventas,
              borderColor: "rgba(255, 99, 132, 0.5)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              type: "line",
            },
            {
              label: "",
              data: ventas, // Puedes reemplazar esto con los datos adecuados
              borderColor: "rgba(54, 162, 235, 0.5)",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              type: "bar",
              barThickness: 50, // Ajusta este valor según tu preferencia para hacer la barra más delgada o más gruesa
            },
          ],
        });
      } else {
        setOpenSnackbar(true);
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "COMPRAS DEL DÍA",
        fontSize: 20,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Horas",
          fontSize: 16,
        },
        ticks: {
          fontSize: 14,
        },
      },
      y: {
        title: {
          display: true,
          text: "Ventas",
          fontSize: 20,
          padding: {
            top: 0,
            bottom: 0,
            left: -5, // Ajusta este valor negativo para mover el título hacia la izquierda
            right: 0,
          },
        },
        ticks: {
          fontSize: 14,
        },
      },
    },
    barThickness: 50, // Ajusta el grosor de las barras para que sean del mismo tamaño
    categoryPercentage: 0.1, // Ajusta el espacio entre grupos de barras
    barPercentage: 10, // Ajusta el ancho de las barras dentro de cada grupo para que se centren
  };

  return (
    <>
      {!loading && data ? (
        <div style={{ position: "relative", width: "304px", height: "304px", margin: "auto" }}>
          <Bar options={options} data={data} />
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="warning"
              sx={{ width: "100%" }}
            >
              No hay ventas registradas el día de hoy
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <Alert severity="warning">
          No hay ventas registradas el día de hoy
        </Alert>
      )}
    </>
  );
};

export default BarraCompraxDia;
