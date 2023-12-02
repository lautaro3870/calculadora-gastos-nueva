const sumar = (items: any): number => {
  let suma = 0;
  items.map((i: any) => {
    suma = suma + i.gasto;
  });
  return suma;
};

export default sumar;
