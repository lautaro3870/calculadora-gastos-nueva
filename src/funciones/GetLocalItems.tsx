const getLocalItems = () => {
  let list = localStorage.getItem("gastos");
  if (list === null) {
    return [];
  }
  
  if (list) {
    return JSON.parse(localStorage.getItem("gastos") ?? "");
  }
};

export default getLocalItems;
