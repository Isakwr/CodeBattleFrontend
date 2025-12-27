import * as signalR from "@microsoft/signalr"


const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://codeversus-test2.onrender.com:5000/chathub")
    .withAutomaticReconnect()
    .build();



export default connection;

function sendMessage(user, message) {
    connection.invoke("SendMessage", user, message)
        .catch(err => console.error(err));
}