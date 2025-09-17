import React, { useState, useEffect } from 'react'
import NavBar from '../components/PrincipalPages/NavBar'
import field from '../assets/quadra.png'
import UserImg from '../components/UserImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const TestMatch = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [lat, setLat] = useState('0.000')
  const [long, setLong] = useState('0.000')
  const [error, setError] = useState('')
  const api = 'localhost:8000'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const data = await response.json()

        setLat(data.latitude)
        setLong(data.longitude)
        setX(data.x)
        setY(data.y)
      } catch (apiError) {
        setError(`Erro na API: ${apiError}`)
      }
    }

    fetchData();
  }, [])

  return (
    <div id='content' className='w-screen h-screen'>
      {/*Background*/}
      <div className="absolute z-[-1] w-full min-h-screen h-full">
        <div className="absolute inset-0 
            bg-linear-to-t from-ppink-500 to-ppinktr-500"></div>
        <div className='absolute inset-0 
            bg-[radial-gradient(ellipse_at_top,_#ffffff4d_.1px,transparent_1px)] bg-[size:14px_14px]'></div>
      </div>

      <NavBar/>

      <div className='w-full flex justify-center gap-20 pt-30'>
        <div className='w-1/4 bg-pgrey-500 p-5 rounded-2xl'>
          <p className='text-center text-2xl font-bold mb-5 border-b-1'>Console</p>
          <p className='text-lg mb-3 hover:bg-gray-300'>Nome do campo: FIAP - Paulista</p>
          <p className='text-lg hover:bg-gray-300'>Longitude: {long}</p>
          <p className='text-lg hover:bg-gray-300'>Latitude: {lat}</p>
          <p className='text-lg mt-3 hover:bg-gray-300'>X: {x}%</p>
          <p className='text-lg hover:bg-gray-300'>Y: {y}%</p>
          <p className='text-md text-ppink-500 mt-3 hover:bg-gray-300'>{error}</p>
        </div>
        <div className='relative w-1/2'>
          <img src={field} alt="" className='w-full'/>

          <FontAwesomeIcon icon={ faUser } 
          style={{ height: `1rem`, width: `1rem`, top: `${50+(50*(y/100)*0.85)}%`, left: `${50+(50*(x/100)*0.85)}%`}} 
          className={`absolute bg-ppurple-500 text-ppink-500 p-2 rounded-full 
          -translate-y-[50%] -translate-x-[50%] top-[${50}%]`}/>
        </div>
      </div>
      <h1 className='fixed w-full bg-ppurple-500 text-center text-white bottom-0 py-2'>
        Isso é uma demontração do Bracelete GPS e não condiz sobre o produto e site final
      </h1>
    </div>
  )
}

export default TestMatch