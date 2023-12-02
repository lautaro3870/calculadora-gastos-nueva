import { MutableRefObject, useRef, useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortModel,
  GridTreeNodeWithRender,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { ChangeEvent } from "react";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import Barra from "./Barra";
import DeleteIcon from "@mui/icons-material/Delete";
import {getLocalItems} from "../funciones/GetLocalItems";
import sumar from "../funciones/Sumar";
import filtrar from "../funciones/Filtrar";
import Rutas from "../Rutas";
import categorias from "../Categorias";
import { Col, Container, Row } from "react-bootstrap";

const obtenerFecha = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  console.log(formattedDate);
  return formattedDate;
};

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const totalGasto = localStorage.getItem("totalAGastar");

export default function Calculadora() {
  const [total, setTotal] = useState<number>(0);

  const [totalAGastar, setTotalAGastar] = useState(parseInt(totalGasto ?? ""));
  const [editing, setIsEditing] = useState(false);

  const [gasto, setGasto] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");

  const [listado, setListado] = useState(getLocalItems());

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
          //const listado = JSON.parse(localStorage.getItem("gastos") ?? "");
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

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setCategoria(event.target.value);
  };

  const handleChangeGasto = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setGasto(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(listado));
    const suma = sumar(listado);
    setTotal(suma);
  }, [listado]);

  const calcular = () => {
    //console.log(gasto + " " + categoria);
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

    console.log(objeto);
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
            /* Read more about isConfirmed, isDenied below */
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
