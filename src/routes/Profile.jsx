import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/authHooks'
import { API_URL } from '../config/apiConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faExclamationTriangle, faPencilAlt, faPersonArrowUpFromLine, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import NavBar from '../components/PrincipalPages/NavBar'
import EditProfilePopup from '../components/PrincipalPages/EditProfilePopup'

const Profile = () => {
   const { id: profileId } = useParams()
   const { user: currentUser, loading: authLoading } = useAuth()

   const [profileData, setProfileData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [isEditing, setIsEditing] = useState(false);
   const [error, setError] = useState(null)

   const isOwner = currentUser && (parseInt(profileId) == currentUser.id)

   const handleProfileUpdate = (updatedUser) => {
      setProfileData(updatedUser)
   }

   useEffect(() => {
      if (!profileId) {
         setLoading(false)
         setError('ID do perfil não fornecido!')
         return
      }

      const fetchProfile = async () => {
         try {
            const response = await axios.get(`${API_URL}/profile/${profileId}`)
            setProfileData(response.data.publicUser)
         }
         catch (error) {
            console.error('Erro ao buscar perfil: ', error.response || error)
            setError(error.response?.data?.message || 'Perfil não encontrado ou erro de carregamento.')
         }
         finally {
            setLoading(false)
         }
      }
      fetchProfile()
   }, [profileId])

   if (loading || authLoading) {
      return <div className="p-20 text-center font-bold">Carregando perfil...</div>
   }
   if (error) {
      return <div className="p-20 text-center text-red-500 font-bold">{error}</div>;
   }
   if (!profileData) {
      return <div className="p-20 text-center text-red-500 font-bold">Perfil não encontrado.</div>;
   }

   const { fullName, userType, city, photo, availableForTeams } = profileData

   return (
      <div className='max-w-screen min-h-screen bg-gray-200'>
         <NavBar />
         <main className="pt-30 p-4 md:p-5 md:pt-30 max-w-7xl mx-auto">
            {isOwner && (
               <div className="flex justify-end mb-4">
                  <button
                     onClick={() => setIsEditing(true)}
                     className="bg-ppink-500 text-white font-semibold 
                                 flex items-center px-4 py-2 border-2 border-ppink-900 rounded-2xl 
                                 transition-all hover:scale-105 hover:bg-ppink-900">
                     <FontAwesomeIcon icon={faPencilAlt} className="mr-2" /> Editar Perfil
                  </button>
               </div>
            )}

            {/* Layout Principal: Foto/Ações (Esquerda) | Detalhes/Estatísticas (Direita) */}
            <div className='flex flex-col md:flex-row gap-6 lg:gap-10'>

               {/* 1. Coluna da Foto e Ações (1/3 da Largura em Desktop) */}
               <div className='w-full md:w-1/3 lg:w-1/4 flex flex-col items-center bg-white p-6 rounded-xl shadow-xl'>
                  <img
                     src={photo || 'placeholder-url'}
                     alt={fullName}
                     className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-ppurple-500 mb-6"
                  />
                  {/*
                  <div className="text-center flex items-center mb-6">...</div>
                  <button onClick={...} className='text-ppink-500 ...'>Denunciar</button>
                  */}
               </div>

               {/* 2. Coluna Principal (2/3 da Largura em Desktop) */}
               <div className='w-full md:w-2/3 lg:w-3/4 flex flex-col gap-6'>

                  {/* Bloco de Detalhes e Descrição */}
                  <div className='bg-white p-6 rounded-xl shadow-xl'>
                     <h1 className='text-ppurple-500 text-3xl md:text-4xl font-extrabold capitalize'>{profileData.fullName}</h1>

                     <div className='flex flex-wrap items-center gap-x-4 gap-y-2 mt-4'>
                        <p className='bg-ppink-500 text-white text-lg md:text-2xl font-medium capitalize px-3 py-1 rounded-lg'>{profileData.userType}</p>
                        <p className='text-lg md:text-2xl font-medium text-gray-700'>{profileData.city}</p>
                     </div>

                     {userType === 'jogadora' && (
                        <p className={`mt-5 text-lg ${availableForTeams ? 'text-pgreen-500' : 'text-red-500'}`}>
                           <FontAwesomeIcon
                              icon={availableForTeams ? faCircleCheck : faCircleXmark}
                              className='mr-1'
                           />
                           {availableForTeams ? 'Disponível para times.' : 'Indisponível para times.'}
                        </p>
                     )}
                     <p className='text-base mt-5 text-gray-700'>{profileData.description ? profileData.description : 'Sem descrição'}</p>
                  </div>

                  {/* Bloco de Estatísticas (Apenas para Jogadoras) */}
                  {userType == 'jogadora' && (
                     <div className='bg-gray-300 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-5 rounded-xl shadow-xl'>
                        {/* Idade */}
                        <div>
                           <p className='text-base sm:text-xl font-extrabold'>Idade</p>
                           <p className='text-gray-700'>{profileData.age ? profileData.age + ' anos' : 'Sem idade'}</p>
                        </div>
                        {/* Peso */}
                        <div>
                           <p className='text-base sm:text-xl font-extrabold'>Peso</p>
                           <p className='text-gray-700'>{profileData.weight ? profileData.weight : 'Sem peso'}</p>
                        </div>
                        {/* Cidade (Duplicado, mas mantido conforme o original) */}
                        <div>
                           <p className='text-base sm:text-xl font-extrabold'>Cidade</p>
                           <p className='text-gray-700'>{profileData.city ? profileData.city : 'Sem cidade'}</p>
                        </div>
                        {/* Perna Dominante */}
                        <div>
                           <p className='text-base sm:text-xl font-extrabold'>Perna dom.</p>
                           <p className='text-gray-700'>{profileData.domLeg ? profileData.domLeg : 'Sem perna dominante'}</p>
                        </div>
                        {/* Nacionalidade */}
                        <div>
                           <p className='text-base sm:text-xl font-extrabold'>Nacionalidade</p>
                           <p className='text-gray-700'>{profileData.nacionality ? profileData.nacionality : 'Sem nacionalidade'}</p>
                        </div>
                     </div>
                  )}

                  {/* Links e Clubes (Manter como desenvolvimento) */}
                  {/* <div className="mt-12 pt-8 border-t border-gray-200">...</div> */}
               </div>
            </div>
         </main>
         {isEditing && (
            <EditProfilePopup
               profileData={profileData}
               onUpdate={handleProfileUpdate}
               onClose={() => setIsEditing(false)}
            />
         )}
      </div>
   )
}

const ProfileStat = ({ label, value }) => (
   <div className="bg-gray-100 p-3 rounded-lg">
      <p className="text-xs text-gray-500 font-semibold">{label}</p>
      <p className="text-base font-medium text-gray-800">{value}</p>
   </div>
)

export default Profile