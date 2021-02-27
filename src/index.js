import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './context'
import { Auth0Provider } from '@auth0/auth0-react'
import config from './auth_config.json';

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    audience={config.audience}
    redirectUri={window.location.origin}>
    <AppProvider>
        <App />
    </AppProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
