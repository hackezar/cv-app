import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Header} from './components/App.jsx'
import { App } from './components/App.jsx'
import './styles/index.css'
import './styles/App.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="rootDiv">
      <Header />
      <div className="appDiv">
        <App />
      </div>
    </div>
  </React.StrictMode>,
)
