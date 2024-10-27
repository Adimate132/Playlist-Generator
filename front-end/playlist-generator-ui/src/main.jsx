import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from '../src/Routing/Routing.jsx'
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <Routing />
    </div>
  </StrictMode>
)
