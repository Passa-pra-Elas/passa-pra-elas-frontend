import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config/apiConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons'

import useAuth from '../hooks/authHooks'
import NavBar from '../components/PrincipalPages/NavBar'

const CreatePost = () => {
   const { user, loading: authLoading } = useAuth()
   const navigate = useNavigate()

   const [title, setTitle] = useState('');
   const [text, setText] = useState('');
   const [bannerImg, setBannerImg] = useState('');
   const [category, setCategory] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState('');

   if (authLoading) {
      return <div className="p-20 text-center">Carregando...</div>;
   }

   if (!user || user.userType !== 'jornalista') {
      setTimeout(() => navigate('/noticias'), 50);
      return <div className="p-20 text-center text-red-500">Acesso negado. Redirecionando...</div>;
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      setIsSubmitting(true);
      setError('');

      if (!title || !text || !category) {
         setError('Todos os campos obrigatórios devem ser preenchidos!');
         setIsSubmitting(false);
         return;
      }

      try {
         const token = localStorage.getItem('token');
         const newPost = { title, text, bannerImg, category };

         const response = await axios.post(`${API_URL}/posts`, newPost, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         //${response.data.post.id}
         navigate(`/noticias/`)

      } 
      catch (error) {
         console.error("Erro ao criar post:", error.response || error)
         setError(error.response?.data?.message || 'Erro ao criar postagem. Tente novamente.')
      } 
      finally {
         setIsSubmitting(false)
      }
   }

   return (
      <div className='relative min-h-screen'>
         <div className="absolute z-[-1] w-full min-h-screen h-full">
            <div className="absolute inset-0 
            bg-linear-to-t from-ppink-500 to-ppink-500"></div>
            <div className='absolute inset-0 
            bg-[radial-gradient(ellipse_at_top,#ffffff4d_.1px,transparent_1px)] bg-size-[14px_14px]'></div>
         </div>
         <NavBar />
         <main className="pt-30 p-1 md:p-14 md:pt-30">
            <div className="max-w-4xl mx-auto bg-white p-6 border rounded-xl shadow-2xl">
               <h1 className="text-3xl font-bold text-ppurple-500 mb-6">Criar Nova Publicação</h1>

               {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                     {error}
                  </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                     <label className="block text-gray-700 font-semibold mb-2">Título (Obrigatório)</label>
                     <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ppurple-500"
                        placeholder="Título chamativo da sua notícia"
                        disabled={isSubmitting}
                     />
                  </div>
                  <div>
                     <label className="block text-gray-700 font-semibold mb-2">Conteúdo (Obrigatório)</label>
                     <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="8"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ppurple-500"
                        placeholder="Escreva aqui o corpo da notícia."
                        disabled={isSubmitting}
                     />
                  </div>
                  <div>
                     <label className="block text-gray-700 font-semibold mb-2">URL da Imagem Banner (Opcional)</label>
                     <input
                        type="url"
                        value={bannerImg}
                        onChange={(e) => setBannerImg(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ppurple-500"
                        placeholder="https://exemplo.com/sua-imagem.jpg"
                        disabled={isSubmitting}
                     />
                  </div>
                  <div>
                     <label className="block text-gray-700 font-semibold mb-2">Categoria (Obrigatório)</label>
                     <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ppurple-500"
                        disabled={isSubmitting}
                     >
                        <option value="" disabled selected>Selecione a Categoria</option>
                        <option value="competições">Competições</option>
                        <option value="jogadoras">Jogadoras</option>
                        <option value="clubes e projetos">Clubes e Projetos</option>
                        <option value="notícias gerais">Notícias Gerais</option>
                     </select>
                  </div>
                  <div className="flex justify-end space-x-4">
                     <button
                        type="button"
                        onClick={() => navigate('/noticias')}
                        className="flex items-center bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all hover:bg-gray-400"
                        disabled={isSubmitting}
                     >
                        <FontAwesomeIcon icon={faTimes} className='mr-2' />
                        Cancelar
                     </button>
                     <button
                        type="submit"
                        className="flex items-center bg-ppurple-500 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:bg-ppurple-900 disabled:opacity-50"
                        disabled={isSubmitting}
                     >
                        <FontAwesomeIcon icon={faPaperPlane} className='mr-2' />
                        {isSubmitting ? 'Publicando...' : 'Publicar Notícia'}
                     </button>
                  </div>
               </form>
            </div>
         </main>
      </div>
   )
}

export default CreatePost