$(function() {
    var socket = io(); // Se instancia un socket

    var clientName = prompt("Please enter your name");
    if(clientName === "" || clientName=== null) {
        clientName = "Desconocido";
    }
    $("#user").text(clientName);

    var message = $("#chat-message");
    var chat = $("#chat");
    message.focus();

    $("#message-box").submit((e) => {
        e.preventDefault(); // Hace que la página no se recargue y se pierda la información
        socket.emit("clientMessage", message.val(), clientName); // Envía un evento al servidor llamado "clientMessage" (puedes llamar un evento como quieras, sólo es un evento), y envia el mensaje como parámetro, además del nombre de quién lo envió
        message.val("");
    });

    socket.on("serverMessage", (oneClientMessage, name)=> { // Cuando ocurre el evento serverMessage (Que es evento "emit" que es devuelto por el servidor cuando alguien manda un mensaje)... También traigo el nombre de quién lo mandó
        if(name === clientName) {
            chat.append("<div class='col s10 push-s2 card-panel orange white-text'>" + "<strong>Tú:</strong><br>" + oneClientMessage + "</div>");
        } else {
            chat.append("<div class='col s10 card-panel light-blue white-text'><strong>" + name + ":</strong><br>" + oneClientMessage + "</div>");
        }
        chat.animate({ scrollTop: chat[0].scrollHeight }, 1000);
    });
});