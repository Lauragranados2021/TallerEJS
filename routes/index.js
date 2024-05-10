const router = require("express").Router();
const readdir = require("fs");
const path = require("path");
const renderFile = require("ejs");
const inventario = path.join(__dirname, "../resources/inventario.json");

let data = Object.values(JSON.parse(readdir.readFileSync(inventario)));

router.get("/", (req, res) =>
  res.render("index.ejs", { title: "Bienvenido a Inventario" })
);

router.get("/stock", (req, res) =>
  res.render("inventario.ejs", {
    title: "Inventario oficina",
    components: data,
  })
);
router.get("/crear", (req, res) =>
  res.render("agregar.ejs", { title: "Agregar al inventario" })
);
router.post("/add", (req, res) => {
  const { id, nombre, marca, cantidad, costo } = req.body;
  if (!data.find((component) => component.id == id)) {
    const newElemnt = {
      id: id,
      nombre: nombre,
      marca: marca,
      cantidad: cantidad,
      costo: costo,
    };
    console.log("aqui" + newElemnt.id);
    data.push(newElemnt);
    readdir.writeFileSync(inventario, JSON.stringify(data, null, 2));

    return res.status(200).json({ state: true });
  } else {
    return res.status(409).json({ state: false, message: "Id que ya existe" });
  }
});
router.get("/editar", (req, res) =>
  res.render("edit.ejs", { title: "Editar el inventario", components: data })
);

router.put("/edit/:id", (req, res) => {
  console.log("entra a la ruta");
  const idParam = req.params.id;
  const { nombre, marca, cantidad, costo } = req.body;

  const index = data.findIndex((component) => component.id === idParam);

  if (index !== -1) {
    data[index] = {
      id: idParam,
      nombre: nombre,
      marca: marca,
      cantidad: cantidad,
      costo: costo,
    };

    readdir.writeFileSync(inventario, JSON.stringify(data, null, 2));
    //res.sendStatus(200);
    res.status(200).json({ state: true, data: idParam });
  } else {
    res.status(404).send("Componente no encontrado");
  }
});
router.get("/eliminar", (req, res) =>
  res.render("borrar.ejs", { title: "Borrar del inventario", components: data })
);
router.delete("/eliminar/:id", (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((component) => component.id === id);
  if (index !== -1) {
    data.splice(index, 1);

    readdir.writeFileSync(inventario, JSON.stringify(data, null, 2));

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
module.exports = router;
