import { useState } from "react"

import NavBar from "../components/PrincipalPages/NavBar"
import ProfileCard from '../components/PrincipalPages/ProfileCard'
import NewsCard from "../components/PrincipalPages/NewsCard"
import posts from '../posts.json'

function News() {
  const [postFilter, setPostFilter] = useState('all')

  const filteredPosts = posts.filter(post => {
    if (postFilter === 'all') {
      return true
    }
    return post.category === postFilter
  })

  return (
    <div id="container" className="relative min-h-screen">
      {/*Background*/}
      <div className="absolute z-[-1] w-full min-h-screen h-full">
        <div className="absolute inset-0 
            bg-linear-to-t from-ppink-500 to-ppinktr-500"></div>
        <div className='absolute inset-0 
            bg-[radial-gradient(ellipse_at_top,_#ffffff4d_.1px,transparent_1px)] bg-[size:14px_14px]'></div>
      </div>

      {/*Navegação*/}
      <NavBar />

      {/*Principal*/}
      <main className="flex gap-20 pt-30 p-14">
        {/*Barra lateral da esquerda*/}
        <aside className="fixed top-30 left-14 w-55">

          {/*Card Perfil*/}
          <ProfileCard />

          {/*Categorias*/}
          <div className="bg-white flex flex-col px-2 py-3 mt-8 rounded-2xl border-1">
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
        <section className="w-full h-full ml-80">
          {filteredPosts.map(post =>
            <NewsCard key={post.id} title={post.title} text={post.text} bannerImg={post.postBanner} category={post.category} jornalistId={4} />
          )}
        </section>
      </main>
    </div>
  )
}

export default News