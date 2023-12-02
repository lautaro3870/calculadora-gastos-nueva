import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { getLocalItems } from "../funciones/GetLocalItems";

ChartJS.register(
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function GraficoLinea() {
  const [listado, setListado] = useState(getLocalItems());
  const [datos, setDatos] = useState<{ fecha: any; valor: any }[]>([]);

  const [chartData, setChartData] = useState<ChartData<"line", any, string>>({
    // Set initial data here or provide data based on your requirements
    labels: [],
    datasets: [],
  });

  const generateChartData = () => {
    const today = new Date();

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    // Crea un array con todas las fechas del mes actual
    const datesOfMonth = [];
    let currentDate = firstDayOfMonth;
    while (currentDate <= lastDayOfMonth) {
      datesOfMonth.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    let nuevoListado = [];
    const nuevo = listado.reduce((acc: any, obj: any) => {
      var key = obj.fecha;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    for (const key in nuevo) {
      const objetos = nuevo[key];
      const fecha = convertirFecha(key);
      console.log(objetos);

      let suma = 0;
      for (const objeto of objetos) {
        suma = suma + objeto.gasto;
      }
      const objeto = {
        valor: suma.toFixed(1),
        fecha: fecha,
      };
      nuevoListado.push(objeto);
      setDatos(nuevoListado);
      console.log(suma);
    }

    // Genera datos de ejemplo (puedes reemplazarlo con tus propios datos)
    // const data = datesOfMonth.map((date) => Math.floor(Math.random() * 100));

    const labels = nuevoListado.map((item) => item.fecha);
    const values = nuevoListado.map((item) => item.valor);

    // Crea el objeto de datos para el gráfico
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Datos del mes",
          data: values,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };

    setChartData(chartData);
  };

  useEffect(() => {
    generateChartData();
  }, []);

  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    // Crear el gráfico una vez que el componente esté montado
    const canvas = document.getElementById(
      "lineChart"
    ) as HTMLCanvasElement | null;
    if (canvas) {
      if (chartRef.current) {
        // If a previous chart instance exists, destroy it
        chartRef.current.destroy();
      }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        chartRef.current = new ChartJS(ctx, {
          type: "line",
          data: chartData,
          options: {
            responsive: true,
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                },
                ticks: {
                  source: "labels",
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [chartData]);

  const options = {
    type: "line",
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Gastos por Día",
      },
    },
    // scales: {
    //   x: {
    //     type: "time",
    //     time: {
    //       unit: "day",
    //     },
    //     ticks: {
    //       source: "labels",
    //     },
    //   },
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
  };

  function convertirFecha(fecha: any) {
    const partes = fecha.split("/"); // Separar la fecha en día, mes y año
    const dia = partes[0];
    const mes = partes[1] - 1; // Restamos 1 al mes para ajustar al formato de Date() (0-11)
    const anio = partes[2];

    const nuevaFecha = new Date(anio, mes, dia); // Crear nueva fecha con el formato deseado

    // Obtener año, mes y día de la nueva fecha y formatear en yyyy-mm-dd
    const anioFormateado = nuevaFecha.getFullYear();
    const mesFormateado = (nuevaFecha.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const diaFormateado = nuevaFecha.getDate().toString().padStart(2, "0");

    const fechaFormateada = `${anioFormateado}-${mesFormateado}-${diaFormateado}`;
    return fechaFormateada;
  }

  return (
    <div>
      <Line options={options} data={chartData} />
      {/* <canvas id="lineChart" width="400" height="200"></canvas> */}
    </div>
  );
}
