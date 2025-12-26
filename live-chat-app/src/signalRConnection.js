import * as signalR from "@microsoft/signalr"


const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5000")
    .build();



export default connection;

function sendMessage(user, message) {
    connection.invoke("SendMessage", user, message)
        .catch(err => console.error(err));
}