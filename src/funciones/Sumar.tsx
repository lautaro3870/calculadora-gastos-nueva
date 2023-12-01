import getLocalItems from "./GetLocalItems";

const sumar = (items: any): number => {
    let suma = 0;
    // const listado = getLocalItems();
    // console.log(listado);
    items.map((i: any) => {
      suma = suma + i.gasto;
    });
    console.log(suma);
    return suma
}

export default sumar;