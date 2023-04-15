const mongoose = require("mongoose");
var Schema = mongoose.Schema; //<-- ayuda al creado de base/coleción

//el moongose crea la base de datos y la tabla que dejemos como objeto

var CarSchema = Schema({
    name: String,
    brand: String,
    year: String,
    description: String,
    payDay:String,
    link:String
});

module.exports = mongoose.model("Car",CarSchema);