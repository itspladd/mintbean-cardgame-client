import EVENTS from '../constants/EVENTS'

export default function makeSocketHandlers({socket, dispatch, ACTIONS}) {

  socket.on(EVENTS.SOCKET_CONNECT, () => dispatch({ type: ACTIONS.SET_SOCKET, socket}))

  socket.on(EVENTS.SOCKET_DISCONNECT, (reason) => dispatch({ type: ACTIONS.SET_SOCKET, socket: null}))
}