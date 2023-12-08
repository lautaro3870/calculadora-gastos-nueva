import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import filtrar from "../funciones/Filtrar";
import categorias from "../Categorias";
import { CalculadoraHook } from "../hooks/CalculadoraHook";

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
    calcular
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
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Item>
          <TextField
            type="number"
            style={{ width: "120px" }}
            size="small"
            id="gasto"
            label="Gasto"
            value={gasto}
            variant="outlined"
            onChange={handleChangeGasto}
          />
        </Item>
        <Item>
          <Select
            labelId="demo-simple-select-label"
            id="selectCategoria"
            label="Categorias"
            size="small"
            value={categoria}
            onChange={handleChange}
          >
            {categorias.map((i) => {
              return (
                <MenuItem selected key={i} value={i}>
                  {i}
                </MenuItem>
              );
            })}
          </Select>
        </Item>
        <Item>
          <Button
            onClick={calcular}
            variant="contained"
            size="medium"
            style={{ marginLeft: "5px" }}
          >
            Ingresar
          </Button>
        </Item>
      </Stack>
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
        {total > totalAGastar ? (
          <p style={{ color: "red" }}>{total.toFixed(1)}</p>
        ) : (
          total.toFixed(1)
        )}
      </label>
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
