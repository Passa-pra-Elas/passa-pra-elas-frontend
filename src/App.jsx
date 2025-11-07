import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/authContext'

import LandingPage from './routes/LandingPage'


import Login from './routes/Login'
import Register from './routes/Register'
import TermsOfUse from './routes/TermsOfUse'
import PrivacyPolitic from './routes/PrivacyPolitic'
import Profile from './routes/Profile'

import SearchResults from './routes/SearchResults'

import News from './routes/News'
import CreatePost from './routes/CreatePost'
import PostDetail from './routes/PostDetail'

import Matches from './routes/Matches'
import TestMatch from './routes/TestMatch'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />

          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Register />} />
          <Route path='/termos' element={<TermsOfUse />} />
          <Route path='/privacidade' element={<PrivacyPolitic />} />
          <Route path='/perfil/:id' element={<Profile />} />

          <Route path='/search' element={<SearchResults />} />

          <Route path='/noticias' element={<News />} />
          <Route path='/noticias/create' element={<CreatePost />} />
          <Route path='/noticias/:id' element={<PostDetail />} />

          <Route path='/jogos' element={<Matches />} />
          <Route path='/jogos/teste' element={<TestMatch />} />

          <Route path='*' element={<h1>Erro 404</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
