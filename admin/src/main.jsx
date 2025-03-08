import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import DocContextProvider from './context/DocContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <DocContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </DocContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>
)
