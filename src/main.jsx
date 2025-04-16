import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './stylesheets/index.css'
import Base from './Base.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Base />
  </StrictMode>,
)
