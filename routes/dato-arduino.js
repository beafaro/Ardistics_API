const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../configDB");


//obtener arduinos
const getDatoArduino = (request, response) => {
    connection.query("SELECT * FROM dato_arduino", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/datoArduino")
.get(getDatoArduino);


//añadir arduino
const postDatoArduino = (request, response) => {
    const {id_arduino, num_pin, valor} = request.body;
    const fecha = new Date();
    connection.query("INSERT INTO dato_arduino(id_arduino, num_pin, valor, fecha) VALUES (?,?,?,?) ",
    [id_arduino, num_pin, valor, fecha],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Dato añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/datoArduino")
.post(postDatoArduino);


//eliminar arduino
const delDatoArduino = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM dato_arduino where id_dato = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Dato eliminado": results.affectedRows});
    });
};

//ruta
app.route("/datoArduino/:id")
.delete(delDatoArduino);

module.exports = app;


