import React from 'react'
import { Link } from 'react-router-dom'

const PrivacyPolitic = () => {
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
            <h1 className="bg-gray-900/20 text-4xl font-extrabold px-3 py-1 mb-4 text-ppink-500 rounded-sm">Política de Privacidade</h1>
            <p className="mb-8 text-sm">Última atualização: 7 de Novembro de 2025</p>

            <div className="bg-black/40 p-6 rounded-xl shadow-lg space-y-6">

               <section>
                  <h2 className="text-2xl font-bold mb-3">1. Coleta de Informações</h2>
                  <p>Coletamos informações fornecidas diretamente por você durante o cadastro (Nome Completo, E-mail, CPF, Telefone, Tipo de Usuário) e dados gerados pelo uso da Plataforma (interações, visualizações de posts).</p>
               </section>

               <section>
                  <h2 className="text-2xl font-bold mb-3">2. Uso das Informações</h2>
                  <p>Os dados são utilizados para:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                     <li>Verificação de identidade (CPF e Telefone são armazenados de forma segura).</li>
                     <li>Personalização e melhoria dos serviços e funcionalidades da Plataforma.</li>
                     <li>Comunicação sobre atualizações do serviço.</li>
                  </ul>
               </section>

               <section>
                  <h2 className="text-2xl font-bold mb-3">3. Compartilhamento de Dados</h2>
                  <p>Não compartilhamos seus dados pessoais de identificação (como CPF ou número de telefone) com terceiros, exceto quando exigido por lei ou com seu consentimento explícito. Informações públicas (Nome, Tipo de Usuário, Foto) são visíveis para outros usuários da Plataforma.</p>
               </section>

               <section>
                  <h2 className="text-2xl font-bold mb-3">4. Seus Direitos</h2>
                  <p>Você tem o direito de acessar, corrigir e solicitar a exclusão de seus dados pessoais. Para exercer esses direitos, entre em contato através dos canais de suporte.</p>
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

export default PrivacyPolitic