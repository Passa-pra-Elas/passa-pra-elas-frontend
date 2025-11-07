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
         <main className="pt-30 p-4 md:p-5 md:pt-30">
            {isOwner && (
               <div className="flex justify-end mb-4">
                  <button
                     onClick={() => setIsEditing(true)}
                     className="bg-ppink-500 text-white font-semibold 
                                 flex items-center px-2 py-3 border-2 border-ppink-900 rounded-2xl 
                                 transition-all hover:scale-105 hover:bg-ppink-900">
                     <FontAwesomeIcon icon={faPencilAlt} className="mr-2" /> Editar Perfil
                  </button>
               </div>
            )}
            <div className='flex justify-between gap-5'>
               <div className='w-full md:w-2/6 flex flex-col items-center'>
                  <img
                     src={photo || 'placeholder-url'}
                     alt={fullName}
                     className="w-48 h-48 rounded-full object-cover border-4 border-ppurple-500 mb-4"
                  />
                  {/*<div className="text-center flex items-center mb-6">
                     <span className="text-3xl font-bold">0</span>
                     <button onClick={() => window.alert('A funcionalidade de likes ainda está em desenvolvimento.')}>
                        <FontAwesomeIcon icon={faThumbsUp}
                           className="text-pgreentr-500 text-2xl w-10 h-10 p-1 ml-2 border-2 rounded-sm
                                       transition-all hover:scale-105 hover:text-pgreen-500"/>
                     </button>
                  </div>
                  <button
                     onClick={() => window.alert('A funcionalidade de likes ainda está em desenvolvimento.')}
                     className='text-ppink-500 text-xl px-10 border-2 rounded-lg 
                                 transition-all hover:scale-105 hover:bg-ppink-900 hover:border-ppink-900 hover:text-white'>
                     Denunciar
                  </button>*/}
               </div>
               <div className='w-full md:w-3/6'>
                  <h1 className='text-ppurple-500 text-4xl font-extrabold capitalize'>{profileData.fullName}</h1>
                  <div className='flex items-center gap-2 mt-4'>
                     <p className='bg-ppink-500 text-white text-2xl font-medium capitalize px-3 rounded-lg'>{profileData.userType}</p>
                     <p className='text-2xl font-medium'>{profileData.city}</p>
                  </div>
                  {userType === 'jogadora' && (
                     <p className={`mt-5 ${availableForTeams ? 'text-pgreen-500' : 'text-red-500'}`}>
                        <FontAwesomeIcon 
                           icon={availableForTeams ? faCircleCheck : faCircleXmark} 
                           className='mr-1' 
                        />
                        {availableForTeams ? 'Disponível para times' : 'Indisponível para contratação'}
                     </p>
                  )}
                  <p className='text-lg mt-5'>{profileData.description ? profileData.description : 'Sem descrição'}</p>
               </div>
               {userType == 'jogadora' && (
                  <div className='bg-gray-300 w-full md:w-3/6 grid grid-cols-2 gap-x-10 p-5 rounded-xl'>
                     <div>
                        <p className='text-2xl font-extrabold'>Idade</p>
                        <p className=''>{profileData.age ? profileData.age + ' anos' : 'Sem idade'}</p>
                     </div>
                     <div>
                        <p className='text-2xl font-extrabold'>Peso</p>
                        <p className=''>{profileData.weight ? profileData.weight : 'Sem peso'}</p>
                     </div>
                     <div>
                        <p className='text-2xl font-extrabold'>Cidade</p>
                        <p className=''>{profileData.city ? profileData.city : 'Sem cidade'}</p>
                     </div>
                     <div>
                        <p className='text-2xl font-extrabold'>Perna dom.</p>
                        <p className=''>{profileData.domLeg ? profileData.domLeg + ' anos' : 'Sem perna dominante'}</p>
                     </div>
                     <div>
                        <p className='text-2xl font-extrabold'>Nacionalidade</p>
                        <p className=''>{profileData.nacionality ? profileData.nacionality : 'Sem nacionalidade'}</p>
                     </div>
                  </div>
               )}
            </div>
            {/*<div className="mt-12 pt-8 border-t border-gray-200">
               <h2 className="text-2xl font-bold text-gray-900 mb-4">Clubes (em desenvolvimento)</h2>
               <div className="flex space-x-4">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
               </div>

               <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Links (em desenvolvimento)</h2>
               <p className="text-gray-600">Links de redes sociais, portfólio, etc.</p>
            </div>*/}
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