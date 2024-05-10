document.getElementById("borrar").addEventListener("click", () => {
    var id = document.getElementById("idInv").value;
    console.log(`id ${id}`);
    const data1 = id
    const URL = `http://localhost:3001/eliminar/${data1}`;
    fetch(URL, {
      method: "Delete",
      
    })
      .then((data) => alert("objeto eliminado"))
      .then((data) => console.log("ok"))
      .catch((err) => console.log(err.message));
  });