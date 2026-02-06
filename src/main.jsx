import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider}  from 'react-redux'
import React from 'react'
import './index.css'
import App from './App.jsx'
import {SidebarStore, UserStore} from './Store/UserStore.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store = {UserStore}>
  {/* <Provider store={SidebarStore}> */}
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
  // </Provider>
)
