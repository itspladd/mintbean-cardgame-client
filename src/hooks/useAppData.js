import {useReducer, useEffect} from 'react';
import socketClient from 'socket.io-client'

import userHandlers from '../handlers/users'
import EVENTS from '../constants/EVENTS'

export default function useAppData(server) {
  //Constants for reducer actions
  const ACTIONS = {
    SET_SOCKET: "SET_SOCKET",
    SET_USER: "SET_USER"
  };

  const initialState = {
    socket: null,
    user: null
  }

  // Set up reducer function.
  function reducer(state, action) {

    // Set the socket.
    const setSocket = ({ socket }) => {
      return { ...state, socket };
    };

    // Set the current user.
    const setUser = ({ username, id }) => {
      return { ...state, user: {username, id}};
    };

    const actions = {
      [ACTIONS.SET_SOCKET]: setSocket,
      [ACTIONS.SET_USER]: setUser
    };

    return actions[action.type]({ ...action })
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // After everything renders, attempt to connect to socket.
  useEffect(() => {
    const socket = socketClient(server)

    console.log(socket)

    socket.on(EVENTS.SOCKET_CONNECT, () => dispatch({ type: ACTIONS.SET_SOCKET, socket}))

    socket.on(EVENTS.USER_CONNECT, userHandlers.handleUserConnect)

    socket.on(EVENTS.SOCKET_DISCONNECT, (reason) => dispatch({ type: ACTIONS.SET_SOCKET, socket: null}))

    return function cleanup() {
      socket.disconnect();
    }
  }, [server, ACTIONS.SET_SOCKET]);

  return { state, dispatch, ACTIONS };
}