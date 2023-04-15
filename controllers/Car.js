var validator = require("validator");//<-- libreria para validación de datos
var Car = require("../models/Car"); //<--- se trae el modelo del objeto a guardar


var controller ={//<-- variable de control que se exporta y se consume en el Rutas(router)
    
    //Método para guardar el parametro
    save:function(req,res){
        var params = req.body; //seteamos los valores de la respuesta en la variable params
        var validateName = !validator.isEmpty(params.name);// valida si el parametro viene vació
        var validateBrand = !validator.isEmpty(params.brand);// valida si el parametro viene vació
        var validateYear = !validator.isEmpty(params.year);// valida si el parametro viene vació
        var validateDescription = !validator.isEmpty(params.description);// valida si el parametro viene vació
        
        if(validateName && validateDescription){// se valida si los valores que están vienen o no vacios
            var car = new Car();// se crea un nuevo objeto car
            car.name = params.name;//se setean valores en la variable car
            car.brand = params.brand;//se setean valores en la variable car
            car.year = params.year;//se setean valores en la variable car
            car.description = params.description;//se setean valores en la variable car
            car.payDay = params.payDay;//se setean valores en la variable car
            car.link = params.link;//se setean valores en la variable car
            car.save((err,carStored)=>{//método que usa mongosee para guardar el objeto en tabla
                if(err || !carStored){//flujo de lógica
                    return res.status(404).send({//setea el 404 en el status a devolver
                        message:"Error al guardar el carro",//si faltan parametros no guarda
                        status: "error"//envía este mensaje
                    });
                }
                return res.status(200).send({//guarda si está bien el objeto
                    message:"Carro guardado"
                });
            });
        }else{
            return res.status(404).send({// si faltan parametros, sale por este lado
                message:"faltan parametros"
            });
        }
    },
    //lo mismo de arriba, pero sobre escribe sobre el id que se le entregue en el path
    update:function(req,res){
        var params = req.body;
        var carId = req.params.id;// se envía cómo parametro el ID desde la consulta
        console.log(carId);//logeamos el id a actualizar
        console.log(params);
        console.log("params")
        var validateName = !validator.isEmpty(params.name);
        var validateBrand = !validator.isEmpty(params.brand);
        var validateYear = !validator.isEmpty(params.year);
        var validateDescription = !validator.isEmpty(params.description);
        
        if(validateName && validateBrand && validateDescription && validateYear){
            var update = {
                name:params.name,
                brand:params.brand,
                year:params.year,
                description:params.description,
                payDay:params.payDay,
                link:params.link
            }
            console.log(update)
            Car.findOneAndUpdate({_id:carId},update,{new:true},(err,carUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"faltan parametros",
                        status:"error"
                        });
                }
                if(!carUpdate){
                    return res.status(400).send({
                        message:"carro no actualizado",
                        status:"error"
                        });
                }
                return res.status(200).send({
                    message:"Carro actualizado",
                    status:"success",
                    carUpdate
                    });
            });          
            
        }else{
            return res.status(404).send({
            message:"faltan parametros"
            });

        }
        
    },

    eliminar:function(req,res){
        var carId = req.params.id;
        Car.findOneAndDelete({_id:carId},(err,carRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!carRemoved){
                return res.status(404).send({
                    message:"-usuario no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado exitosamente",
                usuario:carRemoved
            });
        })
        
    },






    listarCarros:function(req,res){
        Car.find(function(err,doc){
            return res.status(200).send({
                message:"Carros",
                doc
            });        
        });
    },
    mostrarCar:function(req,res){
        var params = req.body;
        var usuarioId = req.params.id;
        console.log(usuarioId);
        Car.findById(usuarioId).exec((err,usuario)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en el id",
                    status:"error"
                    });
            }
            if(!usuario){
                return res.status(400).send({
                    message:"usuario no encontrado",
                    status:"error"
                    });
            }
            return res.status(200).send({
                message:"Usuario solicitado",
                usuario
            });
        });
       
    },
}

module.exports = controller;