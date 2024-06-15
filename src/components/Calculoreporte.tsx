import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRef, useState } from "react";
import { getLocalItems } from "../funciones/GetLocalItems";
import { Form } from "react-bootstrap";
import sumar from "../funciones/Sumar";

export default function CalculoReporte() {
  const [listado, setListado] = useState(getLocalItems());
  const [subtotal, setSubTotal] = useState<number>(0);
  const fromInput = useRef<HTMLInputElement>(null);
  const toInput = useRef<HTMLInputElement>(null);

  const columns: GridColDef[] = [
    { field: "gasto", headerName: "Gasto", width: 120 },
    { field: "categoria", headerName: "Categoria", width: 140 },
    { field: "fecha", headerName: "Fecha", width: 150 },
  ];

  const convertirFecha = (fecha: string) => {
    const partes = fecha.split("-");
    const año = partes[0];
    const mes = partes[1];
    const día = partes[2];

    return `${mes}/${día}/${año}`;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const from = fromInput.current?.value || "";
    const to = toInput.current?.value || "";
    const items = getLocalItems();
    let filteredItems = items.filter((i: any) => {
      return i.fecha >= convertirFecha(from) && i.fecha <= convertirFecha(to);
    });
    setListado(filteredItems);
    setSubTotal(sumar(filteredItems));
  };

  return (
    <div>
      <br />
      <Form>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <input ref={fromInput} type="date" className="form-control" />
          <input ref={toInput} type="date" className="form-control" />
        </div>
        <button
          className="btn btn-primary"
          style={{ marginLeft: "10px" }}
          onClick={handleSubmit}
        >
          Filtrar
        </button>
        <label style={{ marginLeft: "10px" }}>
          Subtotal: {subtotal.toFixed(2)}
        </label>
      </Form>
      <br />
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={listado}
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
