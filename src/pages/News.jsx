import NavBar from "../components/PrincipalPages/NavBar"
import ProfileCard from '../components/PrincipalPages/ProfileCard'

function News() {
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
      <NavBar/>

      {/*Principal*/}
      <main className="flex gap-20 pt-30 p-14">
         {/*Barra lateral da esquerda*/}
         <aside className="fixed top-30 left-14 w-55">

            {/*Card Perfil*/}
            <ProfileCard/>

            {/*Categorias*/}
            <div className="bg-white flex flex-col px-2 py-3 mt-15 rounded-2xl border-1">
                <p className="w-full text-center text-lg font-bold">Categorias</p>
                <button className="w-full text-left hover:bg-pgrey-500">Competições</button>
                <button className="w-full text-left hover:bg-pgrey-500">Jogadoras</button>
                <button className="w-full text-left hover:bg-pgrey-500">Clubes e Projetos</button>
                <button className="w-full text-left hover:bg-pgrey-500">Notícias Gerais</button>
            </div>
         </aside>

         {/*Feed de notícias*/}
         <section className="bg-white w-full h-full ml-30">

         </section>
      </main>
    </div>
  )
}

export default News