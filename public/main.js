$(function() {
    var socket = io(); // Se instancia un socket

    var message = $("#chat-message");
    var chat = $("#chat");
    message.focus();

    $("#message-box").submit((e) => {
        e.preventDefault(); // Hace que la página no se recargue y se pierda la información
        socket.emit("clientMessage", message.val()); // Envía un evento al servidor llamado "clientMessage" (puedes llamar un evento como quieras, sólo es un evento), y envia el mensaje como parámetro
        message.val("");
    });

    socket.on("serverMessage", (otherClientMessage)=> { // Cuando ocurre el evento serverMessage (Que es evento "emit" que es devuelto por el servidor cuando alguien manda un mensaje)
        chat.append("<div>" + otherClientMessage + "</div>");
    });
});