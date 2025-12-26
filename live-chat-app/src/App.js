import './App.css';
import { useEffect, useRef, useState } from 'react';
import * as signalR from "@microsoft/signalr";

function App() {
  const [postContent, setPostContent] = useState('');
  const connectionRef = useRef(null);

  const handleChange = (event) => {
  const value = event.target.value;
  setPostContent(value);

  if (connectionRef.current) {
    connectionRef.current
      .invoke("SendMessage", value)
      .catch(err => console.error(err));
  }
};
  


  useEffect(() => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7011/chatHub")
    .withAutomaticReconnect()
    .build();

  // 🔹 RECEIVE messages from C# server
  connection.on("ReceiveMessage", (message) => {
    console.log("Received from server:", message);

    // Example: update state
    setPostContent(message);
  });

  connectionRef.current = connection;

  connection.start()
    .then(() => {
      console.log("Connected to SignalR!");
    })
    .catch(err => console.error("Connection failed:", err));

  // 🔹 Cleanup on unmount
  return () => {
    connection.stop();
  };
}, []);


  return (
    <div className="App">
      <p>Baldur suger ballene til denne appen</p>

      
        <textarea
          value={postContent}
          onChange={handleChange}
          rows={4}
          cols={50}
          placeholder="Enter your post content here..."
        />
        <br />
    </div>
  );
}

export default App;
