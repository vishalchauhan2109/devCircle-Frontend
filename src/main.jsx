import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import React from 'react'
import './index.css'
import App from './App.jsx'
import { Store } from "./Store/UserStore";

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)