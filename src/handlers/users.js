const makeUserHandlers = (socket, dispatch, ACTIONS) => {
  const handleUserConnect = username => {
    console.log(`new user connected: ${username}`)
    dispatch({type: ACTIONS.ADD_USER, username})
  }
  return {handleUserConnect}
}

export default makeUserHandlers;