import { Link } from 'react-router-dom' 
import logo from '../../assets/logo_PPE.png'

function NavBar() {
    return (
        <nav className='fixed bg-ppurple-500 w-screen flex flex-col sm:flex-row flex-wrap items-center justify-between mx-auto p-4 z-99'>
            <div className='transition-transform hover:scale-105'>
                <Link to='/noticias' className='flex items-center gap-3'>
                    <img src={logo} alt="logo Passa pra Elas" className='h-13'/>
                    <span className='text-2xl/6 font-black text-white'>PASSA<br/>PRA ELAS</span>
                </Link>
            </div>
            <div className='flex items-center mt-5 sm:mt-0 space-x-6'>
                {/*<a href='#' className='text-lg font-bold text-pgreen-500 transition-transform hover:underline hover:scale-110'>SOBRE NÓS</a>*/}
                <Link to='/login' className='text-lg font-bold text-pgreen-500 transition-transform hover:underline hover:scale-110'>LOGIN</Link>
                <Link to='/cadastro' className='bg-ppink-500 text-lg font-bold text-white py-1.5 px-4 rounded-full transition-all duration-300 hover:bg-[#b54a68] hover:scale-105'>CADASTRAR-SE</Link>
            </div>
        </nav>
    )
}

export default NavBar