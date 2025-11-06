import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/authHooks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserImg = ({ size }) => {
  const { user, loading, isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <img src={user.photo} alt="user image"
        style={{ height: `${size}rem`, width: `${size}rem` }}
        className={`rounded-full`} />
    )
  }

  return (
    <Link to={'/login'}>
      <FontAwesomeIcon icon={faUser}
        style={{ height: `${size / 1.5}rem`, width: `${size / 1.5}rem` }}
        className={`bg-white p-2 rounded-full`} />
    </Link>
  )
}

export default UserImg