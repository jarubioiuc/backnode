var express = require("express");
var carController = require("../controllers/Car");

var router = express.Router();

// en el archivo rutas se crean los path, para el consumo del crud
// Create Read Update Delete
router.post("/save",carController.save);
router.put("/update/:id",carController.update);
router.delete("/delete/:id",carController.eliminar);
router.get("/listar",carController.listarCarros);
router.get("/mostrar/:id",carController.mostrarCar)//en el path recibe el id a buscar

module.exports = router;