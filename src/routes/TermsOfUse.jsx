import React from 'react'
import { Link } from 'react-router-dom'

const TermsOfUse = () => {
   const Background = () => (
      <div className="absolute z-[-1] w-full min-h-screen h-full">
         <div className="absolute inset-0 
            bg-linear-to-t from-ppurple-500 to-ppurple-200"></div>
         <div className='absolute inset-0 
            bg-[radial-gradient(ellipse_at_top,#ffffff4d_.1px,transparent_1px)] bg-size-[14px_14px]'></div>
      </div>
   )

   return (
      <div className="relative min-h-screen">
         <Background />

         <main className="pt-20 p-4 md:p-14 max-w-4xl mx-auto text-white">
            <h1 className="bg-gray-900/20 text-4xl font-extrabold px-3 py-1 mb-4 text-ppink-500 rounded-sm">Termos de Uso</h1>
            <p className="mb-8 text-sm">Última atualização: 7 de Novembro de 2025</p>

            <div className="bg-black/40 p-6 rounded-xl shadow-lg space-y-6">

               <section>
                  <h2 className="text-2xl font-bold mb-3">1. Aceitação dos Termos</h2>
                  <p>Ao acessar e utilizar o serviço **Passa pra Elas**, você concorda em cumprir e ficar vinculado aos presentes Termos de Uso. Caso não concorde com qualquer parte destes termos, você não deve usar a Plataforma.</p>
               </section>

               <section>
                  <h2 className="text-2xl font-bold mb-3">2. Uso do Serviço</h2>
                  <p>O serviço destina-se exclusivamente ao fomento do futebol feminino, permitindo que jogadoras, olheiros, times e jornalistas interajam e publiquem conteúdo relevante. Você concorda em utilizar a Plataforma apenas para fins lícitos e de maneira que não infrinja os direitos de terceiros.</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                     <li>Proibida a publicação de conteúdo ofensivo, discriminatório ou ilegal.</li>
                     <li>A precisão das informações de perfil é de responsabilidade do usuário.</li>
                  </ul>
               </section>

               <section>
                  <h2 className="text-2xl font-bold mb-3">3. Propriedade Intelectual</h2>
                  <p>O conteúdo publicado na plataforma é de propriedade de seus respectivos autores. Ao publicar conteúdo, você concede à **Passa pra Elas** uma licença não exclusiva para exibi-lo na Plataforma.</p>
               </section>

               <section>
                  <h2 className="text-2xl font-bold mb-3">4. Exclusão de Responsabilidade</h2>
                  <p>Não nos responsabilizamos por negociações ou interações realizadas fora da Plataforma ou por decisões tomadas com base em informações fornecidas por outros usuários.</p>
               </section>

               <div className="pt-4 border-t border-ppink-500">
                  <Link to="/" className="text-ppink-500 hover:text-ppinktr-500 font-semibold">
                     Voltar para a Página Inicial
                  </Link>
               </div>

            </div>
         </main>
      </div>
   )
}

export default TermsOfUse