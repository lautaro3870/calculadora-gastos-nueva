import { Box, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { ReporteMensualHook } from "../hooks/ReporteMensualHook";

export default function ReporteMensual() {
  const { reporte, gastoTotal, columns, datos, ahorro } = ReporteMensualHook();

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
        <label>Total: {gastoTotal}</label>
        <label>Total ahorrado: {ahorro}</label>
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
