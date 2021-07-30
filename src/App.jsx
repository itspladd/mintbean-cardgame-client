import logo from './logo.svg';
import './App.css';

import useSocket from './hooks/useSocket';

const SOCKET_SERVER = 'http://127.0.0.1:8080';

function App() {

  const [socketState, setSocketState] = useSocket(SOCKET_SERVER);

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
      </header>
    </div>
  );
}

export default App;
