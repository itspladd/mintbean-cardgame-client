import '../styles/App.css';

import useAppData from '../hooks/useAppData'

import Login from './Login'
import GameWindow from './GameWindow'
import Lobby from './Lobby'

const SOCKET_SERVER = 'http://127.0.0.1:8080';

function App() {

  const appData = useAppData(SOCKET_SERVER);
  const { state, dispatch, ACTIONS} = appData

  const {socket, user} = state;

  const host = socket && socket.io.engine.hostname
  const port = socket && socket.io.engine.port

  const connectStatus = socket ? `Connected at ${host}:${port}` : `Not connected`
  const loginStatus = user ? `, logged in as ${user.username}` : `, not logged in`

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {connectStatus}
          {loginStatus}
        </p>
        {!user && 
        <Login {...appData} />}
      </header>
      {user && <Lobby { ...appData } />}
      {user && <GameWindow />}


    </div>
  );
}

export default App;
