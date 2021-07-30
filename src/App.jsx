import logo from './logo.svg';
import './App.css';

import {useState} from 'react'
import useSocket from './hooks/useSocket';
import EVENTS from './constants/EVENTS'

const SOCKET_SERVER = 'http://127.0.0.1:8080';

function App() {

  const [socketState, setSocketState] = useSocket(SOCKET_SERVER);
  const [userState, setUserState] = useState({});
  const [formState, setFormState] = useState("");

  const logIn = event => {
    event.preventDefault();
    console.log(event)
    socketState.socket.emit(EVENTS.USER_CONNECT, formState)
    setUserState({
      id: 1,
      name: formState
    })
  }

  const handleChange = event => {
    event.preventDefault();
    setFormState(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {socketState.msg}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form>
          <label for="name">Username</label>
          <input type="text" id="name" name="name" value={formState} onChange={handleChange} minlength="1">
          </input>
          <button onClick={logIn}>Log In</button>
        </form>
      </header>
    </div>
  );
}

export default App;
