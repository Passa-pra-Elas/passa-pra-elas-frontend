import { Link, useLocation } from 'react-router-dom' 
import logo from '../../assets/logo_PPE.png'
import UserImg from '../UserImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faNewspaper, faSearch } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
   const location = useLocation()

    return (
        <nav className='fixed bg-ppurple-500 w-screen flex flex-wrap items-center justify-between mx-auto px-5 py-3 z-99'>

            {/*Esquerda*/}
            <div className='flex items-center gap-4 w-2/3 md:gap-8 md:w-auto'>

               {/*Logo*/}
               <Link to='/noticias' className='flex items-center gap-3'>
                  <img src={logo} alt="logo Passa pra Elas" className='w-13'/>
               </Link>

               {/*Barra de pesquisa*/}
               <div className='flex items-center bg-white text-lg px-2 py-1 rounded w-full md:w-auto'>
                  <FontAwesomeIcon icon={faSearch} className='text-ppink-500 pr-1 cursor-pointer'/>
                  <input type="text" placeholder='Pesquisar' className='w-full md:w-[30vw] text-ppink-500 outline-none'/>
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
              <UserImg size={3.5}/>
            </div>
        </nav>
    )
}

export default NavBar
