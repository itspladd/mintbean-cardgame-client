import socketClient from 'socket.io-client'
import { useState, useEffect } from 'react';

import userHandlers from '../handlers/users'
import EVENTS from '../constants/EVENTS'

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

    socket.on(EVENTS.SOCKET_CONNECT, () => {
      setSocketState({
        socket: socket,
        connected: true,
        msg: `Connected at ${server}`
      });
    })

    socket.on(EVENTS.USER_CONNECT, userHandlers.handleUserConnect)

    socket.on(EVENTS.SOCKET_DISCONNECT, (reason) => {
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

