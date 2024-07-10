import React from 'react'
import ReactDOM from 'react-dom/client'
import { Header} from './App.jsx'
import { CollectDataApp } from './components/CollectData.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <Header />
      <CollectDataApp />
    </div>
  </React.StrictMode>,
)
