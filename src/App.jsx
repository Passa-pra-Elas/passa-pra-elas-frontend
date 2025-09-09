import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Landing page</h1>} />
        <Route path='/login' element={<h1>Login</h1>} />
        <Route path='/registro' element={<h1>Registro</h1>} />
        <Route path='/noticias' element={<h1>noticias</h1>} />
        <Route path='/jogos' element={<h1>jogos</h1>} />
        <Route path='/perfil/:nome' element={<h1>Perfil</h1>} />
        <Route path='*' element={<h1>Erro 404</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
