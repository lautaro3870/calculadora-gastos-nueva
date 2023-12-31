import { Box, Stack, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getLocalItems, getReporteMensual } from "../funciones/GetLocalItems";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import categorias from "../Categorias";

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

export default function ReporteMensual() {
  const [listado, setListado] = useState(getLocalItems());
  const [datos, setDatos] = useState<any[]>(getReporteMensual());

  const columnas = getColumns();

  const columns: GridColDef[] = [];
  columns.push(...columnas);

  columns.push({
    field: "total",
    headerName: "Total",
    width: 120,
  });

  columns.push({
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => {
      const onClick = () => {
        const id = params.api.getCellValue(params.id, "id");
        const nuevoArrelgo = datos.filter((i: any) => i.id !== id);
        setDatos(nuevoArrelgo);
      };
      return (
        <Button onClick={onClick} variant="outlined" color="error">
          <DeleteIcon />
        </Button>
      );
    },
  });

  function obtenerNombreMes(indiceMes: any) {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return meses[indiceMes];
  }

  function sumarGastos(objeto: any) {
    let suma = 0;
    for (const prop in objeto) {
      if (objeto.hasOwnProperty(prop) && Array.isArray(objeto[prop])) {
        objeto[prop].forEach((item: any) => {
          if (item.hasOwnProperty("gasto")) {
            suma += item.gasto;
          }
        });
      }
    }
    return suma;
  }

  function sumarGastosPorCategoria(objeto: any) {
    const sumasPorCategoria: any = [];

    for (const categoria in objeto) {
      if (
        objeto.hasOwnProperty(categoria) &&
        Array.isArray(objeto[categoria])
      ) {
        const sumaCategoria = objeto[categoria].reduce(
          (total: any, item: any) => total + item.gasto,
          0
        );
        const objetoRetorno: any = {
          valor: sumaCategoria,
          categoria: categoria,
        };
        sumasPorCategoria.push(objetoRetorno);
      }
    }
    return sumasPorCategoria;
  }

  const reporte = () => {
    let listadoFinal = JSON.parse(localStorage.getItem("reporteMensual") ?? "");
    const nuevo = listado.reduce((acc: any, obj: any) => {
      const fechaString = obj.fecha;
      const fecha = new Date(fechaString.split("/").reverse().join("/"));
      const mes = fecha.getMonth();
      const nombreMes = obtenerNombreMes(mes);

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
  }, [datos]);

  return (
    <div>
      <br />
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            reporte();
            Swal.fire({
              icon: "success",
              title: "Guardado",
              text: "Lista guardada",
            });
          }}
          className="btn btn-primary"
        >
          Guardar
        </button>
      </Stack>
      <Box>
        <br />
        <br />
        <DataGrid
          rows={datos}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </div>
  );
}
