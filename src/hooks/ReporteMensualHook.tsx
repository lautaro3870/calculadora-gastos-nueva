import { useEffect, useState } from "react";
import { getLocalItems, getReporteMensual } from "../funciones/GetLocalItems";
import { Button } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import categorias from "../Categorias";
import {
  obtenerNombreMes,
  restoColumnas,
  sumarGastos,
  sumarGastosPorCategoria,
} from "../funciones/ReporteMensualFun";

const getColumns = () => {
  let columna = {};
  const columns: any = [];

  categorias.forEach((categoria) => {
    if (categoria !== "Seleccione") {
      Object.defineProperty(columna, "field", { value: categoria });
      Object.defineProperty(columna, "headerName", { value: categoria });
      Object.defineProperty(columna, "width", { value: 120 });
      columns.push(columna);
      columna = {};
    }
  });
  return columns;
};

export const ReporteMensualHook = () => {
  const [listado, setListado] = useState(getLocalItems());
  const [datos, setDatos] = useState<any[]>(getReporteMensual());
  const [gastoTotal, setGastoTotal] = useState(
    localStorage.getItem("gastoTotal")
  );
  const [ahorro, setAhorro] = useState(
    localStorage.getItem("ahorro")
  );

  const columnas = getColumns();

  const columns: GridColDef[] = [];
  columns.push(...columnas);

  columns.push(...restoColumnas);

  columns.push({
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => {
      const onClick = () => {
        const id = params.api.getCellValue(params.id, "id");
        const nuevoArreglo = datos.filter((i: any) => i.id !== id);
        const gastoTotal = nuevoArreglo.reduce((acc: any, obj: any) => {
          return acc + parseInt(obj.total);
        }, 0);
        setGastoTotal(gastoTotal.toString());
        setDatos(nuevoArreglo);
      };
      return (
        <Button onClick={onClick} variant="outlined" color="error">
          <GridDeleteIcon />
        </Button>
      );
    },
  });

  const reporte = () => {
    let listadoFinal = JSON.parse(localStorage.getItem("reporteMensual") ?? "");
    const nuevo = listado.reduce((acc: any, obj: any) => {
      const nombreMes = obtenerNombreMes(obj);

      var key = nombreMes;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    for (const key in nuevo) {
      const objetos = nuevo[key];
      const final = objetos.reduce((acc: any, obj: any) => {
        var key = obj.categoria;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});

      const sumaGastos = sumarGastos(final);
      const sumasGastosPorCategoria = sumarGastosPorCategoria(final);

      const mes = key;
      const ahorro = 1360 - sumaGastos;
      const objetoDestino: any = {
        id: Math.floor(Math.random() * 1000),
        Super: 0,
        Bondi: 0,
        Otros: 0,
        Metro: 0,
        Bar: 0,
        Ropa: 0,
        Cafe: 0,
        Boludeces: 0,
        mes: mes,
        total: sumaGastos.toFixed(1),
        ahorro: ahorro.toFixed(1),
        ingresos: 1360,
      };

      for (const key in sumasGastosPorCategoria) {
        const valor = sumasGastosPorCategoria[key];
        objetoDestino[valor.categoria] += valor.valor;
      }

      if (listadoFinal !== null) {
        listadoFinal.push(objetoDestino);
        setDatos(listadoFinal);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("reporteMensual", JSON.stringify(datos));
    obtenerValores("total");
    obtenerValores("ahorro");
    localStorage.setItem("ahorro", "");
    calcularAhorro();
  }, [datos]);

  const obtenerValores = (valor: string) => {
    let resultado: number = 0;
    if (valor === "total") {
      resultado = datos.reduce((acc: number, obj: any) => {
        return acc + parseFloat(obj.total);
      }, 0);
      setGastoTotal(resultado.toFixed(2).toString());
    } else {
      resultado = datos.reduce((acc: number, obj: any) => {
        return acc + parseFloat(obj.ahorro);
      }, 0);
      setAhorro(resultado.toFixed(2).toString());
    }
  };

  const calcularAhorro = () => {
    datos.forEach((gasto) => {
      gasto.ahorro = 910 - gasto.total;
      gasto.ingresos = 910;
    });
  };

  return {
    reporte,
    gastoTotal,
    columns,
    datos,
    ahorro
  };
};
