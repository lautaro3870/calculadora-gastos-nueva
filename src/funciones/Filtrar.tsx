import Swal from "sweetalert2";
import {getLocalItems} from "./GetLocalItems";

const filtrar = async () => {
  const listado = getLocalItems();
  const { value: categoria } = await Swal.fire({
    title: "Filtrar",
    input: "select",
    inputOptions: {
      Super: "Super",
      Otros: "Otros",
      Metro: "Metro",
      Bondi: "Bondi",
      Bar: "Bar",
      Ropa: "Ropa",
      Cafe: "Cafe",
      Boludeces: "Boludeces",
    },
    inputPlaceholder: "Categorias",
    showDenyButton: true,
    denyButtonText: `Limpiar`,
  });

  if (categoria) {
    let suma = 0;
    const nuevoArreglo = listado.filter((i: any) => i.categoria === categoria);
    nuevoArreglo.map((i: any) => {
      suma = suma + i.gasto;
    });
    Swal.fire("Subtotal: " + suma.toString());
  }
};

export default filtrar;