import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios'
import useAuth from '../hooks/authHooks'
import { API_URL } from "../config/apiConfig";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import NavBar from "../components/PrincipalPages/NavBar"
import ProfileCard from '../components/PrincipalPages/ProfileCard'
import NewsCard from "../components/PrincipalPages/NewsCard"

function News() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate();

  const [postFilter, setPostFilter] = useState('all')
  const [allPosts, setAllPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  const isJornalist = user && user.userType === 'jornalista';

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true)
      try {
        const response = await axios.get(`${API_URL}/posts`)
        setAllPosts(response.data.posts.reverse() || [])
      }
      catch (error) {
        console.error('Erro ao buscar posts: ', error)
        setAllPosts([])
      }
      finally {
        setLoadingPosts(false)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = allPosts.filter(post => {
    if (postFilter === 'all') {
      return true
    }
    return post.category === postFilter
  })

  if (loadingPosts || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-ppurple-500 font-bold">
        Carregando Feed...
      </div>
    );
  }

  return (
    <div id="container" className="relative min-h-screen">
      {/*Background*/}
      <div className="absolute z-[-1] w-full min-h-screen h-full">
        <div className="absolute inset-0 
            bg-linear-to-t from-ppink-500 to-ppinktr-500"></div>
        <div className='absolute inset-0 
            bg-[radial-gradient(ellipse_at_top,#ffffff4d_.1px,transparent_1px)] bg-size-[14px_14px]'></div>
      </div>

      {/*Navegação*/}
      <NavBar />

      {/*Principal*/}
      <main className="flex flex-col md:flex-row gap-4 md:gap-20 pt-30 p-4 md:p-14 md:pt-30">
        {/*Barra lateral da esquerda*/}
        <aside className="w-full md:w-55 md:fixed md:top-31 md:left-14">

          {/*Card Perfil*/}
          <ProfileCard />

          {/*Categorias*/}
          <div className="bg-white flex flex-col px-2 py-3 mt-8 rounded-2xl border">
            <p className="w-full text-center text-lg font-bold">Categorias</p>
            <button
              onClick={() => setPostFilter('all')}
              className={`w-full text-left p-1 my-0.5 ${postFilter === 'all' ? 'bg-pgrey-500' : 'hover:bg-pgrey-500'}`}>Todos</button>
            <button
              onClick={() => setPostFilter('competições')}
              className={`w-full text-left p-1 my-0.5 ${postFilter === 'competições' ? 'bg-pgrey-500' : 'hover:bg-pgrey-500'}`}>Competições</button>
            <button
              onClick={() => setPostFilter('jogadoras')}
              className={`w-full text-left p-1 my-0.5 ${postFilter === 'jogadoras' ? 'bg-pgrey-500' : 'hover:bg-pgrey-500'}`}>Jogadoras</button>
            <button
              onClick={() => setPostFilter('clubes e projetos')}
              className={`w-full text-left p-1 my-0.5 ${postFilter === 'clubes e projetos' ? 'bg-pgrey-500' : 'hover:bg-pgrey-500'}`}>Clubes e Projetos</button>
            <button
              onClick={() => setPostFilter('notícias gerais')}
              className={`w-full text-left p-1 my-0.5 ${postFilter === 'notícias gerais' ? 'bg-pgrey-500' : 'hover:bg-pgrey-500'}`}>Notícias Gerais</button>
          </div>
        </aside>

        {/*Feed de notícias*/}
        <div className="w-full h-full md:ml-80">
          {isJornalist && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => navigate('/noticias/create')}
                className="bg-ppink-500 text-lg px-4 py-1 border rounded-lg transition-all hover:scale-105 cursor-pointer">
                <FontAwesomeIcon icon={faPlus} className='w-4 h-4'/>
                Nova publicação
              </button>
            </div>
          )}
          <section className="w-full h-full">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post =>
                <NewsCard
                  key={post.id}
                  title={post.title}
                  text={post.text}
                  bannerImg={post.bannerImg}
                  category={post.category}
                  jornalistId={post.authorId}
                  createdAt={post.createdAt}
                  views={post.views}
                  postId={post.id} />
              )
            ) : (
              <p className="text-white font-semibold mt-8">Nenhuma notícia encontrada para esta categoria.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default News
