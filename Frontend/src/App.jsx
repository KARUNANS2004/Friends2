import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { Home } from './components/Home'
import SignUp from './components/Signup'
import { SearchFriends } from './components/SearchFriends'
import { UserProfile } from './components/UserProfile'

function App({isLoggedIn,setIsLoggedIn}) {
  const [username, setUsername]=useState("")

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}/>} />
      <Route path='/' element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username}/>} />
      <Route path='/signup' element={<SignUp/>} setUsername={setUsername}/>
      <Route path='/search' element={<SearchFriends/>} />
      <Route path="/users/:userId" element={<UserProfile/>} />
    </Routes>
    </>
  )
}

export default App
