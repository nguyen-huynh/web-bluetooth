import React from 'react';
import preval from 'preval.macro';
import logo from './logo.svg';
import './styles/App.scss';
import DiscoveryButton from './components/bluetooth/discoveryButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <label>Build date: {preval`module.exports = new Date().toLocaleString()`}</label>
        <DiscoveryButton></DiscoveryButton>
      </header>
    </div >
  );
}

export default App;
