import React from 'react'
import { Link } from 'react-router-dom'
import LoginCard from '../components/LoginRegister/LoginCard'
import logo from '../assets/logo_PPE.png'

const Login = () => {
  return (
    <div id='content'>
        {/*Background*/}
        <div className="absolute z-[-1] w-screen h-screen">
            <div className="absolute inset-0 
            bg-linear-to-t from-ppurple-200 to-ppurple-500"></div>
            <div className='absolute inset-0 
            bg-[radial-gradient(ellipse_at_top,#ffffff4d_.1px,transparent_1px)] bg-size-[14px_14px]
            mask-b-from-0%'></div>
        </div>

        <div className='h-screen w-screen flex flex-col items-center justify-center gap-7'>
            <Link to='/'><img src={logo} alt="log o passa a bola" className='h-20'/></Link>
            <LoginCard/>
        </div>
    </div>
  )
}

export default Login
