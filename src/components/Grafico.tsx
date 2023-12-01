import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import getLocalItems from "../funciones/GetLocalItems";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Grafico() {
  const [listado, setListado] = useState(getLocalItems());
  const [reporte, setReporte] = useState<number[] | null>([]);

  const obtenerGrafico = () => {
    let nuevoListado = [];
    const nuevo = listado.reduce((acc: any, obj: any) => {
      var key = obj.categoria;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    for (const key in nuevo) {
      const objetos = nuevo[key];

      let suma = 0;
      for (const objeto of objetos) {
        suma = suma + objeto.gasto;
      }

      nuevoListado.push(suma);
    }
    setReporte(nuevoListado);
    console.log(nuevoListado)
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Gastos",
      },
    },
  };


  const labels = ["Boludeces", "Bondi", "Super", "Bar", "Otros"];

  const data = {
    labels,
    datasets: [
      {
        label: "Gastos",
        data: reporte,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    console.log(listado);
    
    obtenerGrafico()
  }, []);

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
