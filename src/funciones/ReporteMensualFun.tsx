import { GridColDef } from "@mui/x-data-grid";

export function obtenerNombreMes(obj: any) {
  const fechaString = obj.fecha;
  const fecha = new Date(fechaString.split("/").reverse().join("/"));
  const mes = fecha.getMonth();
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
  return meses[mes];
}

export function sumarGastos(objeto: any) {
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

export function sumarGastosPorCategoria(objeto: any) {
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

export const restoColumnas: GridColDef[] = [
  {
    field: "mes",
    headerName: "Mes",
    width: 120,
  },
];