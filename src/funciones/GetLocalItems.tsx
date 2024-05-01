export const getLocalItems = () => {
  let list = localStorage.getItem("gastos");
  if (list === null) {
    return [];
  }
  
  if (list) {
    return JSON.parse(localStorage.getItem("gastos") ?? "");
  }
};

export const getReporteMensual = () => {
  let list = localStorage.getItem("reporteMensual");
  if (list === null) {
    return [];
  }
  if (list) {
    return JSON.parse(localStorage.getItem("reporteMensual") ?? "");
  }
};

export const getGastosTotales = () => {
  let list = localStorage.getItem("gastosTotales");
  if (list === null) {
    return [];
  }
  if (list) {
    return JSON.parse(localStorage.getItem("gastosTotales") ?? "");
  }
};
