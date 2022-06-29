import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { Web3Provider } from "@ethersproject/providers";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import stores from './Redux/store';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={stores}>
      <App />
      <ToastContainer />
    </Provider>
  </Web3ReactProvider>,
  document.getElementById('root')
);
