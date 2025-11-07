import React, { useState } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/authHooks'
import { API_URL } from '../../config/apiConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons'

const EditProfilePopup = ({ profileData, onUpdate, onClose }) => {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [error, setError] = useState(null)
   const { user: currentUser, loading: authLoading } = useAuth()

   const [formData, setFormData] = useState({
      city: profileData.city || '',
      age: profileData.age || 0,
      photo: profileData.photo || '',
      weight: profileData.weight || '',
      domLeg: profileData.domLeg || '',
      nacionality: profileData.nacionality || '',
      description: profileData.description || '',
      availableForTeams: profileData.availableForTeams || false
   })

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target

      setFormData(prev => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value
      }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError(null)

      try {
         const token = localStorage.getItem('token')
         const userId = profileData.id

         const response = await axios.patch(`${API_URL}/profile/${userId}`, formData, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            }
         })

         onUpdate(response.data.user)
         onClose()

      } catch (error) {
         console.error("Erro ao salvar perfil:", error.response || error)
         setError(error.response?.data?.message || 'Falha ao salvar. Tente novamente.')
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
         <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-ppurple-500 mb-4">Editar Perfil</h2>

            {error && <div className="text-red-600 mb-3">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">

               <div className="grid grid-cols-2 gap-4">
                  <div className='flex justify-between gap-5 p-3 border rounded-lg hover:ring-ppurple-500'>
                     <input type="number" name="age" placeholder="Idade" value={formData.age} onChange={handleChange}
                        className="w-full focus:outline-none" disabled={isSubmitting} />
                     <p>Anos</p>
                  </div>
                  <input type="text" name="city" placeholder="Cidade" value={formData.city} onChange={handleChange}
                     className="p-3 border rounded-lg focus:ring-ppurple-500" disabled={isSubmitting} />
               </div>

               {profileData.userType == 'jogadora' && (
                  <div className="grid grid-cols-2 gap-4">
                     <input type="text" name="weight" placeholder="Peso (ex: 65kg)" value={formData.weight} onChange={handleChange}
                        className="p-3 border rounded-lg focus:ring-ppurple-500" disabled={isSubmitting} />
                     <select name="domLeg" value={formData.domLeg} onChange={handleChange}
                        className="p-3 border rounded-lg focus:ring-ppurple-500" disabled={isSubmitting}>
                        <option value="">Perna Dominante</option>
                        <option value="Direita">Direita</option>
                        <option value="Esquerda">Esquerda</option>
                        <option value="Ambas">Ambas</option>
                     </select>
                  </div>
               )}

               <input type="text" name="nacionality" placeholder="Nacionalidade" value={formData.nacionality} onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-ppurple-500 w-full" disabled={isSubmitting} />

               <textarea name="description" placeholder="Escreva uma breve descrição sobre você..." value={formData.description} onChange={handleChange}
                  rows="3" className="p-3 border rounded-lg focus:ring-ppurple-500 w-full" disabled={isSubmitting} />

               {profileData.userType == 'jogadora' && (
                  <label className='flex items-center space-x-3'>
                     <input
                        type="checkbox"
                        name="availableForTeams"
                        checked={formData.availableForTeams}
                        onChange={handleChange}
                        className='form-checkbox border-2 border-ppurple-500 text-ppurple-500 scale-130 cursor-pointer rounded'
                        disabled={isSubmitting}
                     />
                     <span className='text-gray-700 font-semibold'>
                        Estou disponível para ser contratado por times.
                     </span>
                  </label>
               )}

               <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={onClose} disabled={isSubmitting}
                     className="flex items-center bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400">
                     <FontAwesomeIcon icon={faTimes} className="mr-2" /> Cancelar
                  </button>
                  <button type="submit" disabled={isSubmitting}
                     className="flex items-center bg-ppink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-ppink-900 disabled:opacity-50">
                     <FontAwesomeIcon icon={faSave} className="mr-2" /> {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default EditProfilePopup