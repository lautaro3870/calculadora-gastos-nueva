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
import { getGastosTotales, getLocalItems } from "../funciones/GetLocalItems";
import categorias from "../Categorias";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type Gasto = {
  Bar: number;
  Boludeces: number;
  Super: number;
  Metro: number;
  Ropa: number;
  Cafe: number;
  Otros: number;
};

export default function Grafico() {
  const [listado, setListado] = useState<[]>(getGastosTotales());

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

  const data = {
    categorias,
    datasets: [
      {
        label: "Gastos",
        data: listado,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
