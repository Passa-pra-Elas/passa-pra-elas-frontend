import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import background from '../../assets/bg_hero.png'

const HeroSection = () => {
  const [showArrow, setShowArrow] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY <= 100)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <section> 
        {/*background*/}
        <div className='absolute z-[-1]'>
          <img src={background} alt="background" className='w-screen h-screen object-cover'/>
          <div className='absolute inset-0 bg-black opacity-80'></div>
          <div className='absolute inset-0
          bg-[radial-gradient(ellipse_at_top,_#ffffff4d_1.2px,_transparent_1px)] bg-[size:14px_14px] 
          opacity-30'></div>
        </div>

        <div className='relative h-screen flex flex-col items-center justify-center'>
         {/*Textos*/}
          <h1 className='text-ppink-500 font-bold text-7xl mt-30'>MOSTRE SEU TALENTO</h1>
          <p className='w-[45vw] text-center text-white font-light text-3xl'>
            Conecte-se com clubes, inspire outras jogadoras e construa sua carreira no futebol feminino com a visibilidade que você merece!
          </p>
        
          {/*Botão entrar*/}
          <Link to='/noticias' className='mt-10 bg-ppurple-500 text-white font-semibold text-2xl py-2 px-4 rounded-2xl opacity-60 transition-all hover:opacity-80 hover:scale-105'>Entrar</Link>

        </div>

        {/*Seta para baixo
        <div className='absolute w-screen bottom-0 flex justify-center transition-opacity duration-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white animate-bounce">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>*/}

      </section>
    </div>
  )
}

export default HeroSection
