import '../styles/App.css';

import {useState} from 'react'
import useSocket from '../hooks/useSocket';

import Login from './Login'
import GameWindow from './GameWindow'
import Lobby from './Lobby'

const SOCKET_SERVER = 'http://127.0.0.1:8080';

function App() {

  const [socketState, setSocketState] = useSocket(SOCKET_SERVER);
  const [userState, setUserState] = useState({
    id: null,
    username: null
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {socketState.msg}
        </p>
        {!userState.id && 
        <Login 
          setUserState={setUserState}
          setSocketState={setSocketState}
          socketState={socketState} />}
      </header>
      {userState.id && <Lobby />}
      {userState.id && <GameWindow />}


    </div>
  );
}

export default App;
