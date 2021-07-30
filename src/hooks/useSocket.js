import socketClient from 'socket.io-client'
import { useState, useEffect } from 'react';

export default function useSocket(server) {

  // Set up state holder
  const [socketState, setSocketState] = useState({
    socket: null,
    connected: false,
    msg: "No connection attempted"
  });

  // Set up socket connection and event handlers
  useEffect(() => {
    const socket = socketClient(server)

    socket.on('connection', () => {
      setSocketState({
        socket: socket,
        connected: true,
        msg: `Connected at ${server}`
      });
    })

    socket.on('disconnect', (reason) => {
      setSocketState({
        socket: null,
        connected: false,
        msg: `Disconnected. Reason: ${reason}`
      });
    })
    
    return function cleanup() {
      socket.disconnect();
    }
  }, [server])

  return [socketState, setSocketState]
}

