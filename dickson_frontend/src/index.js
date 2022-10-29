import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { chains, providers } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'

const config = {
  projectId: '6395ac3ec192d9e310fdd75538b8b33a',
  theme: "dark",
  accentColor: "default",
  ethereum: {
    appName: 'web3Modal',
    autoConnect: true,
    chains: [
      chains.goerli
    ],
    providers: [providers.walletConnectProvider({ projectId: '6395ac3ec192d9e310fdd75538b8b33a' })]
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3Modal config={config} />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
