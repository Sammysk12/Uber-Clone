import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UsersContext from './context/UsersContext.jsx'
import CaptainsContextProvider from './context/CaptainsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CaptainsContextProvider>
    <UsersContext>
    <App />
    </UsersContext>
    </CaptainsContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
