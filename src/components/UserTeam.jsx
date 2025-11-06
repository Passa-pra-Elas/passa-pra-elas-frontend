import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/authHooks';
import UserImg from './UserImg';
import axios from 'axios';
import { API_URL } from '../config/apiConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserTeam = ({ size = 3 }) => {
   const { user, loading } = useAuth();
   const [userTeam, setUserTeam] = useState(null)
   const [teamLoading, setTeamLoading] = useState(null)

   useEffect(() => {
      if (user && user.teamId) {
         const fetchUserTeam = async () => {
            setTeamLoading(true)
            try {
               const response = axios.get(`${API_URL}/teams/${user.teamId}`, {
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
               })

               setUserTeam(response.data.team)
            }
            catch (error) {
               console.error('Erro ao buscar time do usuário:', error)
               setUserTeam(null)
            }
            finally {
               setTeamLoading(false)
            }
         }
         fetchUserTeam()
      }
      else if (!user && !loading) {
         setUserTeam(null)
      }
   }, [user, loading])


   if (user && userTeam) {
      return (
         <Link to={'/time'} className='flex items-center'>
            <img src={userTeam.photo} alt={`${userTeam.name} image`}
               style={{ height: `${size}rem`, width: `${size}rem` }}
               className={`rounded-full object-cover`} />
            <p>{userTeam.name}</p>
         </Link>
      )
   }
   return null
}

export default UserTeam