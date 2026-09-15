import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import PlayerView from './components/PlayerView.jsx';
import './styles.css';

const isPlayer = window.location.hash.startsWith('#/player');
if (isPlayer) document.body.classList.add('player-body');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isPlayer ? <PlayerView hash={window.location.hash} /> : <App />}
  </React.StrictMode>
);
