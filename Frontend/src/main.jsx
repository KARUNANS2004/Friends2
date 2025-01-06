import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './components/NavBar.jsx'

const AppWrapper = () => { 
  const [isLoggedIn, setIsLoggedIn] = useState(false) 
  return ( 
    <StrictMode> 
      <BrowserRouter> 
        <NavBar isLoggedIn={isLoggedIn}/> 
        <App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </BrowserRouter> 
    </StrictMode>
 ) 
}

createRoot(document.getElementById('root')).render(<AppWrapper />)

