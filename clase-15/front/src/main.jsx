import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import Fetch from './Fetch'
// import FetchRealTime from './FetchRealTime'
import FetchGeo from './FetchGeo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FetchGeo />
  </StrictMode>,
)
