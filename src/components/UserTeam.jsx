import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import users from '../users.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import UserImg from './UserImg'

const UserTeam = ({ size = 3 }) => {
   const [user, setUser] = useState(null)
   const [userTeam, setUserTeam] = useState(null)

   useEffect(() => {
      const loggedInUser = localStorage.getItem('user')
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser)) 
      }

      setUserTeam(users.find(u => u.userType === 'time'))
      console.log(users.find(u => u.userType === 'time'))
   }, [])

   if (user) {
      return (
         <Link to={'/time'} className='flex items-center'>
            <img src={userTeam.photo} alt="team image" 
            style={{ height: `${size}rem`, width: `${size}rem` }} 
            className={`rounded-full`}/>
            <p>{userTeam.name}</p>
         </Link>
      )  
   }

   return
}

export default UserTeam