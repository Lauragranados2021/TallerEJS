document.getElementById("edit").addEventListener("click", () => {
  var id = document.getElementById("idInv").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("marca").value;
  const cantidad = document.getElementById("cantidad").value;
  const costo = document.getElementById("costo").value;
  console.log(`id ${id} nombre ${nombre} marca: ${marca} cantidad ${cantidad} costo: ${costo}`);
  const data1 = {
    id: id,
    nombre: nombre,
    marca: marca,
    cantidad: cantidad,
    costo: costo,
  };
  console.log(JSON.stringify(data1));
  const URL = `http://localhost:3001/edit/${data1.id}`;
  fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data1),
  })
    .then((data) => data.json())
    .then((data) => alert("objeto editado"))
    .catch((err) => console.log(err.message));
});
