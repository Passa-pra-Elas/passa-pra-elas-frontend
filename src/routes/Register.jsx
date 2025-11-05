import React from 'react'
import { Link } from 'react-router-dom'
import RegisterCard from '../components/LoginRegister/RegisterCard'
import logo from '../assets/logo_PPE.png'

const Register = () => {
  return (
    <div id='content'>
        {/*Background*/}
        <div className="absolute z-[-1] w-screen h-screen">
            <div className="absolute inset-0 
            bg-linear-to-t from-ppurple-500 to-ppurple-200"></div>
            <div className='absolute inset-0 
            bg-[radial-gradient(ellipse_at_top,#ffffff4d_.1px,transparent_1px)] bg-size-[14px_14px]
            mask-t-from-0%'></div>
        </div>

        <div className='h-screen w-screen flex flex-col items-center justify-center gap-7'>
            <Link to='/'><img src={logo} alt="logo passa a bola" className='h-20'/></Link>
            <RegisterCard/>
        </div>
    </div>
  )
}

export default Register
