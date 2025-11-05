import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { ArrowTurnUpLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const API_URL = 'http://localhost:5001'

function RegisterCard({ cardArg = 'cadastro-1' }) {
   const [card, setCard] = useState(cardArg)
   const [error, setError] = useState('')
   const navigate = useNavigate()

   const [fullName, setFullName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [cpf, setCpf] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [isTermAccepted, setIsTermAccepted] = useState(false)
   const [userType, setUserType] = useState('')
   const [cbf, setCbf] = useState('')
   const [timeCode, setTimeCode] = useState('')

   const [nextCard, setNextCard] = useState('')

   function HandleSubmit(params, nextCard) {
      const emailTemplate = /^[\w.-]+@[\w-]+\.[A-Za-z]{2,6}$/
      const cpfTemplate = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/
      const phoneNumberTemplate = /^\d{10,11}$/
      if (params.includes(email)) {
         if (!emailTemplate.test(email)) {
            setError('Insira um endereço de email válido!')
            return
         }
      }
      if (params.includes(cpf)) {
         if (!cpfTemplate.test(cpf)) {
            setError('Insira um cpf válido!')
            return
         }
      }
      if (params.includes(phoneNumber)) {
         setPhoneNumber(phoneNumber.replace(/[()\s-]/g, ''))
         if (!phoneNumberTemplate.test(phoneNumber)) {
            setError('Insira um número de telefone válido!')
            return
         }
      }


      if (params.includes(password) && params.includes(confirmPassword)) {
         if (password != confirmPassword) {
            setError('As senhas não se coincidem!')
            return
         }
      }

      if (params.includes(isTermAccepted)) {
         if (isTermAccepted === false) {
            setError('Você precisa aceitar os termos de uso e de privacidade!')
            return
         }
      }

      if (nextCard == 'cadastro-4') {
         setError('')
         HandleRegister()
         return
      }

      for (const param of params) {
         if (!param) {
            setError('Campos não preenchidos!')
            return
         }
      }

      setError('')
      setCard(nextCard)
   }

   const HandleRegister = async (e) => {
      try {
         const response = await axios.post(`${API_URL}/register`, { fullName, email, password, confirmPassword, cpf, phoneNumber, userType })
         setError(response.data.message)
         setCard('cadastro-4');
      }
      catch (error) {
         setError(error.response.data.message || 'Erro ao registrar usuário.')
      }
   }

   switch (card) {
      case 'cadastro-1':
         return CardCadastro1()
      case 'cadastro-2':
         return CardCadastro2()
      case 'cadastro-3':
         return CardCadastro3()
      case 'cadastro-4':
         return CardCadastro4()
      case 'cadastro-time':
         return CardTime()
      case 'cadastro-jornalista':
         return CardJornalista()
   }

   function CardCadastro1() {
      return (
         <div className='bg-black/45 w-sm text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Cadastro</h2>

            {/*Inputs*/}
            <div className='w-full space-y-5'>
               <div className='bg-white w-full flex items-center rounded-xl shadow-md'>
                  <input type="text" placeholder='' value={fullName}
                     onChange={e => setFullName(e.target.value)}
                     className='peer text-black w-full px-2.5 py-1 rounded-xl z-1
                        focus:outline-none'/>
                  <label
                     className='absolute bg-white text-ppinktr-500 ml-2 px-2 rounded-lg z-0 
                           transition-all duration-200 ease-out
                           peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-ppink-500
                           peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm'>
                     Nome Completo
                  </label>
               </div>
               <div className='bg-white w-full flex items-center rounded-xl shadow-md'>
                  <input type="email" placeholder='' value={email}
                     onChange={e => setEmail(e.target.value)}
                     className='peer text-black w-full px-2.5 py-1 rounded-xl z-1
                        focus:outline-none'/>
                  <label
                     className='absolute bg-white text-ppinktr-500 ml-2 px-2 rounded-lg z-0 
                           transition-all duration-200 ease-out
                           peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-ppink-500
                           peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm'>
                     Email
                  </label>
               </div>
               <div className='bg-white w-full flex items-center rounded-xl shadow-md'>
                  <input type="password" placeholder='' value={password}
                     onChange={e => setPassword(e.target.value)}
                     className='peer text-black w-full px-2.5 py-1 rounded-xl z-1
                        focus:outline-none'/>
                  <label
                     className='absolute bg-white text-ppinktr-500 ml-2 px-2 rounded-lg z-0 
                           transition-all duration-200 ease-out
                           peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-ppink-500
                           peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm'>
                     Password
                  </label>
               </div>
               <div className='bg-white w-full flex items-center rounded-xl shadow-md'>
                  <input type="password" placeholder='' value={confirmPassword}
                     onChange={e => setConfirmPassword(e.target.value)}
                     className='peer text-black w-full px-2.5 py-1 rounded-xl z-1
                        focus:outline-none'/>
                  <label
                     className='absolute bg-white text-ppinktr-500 ml-2 px-2 rounded-lg z-0 
                           transition-all duration-200 ease-out
                           peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-ppink-500
                           peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm'>
                     Confirmar Senha
                  </label>
               </div>
            </div>

            {/*Botão entrar*/}
            <button
               onClick={() => HandleSubmit([fullName, email, password, confirmPassword], 'cadastro-2')}
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
                  <FontAwesomeIcon icon={faGoogle} className='text-ppink-500 scale-150 cursor-pointer' />
                  <FontAwesomeIcon icon={faFacebook} className='text-ppink-500 scale-150 cursor-pointer' />
               </div>
            </div>

            {/*Botão ir para cadastro*/}
            <div className='text-center mt-3'>
               <p className='text-sm'>Já tem uma conta?</p>
               <Link to='/login'
                  className='text-ppink-500
               transition-all hover:scale-105 hover:font-bold'>Login</Link>
            </div>
         </div>
      )
   }

   function CardCadastro2() {
      return (
         <div className='bg-black/45 w-sm text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Cadastro</h2>

            {/*Inputs*/}
            <div className='w-full space-y-5'>
               <div className='bg-white w-full flex items-center rounded-xl shadow-md'>
                  <input type="text" placeholder='' value={cpf}
                     onChange={e => setCpf(e.target.value)}
                     className='peer text-black w-full px-2.5 py-1 rounded-xl z-1
                     focus:outline-none'/>
                  <label
                     className='absolute bg-white text-ppinktr-500 ml-2 px-2 rounded-lg z-0 
                        transition-all duration-200 ease-out
                        peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-ppink-500
                        peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm'>
                     CPF
                  </label>
               </div>
               <div className='bg-white w-full flex items-center rounded-xl shadow-md'>
                  <input type="text" placeholder='' value={phoneNumber}
                     onChange={e => setPhoneNumber(e.target.value)}
                     className='peer text-black w-full px-2.5 py-1 rounded-xl z-1
                     focus:outline-none'/>
                  <label
                     className='absolute bg-white text-ppinktr-500 ml-2 px-2 rounded-lg z-0 
                        transition-all duration-200 ease-out
                        peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-ppink-500
                        peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm'>
                     Número de telefone
                  </label>
               </div>
            </div>

            {/*Botões adicionais*/}
            <label className='flex items-center space-x-2 mt-6'>
               <input
                  type="checkbox"
                  className='form-checkbox border-none scale-130 cursor-pointer'
                  checked={isTermAccepted}
                  onChange={(e) => setIsTermAccepted(e.target.checked)}
               />
               <span className='text-xs'>
                  Li e aceito os <Link to='/termos' className='text-ppink-500'>termos de uso</Link> e <Link to='/termos' className='text-ppink-500'>termos de privacidade</Link>.
               </span>
            </label>

            {/*Botão voltar/avançar*/}
            <div className='w-full flex gap-2 mt-4'>
               <button
                  onClick={e => { setCard('cadastro-1') }}
                  className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                  <ArrowTurnUpLeftIcon className='w-6 h-6' />
               </button>
               <button
                  onClick={() => HandleSubmit([cpf, phoneNumber, isTermAccepted], 'cadastro-3')}
                  className='w-full bg-ppurple-500 text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                  AVANÇAR
               </button>
            </div>

            {/*Texto informátivo*/}
            <p className='text-ppink-500 w-full text-left text-sm mt-1'>{error}</p>

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
      function SelectUserType(type, e) {
         setUserType(type)

         // Lógica CORRETA para definir o nextCard
         if (type === 'time') {
            setNextCard('cadastro-time')
         }
         else if (type === 'jornalista') {
            setNextCard('cadastro-jornalista')
         }
         else {
            setNextCard('cadastro-4')
         }
      }

      return (
         <div className='bg-black/45 w-sm text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Quem você é?</h2>

            {/*Botões*/}
            <div className='space-y-3 w-full'>
               <button
                  onClick={() => { SelectUserType('jogadora'); setNextCard('cadastro-4') }}
                  className={`text-left font-semibold w-full px-2 py-1 border-3 rounded-xl cursor-pointer]
                     transition-all
                     ${userType === 'jogadora' ? 'text-pgreen-500' : 'text-ppink-500 hover:text-ppink-900'}`}>
                  Jogadora
               </button>
               <button
                  onClick={() => { SelectUserType('olheiro'); setNextCard('cadastro-4') }}
                  className={`text-left font-semibold w-full px-2 py-1 border-3 rounded-xl cursor-pointer]
                     transition-all
                     ${userType === 'olheiro' ? 'text-pgreen-500' : 'text-ppink-500 hover:text-ppink-900'}`}>
                  Olheiro
               </button>
               <button
                  onClick={() => { SelectUserType('time'); setNextCard('cadastro-time') }}
                  className={`text-left font-semibold w-full px-2 py-1 border-3 rounded-xl cursor-pointer]
                     transition-all
                     ${userType === 'time' ? 'text-pgreen-500' : 'text-ppink-500 hover:text-ppink-900'}`}>
                  Time
               </button>
               <button
                  onClick={() => { SelectUserType('jornalista'); setNextCard('cadastro-jornalista') }}
                  className={`text-left font-semibold w-full px-2 py-1 border-3 rounded-xl cursor-pointer]
                     transition-all
                     ${userType === 'jornalista' ? 'text-pgreen-500' : 'text-ppink-500 hover:text-ppink-900'}`}>
                  Jornalista
               </button>
            </div>

            {/*Botão voltar/avançar*/}
            <div className='w-full flex gap-2 mt-4'>
               <button
                  onClick={e => { setCard('cadastro-2') }}
                  className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                  <ArrowTurnUpLeftIcon className='w-6 h-6' />
               </button>
               <button
                  onClick={() => HandleSubmit([userType], nextCard)}
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

            <CheckCircleIcon className='text-ppink-500 h-30' />

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
      return (
         <div className='bg-black/45 w-sm min-h-100 text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Cadastro</h2>

            {/*Inputs*/}
            <div className='w-full space-y-4'>
               <div className='bg-white w-full flex items-center rounded-xl shadow-md'>
                  <input type="text" placeholder='' value={cbf}
                     onChange={e => setCbf(e.target.value)}
                     className='peer text-black w-full px-2.5 py-1 rounded-xl z-1
                     focus:outline-none'/>
                  <label
                     className='absolute bg-white text-ppinktr-500 ml-2 px-2 rounded-lg z-0 
                        transition-all duration-200 ease-out
                        peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-ppink-500
                        peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm'>
                     Código da CBF
                  </label>
               </div>
            </div>

            {/*Botão voltar/avançar*/}
            <div className='w-full flex gap-2 mt-4'>
               <button
                  onClick={e => { setCard('cadastro-3') }}
                  className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                  <ArrowTurnUpLeftIcon className='w-6 h-6' />
               </button>
               <button
                  onClick={() => HandleSubmit([cbf], 'cadastro-4')}
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

   function CardJornalista() {
      return (
         <div className='bg-black/45 w-sm min-h-100 text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
            {/*Titulo*/}
            <h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Cadastro</h2>

            {/*Inputs*/}
            <div className='w-full space-y-4'>
               <div className='bg-white w-full flex items-center rounded-xl shadow-md'>
                  <input type="text" placeholder='' value={timeCode}
                     onChange={e => setTimeCode(e.target.value)}
                     className='peer text-black w-full px-2.5 py-1 rounded-xl z-1
                     focus:outline-none'/>
                  <label
                     className='absolute bg-white text-ppinktr-500 ml-2 px-2 rounded-lg z-0 
                        transition-all duration-200 ease-out
                        peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-ppink-500
                        peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm'>
                     MTB ou número do DRT
                  </label>
               </div>
            </div>

            {/*Botão voltar/avançar*/}
            <div className='w-full flex gap-2 mt-4'>
               <button
                  onClick={e => { setCard('cadastro-3') }}
                  className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
                  transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
                  <ArrowTurnUpLeftIcon className='w-6 h-6' />
               </button>
               <button
                  onClick={() => HandleSubmit([timeCode], 'cadastro-4')}
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


}

export default RegisterCard