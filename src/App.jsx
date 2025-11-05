import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './index.css'
import users from '../src/users.json'

import LandingPage from './routes/LandingPage'
import Login from './routes/Login'
import Register from './routes/Register'
import News from './routes/News'
import Matches from './routes/Matches'
import TestMatch from './routes/TestMatch'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)) 
    }
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/cadastro' element={<Register/>} />
        <Route path='/noticias' element={<News/>} />
        <Route path='/jogos' element={<Matches/>} />
        <Route path='/jogos/teste' element={<TestMatch/>} />
        {/*<Route path='/perfil/:nome' element={<h1>Perfil</h1>}/>*/}
        <Route path='*' element={<h1>Erro 404</h1>}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
