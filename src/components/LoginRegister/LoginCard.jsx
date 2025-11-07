import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config/apiConfig'
import useAuth from '../../hooks/authHooks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { ArrowTurnUpLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

function LoginCard({ cardArg = 'login-1' }) {
   const { login } = useAuth()
	const [userName, setuserName] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [card, setCard] = useState(cardArg)
	const navigate = useNavigate()

	function HandleSubmit(params, nextCard) {
		if (params.includes(userName) && params.includes(password)) {
			HandleLogin()
			return
		}

		for (const param of params) {
			if (!param) {
				setError('Campos não preenchidos!')
				return
			}
		}

		setError('')
		if (nextCard != '') {
			setCard(nextCard)
		}
	}

	const HandleLogin = async (e) => {
		try {
			const response = await axios.post(`${API_URL}/login`, { userName, password })
			const token = response.data.token

			if (token) {
				login(token)
				setError('Login realizado com sucesso!')
				setTimeout(() => navigate('/noticias'), 1000)
			}
			else {
				setError('Erro ao autenticar Token.')
			}
		} 
		catch (error) {
			console.error('Erro ao logar', error)
			setError(error.response.data?.message || `Erro ${error.response.status}: Falha na autenticação.`)
		}
	}

	switch (card) {
		case 'login-1':
			return CardLogin1()
		case 'rs-1':
			return CardRS1()
		case 'rs-2':
			return CardRS3()
		case 'rs-3':
			return CardRS3()
	}

	function CardLogin1() {
		return (
			<div className='bg-black/45 w-sm text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
				{/*Titulo*/}
				<h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Login</h2>

				{/*Inputs*/}
				<div className='w-full space-y-4'>
					<div className='bg-white w-full flex items-center rounded-xl shadow-md'>
						<input type="text" placeholder='' value={userName}
							onChange={e => setuserName(e.target.value)}
							className='peer text-black w-full px-2.5 py-1 rounded-xl z-1
							focus:outline-none'/>
						<label
							className='absolute bg-white text-ppinktr-500 ml-2 px-2 rounded-lg z-0 
								transition-all duration-200 ease-out
								peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-ppink-500
								peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm'>
							Nome ou Email
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
							Senha
						</label>
					</div>
				</div>

				{/*Botões adicionais
				<div className='w-full flex justify-between items-center mt-4'>
					<label className='flex items-center space-x-2 cursor-pointer'>
						<input type="checkbox" className='form-checkbox border-none scale-130 cursor-pointer' />
						<span className='text-lg'>Lembre de mim</span>
					</label>
					<button
						onClick={function () { setCard('rs-1') }}
						className='text-ppink-500 text-sm cursor-pointer
							transition-all hover:font-medium hover:scale-102'>Esqueceu sua senha?
					</button>
				</div>*/}

				{/*Botão entrar*/}
				<button
					onClick={() => HandleSubmit([userName, password])}
					className='w-full bg-ppurple-500 text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
					transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
					ENTRAR
				</button>

				{/*Texto informátivo*/}
				<p className='text-ppink-500 w-full text-left text-sm mt-1'>{error}</p>

				{/*Outros meios de login
				<div className='w-full flex flex-col items-center mt-6 mb-4 pt-2 border-t-[1.5px] border-white'>
					<p>Ou entre usando:</p>
					<div className='flex gap-5 mt-3'>
						<FontAwesomeIcon icon={faGoogle} className='text-ppink-500 scale-150 cursor-pointer' />
						<FontAwesomeIcon icon={faFacebook} className='text-ppink-500 scale-150 cursor-pointer' />
					</div>
				</div>*/}

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

	function CardRS1() {
		const [userName, setuserName] = useState('')
		const [error, setError] = useState('')

		function HandleSubmit() {
			if (!userName) {
				setError('Você precisa inserir um userName para continuar!')
				return
			}
			if (!userName.includes('@')) {
				setError('Insira um userName válido!')
				return
			}

			setError('')
			setCard('rs-2')
		}

		return (
			<div className='bg-black/45 max-w-sm min-h-100 text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
				{/*Titulo*/}
				<h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Recuperar Senha</h2>

				{/*Input*/}
				<input type="text" placeholder='Insira seu userName' value={userName}
					onChange={e => setuserName(e.target.value)}
					className='bg-white placeholder-ppinktr-500 text-black w-full px-2.5 py-1 rounded-xl 
						focus:outline-ppink-500'
				/>

				{/*Botão votlar/entrar*/}
				<div className='w-full flex gap-2 mt-4'>
					<button
						onClick={function () { setCard('login-1') }}
						className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
							transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
						<ArrowTurnUpLeftIcon className='w-6 h-6' />

					</button>
					<button
						onClick={HandleSubmit}
						className='w-full bg-ppurple-500 text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
							transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
						ENVIAR
					</button>
				</div>

				{/*Texto informátivo*/}
				<p className='text-ppink-500 w-full text-left text-sm mt-5'>{error}</p>
			</div>
		)
	}

	function CardRS2() {
		const [error, setError] = useState('')
		const inputs = useRef([])

		function HandleSubmit() {
			const submitCode = inputs.current.map(input => input.value).join('')

			if (submitCode.length < 6) {
				setError('Preencha todos os dígitos!')
				return
			}

			setError('')
			setCard('rs-3')
		}

		const HandleInputKey = (e, index) => {
			if (e.key === "Backspace" && !e.target.value && index > 0) {
				inputs.current[index - 1].focus()
				return
			}
			if (e.key.length !== 1) { return }

			e.preventDefault()
			inputs.current[index].value = e.key
			if (index < inputs.current.length - 1) {
				inputs.current[index + 1].focus()
			}
		}

		return (
			<div className='bg-black/45 max-w-sm min-h-100 text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
				{/*Titulo*/}
				<h2 className='text-ppink-500 text-4xl font-extrabold mb-6 text-shadow-md'>Recuperar Senha</h2>

				{/*Inputs código*/}
				<div className='space-y-4 flex gap-1 px-3'>
					{[...Array(6)].map((_, i) => (
						<input type="text" placeholder='0'
							ref={(el) => (inputs.current[i] = el)}
							key={i}
							maxLength={1}
							onKeyDown={e => HandleInputKey(e, i)}
							className='bg-white placeholder-ppinktr-500 text-ppink-500 text-center text-3xl text-bold w-full h-13 px-2.5 py-1 rounded-xl 
							focus:outline-ppink-500'
						/>
					))}
				</div>

				{/*Botão votlar/entrar*/}
				<div className='w-full flex gap-2 mt-4'>
					<button
						onClick={function () { setCard('login-1') }}
						className='w-[20%] bg-ppurple-500 flex justify-center items-center text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
						transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
						<ArrowTurnUpLeftIcon className='w-6 h-6' />

					</button>
					<button
						onClick={HandleSubmit}
						className='w-full bg-ppurple-500 text-3xl font-extrabold mt-4 p-1 rounded-xl cursor-pointer
						transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
						ENVIAR
					</button>
				</div>

				{/*Texto informátivo*/}
				<p className='text-ppink-500 w-full text-left text-sm mt-5'>{error}</p>
			</div>
		)
	}

	function CardRS3() {
		return (
			<div className='bg-black/45 max-w-sm min-h-100 text-white flex flex-col items-center py-4 px-8 rounded-2xl'>
				{/*Titulo*/}
				<h2 className='text-ppink-500 text-4xl text-center font-extrabold mb-6 text-shadow-md'>Conta recuperada com sucesso!</h2>

				<CheckCircleIcon className='text-ppink-500 h-30' />

				<p className='text-ppink-500 text-sm mt-5'>Faça login com sua nova senha</p>

				{/*Botão entrar*/}
				<Link
					onClick={e => navigate(0)}
					className='w-full bg-ppurple-500 text-3xl text-center font-extrabold mt-4 p-1 rounded-xl cursor-pointer
					transition-all hover:bg-ppurple-900 hover:text-pgrey-500 hover:scale-102'>
					LOGIN
				</Link>
			</div>
		)
	}
}

export default LoginCard