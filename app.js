const http = require("http");
const express = require("express");
const app = express();
const morgan = require("morgan"); // Morgan is used for logging request details. Módulo que sirve para mostrar cuando alguien hace petición http al servidor NOTA:la app no lo necesita, sólo es una buena manera de conocer las peticiones que hacen al servidor
const server = http.createServer(app);

// Configuración del servidor
app.set("port", 8080); // Se asigna puerto, donde está el 8080 puede ponerse una notación que no recuerdo para que coja la del servidor donde se suba la app
app.use(morgan("dev")); // Para usar morgan.
app.use(express.static(__dirname + "/public")); // Busca los archivos de la carpeta public, encuentra el index.html y lo presenta

// Inicialización del servidor
server.listen(app.get("port"), ()=> { // Parámetro 1: Se obtiene el puerto previamente asignado, Parámetro 2: función
    console.log("Server started") // Avisa por la console de NodeJs para el servidor ha iniciado
});

// Herramientas sockets que creé
require("./sockets.js")(server);

// app.get("/", (req,res)=>{
//     res.end("Nuevo chat iniciado");
// });