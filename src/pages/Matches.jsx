import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../components/PrincipalPages/NavBar'
import matches from '../matches.json'
import users from '../users.json'

const Matches = () => {
   const [teams, setTeams] = useState(null)
   const [currentDate, setCurrentDate] = useState(new Date())
   const [liveMatches, setLiveMatches] = useState([])
   const [selectedDayMatches, setSelectedDayMatches] = useState([])
   const [currentLiveIndex, setCurrentLiveIndex] = useState(0)

   useEffect(() => {
      setTeams(users.find(u => u.userType === 'time'))
   }, [])

   const GetBrasiliaTime = () => {
      const now = new Date()
      const offsetBrasilia = -3
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
      return new Date(utc + (3600000 * offsetBrasilia))
   }

   const GetTeamById = (id) => {
      return users.find(team => team.id === id)
   }

   const FilterLiveMatches = () => {
      const now = new Date()
      const live = matches.filter(match => {
         const matchStart = new Date(match.date)
         const matchEnd = new Date(matchStart.getTime() + match.duration * 60000)
         return now >= matchStart && now < matchEnd
      })
      setLiveMatches(live)
      setCurrentLiveIndex(0)
   }

   const FilterMatchesByDay = (date) => {
      const filtered = matches.filter(match => {
         const filtered = matches.filter(match => {
            const matchDate = new Date(match.date)
            return matchDate.getFullYear() === date.getFullYear() &&
               matchDate.getMonth() === date.getMonth() &&
               matchDate.getDate() === date.getDate()
         })
         setSelectedDayMatches(filtered)
      })
   }

   useEffect(() => {
      FilterLiveMatches()
      FilterMatchesByDay(currentDate)

      const interval = setInterval(FilterLiveMatches, 60000)
      return () => clearInterval(interval)
   }, [currentDate])

   const nextMatch = () => {
      if (liveMatches.length > 0) {
         setCurrentLiveIndex((prevIndex) => (prevIndex + 1) % liveMatches.length)
      }
   }

   const prevMatch = () => {
      if (liveMatches.length > 0) {
         setCurrentLiveIndex((prevIndex) => (prevIndex - 1 + liveMatches.length) % liveMatches.length)
      }
   }

   const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
   const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

   const GetCalendarDays = () => {
      const totalDays = daysInMonth(currentDate);
      const firstDay = firstDayOfMonth(currentDate);
      const days = [];

      for (let i = 0; i < firstDay; i++) {
         days.push({ day: '', isCurrentMonth: false });
      }
      for (let i = 1; i <= totalDays; i++) {
         days.push({ day: i, isCurrentMonth: true });
      }
      return days;
   };

   const calendarDays = GetCalendarDays();
   const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' }).toUpperCase();

   const GoToPrevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
   };
   const GoToNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
   };

   const SelectDay = (day) => {
      if (day.isCurrentMonth) {
         setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day));
         filterMatchesByDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day));
      }
   };

   const displayedMatch = liveMatches.length > 0 ? liveMatches[currentLiveIndex] : null;

   return (
      <div id='container' className='relative h-full pb-10'>
         {/*Background*/}
         <div className="absolute z-[-1] w-full h-full">
            <div className="absolute inset-0 
            bg-linear-to-t from-pgreen-500 to-pgreentr-500"></div>
            <div className='absolute inset-0 
            bg-[radial-gradient(ellipse_at_top,_#ffffff4d_.1px,transparent_1px)] bg-[size:14px_14px]'></div>
         </div>

         {/*Navegação*/}
         <NavBar />

         {/*Principal*/}
         <main className='pt-30'>
            <div className='w-full'>
               {/*Seção ao vivo*/}
               <h2 className='w-full text-4xl text-center font-bold'>AO VIVO AGORA</h2>
               <div className='w-full flex justify-center'>
                  {liveMatches.length > 1 &&
                     <button onClick={prevMatch}
                        className='bg-ppinktr-500 text-2xl font-bold px-3 py-1 my-auto border-1 border-black rounded-full
                        transition-all hover:scale-105 hover:bg-ppink-500'>
                        &lt;
                     </button>
                  }
                  {displayedMatch ? (
                     <div key={displayedMatch.id} className="bg-ppurple-200 flex flex-col items-center py-4 m-4 rounded-2xl">
                        <div className='flex items-center gap-2'>
                           <div className="w-35 flex flex-col items-center">
                              <img src={GetTeamById(displayedMatch.team1_id).photo} alt="Logo do Time 1" className='h-20' />
                              <span className='text-pgrey-500 font-bold'>{GetTeamById(displayedMatch.team1_id).name}</span>
                           </div>
                           <div className="">
                              <span className='text-white text-3xl font-extrabold'>{displayedMatch.score1} x {displayedMatch.score2}</span>
                           </div>
                           <div className="w-35 flex flex-col items-center">
                              <img src={GetTeamById(displayedMatch.team2_id).photo} alt="Logo do Time 2" className='h-20' />
                              <span className='text-pgrey-500 font-bold'>{GetTeamById(displayedMatch.team2_id).name}</span>
                           </div>
                        </div>
                        <Link to='/jogos/teste' className='text-pgrey-500 font-bold px-2 py-1 mt-2 border-2 border-pgrey-500 rounded-lg
                        transition-all hover:scale-108'>Assistir</Link>
                     </div>
                  ) : (
                     <p>Nenhum jogo ao vivo neste momento.</p>
                  )}
                  {liveMatches.length > 1 &&
                     <button onClick={prevMatch}
                        className='bg-ppinktr-500 text-2xl font-bold px-3 py-1 my-auto border-1 border-black rounded-full
                        transition-all hover:scale-105 hover:bg-ppink-500'>
                        &gt;
                     </button>
                  }
               </div>
            </div>

            <div className='bg-ppurple-200 flex flex-col items-center mx-10 mt-6 rounded-md'>
               <h2 className='text-4xl font-bold my-10'>CALENDÁRIO</h2>
               
               <div className='w-full flex justify-around'>
                  {/*Calendário*/}
                  <div className='bg-white w-90 m-2 mb-10 rounded-md'>
                     {/*Mês e ano*/}
                     <div className='bg-pgreentr-500 text-xl font-bold flex justify-between px-2 py-3'>
                        <button onClick={GoToPrevMonth}>&lt;</button>
                        <span>{monthName} {currentDate.getFullYear()}</span>
                        <button onClick={GoToNextMonth}>&gt;</button>
                     </div>

                     {/*Dias da semana*/}
                     <div className='bg-ppink-500 text-white text-lg text-center font-bold grid grid-cols-7 gap-y-2 py-2'>
                        {daysOfWeek.map((day, index) => (
                           <span key={index}>{day}</span>  
                        ))}
                     </div>
                     
                     {/*Dias*/}
                     <div className='grid grid-cols-7 text-sm text-center gap-y-2'>
                        {calendarDays.map((day, index) => (
                           <span key={index} onClick={() => SelectDay(day)} 
                           className={`p-1 m-[0.2px] text-lg rounded-md cursor-pointer transition-all 
                              ${day.isCurrentMonth ? 'text-black font-semibold hover:bg-ppinktr-500' : 'text-gray-50'} 
                              ${day.day === currentDate.getDate() ? 'bg-ppurple-500 text-white font-bold' : ''}`}>
                                 {day.day}
                           </span>
                        ))}
                     </div>
                  </div>

                  {/*Lista de jogos do dia selecionado*/}
                  <div>
                     {selectedDayMatches.length > 0 ? (
                        <div className='space-y-4'>
                           {selectedDayMatches.map(match => (
                              <div key={match.id} className='bg-white w-90 flex flex-col items-center p-4 rounded-xl'>
                                 <div className='flex items-center justify-between gap-5'>
                                    <div className='flex flex-col items-center space-x-2 w-30'>
                                       <img src={GetTeamById(match.team1_id).photo} alt="Logo do time 1" className='w-8 h-8'/>
                                       <span className='font-semibold text-ppurple-500'>{GetTeamById(match.team1_id).name}</span>
                                    </div>
                                    <div className='text-xl font-bold text-ppurple-500'>
                                       <span>
                                          {new Date(match.date) < GetBrasiliaTime() ? `${match.score1} x ${match.score2}` : '? x ?'}
                                       </span>
                                    </div>
                                    <div className='flex flex-col items-center space-x-2 w-30'>
                                       <img src={GetTeamById(match.team2_id).photo} alt="Logo do time 1" className='w-8 h-8'/>
                                       <span className='font-semibold text-ppurple-500'>{GetTeamById(match.team2_id).name}</span>
                                    </div>
                                 </div>
                                 <button className='text-ppink-500 font-bold px-2 py-1 mt-2 border-2 border-ppink-500 rounded-lg
                                 transition-all hover:scale-108'>Assistir</button>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <p>Nenhum jogo neste dia.</p>
                     )}
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Matches
