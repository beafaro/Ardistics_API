const express = require("express");
const app = express();
const port = process.env.PORT;

//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cargamos el archivo de rutas
app.use(require('./routes/arduino'));

app.listen(port || 8080, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});

module.exports = app;