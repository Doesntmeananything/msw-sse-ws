import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// Handling SSE
const evtSource = new EventSource("http://localhost:5000/sse");
evtSource.onmessage = (event) => {
  console.log(`Incoming SSE: ${event.data}`);
};

function App() {
  // Handling WS
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  webSocket?.addEventListener("message", function (event) {
    console.log("Incoming WS: ", event.data);
  });

  const openSocket = () => {
    setWebSocket(new WebSocket("ws://localhost:5000/websocket"));
  };

  const testSocket = () => {
    webSocket?.send("hi from client");
  };

  const closeSocket = () => {
    webSocket?.close();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={openSocket}>Open WebSocket</button>
        <button onClick={testSocket}>Test WebSocket</button>
        <button onClick={closeSocket}>Close WebSocket</button>
      </header>
    </div>
  );
}

export default App;
