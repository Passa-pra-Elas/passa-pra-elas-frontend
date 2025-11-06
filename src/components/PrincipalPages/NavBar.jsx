import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/authHooks'

import logo from '../../assets/logo_PPE.png'
import UserImg from '../UserImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faNewspaper, faSearch, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
   const location = useLocation()
   const { user, logout } = useAuth()

   const [isMenuOpen, setIsMenuOpen] = useState(false)

   const handleLogout = () => {
      logout()
      setIsMenuOpen(false)
   }

   return (
      <nav className='fixed bg-ppurple-500 w-screen flex flex-wrap items-center justify-between mx-auto px-5 py-3 z-99'>

         {/*Esquerda*/}
         <div className='flex items-center gap-4 w-2/3 md:gap-8 md:w-auto'>

            {/*Logo*/}
            <Link to='/noticias' className='flex items-center gap-3'>
               <img src={logo} alt="logo Passa pra Elas" className='w-13' />
            </Link>

            {/*Barra de pesquisa*/}
            <div className='flex items-center bg-white text-lg px-2 py-1 rounded w-full md:w-auto'>
               <FontAwesomeIcon icon={faSearch} className='text-ppink-500 pr-1 cursor-pointer' />
               <input type="text" placeholder='Pesquisar' className='w-full md:w-[30vw] text-ppink-500 outline-none' />
            </div>
         </div>

         {/*Botões*/}
         <div className='hidden md:flex gap-15'>

            {/*Notícias*/}
            <Link to="/noticias"
               className={`text-center transition-all
               ${location.pathname === '/noticias' ? 'text-ppink-500' : 'text-white hover:text-ppink-900'}`}>
               <FontAwesomeIcon icon={faNewspaper} size="2x" />
               <span className="block mt-1">Notícias</span>
            </Link>

            {/*Jogos*/}
            <Link to="/jogos"
               className={`text-center transition-all
               ${location.pathname === '/jogos' ? 'text-ppink-500' : 'text-white hover:text-ppink-900'}`}>
               <FontAwesomeIcon icon={faFutbol} size="2x" />
               <span className="block mt-1">Jogos</span>
            </Link>
         </div>

         {/*Botão perfil*/}
         <div className="md:block">
            <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='cursor-pointer'>
               <UserImg size={3.5} />
            </div>

            {isMenuOpen && (
               <div className='absolute bg-white right-0 mt-1 w-48 border border-gray-200 rounded-lg shadow-xl overflow-hidden'>
                  <div className='text-md text-gray-600 font-bold px-3 py-2 border-b border-gray-100'>
                     {user ? user.fullName || user.email : 'Visitante'}
                  </div>
                  <Link
                     to={user ? `/perfil/${user.id}` : '/login'}
                     onClick={() => setIsMenuOpen(false)}
                     className='flex items-center p-3 text-ppurple-500 hover:bg-ppinktr-500 transition duration-150 ease-in-out'>
                     <FontAwesomeIcon icon={faUser} className='mr-3 w-4' />
                     Visitar perfil
                  </Link>
                  {user && (
                     <button
                        onClick={handleLogout}
                        className='flex items-center w-full p-3 text-ppink-500 hover:bg-red-50 transition duration-150 ease-in-out border-t border-gray-100'>
                        <FontAwesomeIcon icon={faSignOutAlt} className='mr-3 w-4' />
                        Sair
                     </button>
                  )}
               </div>
            )}
         </div>
      </nav>
   )
}

export default NavBar
