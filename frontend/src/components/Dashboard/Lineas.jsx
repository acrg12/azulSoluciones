import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Lineas = () => {
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
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaxHora/${datos.EMP_TERCERO}`,
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
              label: "Ventas (Línea)",
              data: ventas,
              borderColor: "rgba(255, 99, 132, 0.5)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              type: "line",
            },
            {
              label: "Otro conjunto de datos (Barra)",
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
        position: "top",
      },
      title: {
        display: true,
        text: "VENTAS DEL DIA",
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
          fontSize: 16,
        },
        ticks: {
          fontSize: 14,
        },
      },
    },
  };

  return (
    <>
      {!loading && data ? (
        <div style={{ width: "304px", height: "304px" }}>
          <Line options={options} data={data} />
        </div>
      ) : (
        <Alert severity="warning">
          No hay ventas registradas el día de hoy
        </Alert>
      )}
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
    </>
  );
};

export default Lineas;





