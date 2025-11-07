import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from "../config/apiConfig"

import NavBar from '../components/PrincipalPages/NavBar'
import NewsCard from '../components/PrincipalPages/NewsCard'
import ProfileCard from '../components/PrincipalPages/ProfileCard'

function SearchResults() {
   const [searchParams] = useSearchParams()
   const query = searchParams.get('q')

   const [results, setResults] = useState({ users: [], posts: [] })
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      if (!query) {
         setLoading(false)
         setResults({ users: [], posts: [] })
         return
      }

      const fetchResults = async () => {
         setLoading(true)
         try {
            const response = await axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`)
            setResults(response.data.results)
         } catch (error) {
            console.error('Erro ao buscar resultados:', error)
            setResults({ users: [], posts: [] })
         }
         finally {
            setLoading(false)
         }
      }

      fetchResults()
   }, [query])

   return (
      <div className="relative min-h-screen">
         <NavBar />

         <main className="pt-30 p-4 md:p-14 md:pt-30 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-ppurple-500">
               Resultados da Busca para: "{query}"
            </h1>

            {loading ? (
               <p className="text-lg text-ppurple-500">Buscando...</p>
            ) : (
               <>
                  <h2 className="text-xl font-semibold mt-8 mb-4 text-ppink-500">Perfis ({results.users.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {results.users.length > 0 ? (
                        results.users.map(user => (
                           <Link 
                              to={`/perfil/${user.id}`} 
                              key={user.id} 
                              className="bg-white flex items-center px-4 py-1 border rounded-lg shadow-sm transition-all hover:scale-102">
                                 <img src={user.photo} alt="" className='w-20 h-20 mr-4 rounded-full'/>
                                 <div>
                                    <p className="font-bold text-xl text-ppurple-500 hover:underline">{user.fullName}</p>
                                    <p className="text-sm text-gray-500">{user.userType} - {user.city}</p>
                                 </div>
                           </Link>
                        ))
                     ) : (
                        <p>Nenhum perfil encontrado.</p>
                     )}
                  </div>

                  <h2 className="text-xl font-semibold mt-8 mb-4 text-ppink-500">Notícias ({results.posts.length})</h2>
                  <div className="space-y-4">
                     {results.posts.length > 0 ? (
                        results.posts.map(post => (
                           <NewsCard
                              key={post.id}
                              title={post.title}
                              text={post.text}
                              bannerImg={post.bannerImg}
                              category={post.category}
                              jornalistId={post.authorId}
                              createdAt={post.createdAt}
                              views={post.views}
                              postId={post.id}
                           />
                        ))
                     ) : (
                        <p>Nenhuma notícia encontrada.</p>
                     )}
                  </div>
               </>
            )}
         </main>
      </div>
   )
}

export default SearchResults