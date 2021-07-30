import socketClient from 'socket.io-client'
import { useState, useEffect } from 'react';

import userHandlers from '../handlers/users'
import EVENTS from '../constants/EVENTS'

export default function useSocket(server) {

  // Set up state holder
  const [socket, setSocket] = useState(null)

  // Set up socket connection and event handlers
  useEffect(() => {
    const socket = socketClient(server)
    console.log(socket)

    socket.on(EVENTS.SOCKET_CONNECT, () => setSocket(socket))

    socket.on(EVENTS.USER_CONNECT, userHandlers.handleUserConnect)

    socket.on(EVENTS.SOCKET_DISCONNECT, (reason) => setSocket(null))

    return function cleanup() {
      socket.disconnect();
    }
  }, [server])

  return [socket, setSocket]
}

