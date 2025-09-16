import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserImg = ({ size }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
      const loggedInUser = localStorage.getItem('user')
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser)) 
      }
    }, [])
  
  if (user) {
    return (
      <Link to={'/profile'}>
        <img src={user.photo} alt="user image" 
          style={{ height: `${size}rem`, width: `${size}rem` }} 
          className={`rounded-full`}/>
      </Link>
    )
  }

  return (
    <Link to={'/login'}>
      <FontAwesomeIcon icon={ faUser } 
        style={{ height: `${size}rem`, width: `${size}rem` }} 
        className={`bg-ppurple-500 px-2 py-1 rounded-full`}/>
    </Link>
  )
}

export default UserImg
