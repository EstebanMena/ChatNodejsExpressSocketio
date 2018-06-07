// Socket.io
const io = require("socket.io"); // Socket.IO enables real-time bidirectional event-based communication

module.exports = (server) => { // Para exportar el módulo y que acepte el servidor como parámetro
    var sockets = io.listen(server); // Que escuche en el servidor, sockets (con 's') son todos los sockets (en todos los clientes)

    sockets.on("connection", (socket) => { // socket (sin 's') (parámetro) es la connection
        console.log("New connected user"); // Cada vez que alguien se conecta, avisa por la consola

        socket.on("clientMessage", (message, clientName) => { // Cuando ocurra el evento clientMessage, que es un emit (evento enviado) desde el cliente (puedes llamar un evento como quieras, sólo es un evento). El 1er parámetro es lo enviado, en este caso el mensaje, el 2do es el nombre de quien lo mando
            sockets.emit("serverMessage", message, clientName); // Devolvemos otro evento con el mensaje y el nombre, pero esta vez a todos los clientes (socket con 's')
        });
    });
}