const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../configDB");

const getArduino = (request, response) => {
    connection.query("SELECT * FROM arduinos", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/arduinos")
.get(getArduino);


const postArduino = (request, response) => {
    const {nombre_arduino, num_pines} = request.body;
    connection.query("INSERT INTO arduinos(nombre_arduino, num_pines) VALUES (?,?) ",
    [nombre_arduino, num_pines],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Arduino añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/arduinos")
.post(postArduino);



module.exports = app;