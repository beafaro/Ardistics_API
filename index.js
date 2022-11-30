const express = require("express");
const cors = require("cors");
const app = express();


//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// enabling CORS for any unknown origin(https://xyz.example.com)
app.use(cors());


//cargamos el archivo de rutas
app.use(require('./routes/arduino'));
app.use(require('./routes/dato-arduino'));

app.listen(process.env.PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});

module.exports = app;