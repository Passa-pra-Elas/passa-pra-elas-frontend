import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserImg from '../UserImg'
import UserTeam from '../UserTeam'

const ProfileCard = () => {
   const [user, setUser] = useState('')
   const [verification, setVerification] = useState('')
   const [team, setTeam] = useState('')

   useEffect(() => {
       const loggedInUser = localStorage.getItem('user')
       if (loggedInUser) {
         setUser(JSON.parse(loggedInUser)) 
       }
     }, [])

     if (user.verification == "V") {
        setVerification("Verificado")
     }
     else if (user.verification == "X") {
        setVerification("Não verificado")
     }

   if (user) {
      return (
         <div className='bg-white flex flex-col items-center justify-center p-3 rounded-2xl border-1'>
            <UserImg size={6}/>
            <Link>
               <h3 className='text-ppurple-500 font-semibold'>{user.name}</h3>
            </Link>
   
            <div className='w-full text-left mt-3'>
               <p>{user.age} anos | {user.city} </p>
               <p className='text-ppurple-500 capitalize'>{user.userType}</p>
               <span></span>
            </div>

            <div className='w-full flex justify-start mt-4'>
               <UserTeam/>
            </div>
         </div>
     )
   }
   else {

   }
}

export default ProfileCard
