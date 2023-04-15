const express = require("express");// se debe instalar express
const app = express();
const cors = require("cors");// importante para el consumo sin problemas de cors se instala cómo npm install cors
const mongoose = require("mongoose");
const car_routes = require("./routes/Car");
const port = process.env.PORT ||3002; // se coloca cómo variable o puerto especifico para despliegue
const bodyParser = require("body-parser"); // para manejo de JSON

mongoose.Promise = global.Promise; //se inicia la variable

//el proyecto usa express para el servidor

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


mongoose.connect("mongodb://localhost:27017/grupo15",{
    //acá va los datos de conexión de la base de datos
    //se usa mongoose para la conexión y el crud
    //se instala npm install mongoose
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})//si conecta bien la base, arranca el proyecto, si no, no...
.then(() => {
    app.use(express.json())
    app.use("/api/car",car_routes); // se crea un proyecto de rutas, para el manejo de api(carpeta routes/Car.js)
    app.listen(port, () =>{
        console.log("Init in the ", port);
    });
})
.catch(err => console.log(err));





