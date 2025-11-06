import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config/apiConfig'
import useAuth from '../hooks/authHooks'
import NavBar from '../components/PrincipalPages/NavBar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faEye, faClock } from '@fortawesome/free-solid-svg-icons'

const PostDetail = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const { user, loading: authLoading } = useAuth()

   const [post, setPost] = useState(null)
   const [jornalist, setJornalist] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [isDeleting, setIsDeleting] = useState(false)

   useEffect(() => {
      const fetchPost = async () => {
         try {
            const postResponse = await axios.get(`${API_URL}/posts/${id}`)
            const fetchedPost = postResponse.data.post
            setPost(fetchedPost)

            if (fetchedPost.authorId) {
               const authorResponse = await axios.get(`${API_URL}/users/${fetchedPost.authorId}`)
               setJornalist(authorResponse.data.publicUser)
            }
         }
         catch (error) {
               setError('Não foi possível carregar a notícia. ID inválido ou post excluído.', error)
            }
            finally {
               setLoading(false)
            }
         }

      if (id) {
         fetchPost()
      }
      else {
         setLoading(false)
         setError('ID do post não fornecido.')
      }
   }, [])

   const handleDelete = async () => {
      if (!window.confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.')) {
         return
      }

      setIsDeleting(true);
      try {
         const token = localStorage.getItem('token')
         await axios.delete(`${API_URL}/posts/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });

         navigate('/noticias');
      }
      catch (error) {
         console.error("Erro ao deletar:", error.response || error)
         setIsDeleting(false);
         setError(error.response?.data?.message || 'Falha ao excluir. Você é o autor?')
      }
   }

   if (loading || authLoading) {
      return <div className="p-20 text-center font-bold">Carregando notícia...</div>
   }
   if (error) {
      return <div className="p-20 text-center text-red-500 font-bold">{error}</div>
   }
   if (!post) {
      return <div className="p-20 text-center text-red-500 font-bold">Notícia não encontrada.</div>
   }

   const isAuthor = user && (user.id === post.authorId)
   const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR')

   return (
      <div className='relative min-h-screen'>
         <div className="absolute z-[-1] w-full min-h-screen h-full">
            <div className="absolute inset-0 
            bg-linear-to-t from-ppink-500 to-ppink-500"></div>
            <div className='absolute inset-0 
            bg-[radial-gradient(ellipse_at_top,#ffffff4d_.1px,transparent_1px)] bg-size-[14px_14px]'></div>
         </div>
         <NavBar />
         <main className="pt-30 p-4 md:p-14 md:pt-30">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
               {isAuthor && (
                  <div className="flex justify-end space-x-3 mb-4">
                     <button
                        className="flex items-center text-gray-600 font-semibold transition-all hover:text-gray-800 hover:scale-105"
                        onClick={() => alert('Funcionalidade de Edição em construção!')}
                        disabled={isDeleting}
                     >
                        <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                        Editar
                     </button>
                     <button
                        className="flex items-center text-red-600 font-semibold transition-all hover:text-red-800 hover:scale-105"
                        onClick={handleDelete}
                        disabled={isDeleting}
                     >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        {isDeleting ? 'Excluindo...' : 'Excluir Notícia'}
                     </button>
                  </div>
               )}

               <h1 className="text-4xl font-extrabold text-ppurple-500 mb-4">{post.title}</h1>

               <div className=''>
                  <Link to={`../perfil/${jornalist.id}`} className='flex items-center gap-2'>
                     <img src={jornalist.photo} alt="user image"
                        style={{ height: '2rem', width: '2rem' }}
                        className={`rounded-full`} />
                     <p className='text-ppink-900 text-lg font-semibold'>{jornalist.fullName}</p>
                  </Link>
               </div>
               <div className="flex items-center text-gray-500 text-sm mb-6 mt-2 space-x-4 border-b pb-4">
                  <span className="flex items-center text-ppink-500">
                     <FontAwesomeIcon icon={faClock} className="mr-1" /> Publicado em {formattedDate}
                  </span>
                  <span className="flex items-center text-ppink-500">
                     <FontAwesomeIcon icon={faEye} className="mr-1" /> {post.views} visualizações
                  </span>
               </div>

               {post.bannerImg && (
                  <img
                     src={post.bannerImg}
                     alt={post.title}
                     className="w-full h-auto max-h-96 object-cover rounded-lg mb-6 shadow-md"
                  />
               )}

               {/* Conteúdo */}
               <p className="text-gray-800 text-lg whitespace-pre-wrap">{post.text}</p>

               <p className="mt-8 text-sm text-gray-600">Categoria: <span className="text-ppink-500 font-semibold capitalize">{post.category}</span></p>
            </div>
         </main>
      </div>
   )
}

export default PostDetail