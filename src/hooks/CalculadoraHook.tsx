import { ChangeEvent, useEffect, useState } from "react";
import { getLocalItems } from "../funciones/GetLocalItems";
import { SelectChangeEvent } from "@mui/material";
import sumar from "../funciones/Sumar";
import { GridSortModel } from "@mui/x-data-grid";
import Swal from "sweetalert2";

export const obtenerFecha = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const totalGasto = localStorage.getItem("totalAGastar");

export const CalculadoraHook = () => {
  const [total, setTotal] = useState<number>(0);
  const [totalAGastar, setTotalAGastar] = useState(parseInt(totalGasto ?? ""));

  const [editing, setIsEditing] = useState(false);

  const [gasto, setGasto] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");

  const [listado, setListado] = useState(getLocalItems());

  const handleChange = (event: any) => {
    setCategoria(event.target.value);
  };

  const handleChangeGasto = (event: ChangeEvent<HTMLInputElement>) => {
    setGasto(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(listado));
    const suma = sumar(listado);
    setTotal(suma);
  }, [listado]);

  const calcular = () => {
    if (gasto === "" || categoria === "") {
      Swal.fire({
        icon: "error",
        title: "Ingrese los valores",
      });
      return;
    }
    const objeto = {
      id: Math.floor(Math.random() * 1000),
      gasto: parseFloat(gasto),
      categoria: categoria,
      fecha: obtenerFecha(),
    };

    setListado((oldList: any[]) => [...oldList, objeto]);
    setGasto("");
  };

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "fecha",
      sort: "desc",
    },
  ]);

  const handleChangeTotal = (event: ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value.toString();
    if (valor === "") {
      setTotalAGastar(0);
      localStorage.setItem("totalAGastar", "0");
    } else {
      setTotalAGastar(parseInt(valor ?? ""));
      localStorage.setItem("totalAGastar", valor);
    }
  };

  const changeEditing = () => {
    setIsEditing(true);
  };

  const handleChangeToFalse = () => {
    setIsEditing(false);
  };

  return {
    total,
    setTotal,
    totalAGastar,
    setTotalAGastar,
    editing,
    setIsEditing,
    gasto,
    setGasto,
    categoria,
    setCategoria,
    listado,
    setListado,
    handleChange,
    handleChangeGasto,
    sortModel,
    setSortModel,
    handleChangeTotal,
    changeEditing,
    handleChangeToFalse,
    calcular,
  };
};
