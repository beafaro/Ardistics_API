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

//obtener estado actual de los pines en un arduino
const getEstadoArduino = (request, response) => {
    const id_ard = request.params.id;
    connection.query("SELECT * FROM dato_arduino WHERE id_dato IN (SELECT MAX(id_dato) FROM dato_arduino WHERE id_arduino = ? GROUP BY num_pin) ORDER BY num_pin",  
    [id_ard],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/getEstadoArduino/:id")
.get(getEstadoArduino);


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


const getDatosArduino = (request, response) => {
    const id_ard = request.params.id;
    const pin_ard = request.params.pin;
    connection.query("SELECT * FROM dato_arduino WHERE id_arduino=? and num_pin=? ORDER BY fecha",  
    [id_ard, pin_ard],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/getDatosArduino/:id/pin/:pin")
.get(getDatosArduino);

module.exports = app;


