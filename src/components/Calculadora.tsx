import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Paper,
  TextField,
  styled,
} from "@mui/material";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import filtrar from "../funciones/Filtrar";
import categorias from "../Categorias";
import { CalculadoraHook } from "../hooks/CalculadoraHook";
import { Form } from "react-bootstrap";

export default function Calculadora() {
  const {
    total,
    setTotal,
    totalAGastar,
    editing,
    gasto,
    categoria,
    listado,
    setListado,
    handleChange,
    handleChangeGasto,
    sortModel,
    handleChangeTotal,
    changeEditing,
    handleChangeToFalse,
    calcular,
    totalAllowedToExpense,
    diferencia
  } = CalculadoraHook();

  const columns: GridColDef[] = [
    { field: "gasto", headerName: "Gasto", width: 120 },
    { field: "categoria", headerName: "Categoria", width: 140 },
    { field: "fecha", headerName: "Fecha", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        const onClick = () => {
          const id = params.api.getCellValue(params.id, "id");
          const nuevoArrelgo = listado.filter((i: any) => i.id !== id);
          console.log(nuevoArrelgo);
          setListado(nuevoArrelgo);
        };
        return (
          <Button onClick={onClick} variant="outlined" color="error">
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <br />
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: "100%",
        justifyContent: "center"
      }}>
        <TextField
          type="number"
          style={{ width: "7rem" }}
          size="small"
          id="gasto"
          label="Gasto"
          value={gasto}
          variant="outlined"
          onChange={handleChangeGasto}
        />
        <Form.Select
          id="selectCategoria"
          value={categoria}
          onChange={handleChange}
          style={{ width: "7rem" }}
        >
          {categorias.map((i) => {
            return (
              <option key={i} value={i}>
                {i}
              </option>
            );
          })}
        </Form.Select>
        <Button
          onClick={calcular}
          variant="contained"
          size="small"
          style={{ marginLeft: "5px" }}
        >
          Ingresar
        </Button>
      </div>
      <br />
      <Button
        variant="outlined"
        color="error"
        size="small"
        style={{ marginLeft: "10px" }}
        onClick={() => {
          Swal.fire({
            title: "¿Limpiar lista?",
            showDenyButton: true,
            showConfirmButton: false,
            showCancelButton: true,
            denyButtonText: `Limpiar`,
          }).then((result) => {
            if (result.isDenied) {
              localStorage.setItem("gastos", JSON.stringify([]));
              setListado([]);
              setTotal(0);
              Swal.fire("Lista limpiada", "", "info");
            }
          });
        }}
      >
        Limpiar
      </Button>
      <Button
        variant="outlined"
        size="small"
        style={{ marginLeft: "5px" }}
        onClick={filtrar}
      >
        Filtrar
      </Button>
      <label style={{ marginLeft: "10px" }}>
        {total > totalAllowedToExpense ? (
          <p style={{ color: "red" }}>{total.toFixed(1)}</p>
        ) : (
          total.toFixed(1)
        )}
      </label>
      <span style={{marginLeft: 10, color: diferencia > 0 ? '' : 'red'}}>{diferencia.toFixed(1)}</span>
      <br />
      {editing ? (
        <TextField
          value={totalAGastar}
          onChange={handleChangeTotal}
          onBlur={handleChangeToFalse}
        />
      ) : (
        <label onClick={changeEditing}>Total para gastar: {totalAGastar}</label>
      )}
      <br />
      <br />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DataGrid
          rows={listado}
          columns={columns}
          sortModel={sortModel}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 30 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30]}
        />
      </Box>
    </div>
  );
}
