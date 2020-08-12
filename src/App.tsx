import React from 'react';
import preval from 'preval.macro';
import logo from './logo.svg';
import './styles/App.scss';
import DiscoveryButton from './components/bluetooth/discoveryButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>Build date: {preval`module.exports = new Date().toLocaleString()`}</label>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscoveryButton></DiscoveryButton>
        </a>
      </header>
    </div>
  );
}

export default App;
