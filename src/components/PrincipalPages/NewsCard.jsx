import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import users from '../../users.json'

function NewsCard ({ title, text, bannerImg, category, jornalistId }) {
   const [jornalist, setJornalist] = useState('')

   useEffect(() => {
      setJornalist(users.find(u => u.id === jornalistId))
   }, [])   

   return (
      <div className='bg-white w-full flex-col px-4 py-2 mt-4 border rounded-2xl'>
         {/*Textos em cima*/}
         <div className='flex flex-col sm:items-center justify-between sm:flex-row'>
            <p className='text-lg'>{title}</p>
            <div className='flex items-center'>
               <p className='text-ppurple-500 text-lg font-semibold mr-2'>{jornalist.name}</p>
               <Link to={'/profile'}>
                  <img src={jornalist.photo} alt="user image" 
                     style={{height: '2rem', width: '2rem'}}
                     className={`rounded-full`}/>
               </Link>
            </div>

         </div>
         {/*elementos notícias*/}
         <div className='flex flex-col gap-2 md:gap-10 md:flex-row'>
            <img src={bannerImg} alt="Imagem notícia" className='h-40 object-cover mt-5 rounded- md:mt-0'/>
            <div className='flex flex-col justify-between'>
               <p className='line-clamp-5'>{text}</p>
               <div className='flex mt-4 md:mt-0 justify-between items-center'>
                  <p className='text-ppurple-500'>Há 1 hora - Em {category}</p>
                  <button className='text-ppink-500 border px-2 border-ppink-500 rounded-md
                  cursor-pointer transition-all hover:font-semibold hover:scale-105'>
                     Ler mais
                  </button>
               </div>
            </div>
         </div>
      </div>
  )
}

export default NewsCard
