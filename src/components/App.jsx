import '../styles/App.css';

import {useState} from 'react'
import useSocket from '../hooks/useSocket';

import Login from './Login'
import GameWindow from './GameWindow'
import Lobby from './Lobby'

const SOCKET_SERVER = 'http://127.0.0.1:8080';

function App() {

  const [userList, setUserList] = useState();
  const [socket, setSocket] = useSocket(SOCKET_SERVER);
  const [userState, setUserState] = useState({
    id: null,
    username: null
  });

  const host = socket && socket.io.engine.hostname
  const port = socket && socket.io.engine.port

  const loginStatus = userState.id ? `, logged in as ${userState.username}` : `, not logged in`

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {socket && `Connected at ${host}:${port}`}
          {loginStatus}
        </p>
        {!userState.id && 
        <Login 
          setUserState={setUserState}
          setSocket={setSocket}
          socket={socket} />}
      </header>
      {userState.id && <Lobby userList={userList} />}
      {userState.id && <GameWindow />}


    </div>
  );
}

export default App;
