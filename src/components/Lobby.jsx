import '../styles/Lobby.css';

export default function Lobby(props) {

  const { state, dispatch, ACTIONS} = props;

  const userList = state.userList.map(user => <li>{user}</li>)

  return(
    <div>
      <h1>Lobby</h1>
      <ul>{userList}</ul>

    </div>
  )
}