import {useReducer, useEffect} from 'react';
import socketClient from 'socket.io-client'

import makeSocketEventHandlers from '../handlers'
import EVENTS from '../constants/EVENTS'

// Constants for reducer actions.
// Set outside the hook function or else React complains.
const ACTIONS = {
  SET_SOCKET: "SET_SOCKET",
  SET_USER: "SET_USER",
  ADD_USER: "ADD_USER",
  SET_USER_LIST: "SET_USER_LIST"
};

export default function useAppData(server) {

  const initialState = {
    socket: null,
    user: null,
    userList:[]
  }

  // Set up reducer function.
  function reducer(state, action) {

    // Set the socket.
    const setSocket = ({ socket }) => {
      console.log('dispatched setSocket')
      return { ...state, socket };
    };

    // Set the current user.
    const setUser = ({ username, id }) => {
      return { ...state, user: {username, id}};
    };

    const addUser = ({username}) => {
      const userList = [...state.userList, username]
      return { ...state, userList}
    }

    const setUserList = ({userList}) => {
      return { ...state, userList};
    }

    const actions = {
      [ACTIONS.SET_SOCKET]: setSocket,
      [ACTIONS.SET_USER]: setUser,
      [ACTIONS.ADD_USER]: addUser,
      [ACTIONS.SET_USER_LIST]: setUserList
    };

    return actions[action.type]({ ...action })
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // After everything renders, attempt to connect to socket.
  useEffect(() => {
    const socket = socketClient(server)

    // Set up event handler functions
    makeSocketEventHandlers({socket, dispatch, ACTIONS});

    return function cleanup() {
      socket.disconnect();
    }
  }, [server]);

  return { state, dispatch, ACTIONS };
}