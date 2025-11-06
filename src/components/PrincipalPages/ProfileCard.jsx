import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../../hooks/authHooks';

import UserImg from '../UserImg'
import UserTeam from '../UserTeam'

const decodeJwt = (token) => {
   if (!token) return null
   try {
      const payloadBase64 = token.split('.')[1]
      const payload = JSON.parse(atob(payloadBase64))
      return payload
   }
   catch (e) {
      console.error('Erro ao decodificar token: ', e)
      return null
   }
}

const ProfileCard = () => {
   const { user, loading, isAuthenticated } = useAuth();

   if (loading) {
      return <div className='text-black'>Carregando perfil...</div>;
   }

   if (isAuthenticated) {
      return (
         <div className='bg-white flex flex-col items-center justify-center p-3 rounded-2xl border'>
            <UserImg size={6} />
            <Link>
               <h3 className='text-ppurple-500 font-semibold'>{user.fullName || user.email}</h3>
            </Link>

            <div className='w-full text-left mt-3'>
               <p>{user.age} anos | {user.city} </p>
               <p className='text-ppurple-500 capitalize'>{user.userType}</p>
               <span></span>
            </div>

            <div className='w-full flex justify-start mt-4'>
               <UserTeam />
            </div>
         </div>
      )
   }
   else {
      return (
         <div className='relative bg-white flex flex-col items-center justify-center p-4 px-5 rounded-2xl border'>
            {/*Background*/}
            <div className='relative blur-md'>
               <UserImg size={6} />
               <Link>
                  <h3 className='text-ppurple-500 font-semibold'>placeholder</h3>
               </Link>

               <div className='w-full text-left mt-3'>
                  <p>24 anos | Alegrete </p>
                  <p className='text-ppurple-500 capitalize'>placeholder</p>
                  <span>Jogadora</span>
               </div>

               <div className='w-full flex justify-start mt-4'>
                  <UserImg size={3} />
                  <p>Ibis</p>
               </div>
            </div>

            <div className='absolute inset-0 z-1 w-full flex flex-col items-center p-10 overflow-hidden'>
               <p className='text-md text-center font-bold'>Faça login para ver o seu perfil</p>
               <Link
                  to={'/login'}
                  className='w-full bg-ppurple-500 text-3xl text-white text-center font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                     transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                  Login
               </Link>
            </div>
         </div>
      )
   }
}

export default ProfileCard