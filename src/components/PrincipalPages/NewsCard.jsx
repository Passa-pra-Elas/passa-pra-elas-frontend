import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config/apiConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faClock } from '@fortawesome/free-solid-svg-icons'

const timeAgo = (dateString) => {
   if (!dateString) return 'Data Desconhecida';

   const now = new Date();
   const past = new Date(dateString);
   const diffInSeconds = Math.floor((now - past) / 1000);

   const minute = 60;
   const hour = 3600;
   const day = 86400;
   const month = 2592000;
   const year = 31536000;

   if (diffInSeconds < minute) return `há ${diffInSeconds} segundos`;

   if (diffInSeconds < hour) {
      const minutes = Math.floor(diffInSeconds / minute);
      return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
   }

   if (diffInSeconds < day) {
      const hours = Math.floor(diffInSeconds / hour);
      return `há ${hours} hora${hours > 1 ? 's' : ''}`;
   }

   if (diffInSeconds < month) {
      const days = Math.floor(diffInSeconds / day);
      return `há ${days} dia${days > 1 ? 's' : ''}`;
   }

   if (diffInSeconds < year) {
      const months = Math.floor(diffInSeconds / month);
      return `há ${months} ${months > 1 ? 'meses' : 'mês'}`;
   }

   const years = Math.floor(diffInSeconds / year);
   return `há ${years} ano${years > 1 ? 's' : ''}`;
};

function NewsCard({ title, text, bannerImg, category, jornalistId, createdAt, views, postId }) {
   const [jornalist, setJornalist] = useState('')
   const [loading, setLoading] = useState(true)
   const timeSincePost = timeAgo(createdAt)

   useEffect(() => {
      setLoading(true)

      if (!jornalistId) {
         setLoading(false)
         return
      }

      const fetchJornalist = async () => {
         try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${API_URL}/profile/${jornalistId}`, {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })

            setJornalist(response.data.publicUser)
         }
         catch (error) {
            console.error('Erro ao buscar jornalista: ', error)
            setJornalist(null)
         }
         finally {
            setLoading(false)
         }
      }
      fetchJornalist()

      return () => { }
   }, [jornalistId])


   if (loading) {
      return <div className='text-gray-100'>Carregando notícia...</div>
   }

   return (
      <div className='bg-white w-full flex-col px-4 py-2 mt-4 border rounded-2xl transition-all hover:scale-102'>
         {/*Textos em cima*/}
         <div className='flex flex-col sm:items-center justify-between sm:flex-row'>
            <p className='text-lg'>{title}</p>
            <Link to={`../perfil/${jornalist.id}`} className='flex items-center'>
               <p className='text-ppurple-500 text-lg font-semibold mr-2'>{jornalist.fullName}</p>
               <img src={jornalist.photo} alt="user image"
                  style={{ height: '2rem', width: '2rem' }}
                  className={`rounded-full`} />
            </Link>
         </div>
         {/*elementos notícias*/}
         <div className='flex flex-col gap-2 md:gap-10 md:flex-row'>
            {bannerImg && (
               <img src={bannerImg} alt="Imagem notícia" className='h-40 object-cover mt-5 rounded-lg shadow-lg md:mt-0' />
            )}
            <div className='w-full flex flex-col justify-between'>
               <p className='line-clamp-5'>{text}</p>
               <div className='flex mt-4 md:mt-0 justify-between items-center'>
                  <p className='text-ppurple-500'>{timeSincePost} - Em {category}</p>
                  <div className='flex gap-5'>
                     <span className='flex items-center text-ppurple-500'>
                        <FontAwesomeIcon icon={faEye} className='mr-1 w-4 h-4' />
                        {views || 0}
                     </span>
                     <Link to={`/noticias/${postId}`} className='text-ppink-500 border px-2 border-ppink-500 rounded-md
                                          cursor-pointer transition-all hover:font-semibold hover:scale-105'>
                        Ler mais
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewsCard
