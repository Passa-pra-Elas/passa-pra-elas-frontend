import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { ArrowTurnUpLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

function RegisterCard({ cardArg = 'cadastro-1' }) {
   const [card, setCard] = useState(cardArg)
   const navigate = useNavigate()

   function CardCadastro1() {
      const [fullName, setFullName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')
      const [error, setError] = useState('')

      function HandleSubmit() {
         if (!fullName || !email || !password || !confirmPassword) {
            setError('Campos não preenchidos!')
            return
         }

         setError('')
         setCard('cadastro-2')
      }

      return (
         <div className='bg-black/45 w-sm text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Cadastro</h2>
   
            {/*Inputs*/}
            <div className='space-y-3'>
                  <input type="text" placeholder='Nome completo' value={fullName}
                     onChange={e=>setFullName(e.target.value)}
                     className='bg-white placeholder-ppinktr-500 text-black w-full px-2.5 py-1 rounded-xl
                     focus:outline-ppink-500'/>
                  <input type="text" placeholder='Email' value={email}
                     onChange={e=>setEmail(e.target.value)}
                     className='bg-white placeholder-ppinktr-500 text-black w-full px-2.5 py-1 rounded-xl 
                     focus:outline-ppink-500'/>
                  <input type="password" placeholder='Senha' value={password}
                     onChange={e=>setPassword(e.target.value)}
                     className='bg-white placeholder-ppinktr-500 text-black w-full px-2.5 py-1 rounded-xl
                     focus:outline-ppink-500'/>
                  <input type="password" placeholder='Confirmar senha' value={confirmPassword}
                     onChange={e=>setConfirmPassword(e.target.value)}
                     className='bg-white placeholder-ppinktr-500 text-black w-full px-2.5 py-1 rounded-xl
                     focus:outline-ppink-500'/>
            </div>
   
            {/*Botão entrar*/}
            <button
               onClick={HandleSubmit} 
               className='w-full bg-ppurple-500 text-3xl font-extrabold mt-7 p-1 rounded-xl cursor-pointer
               transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                  AVANÇAR
            </button>

            {/*Texto informátivo*/}
            <p className='text-ppink-500 w-full text-left text-sm mt-1'>{error}</p>

            {/*Outros meios de login*/}	
            <div className='w-full flex flex-col items-center mt-3 pt-2 border-t-[1.5px] border-white'>
                  <p>Ou cadastre-se usando:</p>
                  <div className='flex gap-5 mt-1'>
                     <FontAwesomeIcon icon={faGoogle} className='text-ppink-500 scale-150 cursor-pointer'/>
                     <FontAwesomeIcon icon={faFacebook} className='text-ppink-500 scale-150 cursor-pointer'/>
                  </div>
            </div>
   
            {/*Botão ir para cadastro*/}
            <div className='text-center mt-3'>
               <p className='text-sm'>Não tem uma conta?</p>
               <Link to='/cadastro' 
               className='text-ppink-500
               transition-all hover:scale-105 hover:font-bold'>Login</Link>
            </div>
         </div>
      )
   }

   function CardCadastro2() {
      const [cpf, setCpf] = useState('')
      const [phoneNumber, setPhoneNumber] = useState('')
      const [isTermAccepted, setIsTermAccepted] = useState(false)
      const [error, setError] = useState('')

      function HandleSubmit() {
         if (!cpf || !phoneNumber) {
            setError('Campos não preenchidos!')
            return
         }
         if (isTermAccepted === false) {
            setError('Você precisa aceitar os termos de uso e de privacidade')
            return
         }

         setError('')
         setCard('cadastro-3')
      }

      return (
         <div className='bg-black/45 w-sm text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Login</h2>
   
            {/*Inputs*/}
            <div className='space-y-4'>
               <input type="text" placeholder='CPF' value={cpf}
                  onChange={e=>setCpf(e.target.value)}
                  className='bg-white placeholder-ppinktr-500 text-black w-full px-2.5 py-1 rounded-xl 
                  focus:outline-ppink-500'/>
               <input type="password" placeholder='Número de telefone' value={phoneNumber}
                  onChange={e=>setPhoneNumber(e.target.value)}
                  className='bg-white placeholder-ppinktr-500 text-black w-full px-2.5 py-1 rounded-xl
                  focus:outline-ppink-500'/>
            </div>
   
            {/*Botões adicionais*/}
            <label className='flex items-center space-x-2 mt-6' onClick={e=>setIsTermAccepted(true)}>
               <input type="checkbox" className='form-checkbox border-none scale-130 cursor-pointer'/>
               <span className='text-xs'>
                  Li e aceito os <Link to='/termos' className='text-ppink-500'>termos de uso</Link> e <Link to='/termos' className='text-ppink-500'>termos de privacidade</Link>.
                  </span>
            </label>
   
            {/*Botão voltar/avançar*/}
            <div className='w-full flex gap-2 mt-4'>
               <button
                  onClick={e=>{ setCard('cadastro-1')}} 
                  className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                     <ArrowTurnUpLeftIcon className='w-6 h-6'/>
               </button>
               <button
                  onClick={HandleSubmit} 
                  className='w-full bg-ppurple-500 text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                     ENTRAR
               </button>
            </div>

            {/*Texto informátivo*/}
            <p className='text-ppink-500 w-full text-left text-sm mt-1'>{error}</p>

            {/*Outros meios de cadastro*/}	
            <div className='w-full flex flex-col items-center mt-6 mb-4 pt-2 border-t-[1.5px] border-white'>
                  <p>Ou entre usando:</p>
                  <div className='flex gap-5 mt-3'>
                     <FontAwesomeIcon icon={faGoogle} className='text-ppink-500 scale-150 cursor-pointer'/>
                     <FontAwesomeIcon icon={faFacebook} className='text-ppink-500 scale-150 cursor-pointer'/>
                  </div>
            </div>
   
            {/*Botão ir para cadastro*/}
            <div className='text-center mt-5'>
               <p className='text-sm'>Não tem uma conta?</p>
               <Link to='/cadastro' 
               className='text-ppink-500
               transition-all hover:scale-105 hover:font-bold'>Cadastrar-se</Link>
            </div>
         </div>
      )
   }

   function CardCadastro3() {
      const [userType, setUserType] = useState('')
      const [error, setError] = useState('')

      function SelectUserType(type, e) {
         setUserType(type)

         jogadora: type === 'jogadora' ? 'bg-green-500 text-white' : 'text-ppink-500 hover:text-ppink-900'
      }

      function HandleSubmit() {
         if (!userType) {
            setError('Selecione um tipo de conta primeiro!')
            return
         }

         setError('')
         switch (userType) {
            case 'jogadora':
               setCard('cadastro-4')
               break
            case 'olheiro':
               setCard('cadastro-4')
               break
            case 'time':
               setCard('cadastro-time')
               break
            case 'jornalista':
               setCard('cadastro-jornalista')
               break
         }
      }

      return (
         <div className='bg-black/45 w-sm text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Quem você é?</h2>
            
            {/*Botões*/}
            <div className='space-y-3 w-full'>
               <button
                  onClick={e=>SelectUserType('jogadora')}
                  className={`text-left font-semibold w-full px-2 py-1 border-3 rounded-xl cursor-pointer]
                     transition-all
                     ${userType === 'jogadora' ? 'text-pgreen-500' : 'text-ppink-500 hover:text-ppink-900'}`}>
                     Jogadora
               </button>
               <button
                  onClick={e=>SelectUserType('olheiro')}
                  className={`text-left font-semibold w-full px-2 py-1 border-3 rounded-xl cursor-pointer]
                     transition-all
                     ${userType === 'olheiro' ? 'text-pgreen-500' : 'text-ppink-500 hover:text-ppink-900'}`}>
                     Olheiro
               </button>
               <button
                  onClick={e=>SelectUserType('time')}
                  className={`text-left font-semibold w-full px-2 py-1 border-3 rounded-xl cursor-pointer]
                     transition-all
                     ${userType === 'time' ? 'text-pgreen-500' : 'text-ppink-500 hover:text-ppink-900'}`}>
                     Time
               </button>
               <button
                  onClick={e=>SelectUserType('jornalista')}
                  className={`text-left font-semibold w-full px-2 py-1 border-3 rounded-xl cursor-pointer]
                     transition-all
                     ${userType === 'jornalista' ? 'text-pgreen-500' : 'text-ppink-500 hover:text-ppink-900'}`}>
                     Jornalista
               </button>
            </div>

            {/*Botão voltar/avançar*/}
            <div className='w-full flex gap-2 mt-4'>
               <button
                  onClick={e=>{ setCard('cadastro-1')}} 
                  className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                     <ArrowTurnUpLeftIcon className='w-6 h-6'/>
               </button>
               <button
                  onClick={HandleSubmit}
                  className='w-full bg-ppurple-500 text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                     ENTRAR
               </button>
            </div>

            {/*Texto informátivo*/}
            <p className='text-ppink-500 w-full text-left text-sm mt-1'>{error}</p>
         </div>
      )
   }

   function CardCadastro4() {
      return (
         <div className='bg-black/45 max-w-sm min-h-100 text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl text-center font-extrabold mb-6 text-shadow-md'>Conta registrada!</h2>

            <CheckCircleIcon className='text-ppink-500 h-30'/>

            <p className='text-ppink-500 text-sm mt-5'>Faça login com sua nova senha</p>

            {/*Botão entrar*/}
            <Link
               to='/login'
               className='w-full bg-ppurple-500 text-3xl text-center font-extrabold mt-4 p-1 rounded-xl cursor-pointer
               transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                  LOGIN
            </Link>
         </div>
      )
   }

   function CardTime() {
      const [cbf, setCbf] = useState('')
      const [error, setError] = useState('')

      function HandleSubmit() {
         if (!cbf) {
            setError('Campos não preenchidos!')
            return
         }

         setError('')
         setCard('cadastro-4')
      }

      return (
         <div className='bg-black/45 w-sm min-h-100 text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Cadastro</h2>
   
            {/*Inputs*/}
            <div className='w-full space-y-4'>
               <input type="text" placeholder='Código da CBF' value={cbf}
                  onChange={e=>setCbf(e.target.value)}
                  className='bg-white placeholder-ppinktr-500 text-black w-full px-2.5 py-1 rounded-xl 
                  focus:outline-ppink-500'/>
            </div>
   
            {/*Botão voltar/avançar*/}
            <div className='w-full flex gap-2 mt-4'>
               <button
                  onClick={e=>{ setCard('cadastro-3')}} 
                  className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                     <ArrowTurnUpLeftIcon className='w-6 h-6'/>
               </button>
               <button
                  onClick={HandleSubmit} 
                  className='w-full bg-ppurple-500 text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                     TERMINAR
               </button>
            </div>

            {/*Texto informátivo*/}
            <p className='text-ppink-500 w-full text-left text-sm mt-1'>{error}</p>
         </div>
      )
   }

   function CardTime() {
      const [timeCode, setTimeCode] = useState('')
      const [error, setError] = useState('')

      function HandleSubmit() {
         if (!timeCOde) {
            setError('Campos não preenchidos!')
            return
         }

         setError('')
         setCard('cadastro-4')
      }

      return (
         <div className='bg-black/45 w-sm min-h-100 text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Cadastro</h2>
   
            {/*Inputs*/}
            <div className='w-full space-y-4'>
               <input type="text" placeholder='Código da CBF' value={timeCode}
                  onChange={e=>setTimeCode(e.target.value)}
                  className='bg-white placeholder-ppinktr-500 text-black w-full px-2.5 py-1 rounded-xl 
                  focus:outline-ppink-500'/>
            </div>
   
            {/*Botão voltar/avançar*/}
            <div className='w-full flex gap-2 mt-4'>
               <button
                  onClick={e=>{ setCard('cadastro-3')}} 
                  className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                     <ArrowTurnUpLeftIcon className='w-6 h-6'/>
               </button>
               <button
                  onClick={HandleSubmit} 
                  className='w-full bg-ppurple-500 text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                     TERMINAR
               </button>
            </div>

            {/*Texto informátivo*/}
            <p className='text-ppink-500 w-full text-left text-sm mt-1'>{error}</p>
         </div>
      )
   }

   switch (card) {
      case 'cadastro-1':
         return <CardCadastro1/>
      case 'cadastro-2':
         return <CardCadastro2/>
      case 'cadastro-3':
         return <CardCadastro3/>
      case 'cadastro-4':
         return <CardCadastro4/>
      case'cadastro-time':
         return <CardTime/>
      case 'cadastro-jornalista':
         return <CardJornalista/>
   }
}

export default RegisterCard
