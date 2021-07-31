import EVENTS from '../constants/EVENTS'

export default function makeUserHandlers({socket, dispatch, ACTIONS}) {

  // When a new user connects
  const handleUserConnect = username => {
    console.log(`new user connected: ${username}`)
    dispatch({type: ACTIONS.ADD_USER, username})
  }

  socket.on(EVENTS.USER_CONNECT, handleUserConnect)


}